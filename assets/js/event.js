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
selectedSection = [];
var event = {
    init:()=>{
        event_id = jsAddon.display.getQueryParam("event_id");
        event.ajax.get({
            'event_id':event_id
        });
    },
    ajax:{

        get: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_event_api}`,
                    dataType: 'json',
                    payload: payload
                }).then((response) => {
                    $("#eventsList").empty();
                    if (!response._isError) {
                        if (Object.keys(response.data).length > 0) {
                            var v = response.data[0];
        
                            const date = new Date(v.date);
                            const monthName = date.toLocaleString('default', { month: 'long' });
                            const day = date.getDate();
                            const year = date.getFullYear();
        
                            // Set the positioning based on the length of the day number
                            if (day < 10) {
                                $(".single-date").css("left", "45%");  // Center for single-digit
                            } else {
                                $(".single-date").css("left", "30%");  // Adjust position for multi-digit
                            }
        
                            $("#event-name").text(v.name);
                            $("#event-description").text(v.description);
                            $("#event-month").text(monthName);
                            $("#event-day").text(day);
                            $("#event-year").text(year);
                            $("#event-time").text(`${jsAddon.display.convertTo12HourFormat(v.start_time)} - ${jsAddon.display.convertTo12HourFormat(v.end_time)}`);
                            $("#event-image").attr({
                                src: v.event_image
                            });
        
                            // Loop through colleges and dynamically generate the HTML for the accordion
                            $.each(v.colleges, function(college_id, college_value) {
                                let college_key = college_id;
                                college_id = college_value.college_id;
                                var collegeId = `collapseCollege${college_id}`; // Unique ID for each college
                                var programIdPrefix = `accordionPrograms${college_id}`; // Prefix for program collapse IDs
                            
                                // Create the college accordion structure
                                $("#accordionColleges").append(
                                    $("<div>").addClass("card").append(
                                        $("<div>").addClass("card-header").attr("id", "headingColleges" + college_id).append(
                                            $("<h5>").addClass("mb-0").css("font-size", "14px").append(
                                                $("<button>")
                                                    .css({
                                                        'font-size':'12px'
                                                    })
                                                    .addClass("btn btn-ligh-grey font-weight-bolder d-flex justify-content-between w-100")
                                                    .attr({
                                                        "type": "button",
                                                        "data-toggle": "collapse",
                                                        "data-target": `#${collegeId}`,
                                                        "aria-expanded": "false",
                                                        "aria-controls": collegeId
                                                    })
                                                    .text(college_value.college) // College name
                                                    .append($("<i>").addClass("fa fa-chevron-right").attr("id", "icon-colleges"))
                                            )
                                        ).append(
                                            $("<div>").attr({
                                                "id": collegeId, // Unique ID for each college's collapse section
                                                "class": "collapse",
                                                "aria-labelledby": "headingColleges" + college_id,
                                                "data-parent": "#accordionColleges" // Parent accordion ID
                                            }).append(
                                                $("<div>").addClass("card-body").append(function(){
                                                   
                                                 
                                                    return $("<div>").addClass("accordion").attr("id",programIdPrefix).append(
                                                        $.each(v.programs, function(program_key, program_value) {
                                                            // Create the program card and append to the program accordion container
                                                            $(`#accordionPrograms${program_value.college_id}`).append(
                                                                $("<button>")
                                                                .css({
                                                                    'font-size':'12px'
                                                                })
                                                                .addClass(`btn btn-light-blue font-weight-bolder d-flex justify-content-between w-100 ${program_key > 0 ? 'mt-1' : ''}`)
                                                                .text(program_value.program) // Program name
                                                                .append($("<i>").addClass("fa fa-chevron-right").attr("id", "icon-program"))
                                                                .click(function(){
                                                                    var collegeName = college_value.college;
                                                                    var collegeShortName = college_value.short_name;
                                                                    // alert(collegeName)
                                                                    $("#year-levels-and-sections").removeClass("hidden");
                                                                    $("#colleges-and-programs").addClass("hidden");
                                                                    $("#year-levels-and-sections-title").text(`${collegeName} (${collegeShortName}) > ${program_value.program_short_name}`)
                                                                })
                                                            );
                                                            
                                                        })
                                                    )
                                                })
                                            )
                                        )
                                    )
                                );
                            
                            });
                            
                            
        
                            // Wait until all colleges are appended before resolving the promise
                          
                        }
                    }
                });
            }).then(data => {
                if (data) {
                    // Use jQuery to initialize Bootstrap collapse for dynamic elements
                  
                }
            });
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
                            event.ajax.load_college_data(collegeData,selectedCollege);
                        }
                    }
                })
            })
            .then(data=>{
                
            })
        },
        load_college_data:(response,selectedDatas) => {
            // Target the last select element with name="colleges"
            const lastCollegeSelect = $(':input[name="colleges"]').last();
            
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
                        $(':input[name="colleges"]').select2({
                            multiple:true,
                            placeholder: 'Select Colleges',
                            allowClear: true,
                            width: '100%' 
                        })
                        $(':input[name="colleges"]').val("").trigger("change")
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
        get_program:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_program_api}`,
                    dataType:'json',
                    payload:payload
                }).then((response)=>{
                    if(!response._isError){
                        event.ajax.load_program_data(response.data,selectedProgram);
                    }
                })
            })
            .then(data=>{
                
            })
        },
        load_program_data:(response,selectedDatas) => {
            // Target the last select element with name="colleges"
            const lastSelect = $(':input[name="programs"]').last();
            
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
                        $(':input[name="programs"]').select2({
                            multiple:true,
                            placeholder: 'Select Programs',
                            allowClear: true,
                            width: '100%' 
                        })
                        
                        $(':input[name="programs"]').val(selectedProgram).trigger('change');
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
                            $.each(response.data,function(k,v){
                                $(":input[name=yearLevels]").append(
                                    $("<option>")
                                    .text(v.year_level)
                                    .attr({
                                        value:v.year_level_id,
                                        title:v.year_level
                                    })
                                );
                                
                                
                                if (Object.keys(response.data).length - 1 == k) {
                                    $(':input[name="yearLevels"]').select2({
                                        multiple:true,
                                        placeholder: 'Select Year Levels',
                                        allowClear: true,
                                        width: '100%' 
                                    })
                                }

                            })  
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
                        $(":input[name=sections]").empty();
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                $(":input[name=sections]").append(
                                    $("<option>")
                                    .text(v.section)
                                    .attr({
                                        value:v.section_id,
                                        title:v.section
                                    })
                                )

                                if (Object.keys(response.data).length - 1 == k) {
                                    $(':input[name="sections"]').select2({
                                        multiple:true,
                                        placeholder: 'Select Sections',
                                        allowClear: true,
                                        width: '100%' 
                                    })
                                }
                            })  
                        }
                    }
                })
            })
            .then(data=>{
                
            })
        },
    }
}

$(document).ready(function(){
    event.init();
})
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
$(':input[name="colleges"]').change(function() {
    var allCollegeValues = $('select[name="colleges"]').map(function() {
        return $(this).val();  // Get the value of each select input
    }).get().join(',');  // Join all values into a comma-separated string
    selectedCollege = $('select[name="colleges"]').map(function() {
        return $(this).val();  // Get the value of each select input
    }).get()
    event.ajax.get_program({
        college_ids:allCollegeValues,
    })
});
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

// Function to add a new row for College, Program, Year Level, and Section
function addRow() {
    const fieldsContainer = document.getElementById('fieldsContainer');
    const newRow = document.createElement('div');
    newRow.classList.add('form-row');
    newRow.innerHTML = `
            <div class="col-md-3">
                <div class="form-group">
                    <label for="college">College</label>
                    <select class="form-control" name="colleges" required>
                      
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="program">Program</label>
                    <select class="form-control" name="programs" required>
                       
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="yearLevel">Year Level</label>
                    <select class="form-control" name="yearLevel[]" required>
                       
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="section">Section</label>
                    <select class="form-control" name="section[]" required>
                        
                    </select>
                </div>
            </div>
    `;
    fieldsContainer.appendChild(newRow);
    event.ajax.load_college_data(collegeData,selectedCollege);
    rowCount++;
    document.getElementById('removeRowBtn').disabled = false;
}

// Function to remove the last row of College, Program, Year Level, and Section
function removeRow() {
    const fieldsContainer = document.getElementById('fieldsContainer');
    const rows = fieldsContainer.querySelectorAll('.form-row');
    if (rows.length > 1) {
        fieldsContainer.removeChild(rows[rows.length - 1]);
    }

    rowCount--;
    if (rowCount === 1) {
        document.getElementById('removeRowBtn').disabled = true;
    }
}

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

        // Append other form data
        formData.append('event_name', $(form).find(':input[name=event_name]').val());
        formData.append('event_description', $(form).find(':input[name=event_description]').val());
        formData.append('event_date', $(form).find(':input[name=event_date]').val());
        formData.append('college_ids', selectedCollege.join(','));
        formData.append('program_ids', selectedProgram.join(','));
        formData.append('year_level_ids', selectedYearLevel.join(','));
        formData.append('section_ids', selectedSection.join(','));
        formData.append('start_time', $(form).find(':input[name=event_start_time]').val());
        formData.append('end_time', $(form).find(':input[name=event_end_time]').val());
        
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
