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

// Honeypot — bots fill this in, real users never see it
if (!empty($data['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Min load time — bots submit instantly, real users take time
$loaded_at = isset($data['loaded_at']) ? (int) $data['loaded_at'] : 0;
$now_ms = (int) (microtime(true) * 1000);
if ($loaded_at === 0 || ($now_ms - $loaded_at) < 3000) {
    echo json_encode(['success' => true]);
    exit;
}

function field($data, $key) {
    return trim((string)($data[$key] ?? ''));
}

$first_name           = field($data, 'first_name');
$last_name             = field($data, 'last_name');
$email                 = field($data, 'email');
$phone                 = field($data, 'phone');
$services_interested   = field($data, 'services_interested');
$training_option       = field($data, 'training_option');
$fitness_level         = field($data, 'fitness_level');
$goals                 = field($data, 'goals');
$eating_habits         = field($data, 'eating_habits');
$barriers              = field($data, 'barriers');
$methods_tried         = field($data, 'methods_tried');
$cycle_syncing         = field($data, 'cycle_syncing');
$good_fit              = field($data, 'good_fit');
$commitment            = field($data, 'commitment');
$heard_about           = field($data, 'heard_about');

$required = [
    'first_name' => $first_name,
    'last_name' => $last_name,
    'email' => $email,
    'phone' => $phone,
    'services_interested' => $services_interested,
    'training_option' => $training_option,
    'fitness_level' => $fitness_level,
    'goals' => $goals,
    'eating_habits' => $eating_habits,
    'barriers' => $barriers,
    'methods_tried' => $methods_tried,
    'cycle_syncing' => $cycle_syncing,
    'good_fit' => $good_fit,
    'commitment' => $commitment,
    'heard_about' => $heard_about,
];
foreach ($required as $key => $val) {
    if ($val === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required field: ' . $key]);
        exit;
    }
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email']);
    exit;
}

$length_caps = [
    'first_name' => 100, 'last_name' => 100, 'email' => 150, 'phone' => 30,
    'services_interested' => 50, 'training_option' => 100, 'fitness_level' => 150,
    'goals' => 2000, 'eating_habits' => 2000, 'barriers' => 2000, 'methods_tried' => 2000,
    'cycle_syncing' => 50, 'good_fit' => 2000, 'commitment' => 5, 'heard_about' => 50,
];
foreach ($length_caps as $key => $cap) {
    if (strlen($$key) > $cap) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Field too long: ' . $key]);
        exit;
    }
}

$first_name = str_replace(["\r", "\n"], '', $first_name);
$last_name  = str_replace(["\r", "\n"], '', $last_name);
$email      = str_replace(["\r", "\n"], '', $email);
$full_name  = trim("$first_name $last_name");

$submitter_ip = $_SERVER['HTTP_CF_CONNECTING_IP']
    ?? $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['REMOTE_ADDR']
    ?? 'unknown';

$body  = "New 1:1 coaching application\n";
$body .= "====================\n\n";
$body .= "Name:  $full_name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n\n";
$body .= "Interested in:      $services_interested\n";
$body .= "Training option:    $training_option\n";
$body .= "Fitness level:      $fitness_level\n";
$body .= "Open to cycle sync: $cycle_syncing\n";
$body .= "Commitment (1-10):  $commitment\n";
$body .= "Heard about via:    $heard_about\n\n";
$body .= "Goals:\n$goals\n\n";
$body .= "Eating habits / relationship with food:\n$eating_habits\n\n";
$body .= "Barriers / challenges:\n$barriers\n\n";
$body .= "Methods/programs tried before:\n$methods_tried\n\n";
$body .= "Why a good fit:\n$good_fit\n\n";
$body .= "====================\n";
$body .= "Submitted:    " . date('Y-m-d H:i:s T') . "\n";
$body .= "Submitter IP: $submitter_ip\n";

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
    $mail->addReplyTo($email, $full_name);
    $mail->Subject = 'New 1:1 coaching application from ' . $full_name;
    $mail->Body    = $body;

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    error_log('PHPMailer error: ' . $mail->ErrorInfo);
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}
