<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup Page</title>
    <!-- Bootstrap 4 CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Sunborn&display=swap" rel="stylesheet">

    <style>
        /* Background image */
        body {
            background-image: url('../assets/backgrounds/sign-up.png'); /* Replace with your background image URL */
            background-size: cover;
            background-position: center;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .signup-container {
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

        .signup-form {
            width: 100%;
            max-width: 400px;
            padding: 30px;
            border-radius: 8px;
        }

        .form-control {
            margin-bottom: 15px;
        }

        .btn-primary {
            width: 100%;
        }

        .back-to-signin {
            text-align: center;
            margin-top: 15px;
        }

        .back-to-signin a {
            color: #fff;
            font-size: 14px;
            text-decoration: none;
        }

        .back-to-signin a:hover {
            text-decoration: underline;
        }
        .hidden {
            display:none !important;
        }
    </style>
</head>
<body>

<div class="signup-container">
    <!-- Left Section (Logo removed) -->
    <div class="left-section">
        <img src="../assets/logo/signup-left.png" alt="Logo" class="logo"> 
    </div>

    <!-- Right Section (Signup Form) -->
    <div class="right-section">
        <div class="signup-form">
            <h3 class="text-center mb-4 text-white" style="font-family: 'Sunborn', sans-serif;font-size: 38.1px;font-weight: bold;">SIGN UP</h3>
            <form id="frm_signup">
                <!-- First Name -->
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-user"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" placeholder="First Name" name="first_name" aria-label="First Name" aria-describedby="basic-addon1">
                </div>

                <!-- Last Name -->
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-user"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" placeholder="Last Name" name="last_name" aria-label="Last Name" aria-describedby="basic-addon1">
                </div>

                <!-- Email -->
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-envelope"></i>
                        </span>
                    </div>
                    <input type="email" class="form-control" placeholder="Email" name="email" aria-label="Email" aria-describedby="basic-addon1">
                </div>

                <!-- Contact Number -->
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-phone"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" placeholder="Contact Number" name="contact_number" aria-label="Contact Number" aria-describedby="basic-addon1">
                </div>

                <!-- Role Dropdown -->
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-user-tag"></i>
                        </span>
                    </div>
                    <select class="form-control" name="role" aria-label="Role" aria-describedby="basic-addon1">
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>

                <!-- College Dropdown -->
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-university"></i>
                        </span>
                    </div>
                    <select class="form-control" name="college_id" id="college_id" aria-label="College" aria-describedby="basic-addon1">
                       
                    </select>
                </div>

                <!-- Program Dropdown -->
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-book"></i>
                        </span>
                    </div>
                    <select class="form-control" name="program_id" id="program_id" aria-label="Program" aria-describedby="basic-addon1">
                      
                    </select>
                </div>
                
                <div id="student-fields">
                        
                    <!-- Year Level Dropdown -->
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fa fa-calendar"></i>
                            </span>
                        </div>
                        <select class="form-control" name="year_level_id" id="year_level_id" aria-label="Year Level" aria-describedby="basic-addon1">
                          
                        </select>
                    </div>

                    <!-- Section Dropdown -->
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fa fa-sitemap"></i>
                            </span>
                        </div>
                        <select class="form-control" name="section_id" id="section_id" aria-label="Section" aria-describedby="basic-addon1">
                            
                        </select>
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" style="background-color:#fa6666" class="btn btn-primary mt-5">Sign Up</button>
            </form>

            <!-- Back to Signin Link -->
            <div class="back-to-signin ">
                <p class="text-white">Already have an account? <a href="index.php">Back to Sign In</a></p>
            </div>
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
<script src="../assets/js/signup.js"></script>
</body>
</html>
