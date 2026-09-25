<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

header('Content-Type: application/json; charset=utf-8');

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

// Honeypot — bots fill this in, real users never see it
if (!empty($data['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Min load time — bots submit instantly, real users take time
$loaded_at = isset($data['loaded_at']) ? (int) $data['loaded_at'] : 0;
$now_ms = (int) (microtime(true) * 1000);
if ($loaded_at === 0 || ($now_ms - $loaded_at) < 1500) {
    echo json_encode(['success' => true]);
    exit;
}

$name    = trim((string)($data['name'] ?? ''));
$email   = trim((string)($data['email'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing or invalid fields']);
    exit;
}

$length_caps = ['name' => 100, 'email' => 150, 'message' => 3000];
foreach ($length_caps as $key => $cap) {
    if (strlen($$key) > $cap) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Field too long: ' . $key]);
        exit;
    }
}

$name = str_replace(["\r", "\n"], '', $name);
$email = str_replace(["\r", "\n"], '', $email);

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
    $mail->Subject = 'New contact form message from ' . $name;
    $mail->Body    = "New contact form message\n\nName:  $name\nEmail: $email\n\nMessage:\n$message\n\nSubmitted: " . date('Y-m-d H:i:s T');

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    error_log('PHPMailer error (contact): ' . $mail->ErrorInfo);
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}
