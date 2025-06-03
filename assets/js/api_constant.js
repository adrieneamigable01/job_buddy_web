


let isLocal = true;
if(isLocal){
    var origin  = 'http://localhost/job_buddy_api';
    var baseApiUrl = `${origin}`;
    var base_url = 'http://localhost/job_buddy_api';
    var host = window.location.host;
    var pathname = window.location.pathname.split('/')
    var baseUrl = `${base_url}/pages/`
}else{
   
}



// auth api
var loginApi                = `${baseApiUrl}/auth/login`;
var logoutApi               = `${baseApiUrl}/auth/logout`;
//var change_password_api         = `${baseApiUrl}/user/change_password`;
//var reg_student_api         = `${baseApiUrl}/auth/addStudent`;
var registration            = `${baseApiUrl}/auth/register`;

///Users Api
var check_token_api         = `${baseApiUrl}/user/checktoken`;
var get_userlogs_api        = `${baseApiUrl}/user/logs`;
var get_activity_logs_api        = `${baseApiUrl}/useractivitylog/get`;
var userprofile_api                 = `${baseApiUrl}/user/profile`;
var approve_user_api                 = `${baseApiUrl}/user/approve`;

//Document
var get_user_document                 = `${baseApiUrl}/userdocuments/get`;
var create_user_document                 = `${baseApiUrl}/userdocuments/create`;

//Validation
var get_user_validation                 = `${baseApiUrl}/validationlogs/get`;
var create_user_validation                 = `${baseApiUrl}/validationlogs/create`;


///Student Api
var get_student_api         = `${baseApiUrl}/student/get`;
var update_student_api      = `${baseApiUrl}/student/update`;
var delete_student_api      = `${baseApiUrl}/student/void`;
var activate_student_api      = `${baseApiUrl}/student/activate`;

///Employer Api
var get_employer_api         = `${baseApiUrl}/employer/get`;
var update_employer_api      = `${baseApiUrl}/employer/update`;
var delete_employer_api      = `${baseApiUrl}/employer/void`;
var activate_employer_api      = `${baseApiUrl}/employer/activate`;


///Course Api
var get_college_api         = `${baseApiUrl}/course/get`;
var add_college_api         = `${baseApiUrl}/course/create`;
var update_college_api      = `${baseApiUrl}/course/update`;
var delete_college_api      = `${baseApiUrl}/course/void`;
var activate_college_api    = `${baseApiUrl}/course/activate`;

///Company Api
var get_company_api         = `${baseApiUrl}/company/get`;
var add_company_api         = `${baseApiUrl}/company/create`;
var update_company_api      = `${baseApiUrl}/company/update`;
var delete_company_api      = `${baseApiUrl}/company/void`;
var activate_company_api    = `${baseApiUrl}/company/activate`;


///Job Offers Api
var get_joboffer_api         = `${baseApiUrl}/joboffer/get`;
var add_joboffer_api         = `${baseApiUrl}/joboffer/create`;
var update_joboffer_api      = `${baseApiUrl}/joboffer/update`;
var delete_joboffer_api      = `${baseApiUrl}/joboffer/void`;
var activate_joboffer_api    = `${baseApiUrl}/joboffer/activate`;




