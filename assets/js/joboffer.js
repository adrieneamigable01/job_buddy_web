var offer_id = null; // to track if we are adding or updating a job offer
var offer_table = null;

var jobOffer = {
    init: () => {
        jobOffer.ajax.get(); // Load job offers when the page loads
    },
    ajax: {
        get: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_joboffer_api}`,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if ($.fn.DataTable.isDataTable("#jobOffersTable")) {
                        offer_table.clear();
                        offer_table.destroy();
                        $("#jobOffersTable tbody").empty();
                    }
                    if (!response._isError) {
                        if (Object.keys(response.data).length > 0) {
                            $.each(response.data, function (k, v) {
                                $("#jobOffersTable tbody").append(
                                    $("<tr>").append(
                                        $("<td>").text(v.job_offers_id),
                                        $("<td>").text(v.job_title),
                                        $("<td>").text(v.skills),
                                        $("<td>").text(v.location),
                                        $("<td>").append(
                                            v.candidates.length > 0 ?
                                            $("<button>")
                                            .click(function () {
                                                let content = ``;
                                    
                                                if (v.candidates.length === 0) {
                                                    content += `<p class="text-muted">No candidates applied for this job.</p>`;
                                                } else {
                                                    v.candidates.forEach((c, i) => {
                                                        content += `
                                                            <div class="mb-4 border p-3 rounded shadow-sm">
                                                                <h6>Candidate ${i + 1}: ${c.firstname} ${c.middlename} ${c.lastname}</h6>
                                                                <dl class="row">
                                                                    <dt class="col-sm-4">Email</dt><dd class="col-sm-8">${c.email}</dd>
                                                                    <dt class="col-sm-4">Phone</dt><dd class="col-sm-8">${c.phone}</dd>
                                                                    <dt class="col-sm-4">Address</dt><dd class="col-sm-8">${c.address}</dd>
                                                                    <dt class="col-sm-4">Birthdate</dt><dd class="col-sm-8">${c.birthdate}</dd>
                                                                    <dt class="col-sm-4">Gender</dt><dd class="col-sm-8">${c.gender}</dd>
                                                                    <dt class="col-sm-4">Skills</dt><dd class="col-sm-8">${c.skills || 'N/A'}</dd>
                                                                    <dt class="col-sm-4">Course</dt><dd class="col-sm-8">${c.courses || 'N/A'}</dd>
                                                                    <dt class="col-sm-4">Employment Type</dt><dd class="col-sm-8">${c.employment_type}</dd>
                                                                    <dt class="col-sm-4">Preferred Time</dt><dd class="col-sm-8">${c.prefere_available_time}</dd>
                                                                </dl>
                                                        `;
                                    
                                                        if (c.education.length > 0) {
                                                            content += `<h6>Education</h6>`;
                                                            c.education.forEach(e => {
                                                                content += `
                                                                    <ul>
                                                                        <li><strong>${e.degree}</strong> (${e.school_name})<br>
                                                                        Field: ${e.field_of_study}, Grade: ${e.grade}<br>
                                                                        Years: ${e.start_year} - ${e.end_year}<br>
                                                                        Activities: ${e.activities}<br>
                                                                        Description: ${e.description}</li>
                                                                    </ul>
                                                                `;
                                                            });
                                                        }
                                    
                                                        if (c.experience.length > 0) {
                                                            content += `<h6>Experience</h6>`;
                                                            c.experience.forEach(x => {
                                                                content += `
                                                                    <ul>
                                                                        <li><strong>${x.position_title}</strong> at ${x.company_name} (${x.location})<br>
                                                                        Skills: ${x.skills}<br>
                                                                        ${x.start_date} to ${x.end_date}<br>
                                                                        Description: ${x.description}</li>
                                                                    </ul>
                                                                `;
                                                            });
                                                        }
                                    
                                                        content += `</div>`;
                                                    });
                                                }
                                                
                                                
                                                $("#jobDetailsCandidatesContent").html(content);
                                                $("#jobDetailsCandidatesModal").modal("show");
                                            })
                                            .addClass("btn btn-info btn-sm ml-2")
                                            .append(`View ${v.candidates.length} Candidates`)
                                            : "No Candidates"
                                        ),
                                        $("<td>").text(v.status),
                                        $("<td>").append(
                                            $("<button>")
                                            .click(function () {
                                                let content = `
                                                    <h5 class="mb-3">Job Details</h5>
                                                    <dl class="row">
                                                        <dt class="col-sm-4">Job Title</dt><dd class="col-sm-8">${v.job_title}</dd>
                                                        <dt class="col-sm-4">Company</dt><dd class="col-sm-8">${v.company_name}</dd>
                                                        <dt class="col-sm-4">Location</dt><dd class="col-sm-8">${v.location}</dd>
                                                        <dt class="col-sm-4">Skills</dt><dd class="col-sm-8">${v.skills}</dd>
                                                        <dt class="col-sm-4">Salary Range</dt><dd class="col-sm-8">${v.salary_range}</dd>
                                                        <dt class="col-sm-4">Employment Type</dt><dd class="col-sm-8">${v.employment_type}</dd>
                                                        <dt class="col-sm-4">Status</dt><dd class="col-sm-8">${v.status}</dd>
                                                        <dt class="col-sm-4">Job Description</dt><dd class="col-sm-8">${v.job_description}</dd>
                                                        <dt class="col-sm-4">Date Added</dt><dd class="col-sm-8">${v.date_added}</dd>
                                                        <dt class="col-sm-4">Expired At</dt><dd class="col-sm-8">${v.expired_at}</dd>
                                                    </dl>
                                                `;
                                    
                                              
                                    
                                                $("#jobDetailsContent").html(content);
                                                $("#jobDetailsModal").modal("show");
                                            })
                                            .addClass("btn btn-info btn-sm ml-2")
                                            .append("View More"),
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
            }).then(data => {
                if (data) {
                    offer_table = $("#jobOffersTable").DataTable({
                        autoWidth: false,
                    });
                    jsAddon.display.removefullPageLoader();
                }
            });
        },

        add: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: add_offer_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        offer_id = null;
                        jobOffer.ajax.get();
                        $(".modal").modal("hide");
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        update: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: update_offer_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        offer_id = null;
                        jobOffer.ajax.get();
                        $(".modal").modal("hide");
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },

        void: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'post',
                    url: delete_offer_api,
                    dataType: 'json',
                    payload: payload,
                }).then((response) => {
                    if (!response._isError) {
                        jobOffer.ajax.get();
                        $(".modal").modal("hide");
                    }
                    jsAddon.display.swalMessage(response._isError, response.reason);
                });
            });
        },
    }
};

jobOffer.init();

$("#frm-offer").validate({
    errorElement: 'span',
    errorClass: 'text-danger',
    highlight: function (element) {
        $(element).closest('.form-group').addClass("has-warning")
            .find("input, select").addClass('is-invalid');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass("has-warning")
            .find("input, select").removeClass('is-invalid');
    },
    rules: {
        job_title: { required: true },
        company: { required: true },
        location: { required: true },
    },
    messages: {
        job_title: { required: 'Enter job title' },
        company: { required: 'Enter company name' },
        location: { required: 'Enter location' },
    },
    submitHandler: function (form) {
        const data = {
            job_title: $(form).find(':input[name=job_title]').val(),
            company: $(form).find(':input[name=company]').val(),
            location: $(form).find(':input[name=location]').val(),
        };

        if (offer_id == null) {
            jobOffer.ajax.add(data);
        } else {
            data.id = offer_id;
            jobOffer.ajax.update(data);
        }
    }
});
