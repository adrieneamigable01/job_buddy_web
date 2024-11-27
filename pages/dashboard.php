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
</head>
<body>

    <!-- Topbar (Navbar) -->
    
    <?php include('common/navbar.php')?>
    <!-- Sidebar Menu -->
    <?php include('common/sidebar.php')?>
    <!-- Content Area -->
    <div class="content">
        <h1>Welcome to the Dashboard</h1>
        <!-- <p>This is a simple layout with a wider sidebar (300px) and a logo on the left side of the sidebar.</p>
        <p>Content goes here...</p> -->
    </div>

    <!-- Bootstrap 4 JS and dependencies -->
    <?php
        include('common/footer-script.php')
    ?>

</body>
</html>
