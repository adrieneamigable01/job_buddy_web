var user_id = null,
table = null,
confirmationCount = 0,
teacher_image = null;
var teacher = {
    init: async ()=>{
        teacher_id = localStorage.getItem("teacher_id");
        if(teacher_id == null){
            jsAddon.display.swalMessage(false,"teacher not found");
            setTimeout(() => {
                window.history.back();
            }, 2000);
        }
      
        await teacher.ajax.get_college();
        // await teacher.ajax.get_program();
        await teacher.ajax.get_yearlevel();
        await teacher.ajax.get_section();
        await teacher.ajax.get({
            teacher_id:teacher_id,
        });
    },
    ajax:{

        get:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_teacher_api}`,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if ($.fn.DataTable.isDataTable("#teacher-table")) {
                        table.clear();
                        table.destroy();
                        $("#teacher").empty();
                    }
                    if(!response._isError){
                        if(Object.keys(response.data).length > 0){
                            let v = response.data[0];
                            let name = `${v.first_name} ${v.last_name} ${v.last_name}`
                            user_id = v.user_id;
                            teacher_id = v.teacher_id;
                            $("#teacher-name").text(name);
                            $("#frm-teacher").find(":input[id=teacher_id]").val(v.teacher_id)
                            $("#frm-teacher").find(":input[name=first_name]").val(v.first_name)
                            $("#frm-teacher").find(":input[name=middle_name]").val(v.middle_name)
                            $("#frm-teacher").find(":input[name=last_name]").val(v.last_name)
                            $("#frm-teacher").find(":input[name=college_id]").val(v.college_id)
                            $("#frm-teacher").find(":input[name=program_id]").val(v.program_id)
                            $("#frm-teacher").find(":input[name=email]").val(v.email)
                            $('#teacher-image').attr({
                                src:v.teacher_image == "" ? 'https://via.placeholder.com/150' : v.teacher_image
                            })

                            teacher.ajax.get_program({
                                college_id:v.college_id
                            },v.program_id);
                        }else{
                            resolve(true);
                        }
                    }
                })
            })
        },

        add:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:add_teacher_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        teacher.ajax.get()
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
                    url:update_teacher_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        teacher.ajax.get({
                            teacher_id:teacher_id,
                        });
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },
        update_face:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:update_teacher_face_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        teacher.ajax.get({
                            teacher_id:teacher_id,
                        });
                    }
                    jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },
        verify_teacher_face:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:verify_teacher_face_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    resolve(response);
                    // if(!response._isError){
                    //     student.ajax.get({
                    //         teacher_id:teacher_id,
                    //     });
                    // }
                    // jsAddon.display.swalMessage(response._isError,response.reason);
                })
                 
            })
        },
        void:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:delete_teacher_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        teacher.ajax.get()
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
                                .text("Select a College")
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
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true);
                                }
                            })  
                        }else{
                            resolve(true);
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
        },
        get_program:(payload,program_id)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_program_api}`,
                    dataType:'json',
                    payload:payload
                }).then((response)=>{
                    if(!response._isError){
                        $("#program_id").empty();
                        if(Object.keys(response.data).length > 0){
                            $("#program_id").append(
                                $("<option>")
                                .css({
                                    display:'none'
                                })
                                .text("Select a Program")
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
                                    $("#frm-teacher").find(":input[name=program_id]").val(program_id == null? response.data[0].program_id : program_id)
                                    resolve(true);
                                }
                            })  
                        }else{
                            resolve(true);
                            $("#program_id").append(
                                $("<option>")
                                .css({
                                    display:'none'
                                })
                                .text("No Program Found")
                            )
                        }
                    }
                })
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
                                .text("Select a Year Level")
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
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true);
                                }
                            })  
                        }else{
                            resolve(true);
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
        get_section:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_section_api}`,
                    dataType:'json',
                }).then((response)=>{
                    if(!response._isError){
                        $("#section_id").empty();
                        if(Object.keys(response.data).length > 0){
                            $("#section_id").append(
                                $("<option>")
                                .css({
                                    display:'none'
                                })
                                .text("Select a Section")
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
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true);
                                }
                            })  
                        }else{
                            resolve(true);
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

teacher.init();
$("#college_id").change(function(){
    teacher.ajax.get_program({
        college_id:$(this).val(),
    });
})
$(document).ready(function() {
    // Trigger the hidden file input when the image is clicked
    $('#teacher-image').on('click', function() {
        $('#image-upload').click();
    });

    // When the file input changes (a file is selected)
    $('#image-upload').on('change', function(event) {
        var file = event.target.files[0]; // Get the selected file

        if (file) {
          
            var reader = new FileReader();


            if (file.size > 5 * 1024 * 1024) { // 5MB in bytes
                alert('File size is too large. Please select an image less than 5MB.');
                return; // Stop further execution
            }
            
            var img = new Image();
            img.onload = function() {
                // Check if the image is square (aspect ratio 1:1)
                if (img.width !== img.height) {
                    alert('Please upload a square image (profile picture).');
                    return; // Stop further execution
                }

                // If the image passes the checks, display the preview
                reader.onload = function(e) {
                    $('#teacher-image').attr('src', e.target.result); // Update the image source
                    teacher_image = e.target.result;
                };
                reader.readAsDataURL(file);
            };

            img.src = URL.createObjectURL(file); // Trigger the image load event for dimension check


            // When the file is loaded, update the image preview
          
           
        }
    });

    
    $("#btn-generate").click(function(){
        var qrText = {
            app:'scan_and_go',
            teacher_id:teacher_id,
        }; // Example URL for QR code

        qrText = JSON.stringify(qrText);
        console.log("QR Text:", qrText);  // Make sure the QR text is valid

        if (!qrText || typeof qrText !== 'string') {
            alert('Invalid data for QR code');
            return;
        }

        // Generate the QR code as a Data URL
        QRCode.toDataURL(qrText, function(error, url) {
            if (error) {
                console.error('Error generating QR code:', error);
            } else {
                console.log("QR Code generated successfully!");
                // Display the QR code image in the modal
                $('#qr-code').html('<img src="' + url + '" width="250" alt="QR Code" />');
            }
        });

        // Show the modal
        $("#qrModal").modal("toggle"); // Or use a modal library if you have one
    
    });

    $('#download-qr').click(function() {
        html2canvas(document.getElementById('qr-content'), {
            onrendered: function(canvas) {
                var image = canvas.toDataURL('image/png');
                
                // Create a link to download the image
                var link = document.createElement('a');
                link.href = image;
                link.download = 'qr-content.png';
                link.click();
            }
        });
    });

    $("#btn-scan").click(function(){
        loadModel();
        $("#faceScan").modal("show");
        
    })


    // Global variables for model and face descriptor storage
    let knownFaceDescriptors = [];
    let capturedFaceDescriptor = null;
    let videoStream = null;
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let verificationStatus = document.getElementById('verificationStatus');
    let messageElement = document.getElementById('message');

    // Load face-api.js models
    async function loadModel() {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('../models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('../models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('../models');
        verificationStatus.textContent = 'Face API Models Loaded!';
        startVideoStream();
    }

    // Start the webcam video stream
    async function startVideoStream() {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = videoStream;
        video.width = 640;
        video.height = 480;
        video.onloadedmetadata = () => {
            canvas.width = video.width;
            canvas.height = video.height;
            video.play();
            detectFaces();
        };
    }

    // Detect faces and extract face descriptors from video
    async function detectFaces() {
        setInterval(async () => {
            if (video && faceapi) {
                const detections = await faceapi.detectAllFaces(video)
                    .withFaceLandmarks()
                    .withFaceDescriptors();

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (detections.length > 0) {
                    // Draw bounding boxes around faces
                    detections.forEach(det => {
                        const { x, y, width, height } = det.detection.box;
                        ctx.beginPath();
                        ctx.rect(x, y, width, height);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = 'green';
                        ctx.stroke();
                    });

                    // Capture the face descriptor of the first detected face
                    const faceDescriptor = detections[0].descriptor;
                    capturedFaceDescriptor = faceDescriptor; // Store the face descriptor
                    messageElement.textContent = 'Face detected and descriptor captured!';
                    verificationStatus.textContent = 'Face Detected!';
                } else {
                    verificationStatus.textContent = 'No Face Detected.';
                }
            }
        }, 100); // Update every 100ms
    }
    async function captureImage(){
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a base64 string
        const base64Image = canvas.toDataURL('image/jpeg');
        teacher_image = base64Image;
        // Display the base64 string in the textarea
        $("#scan-prewview").attr({
            src:base64Image
        })
        // base64Result.value = base64Image;

    }
    function showConfirmation(capturedFaceDescriptor){
        Swal.fire({
            title: 'Are you sure to override the image?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, override it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.value) {
                confirmationCount++;
                
                // If confirmed 3 times, proceed with overriding the image
                if (confirmationCount === 3) {
                    saveFaceDescriptor(capturedFaceDescriptor);
                    teacher.ajax.get({
                        teacher_id:teacher_id,
                    });
                    stopVideoStream();
                    setTimeout(() => {
                        $('#faceScan').modal('toggle');
                    }, 3000);
                } else {
                    // If not yet 3 confirmations, ask again
                    Swal.fire({
                        title: 'You need to confirm again',
                        text: `You have confirmed ${confirmationCount} times. Please confirm ${3 - confirmationCount} more time(s).`,
                        icon: 'info',
                    }).then(() => {
                        showConfirmation(capturedFaceDescriptor); // Recursively call the function
                    });
                }
            } else {
                Swal.fire(
                    'Cancelled',
                    'The image has not been overridden.',
                    'info'
                );
            }
        });
    }
    // Capture the face and save its descriptor
    async function captureFace() {
        if (capturedFaceDescriptor) {
            messageElement.textContent = 'Face captured successfully!';
            captureImage();
            teacher.ajax.verify_teacher_face({
                teacher_id:teacher_id,
                descriptor:JSON.stringify(Array.from(capturedFaceDescriptor))
            }).then((response)=>{
                
                if(response.isError){
                    if(response.message == "Face not recognized."){
                        confirmationCount = 0;
                        showConfirmation(capturedFaceDescriptor); // Recursively call the function
                        
                    }else{
                        if(response.message == "Teacher or face descriptor not found."){
                            Swal.fire({
                                title: 'Confimation',
                                text: `Are you sure to add to your image?.`,
                                icon: 'info',
                            }).then(() => {
                                saveFaceDescriptor(capturedFaceDescriptor);
                                teacher.ajax.get({
                                    teacher_id:teacher_id,
                                });
                                stopVideoStream();
                                setTimeout(() => {
                                    $('#faceScan').modal('toggle');
                                }, 3000);
                            });
                        }else{
                            jsAddon.display.swalMessage(response.isError,response.message);
                        }
                       
                    }
                }else{
                    Swal.fire({
                        title: 'Confimation',
                        text: `Are you sure to update your current image?.`,
                        icon: 'info',
                    }).then(() => {
                        saveFaceDescriptor(capturedFaceDescriptor);
                        teacher.ajax.get({
                            teacher_id:teacher_id,
                        });
                        stopVideoStream();
                        setTimeout(() => {
                            $('#faceScan').modal('toggle');
                        }, 3000);
                    });
                   
                }
               
            })
           
        } else {
            messageElement.textContent = 'No face detected to capture.';
        }
    }

    // async function captureFace() {
    //     if (capturedFaceDescriptor) {
    //         messageElement.textContent = 'Face captured successfully!';
    //         saveFaceDescriptor(capturedFaceDescriptor);
    //     } else {
    //         messageElement.textContent = 'No face detected to capture.';
    //     }
    // }

    // Save the captured face descriptor to the server
    function saveFaceDescriptor(faceDescriptor) {
        let username = $("#name").val();
        if(username == "") {
            alert("Name is required");
            return false;
        }
        let payload =  { descriptor: JSON.stringify(Array.from(faceDescriptor)), teacher_id: teacher_id,teacher_image:teacher_image }
        teacher.ajax.update_face(payload);
    }

    // Button click event to verify face
    // $('#verify').on('click', function() {
    //     if (capturedFaceDescriptor) {
    //         verifyFace(capturedFaceDescriptor);
    //     } else {
    //         messageElement.textContent = 'No captured face to verify.';
    //     }
    // });

    // Button click event to capture the face
    $('#capture').on('click', function() {
        captureFace();
    });

    // Open the modal and start the camera when clicked
    // $('#openModalBtn').on('click', function() {
    //     $('#modal').show();
    //     $('#modal-overlay').show();
    //     loadModel();
    // });

    // Close the modal and stop the camera when clicked
    $('#close-capture').on('click', function() {
        stopVideoStream();
        setTimeout(() => {
            $('#faceScan').modal('toggle');
        }, 3000);
    });

    // Stop the video stream and release resources
    function stopVideoStream() {
        if (videoStream) {
            const tracks = videoStream.getTracks();
            tracks.forEach(track => track.stop());
            videoStream = null;
            verificationStatus.textContent = 'Face API Models Unloaded!';
        }
    }

    $('#faceScan').on('hidden.bs.modal', function() {
        stopVideoStream();
    });

});



$("#frm-teacher").validate({
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
        teacher_id:{
            required:true,
        },
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
            'email': $(form).find(':input[name=email]').val(),
            'teacher_image':teacher_image,
            "teacher_id":$(form).find(':input[name=teacher_id]').val(),
            'user_id':user_id
        };
        teacher.ajax.update(data);
    }
});

