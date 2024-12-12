var event_id = null;
event_image = null,
table = null,
collegeData = null,
programData = null,
yearLevelData = null,
sectionData = null,
student_table = null,
teacher_table = null,
selectedCollege = [],
selectedProgram = [],
selectedYearLevel = [],
selectedSection = [],
selectedEventDetails = {};
var event = {
    init:()=>{
        event_id = jsAddon.display.getQueryParam("event_id");
        event.ajax.get({
            'event_id':event_id
        });

        student_id =   localStorage.getItem('student_id');
        section_id =   localStorage.getItem('section_id');
        teacher_id =   localStorage.getItem('teacher_id');
        program_id =   localStorage.getItem('program_id');

        if(student_id == null){
            $("#btn-start-attendance").removeClass("hidden")
            $("#attendace-container").removeClass("hidden")
        }
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

                            const dateString = v.date;
                            const timeString = v.end_time;
                            const combinedDateTimeString = `${dateString}T${timeString}`; 
                           
                            const givenDateTime = new Date(combinedDateTimeString);
                            const currentDateTime = new Date();
                        //    alert(givenDateTime > currentDateTime)
                        //     if (givenDateTime < currentDateTime) {
                        //         $("#btn-start-attendance").addClass("hidden")
                        //     }else if (givenDateTime > currentDateTime) {
                        //         $("#btn-start-attendance").addClass("hidden")
                        //     } else {
                        //         $("#btn-start-attendance").removeClass("hidden")
                        //     }
                            if (v.is_ended == 1) {
                                $("#btn-start-attendance").addClass("hidden")
                            }
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

                            const $fileNamesList = $('#fileNamesList'); // Get the fileNamesList element using jQuery
                        
                            if (response.files.length <= 0) {
                                // If there are no files, display the error message
                                $fileNamesList.html('<li>No Files Uploaded</li>');
                            } else {
                                // Loop through the files and create a list item for each
                                $.each(response.files, function(index, file) {
                                    const $li = $('<li></li>');
        
                                    // Create a downloadable link for each file
                                    const fileLink = $('<a></a>')
                                        .attr('href', `${file_link_api}/${v.event_id}/${file}`)  // Set the path to the file
                                        .attr('download', file)  // Set the file name for download
                                        .text(file);  // Display the file name as text
                                    
                                    // Append the link to the list item
                                    $li.append(fileLink);
                                    
                                    // Append the list item to the fileNamesList
                                    $fileNamesList.append($li);
                                });
                            }


        
                            // Loop through colleges and dynamically generate the HTML for the accordion
                           event.ajax.displayColleges(v).then((result)=>{
                                if(result){
                                    event.ajax.displayPrograms(v).then((programResult)=>{
                                        if(programResult){
                                            
                                        }
                                    })
                                }
                           })
                         
                            
                            
        
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
        get_attendance:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_event_attendance_api}`,
                    dataType:'json',
                    payload:payload
                }).then((response)=>{
                    if ($.fn.DataTable.isDataTable("#tbl-students-attendance")) {
                        student_table.clear();
                        student_table.destroy();
                        $("#tbl-students-attendance tbody").empty();
                    }
                    if ($.fn.DataTable.isDataTable("#tbl-teachers-attendance")) {
                        teacher_table.clear();
                        teacher_table.destroy();
                        $("#tbl-teachers-attendance tbody").empty();
                    }
                    if(!response._isError){
                        if(Object.keys(response.attendance.students).length > 0){
                            $.each(response.attendance.students,function(k,v){
                                $("#tbl-students-attendance tbody").append(
                                    $("<tr>").append(
                                        $("<td>").text(v.id),
                                        $("<td>").text(v.name),
                                        $("<td>").text(v.time_in??'--:--'),
                                        $("<td>").text(v.time_out??'--:--'),
                                        $("<td>").text(v.status??'-'),
                                    )
                                )
                                if (Object.keys(response.attendance.students).length - 1 == k) {
                                    student_table = $("#tbl-students-attendance").DataTable({
                                        "autoWidth":false, 
                                    });
                                    jsAddon.display.removefullPageLoader()
                                }
                            })  
                        }else{
                            student_table = $("#tbl-students-attendance").DataTable({
                                "autoWidth":false, 
                            });
                            jsAddon.display.removefullPageLoader()
                        }

                        if(Object.keys(response.attendance.teachers).length > 0){
                            $.each(response.attendance.teachers,function(k,v){
                                $("#tbl-teachers-attendance tbody").append(
                                    $("<tr>").append(
                                        $("<td>").text(v.id),
                                        $("<td>").text(v.name),
                                        $("<td>").text(v.time_in??'--:--'),
                                        $("<td>").text(v.time_out??'--:--'),
                                        $("<td>").text(v.status??'-'),
                                    )
                                )
                                if (Object.keys(response.attendance.teachers).length - 1 == k) {
                                    teacher_table = $("#tbl-teachers-attendance").DataTable({
                                        "autoWidth":false, 
                                    });
                                    jsAddon.display.removefullPageLoader()
                                }
                            })  
                        }else{
                            teacher_table = $("#tbl-teachers-attendance").DataTable({
                                "autoWidth":false, 
                            });
                            jsAddon.display.removefullPageLoader()
                        }
                    }
                })
            })
        }, 

        displayColleges:(v)=>{
           return new Promise((res,rej)=>{
           
            $.each(v.participants, function(college_key, college_value) {

                college = v.colleges.find(college => college.college_id === college_value.college_id) || null
                
                var college_id = college.college_id;
                var collegeId = `collapseCollege${college.college_id}`; // Unique ID for each college
                var programIdPrefix = `accordionPrograms${college.college_id}`; // Prefix for program collapse IDs
            
                // Create the college accordion structure
                $("#accordionColleges").append(
                    $("<div>").addClass("card").append(
                        $("<div>").addClass("card-header").attr("id", "headingColleges" + college_id).append(
                            $("<h5>").addClass("mb-0").css("font-size", "14px").append(
                                $("<div>")
                                    .addClass("d-flex justify-content-between align-items-center")
                                    .append(
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
                                        .text(college.college) // College name
                                        .append($("<i>").addClass("fa fa-chevron-right").attr("id", "icon-colleges")),
                                    $("<button>")
                                        .click(function(){
                                            event.ajax.event_remove_participants({
                                                'event_id':event_id,
                                                'type':'college',
                                                'college_id':college.college_id,
                                            })
                                        })
                                        .addClass("btn btn-danger btn-circle ml-2 font-weight-bolder d-flex justify-content-center")
                                        .attr({
                                            title:`Remove ${college.college}`
                                        })
                                        .text("x")
                                )
                            )
                        ).append(
                            $("<div>").attr({
                                "id": collegeId, // Unique ID for each college's collapse section
                                "class": "collapse",
                                "aria-labelledby": "headingColleges" + college_id,
                                "data-parent": "#accordionColleges" // Parent accordion ID
                            }).append(
                                $("<div>").addClass("card-body").append(
                                    $("<div>").addClass("accordion").attr("id",programIdPrefix).append()
                                )
                            )
                        )
                    )
                );
                if(Object.keys(v.colleges).length - 1 == college_key){
                    res(true)
                }
            });
           })
        }, 
        displayPrograms:(v)=>{
            return new Promise((res,rej)=>{
                $.each(v.participants, function(program_key, program_value) {
                  
                    let programIds = program_value.program_id.split(',');
                    $.each(programIds,function(kp,vp){
                        let program = v.programs.find(program => program.program_id === vp) || null
                        
                        // Create the program card and append to the program accordion container
                        $(`#accordionPrograms${program.college_id}`).append(
                            $("<div>")
                                .addClass("d-flex justify-content-between align-items-center")
                                .append(
                                    $("<button>")
                                    .css({
                                        'font-size':'12px'
                                    })
                                    .addClass(`btn btn-light-blue font-weight-bolder d-flex justify-content-between w-100 mb-1`)
                                    .text(program.program) // Program name
                                    .append($("<i>").addClass("fa fa-chevron-right").attr("id", "icon-program"))
                                    .click(function(){
                                       
                                        var collegeName = program.college;
                                        var collegeShortName = program.short_name;
                                        // alert(collegeName)
                                        $("#year-levels-and-sections").removeClass("hidden");
                                        $("#colleges-and-programs").addClass("hidden");
                                        $("#year-levels-and-sections-title").text(`${collegeName} (${collegeShortName}) > ${program.program_short_name}`)
                                        event.ajax.displayYearLevel(v,program.college_id);
                                        selectedEventDetails['college_id'] = program.college_id;
                                        selectedEventDetails['college'] = collegeName
                                        selectedEventDetails['program'] = program.program
                                        selectedEventDetails['program_id'] = program.program_id
                                        // event.ajax.displaySections(v,program_value.program_id);
                                    }),
                                $("<button>")
                                    .click(function(){
                                        event.ajax.event_remove_participants({
                                            'event_id':event_id,
                                            'type':'program',
                                            'college_id':program.college_id,
                                            'program_id':program.program_id,
                                        })
                                    })
                                    .addClass("btn btn-danger btn-circle ml-2 font-weight-bolder d-flex justify-content-center")
                                    .attr({
                                        title:`Remove ${program.program_short_name}`
                                    })
                                    .text("x")
                            )
                            
                        );
                       
                    })
                    if(Object.keys(v.programs).length - 1 == program_key){
                        res(true)
                    }
                })
            })
            
        }, 
        displayYearLevel:(v,college_id)=>{
            return new Promise((res, rej) => {
                // Loop through each year level in 'v.year_levels'
                $("#accordionYearLevels").empty();
                $.each(v.year_levels, function (year_level_key, year_level_value) {
                    
                    if(college_id === year_level_value.college_id){
                       
                        var year_level_id = year_level_value.year_level_id;
                        var yearLevelId = `collapseYearLevel${year_level_id}`; // Unique ID for each year level
                        var yearLevelIdPrefix = `accordionYearLevel${year_level_id}`; // Prefix for program collapse IDs
                
                        // Create the year level accordion structure
                        var yearLevelAccordion = $("<div>").addClass("card").append(
                            $("<div>").addClass("card-header").attr("id", "headingYearLevels" + year_level_id).append(
                                $("<h5>").addClass("mb-0").css("font-size", "14px").append(
                                $("<div>")
                                .addClass("d-flex justify-content-between align-items-center")
                                .append(
                                    $("<button>")
                                        .css({
                                            'font-size': '12px'
                                        })
                                        .addClass("btn btn-ligh-grey font-weight-bolder d-flex justify-content-between w-100")
                                        .attr({
                                            "type": "button",
                                            "data-toggle": "collapse",
                                            "data-target": `#${yearLevelId}`,
                                            "aria-expanded": "false",
                                            "aria-controls": yearLevelId
                                        })
                                        .text(year_level_value.year_level) // Year level name (Updated from section to year_level)
                                        .append($("<i>").addClass("fa fa-chevron-right").attr("id", "icon-year_levels"))
                                        .click(function(){
                                            selectedEventDetails['year_level_id'] = year_level_value.year_level_id;
                                            event.ajax.displaySections(v,year_level_value);
                                        }),
                                    $("<button>")
                                        .click(function(){
                                            event.ajax.event_remove_participants({
                                                'event_id':event_id,
                                                'type':'year_level',
                                                'college_id':year_level_value.college_id,
                                                'year_level_id':year_level_value.year_level_id,
                                            })
                                        })
                                        .addClass("btn btn-danger btn-circle ml-2 font-weight-bolder d-flex justify-content-center")
                                        .attr({
                                            title:`Remove ${year_level_value.year_level}`
                                        })
                                        .text("x")
                                    )
                                )
                            ).append(
                                $("<div>").attr({
                                    "id": yearLevelId, // Unique ID for each year level's collapse section
                                    "class": "collapse",
                                    "aria-labelledby": "headingYearLevels" + year_level_id,
                                    "data-parent": "#accordionYearLevels" // Parent accordion ID (updated to #accordionYearLevels)
                                }).append(
                                    $("<div>").addClass("card-body").append(
                                        $("<div>").addClass("accordion").attr("id", yearLevelIdPrefix).append()
                                    )
                                )
                            )
                        );
                
                        // Append the generated accordion to the parent container
                        $("#accordionYearLevels").append(yearLevelAccordion);
                    }
                    
                });
            });
            
            
        },
        displaySections:(v,year_level_value)=>{
     
            return new Promise((res, rej) => {
                let year_level_id = year_level_value.year_level_id;
                $(`#accordionYearLevel${year_level_id}`).empty()
                
                const sections = v.sections.filter(section => section.college_id === year_level_value.college_id && section.year_level_id.includes(year_level_id));
                $.each(sections, function (section_key, section_value) {
                    let arrayYearLevels = section_value.year_level_id.split(',');
                    if(arrayYearLevels.indexOf(year_level_id.toString()) >= 0){
                        // Create the section button and append to the section accordion container
                        $(`#accordionYearLevel${year_level_id}`).append(
                            $("<div>")
                            .addClass("d-flex justify-content-between align-items-center")
                            .append(
                                $("<button>")
                                .css({
                                    'font-size': '12px'
                                })
                                .addClass(`btn btn-light-blue font-weight-bolder d-flex justify-content-between w-100 ${section_key > 0 ? 'mt-1' : ''}`)
                                .text(section_value.section) // Section name
                                .append($("<i>").addClass("fa fa-chevron-right").attr("id", "icon-section"))
                                .click(function () {

                                    event.ajax.get_attendance({
                                        event_id:v.event_id,
                                        section_id:section_value.section_id,
                                        program_id:selectedEventDetails['program_id'],
                                    })

                                    selectedEventDetails['section'] = section_value.section
                                    selectedEventDetails['section_id'] = section_value.section_id

                                    $('#selected-event-name').text(v.name);
                                    $('#selected-event-college').text(selectedEventDetails['college']);
                                    $('#selected-event-program').text(`${selectedEventDetails['program']} ${selectedEventDetails['section']}`);
                                    $('#selected-event-time').text(`${v['start_time']} - ${v['end_time']}`);
                                    $('#selected-event-date').text(`${v['date']}`);
                                    $("#event-content").addClass("hidden")
                                    $("#attendance-content").removeClass("hidden")
                                }),
                                $("<button>")
                                    .click(function(){
                                        
                                        event.ajax.event_remove_participants({
                                            'event_id':event_id,
                                            'type':'section',
                                            'college_id':section_value.college_id,
                                            'section_id':section_value.section_id,
                                        })
                                    })
                                    .addClass("btn btn-danger btn-circle ml-2 font-weight-bolder d-flex justify-content-center")
                                    .attr({
                                        title:`Remove ${year_level_value.year_level}`
                                    })
                                    .text("x")
                                )
                            
                        );
                    }
                });
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
        event_remove_participants:(payload)=>{
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
                            url:event_remove_participants_api,
                            dataType:'json',
                            payload:payload,
                        }).then((response)=>{
                            if(!response._isError){
                                $("#accordionColleges").empty()
                                $("#year-levels-and-sections").addClass("hidden");
                                $("#colleges-and-programs").removeClass("hidden");
                                event.ajax.get({
                                    'event_id':event_id
                                });
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
                        'Your item is safe :)',
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

$('#upcomingEventsBtn').on('click', function() {
    // Set the clicked button to purple and the other to secondary
    $(this).removeClass('btn-secondary').addClass('btn-purple');
    $('#endedEventsBtn').removeClass('btn-purple').addClass('btn-secondary');
    event.ajax.get({
        'type':'upcomming'
    });
});

$("#back-event-school").click(function(){
    $("#year-levels-and-sections").addClass("hidden");
    $("#colleges-and-programs").removeClass("hidden");
    $("#year-levels-and-sections-title").text(``)
})

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
    event.init();
    $('#btn-export-attendance').click(function(){
        window.open(`${export_attendance_report_api}?event_id=${event_id}&section_id=${selectedEventDetails['section_id']}&program_id=${selectedEventDetails['program_id']}&college_id=${selectedEventDetails['college_id']}&year_level_id=${selectedEventDetails['year_level_id']}`,'_blank')
    })
    $('#btn-start-attendance').click(function(){
        window.open(`event_room.php?event_id=${event_id}`,'_self')
    })
   
    $("#btn-back-event").click(function(){
        $("#attendance-content").addClass("hidden")
        $("#event-content").removeClass("hidden")
       
    })
       
    
    
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
