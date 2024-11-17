<?php
session_start();
require 'db.php'; // Include the database connection

// Ensure the user is logged in before proceeding with face verification
// Uncomment this line if you want to ensure the user is logged in
// if (!isset($_SESSION['username'])) {
//     echo json_encode(['message' => 'User is not logged in.']);
//     exit();
// }

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $incomingDescriptor = json_decode($_POST['descriptor'], true);

    if (empty($incomingDescriptor)) {
        echo json_encode(array(
            'isError' => true,
            'message' => 'No descriptor data received.',
        ));
        exit();
    }

    // Prepare SQL statement to fetch all saved face descriptors and associated user info
    $stmt = $conn->prepare("SELECT username, face_descriptor FROM sample_employee");
    $stmt->execute();
    $stmt->bind_result($savedUsername, $savedDescriptor);

    // Function to calculate the Euclidean distance between two descriptors
    function euclideanDistance($a, $b) {
        return sqrt(array_reduce(array_keys($a), function($carry, $key) use ($a, $b) {
            return $carry + pow($a[$key] - $b[$key], 2);
        }, 0));
    }

    // Define a reasonable threshold for face match (adjustable)
    $threshold = 0.6;

    // Loop through all the saved descriptors in the database
    while ($stmt->fetch()) {
        $savedDescriptor = json_decode($savedDescriptor, true);

        // Ensure both descriptors are in the correct format
        if (!is_array($savedDescriptor) || !is_array($incomingDescriptor)) {
            echo json_encode(['message' => 'Face descriptors are invalid.']);
            exit();
        }

        // Compare the incoming descriptor with the saved descriptor using Euclidean distance
        $distance = euclideanDistance($savedDescriptor, $incomingDescriptor);

        // If a match is found (distance below threshold), return the corresponding user data
        if ($distance < $threshold) {
            echo json_encode(array(
                'isError' => false,
                'message' => 'Face recognized!',
                'username' => $savedUsername, // Return the username or any other data you need
            ));
            $stmt->close();
            $conn->close();
            exit();
        }
    }

    // If no match is found
    echo json_encode(array(
        'isError' => true,
        'message' => 'Face not recognized.',
    ));

    $stmt->close();
} else {
    echo json_encode(array(
        'isError' => true,
        'message' => 'Invalid request.',
    ));
}

$conn->close();
?>
