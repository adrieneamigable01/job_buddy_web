var program_id = null; // to track if we are adding or updating a program
var table = null;

var program = {
    init: () => {
        program.ajax.get(); // Load the program data when the page loads
        program.ajax.getColleges(); // Populate the college dropdown
    },
    ajax: {
        // Fetch all colleges to populate the dropdown
        getColleges: () => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_college_api}`, // URL for fetching colleges
                    dataType: 'json',
                }).then((response) => {
                    if (!response._isError) {
                        var collegeDropdown = $("#college_id");
                        collegeDropdown.empty(); // Clear previous options
                        collegeDropdown.append('<option value="">Select College</option>'); // Default option
                        
                        // Append colleges to the dropdown
                        $.each(response.data, function (k, v) {
                            collegeDropdown.append(
                                $('<option>').val(v.college_id).text(v.college)
                            );
                        });
                    }
                });
            });
        },

        // Fetch all programs
        get: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_program_api}`,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if ($.fn.DataTable.isDataTable("#program-table")) {
                        table.clear();
                        table.destroy();
                        $("#program-table tbody").empty();
                    }
                    if (!response._isError) {
                        if (Object.keys(response.data).length > 0) {
                            $.each(response.data, function (k, v) {
                                $("#program-table tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>").text(v.program_id),
                                                $("<td>").text(v.program),
                                                $("<td>").text(v.program_short_name),
                                                $("<td>").text(`${v.college} (${v.college_short_name})`),
                                                $("<td>").text(v.created_at),
                                                $("<td>").append(
                                                    $("<span>")
                                                        .addClass(`badge badge-${v.is_active == 1 ? 'success' : 'danger'}`)
                                                        .text(v.is_active == 1 ? 'Active' : 'Inactive')
                                                ),
                                                $("<td>").append(
                                                    $("<button>")
                                                        .click(function () {
                                                           $("#addProgramModal").modal("show");
                                                           $("#frm-program :input[name='program_name']").val(v.program)
                                                           $("#frm-program :input[name='program_short_name']").val(v.program_short_name)
                                                           $("#frm-program :input[name='college_id']").val(v.college_id); // Set selected college
                                                           program_id = v.program_id
                                                        })
                                                        .addClass("btn btn-purple btn-sm ml-2")
                                                        .append(" Update"),
                                                    $("<button>")
                                                        .click(function () {
                                                            Swal.fire({
                                                                title: 'Are you sure?',
                                                                text: `Remove Program ${v.program}`,
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Yes, remove it!'
                                                            }).then((result) => {
                                                                if (result.value) {
                                                                    program.ajax.void({
                                                                        program_id: v.program_id
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
                    table = $("#program-table").DataTable({
                        "autoWidth": false,
                    });
                    jsAddon.display.removefullPageLoader();
                }
            });
        },

        // Add Program functionality
        add: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: add_program_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        program_id = null;
                        program.ajax.get(); // Reload the program list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        // Update Program functionality
        update: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: update_program_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        program_id = null;
                        program.ajax.get(); // Reload the program list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        // Void (Delete) Program functionality
        void: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: delete_program_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        program.ajax.get(); // Reload the program list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },
    }
};

program.init();

// Form validation and submission for Program
$("#frm-program").validate({
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
    rules: {
        program_name: {
            required: true,
        },
        program_short_name: {
            required: true,
        },
        college_id: {
            required: true,
        },
    },
    messages: {
        program_name: {
            required: 'Please enter program name',
        },
        program_short_name: {
            required: 'Please enter short name',
        },
        college_id: {
            required: 'Please select a college',
        },
    },
    submitHandler: function (form) {
        var data = {
            'program': $(form).find(':input[name=program_name]').val(),
            'program_short_name': $(form).find(':input[name=program_short_name]').val(),
            'college_id': $(form).find(':input[name=college_id]').val(), // Include the selected college_id
        };

        if (program_id == null) {
            program.ajax.add(data); // Add new program
        } else {
            data['program_id'] = program_id;
            program.ajax.update(data); // Update existing program
        }
    }
});
