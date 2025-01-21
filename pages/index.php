<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <!-- Bootstrap 4 CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Sunborn&display=swap" rel="stylesheet">

    <style>
        /* Background image */
        body {
            background-image: url('../assets/backgrounds/login.png'); /* Replace with your background image URL */
            background-size: cover;
            background-position: center;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-container {
            display: flex;
            height: 100%;
            width: 100%;
        }

        .left-section {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .right-section {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-form {
            width: 100%;
            max-width: 400px;
            padding: 30px;
            /* background-color: white; */
            border-radius: 8px;
            /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
        }

        .logo {
            max-width: 80%;
            height: auto;
        }

        .form-control {
            margin-bottom: 15px;
        }

        .btn-primary {
            width: 100%;
        }

        .go-to-signup {
            text-align: center;
            margin-top: 15px;
        }

        .go-to-signup a {
            color: #fff;
            font-size: 14px;
            text-decoration: none;
        }

        .go-to-signup a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<div class="login-container">
    <!-- Left Section (Logo) -->
    <div class="left-section">
        <img src="../assets/logo/login-left.png" alt="Logo" class="logo"> <!-- Replace with your logo -->
    </div>

    <!-- Right Section (Login Form) -->
    <div class="right-section">
        <div class="login-form">
            <center>
                <img src="../assets/logo/an.png" alt="Logo" class="logo">
            </center>
            <h3 class="text-center mb-4 text-white" style="font-family: 'Sunborn', sans-serif;font-size: 38.1px;font-weight: bold;">SIGN IN</h3>
            <form id="frm_login">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control" placeholder="Username" name="username" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                    <input type="password" class="form-control" placeholder="Password" name="password" aria-label="Password" aria-describedby="basic-addon1">
                  </div>
                <button type="submit" style="background-color:#fa6666" class="btn btn-primary mt-5">Login</button>
                <div class="go-to-signup ">
                    <p class="text-white">Dont have an account? <a href="sign-up.php">Sign-up</a></p>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Bootstrap 4 JS and dependencies -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="../assets/js/jquery-validate.js"></script>
<script src="../assets/js/sweetalert2@7.26.11.js"></script>
<script src="../assets/js/js-addon.js"></script>
<script src="../assets/js/api_constant.js"></script>
<script src="../assets/js/auth.js"></script>
</body>
</html>
