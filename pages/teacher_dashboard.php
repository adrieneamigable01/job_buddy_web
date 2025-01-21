<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>teacher Information</title>
    <!-- Bootstrap 4 CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/dashboard-styles.css">
    <link href="../vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <style>
         #video { width: auto; height: 480px; }
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

    <!-- Topbar (Navbar) -->
    <?php include('common/navbar.php')?>

    <!-- Sidebar Menu -->
    <?php include('common/sidebar.php')?>

    <!-- Content Area -->
    <div class="content">
        <div class="row">
            <!-- Left Column: teacher Information -->
            <div class="col-md-8">
                <div class="bg-white p-4 rounded border" style="height: 100%; border: 1px solid #ddd;">
                    <div class="text-center mb-4">
                        <!-- Placeholder for teacher's image -->
                        <div class="d-flex align-items-center mb-4">
                            <!-- Placeholder for teacher's image -->
                            <img src="https://via.placeholder.com/150" alt="teacher Image" class="img-thumbnail" id="teacher-image" style="width: 150px; height: 150px;">
                            <input type="file" id="image-upload" style="display: none;" accept="image/*">
                            <div class="ml-3">
                                <h3 id="teacher-name">...</h3> <!-- Replace with teacher's name -->
                            </div>
                        </div>
                    </div>
                    <hr style="border: 1px solid #ddd; margin: 10px 0;">
                    <h4>Personal Information</h4>
                    <form id="frm-teacher">
                        <!-- teacher Details Form -->
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="firstName">Teacher #</label>
                                <input type="text" class="form-control" id="teacher_id"  name="teacher_id">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="firstName">First Name</label>
                                <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Enter first name" required>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="middleName">Middle Name</label>
                                <input type="text" class="form-control" id="middle_name" name="middle_name" placeholder="Enter middle name">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="lastName">Last Name</label>
                                <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Enter last name" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <!-- <div class="form-group col-md-6">
                                <label for="mobile">Mobile</label>
                                <input type="text" class="form-control" id="mobile" name="mobile" placeholder="Enter mobile" required>
                            </div> -->
                            <div class="form-group col-md-12">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="college">College</label>
                                <select class="form-control" id="college_id" name="college_id" required>
                                    <!-- Dynamic options for college -->
                                </select>
                            </div>
                            <div class="form-group col-md-12">
                                <label for="program">Program</label>
                                <select class="form-control" id="program_id" name="program_id" required>
                                    <!-- Dynamic options for program -->
                                </select>
                            </div>
                        </div>
                        <div class="form-row justify-content-end">
                            <button type="submit" id="btn-submit" class="btn btn-purple">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        
            <!-- Right Column: Face Scanning -->
            <div class="col-md-4">
                <div id="face-scan-container" class="bg-white p-4 rounded border" style="height: 100%; border: 1px solid #ddd;">
                    <!-- Register Face Heading: aligned to the top left -->
                    <div class="text-left mb-3" style="width: 100%;">
                        <h6>Register Face</h6>
                    </div>
        
                    <!-- Sign up text: centered, larger font -->
                    <p class="text-center" style="font-size: 20px; color: #38b6ff; font-weight: bold; margin-bottom: 20px;">
                        Sign up for the event by scanning your face
                    </p>
        
                    <!-- Image Container: centered with white background -->
                    <div class="d-flex justify-content-center align-items-center" style="width: 100%; background-color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <img src="../assets/logo/student-right-scan.png" alt="teacher Image" class="img-fluid" style="width: 200px; height: 200px; object-fit: cover; border-radius: 50%; border: 2px solid #ddd;">
                    </div>
        
                    <!-- Buttons at the bottom, aligned -->
                    <div class="d-flex justify-content-center w-100 mb-3">
                        <button type="button" id="btn-scan" class="btn btn-purple mr-3">
                            <i class="fa fa-camera"></i> Scan Face
                        </button>
                        <button type="button" id="btn-generate" class="btn btn-purple">
                            <i class="fa fa-qrcode"></i> Generate QR Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="qrModal" tabindex="-1" role="dialog" aria-labelledby="qrModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="qrModalLabel">Your QR Code</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <!-- QR Code Canvas -->
                        
                        <div id="qr-content" style="background-color:#fff;height: 500px;">
                        <img src="../assets/logo/an-color.png" alt="teacher Image" class="img-thumbnail" id="teacher-image" style="width: 150px">
                        <div id="qr-code"></div>
                        <h4>Scan this QR Code to record you attendance</h4>
                        <span>Note: This QR Code contians you information</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- Button to close the modal -->
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <!-- Download Button -->
                        <button type="button" id="download-qr" class="btn btn-successqs ">Download</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="faceScan" tabindex="-1" role="dialog" aria-labelledby="qrModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="qrModalLabel">Scan Your Face</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <video id="video" autoplay></video>
                        <canvas id="canvas"></canvas>
                        <div id="verificationStatus">Loading Face Detection...</div> <br>
                        <div id="message"></div>
                    </div>
                    <div class="modal-footer">
                        <!-- Button to close the modal -->
                        <button type="button" id="close-capture" class="btn btn-secondary">Close</button>
                        <!-- Download Button -->
                        <button type="button" id="capture" class="btn btn-primary">Capture</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 4 JS and dependencies -->
    <?php
        include('common/footer-script.php')
    ?>
    <script src="../assets/js/teacher.js"></script>
</body>
</html>
