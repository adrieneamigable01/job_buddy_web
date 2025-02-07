<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Year Level List</title>
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
            <h1>Year Level List</h1>
            <button type="button" class="btn btn-purple" data-toggle="modal" data-target="#addYearLevelModal">
                <i class="fa fa-plus"></i> Add Year Level
            </button>
        </div>

        <table class="table table-bordered table-striped" id="year-level-table">
            <thead>
                <tr>
                    <th>ID#</th>
                    <th>Year Level</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Year Level data will be injected here dynamically -->
            </tbody>
        </table>
    </div>

    <!-- Modal for Adding or Editing Year Level -->
    <div class="modal fade" id="addYearLevelModal" tabindex="-1" role="dialog" aria-labelledby="addYearLevelModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addYearLevelModalLabel">Add New Year Level</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="frm-year-level">
                        <div class="form">
                            <div class="form-group col-md-12">
                                <label for="year_level">Year Level Name</label>
                                <input type="text" class="form-control" id="year_level" name="year_level" placeholder="Enter year level name" required>
                            </div>
                        </div>
                        <!-- Buttons inside the form, positioned at the bottom-right -->
                        <div class="form-row justify-content-end">
                            <button type="button" class="btn btn-orange mr-2" data-dismiss="modal">Close</button>
                            <button type="submit" id="btn-submit" class="btn btn-purple">Save Year Level</button>
                        </div>
                    </form>                    
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 4 JS and dependencies -->
    <?php include('common/footer-script.php')?>
    <script src="../assets/js/year-levels.js"></script>
</body>
</html>
