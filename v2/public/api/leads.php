<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: content-type');
    http_response_code(204);
    exit;
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_field(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function encode_subject(string $subject): string
{
    return function_exists('mb_encode_mimeheader')
        ? mb_encode_mimeheader($subject, 'UTF-8')
        : '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function send_lead_email(array $lead): bool
{
    $recipient = filter_var(getenv('SUREVO_LEAD_EMAIL') ?: 'karenmisakyan5@gmail.com', FILTER_VALIDATE_EMAIL)
        ?: 'karenmisakyan5@gmail.com';
    $from = filter_var(getenv('SUREVO_MAIL_FROM') ?: 'noreply@surevo.ai', FILTER_VALIDATE_EMAIL)
        ?: 'noreply@surevo.ai';
    $leadName = str_replace(["\r", "\n"], ' ', (string) ($lead['name'] ?: 'לקוח חדש'));
    $subject = encode_subject('Surevo lead חדש: ' . $leadName);
    $body = implode("\n", [
        'Lead חדש מ-Surevo',
        '',
        'שם: ' . $lead['name'],
        'טלפון: ' . $lead['phone'],
        'חנות: ' . $lead['store'],
        'מחזור: ' . $lead['revenue'],
        'מקור: ' . $lead['source'],
        'עמוד: ' . $lead['page'],
        'זמן: ' . $lead['submittedAt'],
        'IP: ' . ($lead['ip'] ?? ''),
        '',
        'Consent:',
        $lead['consentText'] ?: 'whatsappConsent=true',
        '',
        'Lead ID: ' . $lead['id'],
    ]);
    $headers = implode("\r\n", [
        'From: Surevo Leads <' . $from . '>',
        'Reply-To: ' . $from,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ]);

    return @mail($recipient, $subject, $body, $headers, '-f' . $from);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

try {
    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);

    if (!is_array($data)) {
        respond(400, ['ok' => false, 'error' => 'invalid_json']);
    }

    $store = clean_field($data, 'store');
    $name = clean_field($data, 'name');
    $phone = clean_field($data, 'phone');
    $revenue = clean_field($data, 'revenue');
    $consent = filter_var($data['whatsappConsent'] ?? false, FILTER_VALIDATE_BOOLEAN);

    if ($store === '' || $name === '' || $phone === '' || $revenue === '' || !$consent) {
        respond(400, ['ok' => false, 'error' => 'missing_required']);
    }

    $phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
    if (strlen($phoneDigits) < 8) {
        respond(400, ['ok' => false, 'error' => 'invalid_phone']);
    }

    $id = bin2hex(random_bytes(16));
    $lead = [
        'id' => $id,
        'submittedAt' => gmdate('c'),
        'source' => clean_field($data, 'source') ?: 'website',
        'page' => clean_field($data, 'page'),
        'store' => $store,
        'name' => $name,
        'phone' => $phone,
        'revenue' => $revenue,
        'whatsappConsent' => true,
        'consentText' => clean_field($data, 'consentText'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
        'userAgent' => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500),
    ];

    $leadDir = getenv('SUREVO_LEAD_DIR') ?: dirname(__DIR__, 2) . '/leads';
    if (!is_dir($leadDir) && !mkdir($leadDir, 0750, true) && !is_dir($leadDir)) {
        throw new RuntimeException('lead_dir_unavailable');
    }

    $leadFile = rtrim($leadDir, '/') . '/surevo-leads.ndjson';
    $encoded = json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($encoded === false || file_put_contents($leadFile, $encoded . PHP_EOL, FILE_APPEND | LOCK_EX) === false) {
        throw new RuntimeException('lead_write_failed');
    }

    $webhookDelivered = false;
    $webhook = getenv('SUREVO_LEAD_WEBHOOK_URL') ?: '';
    if ($webhook !== '' && function_exists('curl_init')) {
        $ch = curl_init($webhook);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => $encoded,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 3,
            CURLOPT_TIMEOUT => 5,
        ]);
        curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);
        $webhookDelivered = $status >= 200 && $status < 300;
    }

    $emailDelivered = send_lead_email($lead);

    respond(200, [
        'ok' => true,
        'id' => $id,
        'delivered' => $webhookDelivered || $emailDelivered,
        'emailDelivered' => $emailDelivered,
    ]);
} catch (Throwable $error) {
    error_log('Surevo lead submit failed: ' . $error->getMessage());
    respond(500, ['ok' => false, 'error' => 'lead_submit_failed']);
}
