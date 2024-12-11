<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layout with Wider Sidebar and Logo</title>
    <!-- Bootstrap 4 CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome for icons (optional, if you need) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/dashboard-styles.css">
    <link href="../vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
 
    <style>
        .event-card .card-img-top {
            height: 150px;  /* Set the fixed height you desire */
            object-fit: cover;  /* Ensures the image covers the area without stretching */
            width: 100%;  /* Ensure it spans the full width of the card */
        }
        .card-text {
            white-space: nowrap;           /* Prevent text from wrapping onto the next line */
            overflow: hidden;              /* Hide any overflowed content */
            text-overflow: ellipsis;       /* Show '...' when the content is too long */
            display: block;                /* Ensures the content behaves as a block element */
            max-width: 100%;               /* Ensures it stays within the parent container */
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
        <!-- Event View Buttons -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <button type="button" class="btn btn-purple event-btn" id="upcomingEventsBtn">
                    <i class="fa fa-calendar-alt"></i> Upcoming Events
                </button>
                <button type="button" class="btn btn-secondary event-btn" id="endedEventsBtn">
                    <i class="fa fa-calendar-check"></i> Ended Events
                </button>
            </div>
            <button type="button" class="btn btn-purple hidden" id="create-event" data-toggle="modal" data-target="#addEventModal">
                <i class="fa fa-plus"></i> Create Event
            </button>
        </div>

        <!-- Event Cards List -->
        <div id="eventsList" class="row">
        </div>
    </div>

   <!-- Modal for Adding Event -->
   <div class="modal fade" id="addEventModal" tabindex="-1" role="dialog" aria-labelledby="addEventModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addEventModalLabel">Add New Event</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="frm-event">
                        <div class="form-row">
                            <!-- Left Column (30%) -->
                            <div class="col-md-7">
                                <div class="form-group">
                                    <label for="eventName">Event Name</label>
                                    <input type="text" class="form-control" id="event_name" name="event_name" placeholder="Enter event name" required>
                                </div>
                                <div class="form-group">
                                    <label for="eventDescription">Description</label>
                                    <textarea class="form-control" id="event_description" name="event_description" rows="3" placeholder="Enter event description" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="eventDate">Event Date</label>
                                    <input type="date" class="form-control" id="event_date" name="event_date"  required>
                                </div>
                                
                             
                            </div>

                            <!-- Right Column (70%) -->
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label for="eventImage">Upload Image</label>
                                    <div class="custom-file">
                                        <!-- Button to trigger file selection -->
                                        <button type="button" class="btn btn-purple" id="chooseImageButton">Choose Image</button>
                                        <!-- Hidden file input -->
                                        <input type="file" class="custom-file-input" id="eventImage" style="display: none;" accept="image/*">
                                        <!-- Display selected file name -->
                                        <span id="imageFileName" class="ml-2">No file chosen</span>
                                    </div>
                                    <!-- Image Preview -->
                                    <div id="imagePreviewContainer" class="mt-2" style="display: none;">
                                        <img id="imagePreview" src="" alt="Image Preview" class="img-thumbnail" style="max-width: 200px; max-height: 200px;">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="startTime">Time Start</label>
                                    <input type="time" class="form-control" id="event_start_time" name="event_start_time" required>
                                </div>
                                <div class="form-group">
                                    <label for="endTime">Time End</label>
                                    <input type="time" class="form-control" id="event_end_time" name="event_end_time" required>
                                </div>
                                <div class="form-group">
                                    <label for="eventDocuments">Upload Documents</label>
                                    <div class="custom-file">
                                        <!-- Button to trigger document file selection -->
                                        <button type="button" class="btn btn-purple" id="chooseDocumentsButton">Choose Documents</button>
                                        <!-- Hidden file input for multiple document selection -->
                                        <input type="file" name="documents[]" class="custom-file-input" id="eventDocuments" style="display: none;" accept=".pdf,.doc,.docx,.ppt,.txt,.xls,.xlsx" multiple>
                                        <!-- Display selected file names -->
                                        <span id="documentFileNames" class="ml-2">No files chosen</span>
                                    </div>
                                    <!-- Document List (display selected documents) -->
                                    <div id="documentListContainer" class="mt-2" style="display: none;">
                                        <label>Attached Documents:</label>
                                        <ul id="documentList"></ul>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <!-- <div class="col-md-12">
                                <div class="form-row mb-3">
                                    <div class="col-12 text-center">
                                        <button type="button" class="btn btn-purple" id="addRowBtn" onclick="addRow()">Add Row</button>
                                        <button type="button" class="btn btn-orange" id="removeRowBtn" onclick="removeRow()" disabled>Remove Row</button>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                        <div class="form-row">
                            <div id="fieldsContainer">
                                <div class="form-row row-item even-item-row">
                                    <div class="col-md-3 col-sm-6">
                                        <div class="form-group">
                                            <label for="college">College</label>
                                            <select class="form-control colleges-dropdown" id="colleges-0" data-id="0" name="colleges" required>
                                              
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="form-group">
                                            <label for="program">Program</label>
                                            <select class="form-control program-dropdown" id="program-0" data-id="0" name="programs" class="" required>
                                              
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="form-group">
                                            <label for="yearLevel">Year Level</label>
                                            <select class="form-control yearlevel-dropdown" data-id="0" id="year-level-0" name="yearLevels" required>
                                                <!-- Year level options will be populated dynamically -->
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="form-group">
                                            <label for="section">Section</label>
                                            <select class="form-control section-dropdown" data-id="0" id="section-0"name="sections" required>
                                                <!-- Section options will be populated dynamically -->
                                            </select>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            <div class="col-md-12 text-right">
                                <button type="button" id="addRowBtn" class="btn btn-primary">Add New Row</button>
                            </div>
                        </div>
                        <div class="form-row justify-content-end mt-2">
                            <button type="button" class="btn btn-orange mr-2" data-dismiss="modal">Close</button>
                            <button type="submit" id="btn-submit" class="btn btn-purple">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 4 JS and dependencies -->
    <?php include('common/footer-script.php')?>
    <!-- Add Masonry.js CDN -->

    <script src="../assets/js/events.js"></script>
    
</body>
</html>
