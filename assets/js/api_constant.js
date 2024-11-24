


let isLocal = true;
if(isLocal){
    var origin  = 'http://localhost/scan_and_go_api';
    var baseApiUrl = `${origin}`;
    var base_url = 'http://localhost/scan';
    var host = window.location.host;
    var pathname = window.location.pathname.split('/')
    var baseUrl = `${base_url}/pages/`
}else{
   
}



// auth api
var loginApi                = `${baseApiUrl}/auth/login`;
var loginApi                = `${baseApiUrl}/auth/login`;
var check_token_api         = `${baseApiUrl}/user/checktoken`;

///Student Api
var get_student_api         = `${baseApiUrl}/student/get`;
var add_student_api         = `${baseApiUrl}/student/add`;
var update_student_api      = `${baseApiUrl}/student/update`;
var update_student_face_api = `${baseApiUrl}/student/update_face`;
var delete_student_api      = `${baseApiUrl}/student/void`;

///Teacher Api
var get_teacher_api         = `${baseApiUrl}/teacher/get`;
var add_teacher_api         = `${baseApiUrl}/teacher/add`;
var update_teacher_api      = `${baseApiUrl}/teacher/update`;
var update_teacher_face_api = `${baseApiUrl}/teacher/update_face`;
var delete_teacher_api      = `${baseApiUrl}/teacher/void`;


///College Api
var get_college_api         = `${baseApiUrl}/college/get`;
var add_college_api         = `${baseApiUrl}/college/add`;
var update_college_api      = `${baseApiUrl}/college/update`;
var delete_college_api      = `${baseApiUrl}/college/void`;



///Program Api
var get_program_api         = `${baseApiUrl}/program/get`;
var add_program_api         = `${baseApiUrl}/program/add`;
var update_program_api      = `${baseApiUrl}/program/update`;
var delete_program_api      = `${baseApiUrl}/program/void`;


///Year Level Api
var get_yearlevel_api         = `${baseApiUrl}/yearlevel/get`;
var add_yearlevel_api         = `${baseApiUrl}/yearlevel/add`;
var update_yearlevel_api      = `${baseApiUrl}/yearlevel/update`;
var delete_yearlevel_api      = `${baseApiUrl}/yearlevel/void`;


///Section Api
var get_section_api         = `${baseApiUrl}/section/get`;
var add_section_api         = `${baseApiUrl}/section/add`;
var update_section_api      = `${baseApiUrl}/section/update`;
var delete_section_api      = `${baseApiUrl}/section/void`;
