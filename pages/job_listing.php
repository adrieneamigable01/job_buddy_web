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

<!-- Main Content -->
<div class="content">
    <h2>Job Offers</h2>
    <table class="table table-bordered table-striped" id="jobOffersTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Skills Required</th>
                <th>Location</th>
                <th>Candidates</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <!-- Job offers will be inserted here by JS -->
        </tbody>
    </table>
</div>

<!-- Modal: Job Offer Details -->
<div class="modal fade" id="jobDetailsModal" tabindex="-1" role="dialog" aria-labelledby="jobDetailsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Job Offer Details</h5>
            <button type="button" class="close" data-dismiss="modal">
                <span>&times;</span>
            </button>
        </div>
        <div class="modal-body" id="jobDetailsContent">
            <!-- Job details will be dynamically loaded -->
        </div>
    </div>
  </div>
</div>

<!-- Modal: Job Offer Candidates Details -->
<div class="modal fade" id="jobDetailsCandidatesModal" tabindex="-1" role="dialog" aria-labelledby="jobDetailsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Job Offer Details</h5>
            <button type="button" class="close" data-dismiss="modal">
                <span>&times;</span>
            </button>
        </div>
        <div class="modal-body" id="jobDetailsCandidatesContent">
            <!-- Job details will be dynamically loaded -->
        </div>
    </div>
  </div>
</div>


<?php
    include('common/footer-script.php')
?>
<script src="../assets/js/joboffer.js"></script>

</body>
</html>
