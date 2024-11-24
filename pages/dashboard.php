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
