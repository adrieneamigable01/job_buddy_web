// const { ajax } = require("jquery");

var event_id = null;
event_image = null,
table = null,
collegeData = null,
programData = null,
yearLevelData = null;
sectionData = null;
selectedCollege = [],
selectedProgram = [],
selectedYearLevel = [],
selectedSection = [],
student_id = null,
teacher_id = null,
section_id = null,
program_id = null,
eventCollegesrow = 0;
var event = {
    init:()=>{
        
        var session =   jsAddon.display.getSessionData('session');
        student_id =   localStorage.getItem('student_id');
        section_id =   localStorage.getItem('section_id');
        teacher_id =   localStorage.getItem('teacher_id');
        program_id =   localStorage.getItem('program_id');
        user_type = JSON.stringify(session);
        
        if(student_id != null){
            event.ajax.get({
                'type':'upcomming',
                student_id:student_id,
                section_id:section_id
            });
        }
        else if(teacher_id != null){
            event.ajax.get({
                'type':'upcomming',
                teacher_id:teacher_id,
                program_id:program_id
            });
        }else{
            event.ajax.get({
                'type':'upcomming',
            });
        }
   
        event.ajax.get_college();
        event.ajax.get_yearlevel();
    },
    ajax:{

        get:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_event_api}`,
                    dataType:'json',
                    payload:payload
                }).then((response)=>{
                    $("#eventsList").empty();
                    if(!response._isError){
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                let image = v.event_image == '' ? "../assets/logo/an-color.png" : v.event_image;
                                $("#eventsList").append(
                                    $("<div>").addClass("col-md-3 mb-4 event-card").append(
                                        $("<div>").addClass("card").append(
                                            // Event Image
                                            $("<img>").attr("src", image).addClass("card-img-top").attr("alt", "Event Image")
                                        ).append(
                                            $("<div>").addClass("card-body")
                                                .append(
                                                    $("<p>").addClass("card-text").text(`${v.name} : ${v.description}`)
                                                ).append(
                                                    $("<div>").html('<i class="fa fa-calendar-alt mt-3"></i> ' + v.date)
                                                ).append(
                                                    $("<div>").html('<i class="fa fa-clock"></i> ' + v.start_time + " - " + v.end_time)
                                                )
                                        ).append(
                                            // Close Button
                                            $("<button>").addClass("close")
                                                .attr({
                                                    "type":"button",
                                                    title:`Delete event ${v.name}`
                                                })
                                                .html("&times;") // This is the close icon (×)
                                                .css({
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "10px",
                                                    background: "transparent",
                                                    border: "none",
                                                    fontSize: "20px",
                                                    color: "#000",
                                                    cursor: "pointer"
                                                })
                                                .click(function (e) {
                                                    e.stopPropagation()
                                                    event.ajax.void({
                                                        event_id:v.event_id
                                                    })
                                                  
                                                })
                                        )
                                    ).css({
                                        cursor: 'pointer',
                                        position: 'relative' // Ensure the close button stays in the top-right corner
                                    })
                                    .click(function () {
                                        window.open(`event.php?event_id=${v.event_id}`, "_self");
                                    })
                                );
                                

                                
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
                  
                  
                    
                }
            })
        },

        add:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxFilesRequest({
                    type:'post',
                    url:add_event_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        event.ajax.get()
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
                    url:update_event_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        event.ajax.get()
                        $(".modal").modal("hide")
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },
        void:(payload)=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    // Proceed with delete action (e.g., AJAX request or form submission)
                    return new Promise((resolve,reject)=>{
                        jsAddon.display.ajaxRequest({
                            type:'post',
                            url:delete_event_api,
                            dataType:'json',
                            payload:payload,
                        }).then((response)=>{
                            if(!response._isError){
                                event.ajax.get()
                                $(".modal").modal("hide")
                            }
                            jsAddon.display.swalMessage(response._isError,response.reason);
                        })
                         
                    })
                    // Here you would execute your delete code, such as an AJAX request or form submission
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // If cancel is clicked, no action
                    Swal.fire(
                        'Cancelled',
                        'Your event is safe :)',
                        'error'
                    );
                }
            });
            
        },
        get_college:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_college_api}`,
                    dataType:'json',
                }).then((response)=>{
                    if(!response._isError){
                        if(Object.keys(response.data).length > 0){
                            collegeData = response.data;
                            event.ajax.load_college_data(collegeData,selectedCollege,'#colleges-0');
                        }
                    }
                })
            })
            .then(data=>{
                
            })
        },
        load_college_data:(response,selectedDatas,target = null) => {
            // Target the last select element with name="colleges"
            let lastCollegeSelect = $(`${target}`);
            lastCollegeSelect.empty();  // Clear the existing options

            if (Object.keys(response).length > 0) {

                $.each(response, function (k, v) {
                    if (!selectedDatas.includes(v.college_id)) {
                      
                        lastCollegeSelect.append(
                            $("<option>")
                            .text(v.short_name)
                            .attr({
                                value: v.college_id,
                                title: v.college
                            })
                        );
                    }
                    if (Object.keys(response).length - 1 == k) {
                        lastCollegeSelect.select2({
                            placeholder: 'Select Colleges',
                            allowClear: true,
                            width: '100%' 
                        })
                        lastCollegeSelect.val("").trigger("change")
                    }

                });
            } else {
                lastCollegeSelect.append(
                    $("<option>").css({
                        display: 'none'
                    }).text("No College Found")
                );
            }
        },
        get_program:(payload,target = null)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_program_api}`,
                    dataType:'json',
                    payload:payload
                }).then((response)=>{
                    if(!response._isError){
                        event.ajax.load_program_data(response.data,selectedProgram,target);
                    }
                })
            })
            .then(data=>{
                
            })
        },
        load_program_data:(response,selectedDatas,target) => {
            // Target the last select element with name="colleges"
            const lastSelect = $(target);
            
            lastSelect.empty();  // Clear the existing options

            if (Object.keys(response).length > 0) {
                lastSelect.append(
                    $("<option>").css({
                        display: 'none',
                    }).text("Select a Program")
                );

                $.each(response, function (k, v) {
                    if (!selectedDatas.includes(v.program_id)) {
                        lastSelect.append(
                            $("<option>")
                            .text(v.program_short_name)
                            .attr({
                                value: v.program_id,
                                title: v.program_short_name
                            })
                        );
                        
                    }

                    if (Object.keys(response).length - 1 == k) {
                        lastSelect.select2({
                            multiple:true,
                            placeholder: 'Select Programs',
                            allowClear: true,
                            width: '100%' 
                        })
                        
                        lastSelect.val("    ").trigger('change');
                    }
                });
            } else {
                lastSelect.append(
                    $("<option>").css({
                        display: 'none'
                    }).text("No Program Found")
                );
            }
        },
        get_yearlevel:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_yearlevel_api}`,
                    dataType:'json',
                }).then((response)=>{
                    if(!response._isError){
                        $(":input[name=yearLevels]").empty();
                        if(Object.keys(response.data).length > 0){
                            yearLevelData = response.data;
                            event.ajax.load_year_level_data(response.data,selectedYearLevel,'#year-level-0');
                        }
                    }
                })
            })
            .then(data=>{
                
            })
        },
        load_year_level_data:(response,selectedDatas,target) => {
            // Target the last select element with name="colleges"
            const lastSelect = $(target);
            
            lastSelect.empty();  // Clear the existing options

            if (Object.keys(response).length > 0) {
                lastSelect.append(
                    $("<option>").css({
                        display: 'none',
                    }).text("Select a Year Level")
                );

                $.each(response, function (k, v) {
                    if (!selectedDatas.includes(v.yaer_level_id)) {
                        lastSelect.append(
                            $("<option>")
                            .text(v.year_level)
                            .attr({
                                value: v.year_level_id,
                                title: v.year_level
                            })
                        );
                        
                    }

                    if (Object.keys(response).length - 1 == k) {
                        lastSelect.select2({
                            multiple:true,
                            placeholder: 'Select Year Level',
                            allowClear: true,
                            width: '100%' 
                        })
                        
                        lastSelect.val("").trigger('change');
                    }
                });
            } else {
                lastSelect.append(
                    $("<option>").css({
                        display: 'none'
                    }).text("No Year Level Found")
                );
            }
        },
        get_section:(payload,target = null)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_section_api}`,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        if(Object.keys(response.data).length > 0){
                            event.ajax.load_section_data(response.data,target)
                        }
                    }
                })
            })
            .then(data=>{
                
            })
        },
        load_section_data:(response,target) => {
         
            // Target the last select element with name="colleges"
            const lastSelect = $(target);
            var selected = $(target).val();
            lastSelect.empty();  // Clear the existing options

            if (Object.keys(response).length > 0) {
             

                $.each(response, function (k, v) {
                    lastSelect.append(
                        $("<option>")
                        .text(v.section)
                        .attr({
                            value: v.section_id,
                            title: v.section
                        })
                    );

                    if (Object.keys(response).length - 1 == k) {
                        lastSelect.select2({
                            multiple:true,
                            placeholder: 'Select a Section',
                            allowClear: true,
                            width: '100%' 
                        })
                        lastSelect.val(selected).trigger('change');
                    }
                });
            } else {
                lastSelect.append(
                    $("<option>").css({
                        display: 'none'
                    }).text("No Section Found")
                );
            }
        },
    }
}

event.init();
$('#upcomingEventsBtn').on('click', function() {
    // Set the clicked button to purple and the other to secondary
    $(this).removeClass('btn-secondary').addClass('btn-purple');
    $('#endedEventsBtn').removeClass('btn-purple').addClass('btn-secondary');
    event.ajax.get({
        'type':'upcomming'
    });
});

// Event listener for the Ended Events button
$('#endedEventsBtn').on('click', function() {
    // Set the clicked button to purple and the other to secondary
    $(this).removeClass('btn-secondary').addClass('btn-purple');
    $('#upcomingEventsBtn').removeClass('btn-purple').addClass('btn-secondary');
    event.ajax.get({
        'type':'ended'
    });
});
// $(':input[name="colleges"]').change(function() {
//     var allCollegeValues = $('select[name="colleges"]').map(function() {
//         return $(this).val();  // Get the value of each select input
//     }).get().join(',');  // Join all values into a comma-separated string
//     selectedCollege = $('select[name="colleges"]').map(function() {
//         return $(this).val();  // Get the value of each select input
//     }).get()
//     event.ajax.get_program({
//         college_ids:allCollegeValues,
//     })
// });




$(':input[name="programs"]').change(function() {
    var selectedValues =  $(':input[name="programs"]').val();

    // Convert each selected value to an integer
    selectedProgram = selectedValues.map(function(value) {
      return parseInt(value, 10); // Convert the value to an integer
    });

});

$(':input[name="yearLevels"]').change(function() {
    var selectedValues =  $(':input[name="yearLevels"]').val();

    // Convert each selected value to an integer
    selectedYearLevel = selectedValues.map(function(value) {
      return parseInt(value, 10); // Convert the value to an integer
    });

});

$(':input[name="sections"]').change(function() {
    var selectedValues =  $(':input[name="sections"]').val();

    // Convert each selected value to an integer
    selectedSection = selectedValues.map(function(value) {
      return parseInt(value, 10); // Convert the value to an integer
    });

});

let rowCount = 1; // To track the number of rows



$("#frm-event").validate({
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
        event_name:{
            required:true,
        },
        event_venue:{
            required:true,
        },
        event_description:{
            required:true,
        },
        event_date:{
            required:true,
        },
        event_start_time:{
            required:true,
        },
        event_end_time:{
            required:true,
        },
        colleges:{
            required:true,
        },
        programs:{
            required:true,
        },
        yearLevels:{
            required:true,
        },
        sections:{
            required:true,
        },
        mobile:{
            required:true,
        },
        email:{
            required:true,
        },
    },
    messages:{
     
    },
    submitHandler: function(form) {


        var formData = new FormData();

        let event_participants = {};

        $('.even-item-row').each(function(){
            let college_value = $(this).find(".colleges-dropdown").val();
            let program_value = $(this).find(".program-dropdown").val();
            let year_level_value = $(this).find(".yearlevel-dropdown").val();
            let section_value = $(this).find(".section-dropdown").val();
            event_participants[college_value] = {
                college_id:college_value,
                program_value:program_value,
                year_level_value:year_level_value,
                section_value:section_value
            }
        });


        // return false;

        // Append other form data
        formData.append('event_name', $(form).find(':input[name=event_name]').val());
        formData.append('event_description', $(form).find(':input[name=event_description]').val());
        formData.append('event_date', $(form).find(':input[name=event_date]').val());
        formData.append('event_venue', $(form).find(':input[name=event_venue]').val());
        // formData.append('college_ids', selectedCollege.join(','));
        // formData.append('program_ids', selectedProgram.join(','));
        // formData.append('year_level_ids', selectedYearLevel.join(','));
        // formData.append('section_ids', selectedSection.join(','));
        formData.append('start_time', $(form).find(':input[name=event_start_time]').val());
        formData.append('end_time', $(form).find(':input[name=event_end_time]').val());
        formData.append('event_participants', JSON.stringify(event_participants));
        
        // Loop through all selected files and append them to FormData
        var documents = $(form).find(':input[name="documents[]"]')[0].files;
        for (var i = 0; i < documents.length; i++) {
            formData.append('documents[]', documents[i]);
        }
        
        // Append event image (if any)
        formData.append('event_image', event_image);

        
        if(event_id == null){
            event.ajax.add(formData);
        }else{
            // data.productid = productid;
            // payload = jsAddon.display.objectToFormData(data)
            data['event_id'] = event_id;
            event.ajax.update(data);
        }
    }
})

$(document).ready(function() {

    $('#fieldsContainer').on('change', '.colleges-dropdown', function(e) {
        let dataid = $(this).data('id');  // Get the data-id from the select element
        let value = $(this).val();        // Get the selected value
    
        // Call the AJAX method with the selected value
        event.ajax.get_program({
            college_id:value,
        },`#program-${dataid}`);
    });
  
     
    $('#fieldsContainer').on('change', '.program-dropdown', function(e) {
        let dataid = $(this).data('id');  // Get the data-id from the select element
        let program_value = $(this).val();        // Get the selected value
        let year_level_value = $(`#year-level-${dataid}`).val();
        if(year_level_value != ""){
            event.ajax.get_section({
                year_level_ids:year_level_value.join(","),
                program_ids:program_value.join(",")
            },`#section-${dataid}`);
        }
     
    });
    $('#fieldsContainer').on('change', '.yearlevel-dropdown', function(e) {
        let dataid = $(this).data('id');  // Get the data-id from the select element
        let year_level_value = $(this).val();        // Get the selected value
        let program_value = $(`#program-${dataid}`).val();
        if(year_level_value != ""){
            event.ajax.get_section({
                year_level_ids:year_level_value.join(","),
                program_ids:program_value.join(",")
            },`#section-${dataid}`);
        }
     
    });
  
    $('#addRowBtn').click(function() {
        // Create a new div for the row
        eventCollegesrow = eventCollegesrow + 1;
        var newRow = $("<div>").addClass("form-row row-item even-item-row");

        // Create College dropdown
        var collegeDiv = $("<div>").addClass("col-md-3").append(
            $("<div>").addClass("form-group").append(
                $("<label>").attr("for", "college").text("College"),
                $("<select>").addClass("form-control colleges-dropdown").attr({
                    "name":"colleges",
                    "id":`colleges-${eventCollegesrow}`,
                    "data-id":`${eventCollegesrow}`,
                    "required":"required"
                })
            )
        );

        // Create Program dropdown
        var programDiv = $("<div>").addClass("col-md-3").append(
            $("<div>").addClass("form-group").append(
                $("<label>").attr("for", "program").text("Program"),
                $("<select>").addClass("form-control program-dropdown")
                .attr({
                    "name":"programs",
                    "id":`program-${eventCollegesrow}`,
                    "required":"required"

                })
                .append(
                    $("<option>").attr("value", "").text("Select Program"),
                    $("<option>").attr("value", "Program 1").text("Program 1"),
                    $("<option>").attr("value", "Program 2").text("Program 2"),
                    $("<option>").attr("value", "Program 3").text("Program 3")
                )
            )
        );

        // Create Year Level dropdown
        var yearLevelDiv = $("<div>").addClass("col-md-3").append(
            $("<div>").addClass("form-group").append(
                $("<label>").attr("for", "yearLevel").text("Year Level"),
                $("<select>").addClass("form-control yearlevel-dropdown")
                .attr({
                    "name":"yearLevels",
                    "required":"required",
                    "data-id":eventCollegesrow,
                    "id":`year-level-${eventCollegesrow}`
                })
            )
        );

        // Create Section dropdown
        var sectionDiv = $("<div>").addClass("col-md-3").append(
            $("<div>").addClass("form-group").append(
                $("<label>").attr("for", "section").text("Section"),
                $("<select>").addClass("form-control section-dropdown").attr({
                    "name": "sections",
                    "required": "required",
                    "data-id":eventCollegesrow,
                    "id":`section-${eventCollegesrow}`
                })
            )
        );

        // Create Remove button
        var removeBtnDiv = $("<div>").addClass("col-md-12").append(
            $("<button>").attr("type", "button").addClass("btn btn-danger remove-row").text("Remove Row")
        );

        // Append all parts to the new row
        newRow.append(collegeDiv, programDiv, yearLevelDiv, sectionDiv, removeBtnDiv);

        // Append the new row to the fields container
        $('#fieldsContainer').append(newRow);

        event.ajax.load_college_data(collegeData,selectedCollege,`#colleges-${eventCollegesrow}`);
        event.ajax.load_year_level_data(yearLevelData,selectedYearLevel,`#year-level-${eventCollegesrow}`);
    });

    // Event listener to remove a row
    $(document).on('click', '.remove-row', function() {
        $(this).closest('.form-row').remove();
    });
    // When the "Choose Image" button is clicked, trigger the file input click
    $('#chooseImageButton').click(function() {
        $('#eventImage').click();  // Simulate file input click
    });

    // When a file is selected in the file input
    $('#eventImage').change(function() {
        var file = this.files[0];  // Get the selected file
        if (file && file.type.startsWith('image/')) {  // Ensure the file is an image
            // Show the file name next to the button
            $('#imageFileName').text(file.name);

            // Create a FileReader to preview the image
            var reader = new FileReader();
            reader.onload = function(e) {
                // Set the preview image source
                $('#imagePreview').attr('src', e.target.result);
                event_image = e.target.result;
                // Show the image preview container
                $('#imagePreviewContainer').show();
            };
            reader.readAsDataURL(file);  // Read the image file as a data URL
        } else {
            // If the file is not an image, hide the preview
            $('#imagePreviewContainer').hide();
        }
    });
    

    // When the "Choose Document" button is clicked, trigger the file input click
    var selectedDocuments = [];

    // When the "Choose Documents" button is clicked, trigger the file input click
    $('#chooseDocumentsButton').click(function() {
        $('#eventDocuments').click();  // Simulate file input click
    });

    // When files are selected in the file input
    $('#eventDocuments').change(function() {
        selectedDocuments = [];  // Clear the array before adding new files

        var files = this.files;  // Get the selected files
        if (files.length > 0) {
            // Loop through all the selected files and store them in the array
            $.each(files, function(index, file) {
                selectedDocuments.push(file);

                // Add the file name to the document list
                var listItem = $('<li>').text(file.name);
                $('#documentList').append(listItem);
            });

            // Show the document list container and file names
            $('#documentFileNames').text(files.length + " files selected");
            $('#documentListContainer').show();
        } else {
            $('#documentListContainer').hide();
            $('#documentFileNames').text('No files chosen');
        }
    });

    // When the "Upload Documents" button is clicked, prepare the files for upload
    $('#uploadDocumentsButton').click(function() {
        if (selectedDocuments.length > 0) {
            // Create a FormData object to hold the files
            var formData = new FormData();
            
            // Append each selected document to FormData
            $.each(selectedDocuments, function(index, file) {
                formData.append('documents[]', file);  // Use 'documents[]' to send an array of files
            });

            // Send the files to the server via an AJAX POST request
            $.ajax({
                url: '/upload-documents',  // Change to your server's upload endpoint
                type: 'POST',
                data: formData,
                processData: false,  // Prevent jQuery from processing the data
                contentType: false,  // Prevent jQuery from setting the content type
                success: function(response) {
                    // Handle the response from the server (e.g., display a success message)
                    alert('Documents uploaded successfully!');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // Handle any errors that occur during the upload
                    alert('Error uploading documents: ' + textStatus);
                }
            });
        } else {
            alert('Please select at least one document to upload.');
        }
    });
});
