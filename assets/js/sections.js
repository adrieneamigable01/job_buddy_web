var section_id = null; // to track if we are adding or updating a section
var table = null;

var section = {
    init: () => {
        section.ajax.get(); // Load the section data when the page loads
        section.ajax.getPrograms(); // Populate the program dropdown
        section.ajax.getYearLevels(); // Populate the year level dropdown
    },
    ajax: {
        // Fetch all programs to populate the dropdown
        getPrograms: () => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_program_api}`, // URL for fetching programs
                    dataType: 'json',
                }).then((response) => {
                    if (!response._isError) {
                        var programDropdown = $("#program_id");
                        programDropdown.empty(); // Clear previous options
                        programDropdown.append('<option value="">Select Program</option>'); // Default option
                        
                        // Append programs to the dropdown
                        $.each(response.data, function (k, v) {
                            programDropdown.append(
                                $('<option>').val(v.program_id).text(v.program)
                            );
                        });
                    }
                });
            });
        },

        // Fetch all year levels to populate the dropdown
        getYearLevels: () => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_yearlevel_api}`, // URL for fetching year levels
                    dataType: 'json',
                }).then((response) => {
                    if (!response._isError) {
                        var yearLevelDropdown = $("#year_level_id");
                        yearLevelDropdown.empty(); // Clear previous options
                        yearLevelDropdown.append('<option value="">Select Year Level</option>'); // Default option
                        
                        // Append year levels to the dropdown
                        $.each(response.data, function (k, v) {
                            yearLevelDropdown.append(
                                $('<option>').val(v.year_level_id).text(v.year_level)
                            );
                        });
                    }
                });
            });
        },

        // Fetch all sections
        get: () => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_section_wother_api}`,
                    dataType: 'json',
                }).then((response) => {
                    if ($.fn.DataTable.isDataTable("#section-table")) {
                        table.clear();
                        table.destroy();
                        $("#section-table tbody").empty();
                    }
                    if (!response._isError) {
                        if (Object.keys(response.data).length > 0) {
                            $.each(response.data, function (k, v) {
                                $("#section-table tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>").text(v.section_id),
                                                $("<td>").text(v.section),
                                                $("<td>").text(v.program), // Program name
                                                $("<td>").text(v.year_level), // Year Level name
                                                $("<td>").text(v.created_at),
                                                $("<td>").append(
                                                    $("<span>")
                                                        .addClass(`badge badge-${v.is_active == 1 ? 'success' : 'danger'}`)
                                                        .text(v.is_active == 1 ? 'Active' : 'Inactive')
                                                ),
                                                $("<td>").append(
                                                    $("<button>")
                                                        .click(function () {
                                                           $("#addSectionModal").modal("show");
                                                           $("#frm-section :input[name='section']").val(v.section);
                                                           $("#frm-section :input[name='program_id']").val(v.program_id); // Set selected program
                                                           $("#frm-section :input[name='year_level_id']").val(v.year_level_id); // Set selected year level
                                                           section_id = v.section_id;
                                                        })
                                                        .addClass("btn btn-purple btn-sm ml-2")
                                                        .append(" Update"),
                                                    $("<button>") 
                                                        .click(function () {
                                                            Swal.fire({
                                                                title: 'Are you sure?',
                                                                text: `Remove Section ${v.section}`,
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Yes, remove it!'
                                                            }).then((result) => {
                                                                if (result.value) {
                                                                    section.ajax.void({
                                                                        section_id: v.section_id
                                                                    });
                                                                }
                                                            });
                                                        })
                                                        .addClass("btn btn-orange btn-sm ml-2")
                                                        .append(
                                                            $("<i>").addClass("fa fa-trash"),
                                                            " Void"
                                                        )
                                                )
                                            )
                                    );
                                    if (Object.keys(response.data).length - 1 == k) {
                                        resolve(true);
                                    }
                            });
                        } else {
                            resolve(true);
                        }
                    }
                });
            })
            .then(data => {
                if (data) {
                    table = $("#section-table").DataTable({
                        "autoWidth": false,
                    });
                    jsAddon.display.removefullPageLoader();
                }
            });
        },

        // Add Section functionality
        add: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: add_section_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        section_id = null;
                        section.ajax.get(); // Reload the section list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        // Update Section functionality
        update: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: update_section_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        section_id = null;
                        section.ajax.get(); // Reload the section list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        // Void (Delete) Section functionality
        void: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: delete_section_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        section.ajax.get(); // Reload the section list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },
    }
};

section.init();

// Form validation and submission for Section
$("#frm-section").validate({
    errorElement: 'span',
    errorClass: 'text-danger',
    highlight: function (element, errorClass, validClass) {
        $(element).closest('.form-group').addClass("has-warning");
        $(element).closest('.form-group').find("input").addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass("has-warning");
        $(element).closest('.form-group').find("input").removeClass('is-invalid');
    },
    rules: {
        section: {
            required: true,
        },
        program_id: {
            required: true,
        },
        year_level_id: {
            required: true,
        },
    },
    messages: {
        section: {
            required: 'Please enter section name',
        },
        program_id: {
            required: 'Please select a program',
        },
        year_level_id: {
            required: 'Please select a year level',
        },
    },
    submitHandler: function (form) {
        var data = {
            'section': $(form).find(':input[name=section]').val(),
            'program_id': $(form).find(':input[name=program_id]').val(),
            'year_level_id': $(form).find(':input[name=year_level_id]').val(),
        };

        if (section_id == null) {
            section.ajax.add(data);
        } else {
            data['section_id'] = section_id;
            section.ajax.update(data);
        }
    }
});
