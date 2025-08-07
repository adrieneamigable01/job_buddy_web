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
</head>
<body>

    <!-- Topbar (Navbar) -->
    <?php include('common/navbar.php')?>

    <!-- Sidebar Menu -->
    <?php include('common/sidebar.php')?>

    <!-- Content Area -->
    <div class="content">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h1>User Logs</h1>
            <!-- <button type="button" class="btn btn-purple" data-toggle="modal" data-target="#addLogsModal">
                <i class="fa fa-plus"></i> Add Logs
            </button> -->
            
        </div>
        <table class="table table-bordered table-striped" id="validation-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>File</th>
                    <th>Selfie</th>
                    <th>Date</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                <!-- Example Logs Data -->
                
            </tbody>
        </table>
    </div>

    <!-- Modal for Adding Logs -->
    <div class="modal fade" id="addLogsModal" tabindex="-1" role="dialog" aria-labelledby="addLogsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addLogsModalLabel">Add New Logs</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="frm-Logs">
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
                            <div class="form-group col-md-4">
                                <label for="college">College</label>
                                <select class="form-control" id="college_id" name="college_id" required>
                                    <!-- Dynamic options for college -->
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="program">Program</label>
                                <select class="form-control" id="program_id" name="program_id" required>
                                    <!-- Dynamic options for program -->
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="year_level_id">Year Level</label>
                                <select class="form-control" id="year_level_id" name="year_level_id" required>
                                    <!-- Dynamic options for year level -->
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="section">Section</label>
                                <select class="form-control" id="section_id" name="section_id" required>
                                    <!-- Dynamic options for section -->
                                </select>
                            </div>
                        </div>
                    
                        <div class="form-group">
                            <label for="mobile">Mobile</label>
                            <input type="text" class="form-control" id="mobile" name="mobile" placeholder="Enter mobile" required>
                        </div>  
                    
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" required>
                        </div>  
    
                        <!-- Buttons inside the form, positioned at the bottom-right -->
                        <div class="form-row justify-content-end">
                            <button type="button" class="btn btn-orange mr-2" data-dismiss="modal">Close</button>
                            <button type="submit" id="btn-submit" class="btn btn-purple">Save Logs</button>
                        </div>
                    </form>                    
                </div>
            </div>
        </div>
    </div>
    

    <!-- Bootstrap 4 JS and dependencies -->
    <?php
        include('common/footer-script.php')
    ?>
    <script src="../assets/js/user_validation.js"></script>
</body>
</html>
