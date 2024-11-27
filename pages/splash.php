<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Splash Page</title>

    <!-- Bootstrap 4 CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        /* Set the background image */
        body {
            background-image: url('../assets/backgrounds/splash.png'); /* Replace with your background image URL */
            background-size: cover;
            background-position: center;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
        }

        /* Loading spinner style */
        .loading-container {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            z-index: 10;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        }

        .loading-container .spinner-border {
            color: #fff;
            width: 5rem;
            height: 5rem;
            border-width: 6px;
        }
    </style>
</head>
<body>

    <!-- Loading Spinner -->
    <div class="loading-container">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>

    <!-- Bootstrap 4 JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="../assets/js/sweetalert2@7.26.11.js"></script>
    <script src="../assets/js/js-addon.js"></script>
    <script src="../assets/js/api_constant.js"></script>
    <script src="../assets/js/splash.js"></script>
  

</body>
</html>
