


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
var deautnApi               = `${baseApiUrl}/auth/logout`;