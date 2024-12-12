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
    </style>
</head>
<body>

    <!-- Topbar (Navbar) -->
    <?php include('common/navbar.php')?>

    <!-- Sidebar Menu -->
    <?php include('common/sidebar.php')?>

    <!-- Content Area -->
    <div class="content " id="event-content">
        <div class="container mt-4">
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
                        <button class="btn btn-purple d-flex align-items-center" id="btn-start-attendance">
                            Start 
                            <i class="fa fa-flag ms-2 ml-2"></i> <!-- Add margin to the left of the icon -->
                        </button>
                    </div>
                </div>
            </div>

            <!-- Event Content -->
            <!-- Nav Tab Structure -->
            <ul class="nav nav-tabs event-nav-tabs mt-5" id="myTab" role="tablist">
            <li class="nav-item event-nav-item" role="presentation">
                <a class="nav-link event-nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Event Details</a>
            </li>
            <!-- You can add more tabs here if needed -->
            </ul>
        
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <!-- Tab content starts here -->
                    <div class="row mt-4">
                        <div class="col-md-7">
                            <!-- Left Column: Event Image and Description -->
                            
                            <!-- Image outside the card -->
                            <div class="event-image-container mb-4">
                                <img src="" id="event-image" width="100%" class="img-fluid" alt="Event Image" onerror="this.onerror=null;this.src='../assets/images/logo/am-color.png';">
                            </div>

                            <!-- Card with Description -->
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h5 class="card-title">Description</h5>
                                    <p class="card-text" id="event-description">
                                
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <ul id="fileNamesList"></ul>
                                </div>
                            </div>


                        </div>

                        <div class="col-md-5 hidden" id="attendace-container">
                            <!-- Right Column: Colleges Accordion -->
                            <!-- Accordion for Colleges -->
                            <div class="card" id="colleges-and-programs">
                                <div class="card-header">
                                    <h5 class="mb-0" style="font-size: 16px;">Attendance</h5>
                                </div>

                                <div class="accordion" id="accordionColleges">
                                
                                </div>
                            </div>
                            <div class="card hidden" id="year-levels-and-sections">
                                <div class="card-header">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0" style="font-size: 11px;" id="year-levels-and-sections-title"></h5>
                                        <button type="button" id="back-event-school" class="btn btn-success btn-circle">
                                            <i class="fas fa-arrow-left"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="accordion" id="accordionYearLevels">
                                
                                </div>
                            </div>
                    </div>
                    </div>
                    <!-- End Tab Content -->
                </div>
            </div>
        </div>
    </div>

    <div class="content hidden" id="attendance-content">
        <div class="container mt-4">
            <div class="row align-items-center">
              
                <!-- Right Section: Event Details -->
                <div class="col-md-12">
                    <!-- Title Section -->
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <button class="btn btn-purple btn-circle-big" id="btn-back-event"><i class="fa fa-arrow-left" style="font-size:15px;"></i></button>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="d-inline-block" style="color: black; text-align: left; width: 100%;">ATTENDANCE SHEET</h5>
                        <button class="btn btn-purple d-flex align-items-center" id="btn-export-attendance">
                            Export 
                            <i class="fa fa-download ms-2 ml-2"></i> <!-- Add margin to the left of the icon -->
                        </button> <!-- Export Button -->
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 id="selected-event-name" class="d-inline-block" style="text-align: center; width: 100%;color:#737373">Event Title</h5>
                    </div>

                    <!-- Event Information Section (College, Program, Time, Date) -->
                    <div class="row">
                        <!-- Left Column: College and Program Information -->
                        <div class="col-md-6">
                            <div class="mb-2">
                                <span id="selected-event-college" style="color:#737373"></span>
                            </div>
                            <div class="mb-2">
                                <span id="selected-event-program" style="color:#737373">Program Name</span>
                            </div>
                        </div>

                        <!-- Right Column: Time and Date Information -->
                        <div class="col-md-6">
                            <div class="mb-2" style="color:#737373">
                                <i class="fa fa-clock outline-clock"></i> <span id="selected-event-time">10:00 AM - 12:00 PM</span>
                            </div>
                            <div class="mb-2" style="color:#737373">
                                <i class="fa fa-calendar"></i> <span id="selected-event-date">-</span>
                            </div>
                        </div>
                    </div>

                  

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                           

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

    <script src="../assets/js/event.js"></script>
    <script>
         $('.accordion .card-header button').on('click', function() {
            // Rotate the icon when clicked
            var icon = $(this).find('i');
            icon.toggleClass('fa-chevron-down fa-chevron-left');
        });
    </script>
</body>
</html>
