var user_type = null,
user_id = null;
var dashboard = {
    init:()=>{
        let token = localStorage.getItem("token")

        if(token == null){
            jsAddon.display.removeItem('session');
            jsAddon.display.removeItem('token');
            window.location.href = base;
        }
        dashboard.ajax.checkToken().then((data)=>{
            if(data){
                var session =   jsAddon.display.getSessionData('session');
                user_type = session.user_type;
                user_id = session.user_id;
                if(user_type == "student"){
                    $("#item").append(
                        $("<a>")
                            .attr({
                                'href':'student_dashboard.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-home"),
                                " Dashboard"
                            ),
                        $("<a>")
                            .attr({
                                'href':'events.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-list"),
                                " Schedule / Event List"
                            ),
                    )
                }
                else if(user_type == "teacher"){
                    $("#create-event").removeClass("hidden")
                    $("#item").append(
                        $("<a>")
                            .attr({
                                'href':'teacher_dashboard.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-home"),
                                " Dashboard"
                            ),
                        $("<a>")
                            .attr({
                                'href':'students.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-users"),
                                " Students List"
                            ),
                        $("<a>")
                            .attr({
                                'href':'teachers.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-user-secret"),
                                " Teacher List"
                            ),
                            $("<a>")
                            .attr({
                                'href':'events.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-list"),
                                " Schedule / Event List"
                            ),
                        $("<a>")
                            .attr({
                                'href':'reports.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-calendar"),
                                " Attendance Report"
                            ),
                    )
                }else if(user_type == "admin"){
                    $("#create-event").removeClass("hidden")
                    $("#item").append(
                        $("<a>")
                            .attr({
                                'href':'dashboard.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-home"),
                                " Dashboard"
                            ),
                        $("<a>")
                            .attr({
                                'href':'students.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-users"),
                                " Students List"
                            ),
                        $("<a>")
                            .attr({
                                'href':'teachers.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-user-secret"),
                                " Teacher List"
                            ),
                        $("<a>")
                            .attr({
                                'href':'events.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-list"),
                                " Schedule / Event List"
                            ),
                            $("<a>")
                            .attr({
                                'href':'colleges.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-building"),
                                " Colleges"
                            ),
                        $("<a>")
                            .attr({
                                'href':'programs.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-graduation-cap"),
                                " Programs"
                            ),
                        $("<a>")
                            .attr({
                                'href':'yearlevel.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-calendar-week"),
                                " Year Levels"
                            ),
                        $("<a>")
                            .attr({
                                'href':'sections.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-list"),
                                " Sections"
                            ),
                    )
                }

                // session = atob(session);
                // alert(JSON.stringify(session))

                $("#dash-name").text(session.full_name);
            }  
        })
    },
    ajax:{
        checkToken:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${check_token_api}`,
                    dataType:'json',
                }).then((response)=>{
                    resolve(!response._isError)
                })
                 
            })
        },
        changePassoword:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:change_password_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        $(".modal").modal("hide")
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },
        logout:()=>{
            Swal.fire({
                title: 'Ready to Leave?',
                text: "Select (Logout) below if you are ready to end your current session.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Logout'
            }).then((result) => {
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addfullPageLoader();
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:logoutApi,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                                localStorage.clear();
                            setTimeout(() => {
                                window.location.href = baseUrl;
                            }, 2000);
                        }
                    })
                     
                })
            })
        }
    }
}
dashboard.init();

$(".logout").click(function(){
    isLogout = true;
    dashboard.ajax.logout();
})


$("#frm-change-password").validate({
    errorElement: 'span',
    errorClass: 'text-danger',
    highlight: function (element, errorClass, validClass) {
      $(element).closest('.form-group').addClass("has-warning");
      $(element).closest('.form-group').find("input").addClass('is-invalid');
      $(element).closest('.form-group').find("select").addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).closest('.form-group').removeClass("has-warning");
      $(element).closest('.form-group').find("input").removeClass('is-invalid');
      $(element).closest('.form-group').find("select").removeClass('is-invalid');
    },
    rules:{
        current_password:{
            required:true,
        },
        new_password:{
            required:true,
        },
        confirm_password:{
            required:true,
            equalTo: "#new_password"  // This ensures confirm_password matches the password field
        },
    },
    messages:{
        confirm_password: {
            equalTo: "Password must be same"  // This ensures confirm_password matches the password field
        },
    },
    submitHandler: function(form) {
        var data = {
            'current_password':$(form).find(':input[name=current_password]').val(),
            'new_password':$(form).find(':input[name=new_password]').val(),
            'confirm_password':$(form).find(':input[name=confirm_password]').val(),
            'user_id':user_id
        };
        dashboard.ajax.changePassoword(data);
    }
});

