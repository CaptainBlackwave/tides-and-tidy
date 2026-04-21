<?php
// Booking Form Handler for Tides & Tidy
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name = htmlspecialchars(trim($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$service = htmlspecialchars(trim($_POST['service'] ?? ''));
$rooms = intval($_POST['rooms'] ?? 0);
$bedrooms = intval($_POST['bedrooms'] ?? 0);
$bathrooms = intval($_POST['bathrooms'] ?? 0);
$consultationType = htmlspecialchars(trim($_POST['consultationType'] ?? ''));
$notes = htmlspecialchars(trim($_POST['notes'] ?? ''));

if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($consultationType)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

$to = 'your-email@example.com'; // UPDATE THIS WITH YOUR EMAIL
$from = 'noreply@tidesandtidy.com';

$email_subject = "New Booking Request: $service - $name";

$email_body = "NEW BOOKING REQUEST

Client Information:
- Name: $name
- Email: $email
- Phone: $phone

Service Details:
- Service Type: $service
- Estimated Hours: $rooms
- Consultation Preference: $consultationType

Additional Notes:
$notes

";

$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $email_subject, $email_body, $headers)) {
    $log_entry = date('Y-m-d H:i:s') . " - Booking Request - $name - $email - $service\n";
    file_put_contents(__DIR__ . '/submissions.log', $log_entry, FILE_APPEND);

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Booking request submitted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to submit booking request']);
}
?>
