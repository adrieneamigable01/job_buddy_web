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
            <h1>Teachers List</h1>
            <!-- <button type="button" class="btn btn-purple" data-toggle="modal" data-target="#addteacherModal">
                <i class="fa fa-plus"></i> Add teacher
            </button> -->
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="form-row mb-3">
                <!-- College Dropdown -->
                <div class="col-auto">
                    <label for="college_id" class="col-form-label">
                        <i class="fa fa-university"></i>
                    </label>
                </div>
                <div class="col">
                    <select class="form-control" name="college_id" id="college_id" aria-label="College" aria-describedby="basic-addon1">
                        <!-- Options for colleges go here -->
                    </select>
                </div>

                <div class="col-auto">
                    <label for="program_id" class="col-form-label">
                        <i class="fa fa-book"></i>
                    </label>
                </div>
                <div class="col">
                    <select class="form-control" name="program_id" id="program_id" aria-label="Program" aria-describedby="basic-addon1">
                        <!-- Options for programs go here -->
                    </select>
                </div>

                <button type="button" class="btn btn-purple" id="search-teacher">
                    <i class="fa fa-search"></i> Search
                </button>
            </div>
        </div>
        <table class="table table-bordered" id="teacher-table">
            <thead>
                <tr>
                    <th>ID#</th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>College</th>
                    <th>Program</th>
                    <th>Face ID</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Example teacher Data -->
                
            </tbody>
        </table>
    </div>

    <!-- Modal for Adding teacher -->
    <div class="modal fade" id="addteacherModal" tabindex="-1" role="dialog" aria-labelledby="addteacherModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addteacherModalLabel">Add New teacher</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="frm-teacher">
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
                            <div class="form-group col-md-6">
                                <label for="college">College</label>
                                <select class="form-control" id="college_id" name="college_id" required>
                                    <!-- Dynamic options for college -->
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="program">Program</label>
                                <select class="form-control" id="program_id" name="program_id" required>
                                    <!-- Dynamic options for program -->
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
                            <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                            <button type="submit" id="btn-submit" class="btn btn-primary">Save teacher</button>
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
    <script src="../assets/js/teachers.js"></script>
</body>
</html>
