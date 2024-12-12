<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layout with Calendar Image and Event Details</title>
    <!-- Bootstrap 4 CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome for icons (optional, if you need) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/dashboard-styles.css">
    <link href="../vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <style>
        /* Custom Style for Accordion Titles */
        .accordion .card-header h5 {
            font-size: 14px;  /* Adjust this value to control the size */
        }

        .accordion .card-header button {
            text-align: left;  /* Ensure text aligns to the left */
        }

        /* Add some margin between the icon and text */
        .accordion .card-header button i {
            margin-left: 10px;
        }

        /* Style for icon rotation when expanded */
        .accordion .collapse.show + .card-header button i {
            transform: rotate(180deg);
            transition: transform 0.2s ease-in-out;
        }

        .event-nav-item {
            position: relative; /* Needed to position the pseudo-element */
            overflow: hidden; /* Ensures the border doesn't overlap the rounded corners */
        }

        /* Adding a full-width border using a pseudo-element */
        .event-nav-item::before {
            content: ''; /* Needed to display the pseudo-element */
            position: absolute;
            top: 0;
            left: 15%;
            width: 70%;
            height: 4px; /* Adjust the thickness of the border */
            background-color: #422087; /* Violet color */
        }

        /* Optional: Making the active tab rounded too */
        .event-nav-link {
            border-top-left-radius: 15px !important;
            border-top-right-radius: 15px !important;
        }


        .event-nav-link.active {
            background-color: #f8f9fa;  /* Light background for active tab */
            color: #6f42c1;  /* Violet text color for active tab */
        }

        /* Optional: Hover effect for nav-link */
        .event-nav-link:hover {
            background-color: #e9ecef;  /* Light grey on hover */
        }
        

        .calendar-box {
            background-color: #c46584;
            width: 85px;
            height: 80px; /* Adjust height as needed */
            border-radius: 2px; /* Optional: For rounded corners */
            display: flex;
            flex-direction: column;
            padding: 10px;
            box-sizing: border-box;
            text-align: center;
        }

        .month {
            font-size: 13px;
            font-weight: bold;
            color: white; 
        }

        .single-date {
            position: absolute;
            font-size: 50px;  /* Larger font size for the date */
            font-weight: bold;
            color: white;  /* Ensure the number contrasts with the background */
        }
        .vertical-divider {
            border-left: 2px solid #ccc; /* Light gray vertical divider */
            height: 20px; /* Adjust the height according to your design */
            margin: 0 12px; /* Adjust the spacing between date and time */
        }
        .btn-circle {
            width: 20px;  /* Set button width */
            height: 20px; /* Set button height */
            border-radius: 50%; /* Make the button circular */
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0; /* Remove padding */
            font-size: 10px; /* Icon size */
        }
        .btn-circle-big {
            width: 50px;  /* Set button width */
            height: 50px; /* Set button height */
            border-radius: 50%; /* Make the button circular */
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0; /* Remove padding */
            font-size: 10px; /* Icon size */
        }
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
        .hidden{
            display: none !important;
        }
        
    </style>
</head>
<body>

    <!-- Topbar (Navbar) -->
    <?php include('common/navbar.php')?>

    <!-- Sidebar Menu -->
    <?php include('common/sidebar.php')?>

   
    <div class="content" id="attendance-content">
        <div class="container mt-4">
            <div class="row align-items-center">
              
                <!-- Right Section: Event Details -->
                <div class="col-md-12">
                    
                <div class="row align-items-center"> <!-- This will align the items in the same row -->
                <!-- Left Section: Calendar Image (Logo style) -->
                <div class="col-md-1">
                    <div class="calendar-box">
                        <!-- Month Name at the top -->
                        <div class="month">
                            <span id="event-month">-</span>
                        </div>
                        <!-- Single Date Below the Month -->
                        <div class="single-date">
                            <span id="event-day">-</span>
                        </div>
                    </div>
                </div>

                <!-- Right Section: Event Details -->
                <div class="col-md-11">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h5 id="event-name" class="d-inline-block">Event Name</h5>
                            <div class="d-flex justify-content-start align-items-center w-100">
                                <p class="mb-0"><i class="fa fa-calendar-alt"></i> <span id="event-year">-</span></p>
                                <div class="vertical-divider"></div> <!-- Vertical Divider -->
                                <p class="mb-0"><i class="fa fa-clock"></i> <span id="event-time">10:00 AM - 12:00 PM</span></p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-purple d-flex align-items-center mr-2" id="btn-open-attendance-camera">
                                Open Camera 
                                <i class="fa fa-camera ms-2 ml-2"></i> <!-- Add margin to the left of the icon -->
                            </button>

                            <button class="btn btn-purple d-flex align-items-center" id="btn-open-attendance-qr">
                                Open QR Scanner 
                                <i class="fa fa-qrcode ms-2 ml-2"></i> <!-- Add margin to the left of the icon -->
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Attendance Table -->
            <div class="mt-5">
                <h5>Attendance List</h5>
                <ul class="nav nav-tabs" id="attendanceTab" role="tablist">
                    <!-- Tab for Students -->
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="students-tab" data-toggle="tab" href="#students" role="tab" aria-controls="students" aria-selected="true">Students</a>
                    </li>
                    <!-- Tab for Teachers -->
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="teachers-tab" data-toggle="tab" href="#teachers" role="tab" aria-controls="teachers" aria-selected="false">Teachers</a>
                    </li>
                </ul>
                <div class="tab-content" id="attendanceTabContent">
                    <!-- Students Tab -->
                    <div class="tab-pane fade show active" id="students" role="tabpanel" aria-labelledby="students-tab">
                        <div class="mt-4">
                            <h5>Student Attendance List</h5>
                            <table class="table table-bordered" id="tbl-students-attendance">
                                <thead>
                                    <tr>
                                        <th>ID No.</th>
                                        <th>Full Name</th>
                                        <th>College</th>
                                        <th>Time In</th>
                                        <th>Time Out</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                        
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Teachers Tab -->
                    <div class="tab-pane fade" id="teachers" role="tabpanel" aria-labelledby="teachers-tab">
                        <div class="mt-4">
                            <h5>Teacher Attendance List</h5>
                            <table class="table table-bordered" id="tbl-teachers-attendance">
                                <thead>
                                    <tr>
                                        <th>ID No.</th>
                                        <th>Full Name</th>
                                        <th>College</th>
                                        <th>Time In</th>
                                        <th>Time Out</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
            
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="qrScannerModal" tabindex="-1" role="dialog" aria-labelledby="qrScannerModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="qrScannerModalLabel">Scan QR Code</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Container for QR code scanner -->
                        <div id="qr-reader"></div>
                        <!-- Section to display the scan result -->
                        <div id="result" class="mt-3 text-center"></div>
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
                        <div class="row">
                            <div class="col-12">
                                <video id="video" autoplay></video>
                                <canvas id="canvas"></canvas>
                                <div id="verificationStatus">Loading Face Detection...</div> <br>
                                <div id="message"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- Button to close the modal -->
                        <button type="button" id="close-capture" class="btn btn-secondary">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal for Adding Event -->
   <!-- Add your modal code here -->

    <!-- Bootstrap 4 JS and dependencies -->
    <?php include('common/footer-script.php')?>
    <script src="https://cdn.jsdelivr.net/npm/jspdf@latest/dist/jspdf.umd.min.js"></script>

    <script src="../assets/js/event-room.js"></script>
    <script>
         $('.accordion .card-header button').on('click', function() {
            // Rotate the icon when clicked
            var icon = $(this).find('i');
            icon.toggleClass('fa-chevron-down fa-chevron-left');
        });
    </script>
</body>
</html>
