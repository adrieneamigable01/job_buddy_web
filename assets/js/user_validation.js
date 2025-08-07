var user_id = null;
var table = null;
var user = {
    init:()=>{
        user.ajax.get();
    },
    ajax:{

        get:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_user_document}`,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if ($.fn.DataTable.isDataTable("#validation-table")) {
                        table.clear();
                        table.destroy();
                        $("#validation-table tbody").empty();
                    }
                    if(!response._isError){
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                let name = `${v.first_name} ${v.last_name} ${v.last_name}`
                                $("#validation-table tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>").text(v.document_id),
                                                $("<td>").text(v.fullname),
                                                $("<td>").append(
                                                    $("<span>")
                                                        .addClass("btn btn-link")
                                                        .text("View File")
                                                        .click(function(e){
                                                            e.preventDefault();

                                                            var base64String = v.document_path; // Your Base64 string (data:@file/... format)
                                                            
                                                            // Extract MIME type from "data:@file/...;base64,"
                                                            var mimeTypeMatch = base64String.match(/^data:@file\/([^;]+);base64,/);
                                                            if (!mimeTypeMatch) {
                                                                console.error("Invalid Base64 format");
                                                                return;
                                                            }

                                                            var mimeType = mimeTypeMatch[1]; // Extracted MIME type (e.g., "jpeg", "png", "pdf")
                                                            

                                                            // Open in a new tab if viewable (PDF, Image), otherwise download
                                                            if (["jpeg", "png"].includes(mimeType)) {
                                                                base64String = base64String.replace(/^data:@file\/[^;]+;base64,/, ""); // Remove metadata

                                                                // Convert Base64 to Blob
                                                                var byteCharacters = atob(base64String);
                                                                var byteNumbers = new Array(byteCharacters.length);
                                                                for (var i = 0; i < byteCharacters.length; i++) {
                                                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                                                }
                                                                var byteArray = new Uint8Array(byteNumbers);
                                                                var blob = new Blob([byteArray], { type: "image/" + mimeType }); // Construct correct MIME type
                                                                var blobUrl = URL.createObjectURL(blob);
                                                                window.open(blobUrl, "_blank");
                                                            }else if (["pdf"].includes(mimeType)) {
                                                                var base64String = v.document_path; // Your Base64 string

                                                                // Extract actual Base64 content by removing "data:@file/pdf;base64,"
                                                                var base64Data = base64String.replace(/^data:@file\/pdf;base64,/, "");

                                                                // Decode Base64
                                                                var byteCharacters = atob(base64Data);
                                                                var byteNumbers = new Array(byteCharacters.length);

                                                                for (var i = 0; i < byteCharacters.length; i++) {
                                                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                                                }

                                                                var byteArray = new Uint8Array(byteNumbers);
                                                                var blob = new Blob([byteArray], { type: "application/pdf" }); // Create PDF Blob
                                                                var blobUrl = URL.createObjectURL(blob);

                                                                window.open(blobUrl, "_blank"); // Open PDF in a new tab

                                                            } else {
                                                                var a = document.createElement("a");
                                                                a.href = blobUrl;
                                                                a.download = "file" + jsAddon.display.getFileExtension(mimeType);
                                                                document.body.appendChild(a);
                                                                a.click();
                                                                document.body.removeChild(a);
                                                            }
                                                        })
                                                ),
                                                $("<td>").append(
                                                    $("<span>")
                                                        .addClass("btn btn-link")
                                                        .text("View Selfie")
                                                        .click(function(e){
                                                            e.preventDefault();

                                                            var base64String = v.base64Selfie; // Your Base64 string (data:@file/... format)
                                                    
                                                            // Extract MIME type from "data:@file/...;base64,"
                                                            var mimeTypeMatch = base64String.match(/^data:@file\/([^;]+);base64,/);
                                                            if (!mimeTypeMatch) {
                                                                console.error("Invalid Base64 format");
                                                                return;
                                                            }

                                                            var mimeType = mimeTypeMatch[1]; // Extracted MIME type (e.g., "jpeg", "png", "pdf")
                                                            

                                                            // Open in a new tab if viewable (PDF, Image), otherwise download
                                                            if (["jpeg", "png"].includes(mimeType)) {
                                                                base64String = base64String.replace(/^data:@file\/[^;]+;base64,/, ""); // Remove metadata

                                                                // Convert Base64 to Blob
                                                                var byteCharacters = atob(base64String);
                                                                var byteNumbers = new Array(byteCharacters.length);
                                                                for (var i = 0; i < byteCharacters.length; i++) {
                                                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                                                }
                                                                var byteArray = new Uint8Array(byteNumbers);
                                                                var blob = new Blob([byteArray], { type: "image/" + mimeType }); // Construct correct MIME type
                                                                var blobUrl = URL.createObjectURL(blob);
                                                                window.open(blobUrl, "_blank");
                                                            }else if (["pdf"].includes(mimeType)) {
                                                                var base64String = v.document_path; // Your Base64 string

                                                                // Extract actual Base64 content by removing "data:@file/pdf;base64,"
                                                                var base64Data = base64String.replace(/^data:@file\/pdf;base64,/, "");

                                                                // Decode Base64
                                                                var byteCharacters = atob(base64Data);
                                                                var byteNumbers = new Array(byteCharacters.length);

                                                                for (var i = 0; i < byteCharacters.length; i++) {
                                                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                                                }

                                                                var byteArray = new Uint8Array(byteNumbers);
                                                                var blob = new Blob([byteArray], { type: "application/pdf" }); // Create PDF Blob
                                                                var blobUrl = URL.createObjectURL(blob);

                                                                window.open(blobUrl, "_blank"); // Open PDF in a new tab

                                                            } else {
                                                                var a = document.createElement("a");
                                                                a.href = blobUrl;
                                                                a.download = "file" + jsAddon.display.getFileExtension(mimeType);
                                                                document.body.appendChild(a);
                                                                a.click();
                                                                document.body.removeChild(a);
                                                            }
                                                        })
                                                ),
                                                $("<td>").text(v.uploaded_at),
                                                v.status == "Pending" ?
                                                $("<td>").append(
                                                    $("<button>")
                                                        .addClass("btn btn-success btn-sm") // Green button for Approve
                                                        .text("Approve")
                                                        .on("click", function () {
                                                            Swal.fire({
                                                                title: 'Confimation',
                                                                text: `Are you sure to approve this user?.`,
                                                                icon: 'info',
                                                            }).then(() => {
                                                                let payload = {
                                                                    'document_id':v.document_id
                                                                }
                                                                user.ajax.approveUser(payload);
                                                            });
                                                        }),
                                                    $("<button>")
                                                        .addClass("btn btn-danger btn-sm ml-2") // Red button for Disapprove
                                                        .text("Disapprove")
                                                        .on("click", function () {
                                                            alert("Disapproved!"); // Replace with your disapprove logic
                                                        })
                                                    
                                                ) : $("<td>").text(v.status)
                                                
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
                    table = $("#validation-table").DataTable({
                        "autoWidth":false, 
                    });
                    jsAddon.display.removefullPageLoader()
                }
            })
        },


        approveUser:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:approve_user_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        user.ajax.get()
                        $(".modal").modal("hide")
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },
        add:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:add_user_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        user.ajax.get()
                        $(".modal").modal("hide")
                    }
                    jsAddon.display.swalMessage(!response._isError,response.reason);
                })
                 
            })
        },

        update:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:update_user_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        user.ajax.get()
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
                    url:delete_user_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        user.ajax.get()
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
                    url:delete_user_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        user.ajax.get()
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
                    url:activate_user_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        user.ajax.get()
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
                                    user.ajax.get_section({
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

user.init();
$("#college_id").change(function(){
    user.ajax.get_program({
        college_id:$(this).val(),
    });
})
$("#program_id").change(function(){
    user.ajax.get_section({
        program_id:$(this).val(),
        year_level_id:$("#year_level_id").val()
    });
})
$("#year_level_id").change(function(){
    user.ajax.get_section({
        year_level_id:$(this).val(),
        program_id:$("#program_id").val()
    });
})
$("#search-user").click(function(){
    user.ajax.get({
        college_id:$("#college_id").val(),
        program_id:$("#program_id").val(),
        year_level_id:$("#year_level_id").val(),
        section_id:$("#section_id").val(),
    });
})
$('#activeBtn').click(function() {
    $('#activeBtn').addClass('active-btn').removeClass('btn-light');
    $('#inactiveBtn').addClass('btn-light').removeClass('inactive-btn');

    user.ajax.get({
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
    user.ajax.get({
        college_id:$("#college_id").val(),
        program_id:$("#program_id").val(),
        year_level_id:$("#year_level_id").val(),
        section_id:$("#section_id").val(),
        is_active:0
    });
});
$("#frm-user").validate({
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

        

        if(user_id == null){
            // payload = jsAddon.display.objectToFormData(data)
            user.ajax.add(data);
        }else{
            // data.productid = productid;
            // payload = jsAddon.display.objectToFormData(data)
            data['user_id'] = user_id;
            user.ajax.update(data);
        }
    }
})

