<?php
session_start();
require 'db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $descriptor = json_decode($_POST['descriptor'], true);
    $username = $_POST['name']; // Assume you have the username stored in session

    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO sample_employee (username, face_descriptor) VALUES (?, ?) 
                            ON DUPLICATE KEY UPDATE face_descriptor = ?");
    $descriptorJson = json_encode($descriptor);
    $stmt->bind_param("sss", $username, $descriptorJson, $descriptorJson);
    
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Face descriptor saved successfully!']);
    } else {
        echo json_encode(['message' => 'Error saving face descriptor: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['message' => 'Invalid request.']);
}

$conn->close();
?>
