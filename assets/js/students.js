var student_id = null;
var table = null;
var student = {
    init:()=>{

        student.ajax.get();
        student.ajax.get_college();
        // student.ajax.get_program({
        //     college_id:1,
        // });
        student.ajax.get_yearlevel();
        student.ajax.get_section();
      
    },
    ajax:{

        get:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_student_api}`,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if ($.fn.DataTable.isDataTable("#student-table")) {
                        table.clear();
                        table.destroy();
                        $("#student-table tbody").empty();
                    }
                    if(!response._isError){
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                let name = `${v.first_name} ${v.last_name} ${v.last_name}`
                                $("#student-table tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>").text(v.student_id),
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
                                                $("<td>").text(v.section),
                                                $("<td>").text(v.year_level),
                                                $("<td>").append(
                                                    $("<span>")
                                                        .addClass(`badge badge-${v.face_descriptor != "" ? 'success' : 'danger'}`)
                                                        .text(v.face_descriptor != "" ? 'Done' : 'N/A')
                                                ),
                                                v.is_active == 1 ?
                                                $("<td>").append(
                                                    $("<button>")
                                                    .click(function(){
                                                        // student_id = v.student_id;
                                                        // $("#frm-student").find(":input[name=first_name]").val(v.first_name)
                                                        // $("#frm-student").find(":input[name=middle_name]").val(v.middle_name)
                                                        // $("#frm-student").find(":input[name=last_name]").val(v.last_name)
                                                        // $("#frm-student").find(":input[name=college_id]").val(v.college_id)
                                                        // $("#frm-student").find(":input[name=program_id]").val(v.program_id)
                                                        // $("#frm-student").find(":input[name=year_level_id]").val(v.year_level_id)
                                                        // $("#frm-student").find(":input[name=section_id]").val(v.section_id)
                                                        // $("#frm-student").find(":input[name=mobile]").val(v.mobile)
                                                        // $("#frm-student").find(":input[name=email]").val(v.email)
                                                        // $("#addStudentModal").modal("show")
                                                        localStorage.setItem("student_id",v.student_id);
                                                        window.open('student.php',"_self");
                                                    })
                                                    .addClass("btn btn-purple btn-sm ml-2")
                                                    .append(
                                                        $("<i>").addClass("fa fa-eye"),
                                                        " View"
                                                    ),
                                                    user_type != null && user_type.toLowerCase() == "admin" ?
                                                    $("<button>")
                                                        .click(function(){
                                                            
                                                            Swal.fire({
                                                                title: 'Are you sure?',
                                                                text: `Remove Student ${name}`,
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Yes, remove it!'
                                                            }).then((result) => {
                                                                if (result.value) {
                                                                   student.ajax.void({
                                                                    student_id:v.student_id
                                                                   })
                                                                }
                                                            })
                                                        })
                                                        .addClass("btn btn-orange btn-sm ml-2")
                                                        .append(
                                                            $("<i>").addClass("fa fa-trash"),
                                                            " Void"
                                                        ) : ""
                                                ): $("<td>").append(
                                                    $("<button>")
                                                    .click(function(){
                                                        // student_id = v.student_id;
                                                        // $("#frm-student").find(":input[name=first_name]").val(v.first_name)
                                                        // $("#frm-student").find(":input[name=middle_name]").val(v.middle_name)
                                                        // $("#frm-student").find(":input[name=last_name]").val(v.last_name)
                                                        // $("#frm-student").find(":input[name=college_id]").val(v.college_id)
                                                        // $("#frm-student").find(":input[name=program_id]").val(v.program_id)
                                                        // $("#frm-student").find(":input[name=year_level_id]").val(v.year_level_id)
                                                        // $("#frm-student").find(":input[name=section_id]").val(v.section_id)
                                                        // $("#frm-student").find(":input[name=mobile]").val(v.mobile)
                                                        // $("#frm-student").find(":input[name=email]").val(v.email)
                                                        // $("#addStudentModal").modal("show")
                                                        localStorage.setItem("student_id",v.student_id);
                                                        window.open('student.php',"_self");
                                                    })
                                                    .addClass("btn btn-purple btn-sm ml-2")
                                                    .append(
                                                        $("<i>").addClass("fa fa-eye"),
                                                        " View"
                                                    ),
                                                    user_type != null && user_type.toLowerCase() == "admin" ?
                                                    $("<button>")
                                                        .click(function(){
                                                            
                                                            Swal.fire({
                                                                title: 'Are you sure?',
                                                                text: `Activate Student ${name}`,
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Yes, activate it!'
                                                            }).then((result) => {
                                                                if (result.value) {
                                                                   student.ajax.activate({
                                                                    student_id:v.student_id
                                                                   })
                                                                }
                                                            })
                                                        })
                                                        .addClass("btn btn-success btn-sm ml-2")
                                                        .append(
                                                            $("<i>").addClass("fa fa-check"),
                                                            " Activate"
                                                        ) : ""
                                                ),
                                            )
                                    )
                                    if (Object.keys(response.data).length - 1 == k) {
                                        resolve(true);
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
                    table = $("#student-table").DataTable({
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
                    url:add_student_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        student.ajax.get()
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
                    url:update_student_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        student.ajax.get()
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
                    url:delete_student_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        student.ajax.get()
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
                    url:delete_student_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        student.ajax.get()
                        $(".modal").modal("hide")
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },
        activate:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:activate_student_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        student.ajax.get()
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
                                    selected:'selected',
                                    value:''
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
                        $("#section_id").empty();
                        if(Object.keys(response.data).length > 0){
                            $("#program_id").append(
                                $("<option>")
                                .css({
                                    display:'none'
                                })
                                .attr({
                                    selected:'selected',
                                    value:''
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
                                    student.ajax.get_section({
                                        program_id:response.data[0].program_id
                                    });
                                    $("#program_id").val(response.data[0].program_id)
                                }
                            })  
                        }else{
                            $("#section_id").append(
                                $("<option>")
                                .css({
                                    display:'none'
                                })
                                .text("No Section Found")
                            )
                            $("#program_id").append(
                                $("<option>")
                                .css({
                                    display:'none'
                                })
                                .text("No Program Found")
                            )
                        }
                    }else{
                        $("#section_id").append(
                            $("<option>")
                            .css({
                                display:'none'
                            })
                            .text("No Section Found")
                        )
                        $("#program_id").append(
                            $("<option>")
                            .css({
                                display:'none'
                            })
                            .text("No Program Found")
                        )
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
                                .attr({
                                    value:'',
                                    selected:'selected'
                                })
                                .text("All")
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
        get_section:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_section_api}`,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        $("#section_id").empty();
                        if(Object.keys(response.data).length > 0){
                            $("#section_id").append(
                                $("<option>")
                                .css({
                                    display:'none'
                                })
                                .attr({
                                    value:'',
                                    selected:'selected'
                                })
                                .text("All")
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

student.init();
$("#college_id").change(function(){
    student.ajax.get_program({
        college_id:$(this).val(),
    });
})
$("#program_id").change(function(){
    student.ajax.get_section({
        program_id:$(this).val(),
        year_level_id:$("#year_level_id").val()
    });
})
$("#year_level_id").change(function(){
    student.ajax.get_section({
        year_level_id:$(this).val(),
        program_id:$("#program_id").val()
    });
})
$("#search-student").click(function(){
    student.ajax.get({
        college_id:$("#college_id").val(),
        program_id:$("#program_id").val(),
        year_level_id:$("#year_level_id").val(),
        section_id:$("#section_id").val(),
    });
})
$('#activeBtn').click(function() {
    $('#activeBtn').addClass('active-btn').removeClass('btn-light');
    $('#inactiveBtn').addClass('btn-light').removeClass('inactive-btn');

    student.ajax.get({
        college_id:$("#college_id").val(),
        program_id:$("#program_id").val(),
        year_level_id:$("#year_level_id").val(),
        section_id:$("#section_id").val(),
        is_active:1
    });
});

$('#inactiveBtn').click(function() {
    $('#inactiveBtn').addClass('inactive-btn').removeClass('btn-light');
    $('#activeBtn').addClass('btn-light').removeClass('active-btn');
    student.ajax.get({
        college_id:$("#college_id").val(),
        program_id:$("#program_id").val(),
        year_level_id:$("#year_level_id").val(),
        section_id:$("#section_id").val(),
        is_active:0
    });
});
$("#frm-student").validate({
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

        

        if(student_id == null){
            // payload = jsAddon.display.objectToFormData(data)
            student.ajax.add(data);
        }else{
            // data.productid = productid;
            // payload = jsAddon.display.objectToFormData(data)
            data['student_id'] = student_id;
            student.ajax.update(data);
        }
    }
})

