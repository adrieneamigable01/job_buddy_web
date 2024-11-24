<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Face Detection and Recognition with face-api.js</title>
    <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; flex-direction: column; }
        #container { position: relative; }
        #video { width: 640px; height: 480px; }
        #canvas { position: absolute; top: 0; left: 0; }
        #verificationStatus { margin-top: 10px; font-size: 1.2em; }
        #message { font-size: 1.1em; font-weight: bold; margin-top: 10px; }
        button { margin-top: 10px; padding: 10px 20px; font-size: 1em; cursor: pointer; }
        /* Modal styles */
        #modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }
        #modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
    </style>
</head>
<body>
    <div id="container">
        <button id="openModalBtn">Open Face Detection</button>
        <div id="modal-overlay"></div>
        <div id="modal">
            <video id="video" autoplay></video>
            <canvas id="canvas"></canvas>
            <div id="verificationStatus">Loading Face Detection...</div> <br>
            <div>   
                <label for="">Name: </label>
                <input type="text" name="name" id="name" placeholder="Enter name to save">
            </div>
            <button id="capture">Capture Face</button>
            <button id="verify">Verify Face</button>
            <button id="closeModalBtn">Close</button>
            <div id="message"></div>
        </div>
    </div>

    <!-- Load face-api.js library -->
    <script src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"></script>

    <!-- jQuery for AJAX requests -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script>
        // Global variables for model and face descriptor storage
        let knownFaceDescriptors = [];
        let capturedFaceDescriptor = null;
        let videoStream = null;
        let video = document.getElementById('video');
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let verificationStatus = document.getElementById('verificationStatus');
        let messageElement = document.getElementById('message');

        // Load face-api.js models
        async function loadModel() {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/scan/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/scan/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/scan/models');
            verificationStatus.textContent = 'Face API Models Loaded!';
            startVideoStream();
        }

        // Start the webcam video stream
        async function startVideoStream() {
            videoStream = await navigator.mediaDevices.getUserMedia({ video: {} });
            video.srcObject = videoStream;
            video.width = 640;
            video.height = 480;
            video.onloadedmetadata = () => {
                canvas.width = video.width;
                canvas.height = video.height;
                video.play();
                detectFaces();
            };
        }

        // Detect faces and extract face descriptors from video
        async function detectFaces() {
            setInterval(async () => {
                if (video && faceapi) {
                    const detections = await faceapi.detectAllFaces(video)
                        .withFaceLandmarks()
                        .withFaceDescriptors();

                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    if (detections.length > 0) {
                        // Draw bounding boxes around faces
                        detections.forEach(det => {
                            const { x, y, width, height } = det.detection.box;
                            ctx.beginPath();
                            ctx.rect(x, y, width, height);
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = 'green';
                            ctx.stroke();
                        });

                        // Capture the face descriptor of the first detected face
                        const faceDescriptor = detections[0].descriptor;
                        capturedFaceDescriptor = faceDescriptor; // Store the face descriptor
                        messageElement.textContent = 'Face detected and descriptor captured!';
                        verificationStatus.textContent = 'Face Detected!';
                    } else {
                        verificationStatus.textContent = 'No Face Detected.';
                    }
                }
            }, 100); // Update every 100ms
        }

        // Capture the face and save its descriptor
        async function captureFace() {
            if (capturedFaceDescriptor) {
                messageElement.textContent = 'Face captured successfully!';
                saveFaceDescriptor(capturedFaceDescriptor);
            } else {
                messageElement.textContent = 'No face detected to capture.';
            }
        }

        // Save the captured face descriptor to the server
        function saveFaceDescriptor(faceDescriptor) {
            let username = $("#name").val();
            if(username == "") {
                alert("Name is required");
                return false;
            }
            $.ajax({
                type: 'POST',
                url: 'saveFace.php', // Server-side script to save the descriptor
                data: { descriptor: JSON.stringify(Array.from(faceDescriptor)), name: username }, // Convert Float32Array to array
                success: function(response) {
                    $('#message').text(response.message); // Display response from server
                },
                error: function() {
                    $('#message').text('Error saving face descriptor.');
                }
            });
        }

        // Button click event to verify face
        $('#verify').on('click', function() {
            if (capturedFaceDescriptor) {
                verifyFace(capturedFaceDescriptor);
            } else {
                messageElement.textContent = 'No captured face to verify.';
            }
        });

        // Button click event to capture the face
        $('#capture').on('click', function() {
            captureFace();
        });

        // Open the modal and start the camera when clicked
        $('#openModalBtn').on('click', function() {
            $('#modal').show();
            $('#modal-overlay').show();
            loadModel();
        });

        // Close the modal and stop the camera when clicked
        $('#closeModalBtn').on('click', function() {
            $('#modal').hide();
            $('#modal-overlay').hide();
            stopVideoStream();
        });

        // Stop the video stream and release resources
        function stopVideoStream() {
            if (videoStream) {
                const tracks = videoStream.getTracks();
                tracks.forEach(track => track.stop());
                videoStream = null;
                verificationStatus.textContent = 'Face API Models Unloaded!';
            }
        }
    </script>
</body>
</html>
