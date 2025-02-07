var college_id = null; // to track if we are adding or updating a college
var table = null;

var college = {
    init: () => {
        college.ajax.get(); // Load the college data when the page loads
    },
    ajax: {
        get: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_college_api}`,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if ($.fn.DataTable.isDataTable("#college-table")) {
                        table.clear();
                        table.destroy();
                        $("#college-table tbody").empty();
                    }
                    if (!response._isError) {
                        if (Object.keys(response.data).length > 0) {
                            $.each(response.data, function (k, v) {
                                $("#college-table tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>").text(v.college_id),
                                                $("<td>").text(v.college),
                                                $("<td>").text(v.short_name),
                                                $("<td>").text(v.created_at),
                                                $("<td>").text(v.updated_at),
                                                $("<td>").text(v.deleted_at || "N/A"),
                                                $("<td>").append(
                                                    $("<span>")
                                                        .addClass(`badge badge-${v.is_active == 1 ? 'success' : 'danger'}`)
                                                        .text(v.is_active == 1 ? 'Active' : 'Inactive')
                                                ),
                                                $("<td>").append(
                                                    $("<button>")
                                                        .click(function () {
                                                           $("#addCollegeModal").modal("show");
                                                           $("#frm-college :input[name='college_name']").val(v.college)
                                                           $("#frm-college :input[name='short_name']").val(v.short_name)
                                                           college_id = v.college_id
                                                        })
                                                        .addClass("btn btn-purple btn-sm ml-2")
                                                        .append(" Update"),
                                                    $("<button>")
                                                        .click(function () {
                                                            Swal.fire({
                                                                title: 'Are you sure?',
                                                                text: `Remove College ${v.college}`,
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Yes, remove it!'
                                                            }).then((result) => {
                                                                if (result.value) {
                                                                    college.ajax.void({
                                                                        college_id: v.college_id
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
                    table = $("#college-table").DataTable({
                        "autoWidth": false,
                    });
                    jsAddon.display.removefullPageLoader();
                }
            });
        },

        // Add College functionality
        add: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: add_college_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        college_id = null;
                        college.ajax.get(); // Reload the college list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        update: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: update_college_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        college_id = null;
                        college.ajax.get(); // Reload the college list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        void: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: delete_college_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        college.ajax.get(); // Reload the college list
                        $(".modal").modal("hide"); // Close the modal
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },
    }
};

college.init();

// Form validation and submission
$("#frm-college").validate({
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
        college: {
            required: true,
        },
        short_name: {
            required: true,
        },
    },
    messages: {
        college: {
            required: 'Please enter college name',
        },
        short_name: {
            required: 'Please enter short name',
        },
    },
    submitHandler: function (form) {
        var data = {
            'college': $(form).find(':input[name=college_name]').val(),
            'short_name': $(form).find(':input[name=short_name]').val(),
        };

        if (college_id == null) {
            college.ajax.add(data); // Add new college
        } else {
            data['college_id'] = college_id;
            college.ajax.update(data); // Update existing college
        }
    }
});
