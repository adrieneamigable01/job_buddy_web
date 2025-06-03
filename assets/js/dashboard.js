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
                
                $("#create-event").removeClass("hidden")
                    $("#item").append(
                        $("<a>")
                            .attr({
                                'href':'history.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-history"),
                                " User Logs"
                            ),
                        $("<a>")
                            .attr({
                                'href':'job_listing.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-check"),
                                " Job Listing"
                            ),
                        $("<a>")
                            .attr({
                                'href':'user_validation.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-check"),
                                " User Validation"
                            ),
                        $("<a>")
                            .attr({
                                'href':'transaction_logs.php',
                            })
                            .append(
                                $("<i>")
                                    .addClass("fa fa-list"),
                                " Transaction Logs"
                            ),
                    )

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
                })
                .then((response)=>{
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

