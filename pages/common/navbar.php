<nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">Scan and Go</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <!-- User name with logo -->
                        <img src="https://via.placeholder.com/30" alt="User Avatar" class="rounded-circle" style="width: 30px; height: 30px; margin-right: 10px;">
                        <span id="dash-name"></span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-user"></i>
                            Profile
                        </a> -->
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#change-password">
                            <i class="fa fa-key"></i>
                            Change Password
                        </a>
                        <a class="dropdown-item logout" href="#">
                            <i class="fa fa-power-off"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <div class="modal fade" id="change-password" tabindex="-1" role="dialog" aria-labelledby="addteacherModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addteacherModalLabel">Change Password</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="frm-change-password">
                    
                        <div class="form-group">
                            <label for="mobile">Current Passowrd</label>
                            <input type="password" class="form-control" id="current_password" name="current_password" placeholder="Enter Current Password" required>
                        </div>  
                    
                        <div class="form-group">
                            <label for="email">New Password</label>
                            <input type="password" class="form-control" id="new_password" name="new_password" placeholder="Enter New Password" required>
                        </div>  
                        <div class="form-group">
                            <label for="password">Confirm Password</label>
                            <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Enter Confirm Password" required>
                        </div>  
    
                        <!-- Buttons inside the form, positioned at the bottom-right -->
                        <div class="form-row justify-content-end">
                            <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                            <button type="submit" id="btn-submit" class="btn btn-primary">Update</button>
                        </div>
                    </form>                    
                </div>
            </div>
        </div>
    </div>
    