var teacher_id = null;
var table = null;
var teacher = {
    init:()=>{
        
        teacher.ajax.get();
        teacher.ajax.get_college();
        
        // teacher.ajax.get_program();
    },
    ajax:{

        get:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_teacher_api}`,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if ($.fn.DataTable.isDataTable("#teacher-table")) {
                        table.clear();
                        table.destroy();
                        $("#teacher").empty();
                    }
                    if(!response._isError){
                        if(Object.keys(response.data).length > 0){
                            var session =   jsAddon.display.getSessionData('session');
                            var my_user_id = session.user_id;
                            $.each(response.data,function(k,v){
                                let name = `${v.first_name} ${v.last_name} ${v.last_name}`
                                if(v.user_id != my_user_id){
                                    $("#teacher-table tbody")
                                        .append(
                                            $("<tr>")
                                                .append(
                                                    $("<td>").text(v.teacher_id),
                                                    $("<td>").text(name),
                                                    $("<td>").text(v.email),
                                                    $("<td>")
                                                    .attr({
                                                        title:v.college
                                                    })
                                                    .text(v.short_name),
                                                    $("<td>")
                                                    .attr({
                                                        title:v.program
                                                    })
                                                    .text(v.program_short_name),
                                                    $("<td>").append(
                                                        $("<span>")
                                                            .addClass(`badge badge-${v.face_descriptor != "" ? 'success' : 'danger'}`)
                                                            .text(v.face_descriptor != "" ? 'Done' : 'N/A')
                                                    ),
                                                    $("<td>").append(
                                                        $("<button>")
                                                        .click(function(){
                                                            // teacher_id = v.teacher_id;
                                                            // $("#frm-teacher").find(":input[name=first_name]").val(v.first_name)
                                                            // $("#frm-teacher").find(":input[name=middle_name]").val(v.middle_name)
                                                            // $("#frm-teacher").find(":input[name=last_name]").val(v.last_name)
                                                            // $("#frm-teacher").find(":input[name=college_id]").val(v.college_id)
                                                            // $("#frm-teacher").find(":input[name=program_id]").val(v.program_id)
                                                            // $("#frm-teacher").find(":input[name=year_level_id]").val(v.year_level_id)
                                                            // $("#frm-teacher").find(":input[name=section_id]").val(v.section_id)
                                                            // $("#frm-teacher").find(":input[name=mobile]").val(v.mobile)
                                                            // $("#frm-teacher").find(":input[name=email]").val(v.email)
                                                            // $("#addteacherModal").modal("show")
                                                            localStorage.setItem("teacher_id",v.teacher_id);
                                                            window.open('teacher.php',"_self");
                                                        })
                                                        .addClass("btn btn-purple btn-sm ml-2")
                                                        .append(
                                                            $("<i>").addClass("fa fa-eye"),
                                                            " View"
                                                        ),
                                                        user_type != null  && user_type.toLowerCase() == "admin" ?
                                                        $("<button>")
                                                            .click(function(){
                                                                
                                                                Swal.fire({
                                                                    title: 'Are you sure?',
                                                                    text: `Remove teacher ${name}`,
                                                                    icon: 'warning',
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: '#3085d6',
                                                                    cancelButtonColor: '#d33',
                                                                    confirmButtonText: 'Yes, remove it!'
                                                                }).then((result) => {
                                                                    if (result.value) {
                                                                    teacher.ajax.void({
                                                                        teacher_id:v.teacher_id
                                                                    })
                                                                    }
                                                                })
                                                            })
                                                            .addClass("btn btn-orange btn-sm ml-2")
                                                            .append(
                                                                $("<i>").addClass("fa fa-trash"),
                                                                " Void"
                                                            ): ""
                                                    ),
                                                )
                                        )
                                        if (Object.keys(response.data).length - 1 == k) {
                                            resolve(true);
                                        }
                                }
                            })  
                        }else{
                            resolve(true);
                        }
                    }
                })
            })
            .then(data=>{
                if(data){
                    table = $("#teacher-table").DataTable({
                        "autoWidth":false, 
                    });
                    jsAddon.display.removefullPageLoader()
                }
            })
        },

        add:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:add_teacher_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        teacher.ajax.get()
                        $(".modal").modal("hide")
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },

        update:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:update_teacher_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        teacher.ajax.get()
                        $(".modal").modal("hide")
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },
        void:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:delete_teacher_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        teacher.ajax.get()
                        $(".modal").modal("hide")
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },

        get_college:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_college_api}`,
                    dataType:'json',
                }).then((response)=>{
                    if(!response._isError){
                        $("#college_id").empty();
                        if(Object.keys(response.data).length > 0){
                            $("#college_id").append(
                                $("<option>")
                                .css({
                                    display:'none',
                                })
                                .attr({
                                    value:"",
                                    selected:'selected'
                                })
                                .text("All")
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
                })
            })
            .then(data=>{
                
            })
        },
        get_program:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_program_api}`,
                    dataType:'json',
                    payload:payload
                }).then((response)=>{
                    if(!response._isError){
                        $("#program_id").empty();
                        if(Object.keys(response.data).length > 0){
                            $("#program_id").append(
                                $("<option>")
                                .css({
                                    display:'none',
                                })
                                .attr({
                                    value:"",
                                    selected:'selected'
                                })
                                .text("All")
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
                                    $("#program_id").val(response.data[0].program_id)
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
                })
            })
            .then(data=>{
                
            })
        },
        get_yearlevel:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_yearlevel_api}`,
                    dataType:'json',
                }).then((response)=>{
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
                })
            })
            .then(data=>{
                
            })
        },
        get_section:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_section_api}`,
                    dataType:'json',
                }).then((response)=>{
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
                })
            })
            .then(data=>{
                
            })
        },
    }
}

teacher.init();
$("#search-teacher").click(function(){
    teacher.ajax.get({
        college_id:$("#college_id").val(),
        program_id:$("#program_id").val(),
        year_level_id:$("#year_level_id").val(),
        section_id:$("#section_id").val(),
    });
})
$("#college_id").change(function(){
    teacher.ajax.get_program({
        college_id:$(this).val(),
    });
})
$("#frm-teacher").validate({
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
        college_id:{
            min:1,
        },
        program_id:{
            min:1,
        },
        yearlevel_id:{
            min:1,
        },
        section_id:{
            min:1,
        },
        mobile:{
            required:true,
        },
        email:{
            required:true,
        },
    },
    messages:{
        college_id:{
            min:'Please select a college',
        },
        program_id:{
            min:'Please select a program',
        },
        year_level_id:{
            min:'Please select a year level',
        },
        section_id:{
            min:'Please select a section',
        },
    },
    submitHandler: function(form) {


        var data = {
            'first_name':$(form).find(':input[name=first_name]').val(),
            'middle_name':$(form).find(':input[name=middle_name]').val(),
            'last_name':$(form).find(':input[name=last_name]').val(),
            'college_id':$(form).find(':input[name=college_id]').val(),
            'program_id': $(form).find(':input[name=program_id]').val(),
            'year_level_id': $(form).find(':input[name=year_level_id]').val(),
            'section_id': $(form).find(':input[name=section_id]').val(),
            'mobile': $(form).find(':input[name=mobile]').val(),
            'email': $(form).find(':input[name=email]').val(),
        };

        

        if(teacher_id == null){
            // payload = jsAddon.display.objectToFormData(data)
            teacher.ajax.add(data);
        }else{
            // data.productid = productid;
            // payload = jsAddon.display.objectToFormData(data)
            data['teacher_id'] = teacher_id;
            teacher.ajax.update(data);
        }
    }
})

