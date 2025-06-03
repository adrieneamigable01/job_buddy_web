$(()=>{
    var authenticate = {
        init:()=>{
            
            jsAddon.display.removefullPageLoader();
        },
        ajax:{
            login:(payload)=>{
                $.ajax({
                    type:'post',
                    url:loginApi,
                    dataType:'json',
                    data:JSON.stringify(payload),
                    beforeSend:function(){
                        jsAddon.display.addFormLoading("#frm_login");
                    },
                    success:function(res){
                        jsAddon.display.swalMessage(res._isError,res.reason)

                        if(!res._isError){
                            jsAddon.display.setSessionData('session',res.data);
                            if(res.hasOwnProperty("student")){
                                localStorage.setItem("student_id",res.student[0].student_id)
                                localStorage.setItem("section_id",res.student[0].section_id)
                            }
                            if(res.hasOwnProperty("teacher")){
                                localStorage.setItem("teacher_id",res.teacher[0].teacher_id)
                                localStorage.setItem("program_id",res.teacher[0].program_id)
                            }
                            
                            jsAddon.display.setSessionData('token',res.data.token);
                            window.open('splash.php',"_self");
                        }

                        jsAddon.display.removeFormLoading("#frm_login");
                        
                    }
                })
            }
        }
    }
    authenticate.init()
    $("#frm_login").validate({
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
            username:{
                required:true,
            },
            password:{
                required:true,
            },
        },
        submitHandler: function(form) {
            var payload = {
                'username':$(form).find(':input[name=username]').val(),
                'password':$(form).find(':input[name=password]').val(),
            };
          
            authenticate.ajax.login(payload);
        },
        errorPlacement: function(error, element) {
            // Place the error message below the input field
            error.insertAfter(element.closest('.input-group')); // Adjusts placement below the input field
        }
    })

    window.addEventListener('beforeunload',(event) =>{
        if(localStorage.getItem('session') != null){
            jsAddon.display.setSessionData('session',session);
        }
    });
   
})

