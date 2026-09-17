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

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    // TODO: confirm Infomaniak SMTP host/from-address with Rosetta before go-live.
    $mail->Host       = 'mail.infomaniak.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'hello@therosettatone.net';
    $mail->Password   = '__SMTP_PASSWORD__';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('hello@therosettatone.net', 'The Rosetta Tone Website');
    $mail->Sender = 'hello@therosettatone.net';
    $mail->addAddress('hello@therosettatone.net');
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
