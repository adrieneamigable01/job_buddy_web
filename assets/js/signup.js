$(()=>{
    var signup = {
        init:()=>{
            signup.ajax.get_college();
            // student.ajax.get_program({
            //     college_id:1,
            // });
            signup.ajax.get_yearlevel();
            signup.ajax.get_section();
            jsAddon.display.removefullPageLoader();

        },
        ajax:{
            login:(payload)=>{
                $.ajax({
                    type:'post',
                    url:loginApi,
                    dataType:'json',
                    data:payload,
                    beforeSend:function(){
                        jsAddon.display.addFormLoading("#frm_login");
                    },
                    success:function(res){
                        jsAddon.display.swalMessage(res._isError,res.reason)

                        if(!res._isError){
                            jsAddon.display.setSessionData('session',res.data);
                            jsAddon.display.setSessionData('token',res.token);
                            window.location.href = 'dashboard.php';
                        }

                        jsAddon.display.removeFormLoading("#frm_login");
                        
                    }
                })
            },



            get_college:()=>{
                $.ajax({
                    type:'get',
                    url:get_college_api,
                    dataType:'json',
                    beforeSend:function(){
                        jsAddon.display.addFormLoading("#frm_login");
                    },
                    success:function(response){
                        if(!response._isError){
                            $("#college_id").empty();
                            if(Object.keys(response.data).length > 0){
                                $("#college_id").append(
                                    $("<option>")
                                    .css({
                                        display:'none',
                                    })
                                    .text("Select a College")
                                )
                                $.each(response.data,function(k,v){
                                    $("#college_id").append(
                                        $("<option>")
                                        .text(v.short_name)
                                        .attr({
                                            value:v.college_id,
                                            title:v.college
                                        })
                                    )
                                })  
                            }else{
                                $("#college_id").append(
                                    $("<option>")
                                    .css({
                                        display:'none'
                                    })
                                    .text("No College Found")
                                )
                            }
                        }
                    }
                })
            },
            get_program:(payload,program_id)=>{

                $.ajax({
                    type:'get',
                    url:get_program_api,
                    dataType:'json',
                    data:payload,
                    beforeSend:function(){
                        jsAddon.display.addFormLoading("#frm_login");
                    },
                    success:function(response){
                        if(!response._isError){
                            $("#program_id").empty();
                            if(Object.keys(response.data).length > 0){
                                $("#program_id").append(
                                    $("<option>")
                                    .css({
                                        display:'none'
                                    })
                                    .text("Select a Program")
                                )
                                $.each(response.data,function(k,v){
                                    $("#program_id").append(
                                        $("<option>")
                                        .text(v.program_short_name)
                                        .attr({
                                            value:v.program_id,
                                            title:v.program
                                        })
                                    )
                                    if (Object.keys(response.data).length - 1 == k) {
                                        $("#frm-student").find(":input[name=program_id]").val(program_id == null? response.data[0].program_id : program_id)
                                    }
                                })  
                            }else{
                                $("#program_id").append(
                                    $("<option>")
                                    .css({
                                        display:'none'
                                    })
                                    .text("No Program Found")
                                )
                            }
                        }
                    }
                })
            },
            get_yearlevel:()=>{
                $.ajax({
                    type:'get',
                    url:get_yearlevel_api,
                    dataType:'json',
                    beforeSend:function(){
                        jsAddon.display.addFormLoading("#frm_login");
                    },
                    success:function(response){
                        if(!response._isError){
                            $("#year_level_id").empty();
                            if(Object.keys(response.data).length > 0){
                                $("#year_level_id").append(
                                    $("<option>")
                                    .css({
                                        display:'none'
                                    })
                                    .text("Select a Year Level")
                                )
                                $.each(response.data,function(k,v){
                                    $("#year_level_id").append(
                                        $("<option>")
                                        .text(v.year_level)
                                        .attr({
                                            value:v.year_level_id,
                                            title:v.year_level
                                        })
                                    )
                                })  
                            }else{
                                $("#year_level_id").append(
                                    $("<option>")
                                    .css({
                                        display:'none'
                                    })
                                    .text("No Year Level Found")
                                )
                            }
                        }
                    }
                })
            },
            get_section:()=>{
                $.ajax({
                    type:'get',
                    url:get_section_api,
                    dataType:'json',
                    beforeSend:function(){
                        jsAddon.display.addFormLoading("#frm_login");
                    },
                    success:function(response){
                        if(!response._isError){
                            $("#section_id").empty();
                            if(Object.keys(response.data).length > 0){
                                $("#section_id").append(
                                    $("<option>")
                                    .css({
                                        display:'none'
                                    })
                                    .text("Select a Section")
                                )
                                $.each(response.data,function(k,v){
                                    $("#section_id").append(
                                        $("<option>")
                                        .text(v.section)
                                        .attr({
                                            value:v.section_id,
                                            title:v.section
                                        })
                                    )
                                })  
                            }else{
                                $("#section_id").append(
                                    $("<option>")
                                    .css({
                                        display:'none'
                                    })
                                    .text("No Section Found")
                                )
                            }
                        }
                    }
                })
            },

            addStudent:(payload)=>{
               
                $.ajax({
                    type:'post',
                    url:reg_student_api,
                    dataType:'json',
                    data:payload,
                    error:function(error){
                        alert(error)
                    },  
                    beforeSend:function(){
                        jsAddon.display.addFormLoading("#frm_login");
                    },
                    success:function(response){
                        if(!response._isError){
                            if(!response._isError){
                               setTimeout(() => {
                                 window.open('splash.php',"_self");
                               }, 3000);
                            }
                            jsAddon.display.swalMessage(response._isError,response.reason);
                        }
                    }
                })

            },
            addTeacher:(payload)=>{

                $.ajax({
                    type:'post',
                    url:reg_teacher_api,
                    dataType:'json',
                    data:payload,
                    beforeSend:function(){
                        jsAddon.display.addFormLoading("#frm_login");
                    },
                    success:function(response){
                        if(!response._isError){
                            if(!response._isError){
                               setTimeout(() => {
                                  window.open('splash.php',"_self");
                               }, 3000);
                            }
                            jsAddon.display.swalMessage(response._isError,response.reason);
                        }
                    }
                })

            },

        }
    }
    signup.init()
    
    $("#college_id").change(function(){
        signup.ajax.get_program({
            college_id:$(this).val(),
        });
    })

    $(":input[name=role]").change(function(){
        let val = $(this).val();
        $("#student-fields").addClass("hidden");
        if(val == "student"){
            $("#student-fields").removeClass("hidden");
        }
    })
    


    $("#frm_signup").validate({
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
            first_name:{
                required:true,
            },
            last_name:{
                required:true,
            },
            email:{
                required:true,
            },
            // contact_number:{
            //     required:true,
            // },
            role:{
                required:true,
            },
            college_id:{
                required:true,
            },
            program_id:{
                required:true,
            },
            year_level_id:{
                required:true,
            },
            section_id:{
                required:true,
            },
            password: {
                required: true,
            },
            confirm_password: {
                required: true,
                equalTo: "#password"  // This ensures confirm_password matches the password field
            },
        },
        messages:{
            confirm_password: {
                equalTo: "Password must be same"  // This ensures confirm_password matches the password field
            },
        },
        submitHandler: function(form) {
            let role = $(":input[name=role]").val();
            var payload = {
                'first_name':$(form).find(':input[name=first_name]').val(),
                'last_name':$(form).find(':input[name=last_name]').val(),
                'email':$(form).find(':input[name=email]').val(),
                'role':$(form).find(':input[name=role]').val(),
                'college_id':$(form).find(':input[name=college_id]').val(),
                'program_id':$(form).find(':input[name=program_id]').val(),
                'password':$(form).find(':input[name=password]').val(),
            };

            if(role == 'student'){
                payload['year_level_id'] = $(form).find(':input[name=year_level_id]').val();
                payload['section_id'] = $(form).find(':input[name=section_id]').val();
                signup.ajax.addStudent(payload);
            }else{
                signup.ajax.addTeacher(payload);
            }
          
            
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

