<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

header('Content-Type: application/json; charset=utf-8');

// TODO: replace with the live domain(s) once DNS is cut over.
$allowed_origins = [
    'https://therosettatone.net',
    'https://www.therosettatone.net',
    'https://rosetta.blogcats.com',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

if (!empty($data['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

$loaded_at = isset($data['loaded_at']) ? (int) $data['loaded_at'] : 0;
$now_ms = (int) (microtime(true) * 1000);
if ($loaded_at === 0 || ($now_ms - $loaded_at) < 1500) {
    echo json_encode(['success' => true]);
    exit;
}

$name  = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid name or email']);
    exit;
}

$name = str_replace(["\r", "\n"], '', $name);
$email = str_replace(["\r", "\n"], '', $email);

// Add to Mailchimp audience ("The Rosetta Tone", list c7f856680b). Never blocks
// the download or the notification email if Mailchimp is slow/unreachable.
$mc_api_key = '__MAILCHIMP_API_KEY__';
if (strpos($mc_api_key, '__MAILCHIMP') === false && $mc_api_key !== '') {
    $mc_dc = substr($mc_api_key, strpos($mc_api_key, '-') + 1);
    $mc_list_id = 'c7f856680b';
    $mc_hash = md5(strtolower($email));
    $mc_url = "https://$mc_dc.api.mailchimp.com/3.0/lists/$mc_list_id/members/$mc_hash";
    $mc_payload = json_encode([
        'email_address' => $email,
        'status_if_new' => 'subscribed',
        'merge_fields' => ['FNAME' => $name],
    ]);

    $ch = curl_init($mc_url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $mc_payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Basic ' . base64_encode('apikey:' . $mc_api_key),
    ]);
    curl_exec($ch);
    if (curl_errno($ch)) {
        error_log('Mailchimp error: ' . curl_error($ch));
    }
    curl_close($ch);
}

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    // Google Workspace SMTP. Requires an App Password (not the account password) — generate one under the rosetta@therosettatone.net Google Account's 2-Step Verification settings, and set it as the SMTP_PASSWORD repo secret.
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'rosetta@therosettatone.net';
    $mail->Password   = '__SMTP_PASSWORD__';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('rosetta@therosettatone.net', 'The Rosetta Tone Website');
    $mail->Sender = 'rosetta@therosettatone.net';
    $mail->addAddress('rosetta@therosettatone.net');
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'New free guide signup: ' . $name;
    $mail->Body    = "New free cycle-syncing guide signup\n\nName:  $name\nEmail: $email\n\nSubmitted: " . date('Y-m-d H:i:s T');

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    // Don't block the download over a mail hiccup — the guide is a static file either way.
    error_log('PHPMailer error (free-guide): ' . $mail->ErrorInfo);
    echo json_encode(['success' => true]);
}
