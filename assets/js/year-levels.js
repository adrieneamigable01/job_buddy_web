var year_level_id = null; // to track if we are adding or updating a year level
var table = null;

var year_level = {
    init: () => {
        year_level.ajax.get(); // Load the year level data when the page loads
    },
    ajax: {
        // Fetch all year levels
        get: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_yearlevel_api}`, // URL for fetching year levels
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if ($.fn.DataTable.isDataTable("#year-level-table")) {
                        table.clear();
                        table.destroy();
                        $("#year-level-table tbody").empty();
                    }
                    if (!response._isError) {
                        if (Object.keys(response.data).length > 0) {
                            $.each(response.data, function (k, v) {
                                $("#year-level-table tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>").text(v.year_level_id),
                                                $("<td>").text(v.year_level),
                                                $("<td>").text(v.created_at),
                                                $("<td>").append(
                                                    $("<span>")
                                                        .addClass(`badge badge-${v.is_active == 1 ? 'success' : 'danger'}`)
                                                        .text(v.is_active == 1 ? 'Active' : 'Inactive')
                                                ),
                                                $("<td>").append(
                                                    $("<button>")
                                                        .click(function () {
                                                           $("#addYearLevelModal").modal("show");
                                                           $("#frm-year-level :input[name='year_level']").val(v.year_level);
                                                           year_level_id = v.year_level_id;
                                                        })
                                                        .addClass("btn btn-purple btn-sm ml-2")
                                                        .append(" Update"),
                                                    $("<button>") 
                                                        .click(function () {
                                                            Swal.fire({
                                                                title: 'Are you sure?',
                                                                text: `Remove Year Level ${v.year_level}`,
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Yes, remove it!'
                                                            }).then((result) => {
                                                                if (result.value) {
                                                                    year_level.ajax.void({
                                                                        year_level_id: v.year_level_id
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
                    table = $("#year-level-table").DataTable({
                        "autoWidth": false,
                    });
                    jsAddon.display.removefullPageLoader();
                }
            });
        },

        // Add Year Level functionality
        add: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: add_yearlevel_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        year_level_id = null;
                        year_level.ajax.get(); // Reload the year level list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        // Update Year Level functionality
        update: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: update_yearlevel_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        year_level_id = null;
                        year_level.ajax.get(); // Reload the year level list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        // Void (Delete) Year Level functionality
        void: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: delete_yearlevel_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        year_level.ajax.get(); // Reload the year level list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },
    }
};

year_level.init();

// Form validation and submission for Year Level
$("#frm-year-level").validate({
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
        year_level: {
            required: true,
        },
    },
    messages: {
        year_level: {
            required: 'Please enter year level name',
        },
    },
    submitHandler: function (form) {
        var data = {
            'year_level': $(form).find(':input[name=year_level]').val(),
        };

        if (year_level_id == null) {
            year_level.ajax.add(data); // Add new year level
        } else {
            data['year_level_id'] = year_level_id;
            year_level.ajax.update(data); // Update existing year level
        }
    }
});
