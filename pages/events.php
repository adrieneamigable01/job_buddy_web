<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Management</title>
    <!-- Bootstrap 4 CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome for icons (optional) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/dashboard-styles.css">
</head>
<body>

    <!-- Topbar (Navbar) -->
    <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">My App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <!-- User name with logo -->
                        <img src="https://via.placeholder.com/30" alt="User Avatar" class="rounded-circle" style="width: 30px; height: 30px; margin-right: 10px;">
                        John Doe
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">
                            <i class="fa fa-user"></i>
                            Profile
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="fa fa-cog"></i>
                            Settings
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="fa fa-power-off"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Sidebar Menu -->
    <?php include('common/sidebar.php')?>

    <!-- Content Area -->
    <div class="content">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h1>Event List</h1>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addEventModal">
                <i class="fa fa-plus"></i> Add Event
            </button>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time Start</th>
                    <th>Time End</th>
                    <th>College</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Example Event Data -->
                <tr>
                    <td>Annual Sports Day</td>
                    <td>2024-12-10</td>
                    <td>09:00 AM</td>
                    <td>12:00 PM</td>
                    <td>Engineering</td>
                    <td>
                        <a href="#" class="btn btn-warning btn-sm"><i class="fa fa-edit"></i> Update</a>
                        <a href="#" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Delete</a>
                    </td>
                </tr>
                <tr>
                    <td>Science Expo</td>
                    <td>2024-11-30</td>
                    <td>10:00 AM</td>
                    <td>04:00 PM</td>
                    <td>Science</td>
                    <td>
                        <a href="#" class="btn btn-warning btn-sm"><i class="fa fa-edit"></i> Update</a>
                        <a href="#" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
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
                    <form>
                        <div class="form-row">
                            <!-- Left Column (30%) -->
                            <div class="col-md-7">
                                <div class="form-group">
                                    <label for="eventName">Event Name</label>
                                    <input type="text" class="form-control" id="eventName" placeholder="Enter event name" required>
                                </div>
                                <div class="form-group">
                                    <label for="eventDescription">Description</label>
                                    <textarea class="form-control" id="eventDescription" rows="3" placeholder="Enter event description" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="eventDate">Event Date</label>
                                    <input type="date" class="form-control" id="eventDate" required>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group" id="collegeFields">
                                            <label for="college">College</label>
                                            <input type="text" class="form-control" name="college[]" placeholder="Enter college name" required>
                                            <button type="button" class="btn btn-purple btn-sm mt-2" onclick="addCollegeRow()">Add Row</button>
                                            <button type="button" class="btn btn-orange btn-sm mt-2" onclick="removeCollegeRow()">Remove Row</button>
                                        </div>
                                        <div class="form-group">
                                            <label for="yearLevel">Year Level</label>
                                            <input type="text" class="form-control" name="yearLevel[]" placeholder="Enter year level" required>
                                            <button type="button" class="btn btn-purple btn-sm mt-2" onclick="addYearLevelRow()">Add Row</button>
                                            <button type="button" class="btn btn-orange btn-sm mt-2" onclick="removeYearLevelRow()">Remove Row</button>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="program">Program</label>
                                            <input type="text" class="form-control" name="program[]" placeholder="Enter program name" required>
                                            <button type="button" class="btn btn-purple btn-sm mt-2" onclick="addProgramRow()">Add Row</button>
                                            <button type="button" class="btn btn-orange btn-sm mt-2" onclick="removeProgramRow()">Remove Row</button>
                                        </div>
                                        <div class="form-group">
                                            <label for="section">Section</label>
                                            <select class="form-control" name="section[]" required>
                                                <option value="">Select Section</option>
                                                <option value="A">Section A</option>
                                                <option value="B">Section B</option>
                                                <option value="C">Section C</option>
                                            </select>
                                            <button type="button" class="btn btn-purple btn-sm mt-2" onclick="addSectionRow()">Add Row</button>
                                            <button type="button" class="btn btn-orange btn-sm mt-2" onclick="removeSectionRow()">Remove Row</button>
                                        </div>
                                    </div>
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
                                    <input type="time" class="form-control" id="startTime" required>
                                </div>
                                <div class="form-group">
                                    <label for="endTime">Time End</label>
                                    <input type="time" class="form-control" id="endTime" required>
                                </div>
                                <div class="form-group">
                                    <label for="eventDocuments">Upload Documents</label>
                                    <div class="custom-file">
                                        <!-- Button to trigger document file selection -->
                                        <button type="button" class="btn btn-purple" id="chooseDocumentsButton">Choose Documents</button>
                                        <!-- Hidden file input for multiple document selection -->
                                        <input type="file" class="custom-file-input" id="eventDocuments" style="display: none;" accept=".pdf,.doc,.docx,.ppt,.txt,.xls,.xlsx" multiple>
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
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-purple">Create Event</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 4 JS and dependencies -->
    <?php
        include('common/footer-script.php')
    ?>

    <!-- JavaScript for Adding and Removing Rows -->
    <script>
        // Add College Row
        function addCollegeRow() {
            var input = $('<input>', {
                type: 'text',
                name: 'college[]',
                class: 'form-control mt-2',
                placeholder: 'Enter college name'
            });
            $('#collegeFields').append(input);
        }
    
        // Remove College Row
        function removeCollegeRow() {
            var collegeFields = $('#collegeFields');
            if (collegeFields.children().length > 1) {
                collegeFields.children().last().remove();
            }
        }
    
        // Add Year Level Row
        function addYearLevelRow() {
            var input = $('<input>', {
                type: 'text',
                name: 'yearLevel[]',
                class: 'form-control mt-2',
                placeholder: 'Enter year level'
            });
            $('#yearLevelFields').append(input);
        }
    
        // Remove Year Level Row
        function removeYearLevelRow() {
            var yearLevelFields = $('#yearLevelFields');
            if (yearLevelFields.children().length > 1) {
                yearLevelFields.children().last().remove();
            }
        }
    
        // Add Program Row
        function addProgramRow() {
            var input = $('<input>', {
                type: 'text',
                name: 'program[]',
                class: 'form-control mt-2',
                placeholder: 'Enter program name'
            });
            $('#programFields').append(input);
        }
    
        // Remove Program Row
        function removeProgramRow() {
            var programFields = $('#programFields');
            if (programFields.children().length > 1) {
                programFields.children().last().remove();
            }
        }
    
        // Add Section Row
        function addSectionRow() {
            var select = $('<select>', {
                name: 'section[]',
                class: 'form-control'
            });
    
            select.append('<option value="">Select Section</option>')
                  .append('<option value="A">Section A</option>')
                  .append('<option value="B">Section B</option>')
                  .append('<option value="C">Section C</option>');
    
            $('#sectionFields').append(select);
        }
    
        // Remove Section Row
        function removeSectionRow() {
            var sectionFields = $('#sectionFields');
            if (sectionFields.children().length > 1) {
                sectionFields.children().last().remove();
            }
        }

        $(document).ready(function() {
            // When the "Choose Image" button is clicked, trigger the file input click
            $('#chooseImageButton').click(function() {
                $('#eventImage').click();  // Simulate file input click
            });

            // When a file is selected in the file input
            $('#eventImage').change(function() {
                var file = this.files[0];  // Get the selected file
                if (file && file.type.startsWith('image/')) {  // Ensure the file is an image
                    // Show the file name next to the button
                    $('#imageFileName').text(file.name);

                    // Create a FileReader to preview the image
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        // Set the preview image source
                        $('#imagePreview').attr('src', e.target.result);
                        // Show the image preview container
                        $('#imagePreviewContainer').show();
                    };
                    reader.readAsDataURL(file);  // Read the image file as a data URL
                } else {
                    // If the file is not an image, hide the preview
                    $('#imagePreviewContainer').hide();
                }
            });
            

            // When the "Choose Document" button is clicked, trigger the file input click
            var selectedDocuments = [];

            // When the "Choose Documents" button is clicked, trigger the file input click
            $('#chooseDocumentsButton').click(function() {
                $('#eventDocuments').click();  // Simulate file input click
            });

            // When files are selected in the file input
            $('#eventDocuments').change(function() {
                selectedDocuments = [];  // Clear the array before adding new files

                var files = this.files;  // Get the selected files
                if (files.length > 0) {
                    // Loop through all the selected files and store them in the array
                    $.each(files, function(index, file) {
                        selectedDocuments.push(file);

                        // Add the file name to the document list
                        var listItem = $('<li>').text(file.name);
                        $('#documentList').append(listItem);
                    });

                    // Show the document list container and file names
                    $('#documentFileNames').text(files.length + " files selected");
                    $('#documentListContainer').show();
                } else {
                    $('#documentListContainer').hide();
                    $('#documentFileNames').text('No files chosen');
                }
            });

            // When the "Upload Documents" button is clicked, prepare the files for upload
            $('#uploadDocumentsButton').click(function() {
                if (selectedDocuments.length > 0) {
                    // Create a FormData object to hold the files
                    var formData = new FormData();
                    
                    // Append each selected document to FormData
                    $.each(selectedDocuments, function(index, file) {
                        formData.append('documents[]', file);  // Use 'documents[]' to send an array of files
                    });

                    // Send the files to the server via an AJAX POST request
                    $.ajax({
                        url: '/upload-documents',  // Change to your server's upload endpoint
                        type: 'POST',
                        data: formData,
                        processData: false,  // Prevent jQuery from processing the data
                        contentType: false,  // Prevent jQuery from setting the content type
                        success: function(response) {
                            // Handle the response from the server (e.g., display a success message)
                            alert('Documents uploaded successfully!');
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            // Handle any errors that occur during the upload
                            alert('Error uploading documents: ' + textStatus);
                        }
                    });
                } else {
                    alert('Please select at least one document to upload.');
                }
            });
        });
    </script>
    

</body>
</html>
