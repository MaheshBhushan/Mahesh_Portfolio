<?php
/* ----------  CONFIG  ---------- */
$webhook_url = 'https://discord.com/api/webhooks/1400151206600638474/jekhE7J1NfaTnvldFwkxnFOo5ZCHpn1UlE0HHA5PPsKeIZ56ZQPdNIM2pi7Yc7B8kjAT';
/* ------------------------------ */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Sanitise the incoming data
    $name    = strip_tags(trim($_POST["name"]    ?? ''));
    $email   = filter_var(trim($_POST["email"]   ?? ''), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"] ?? ''));
    $message = strip_tags(trim($_POST["message"] ?? ''));

    if (
        empty($name)   ||
        empty($subject)||
        empty($message)||
        !filter_var($email, FILTER_VALIDATE_EMAIL)
    ) {
        http_response_code(400);
        echo "Please fill out every field correctly.";
        exit;
    }

    // 2. Prepare the Discord embed (optional but looks nice)
    $payload = [
        "username"  => "Portfolio Contact",
        "avatar_url"=> "https://avatars.githubusercontent.com/u/0000000", // optional
        "embeds"    => [[
            "title"  => $subject,
            "color"  => 5814783,                   // nice green
            "fields" => [
                ["name"=>"Name",   "value"=>$name,  "inline"=>true],
                ["name"=>"Email",  "value"=>$email, "inline"=>true],
                ["name"=>"Message","value"=>$message]
            ],
            "footer" => ["text"=>"Portfolio Contact Form"]
        ]]
    ];

    // 3. Send it to Discord
    $ch = curl_init($webhook_url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10
    ]);
    $discord_response = curl_exec($ch);
    $http_status      = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // 4. Respond to the browser so your JS can show feedback
    if ($http_status >= 200 && $http_status < 300) {
        http_response_code(200);
        echo "Thank you! Your message has been delivered to my Discord.";
    } else {
        http_response_code(502);
        echo "Sorry, something went wrong (Discord error).";
    }

} else {
    http_response_code(405);      // Method Not Allowed
    echo "Only POST requests are accepted.";
}
?>
