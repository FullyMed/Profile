<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Strip CR/LF from header-bound fields to prevent email header injection
    $name = trim(str_replace(["\r", "\n"], "", $_POST["name"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_VALIDATE_EMAIL);
    $subject = trim(str_replace(["\r", "\n"], "", $_POST["subject"] ?? ""));
    $message = trim($_POST["message"] ?? "");

    if (empty($name) || !$email || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all fields with a valid email address.";
        exit;
    }

    $to = "maxfelix05@gmail.com";
    $mailSubject = "Portfolio contact: $subject";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $to\r\nReply-To: $name <$email>";

    // Send email
    if (mail($to, $mailSubject, $body, $headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Something went wrong. Please try again later.";
    }
} else {
    http_response_code(403);
    echo "Access denied.";
}
?>