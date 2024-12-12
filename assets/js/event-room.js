var event_id = null;
event_image = null,
student_table = null,
teacher_table= null,
table = null,
verifiedFaces = new Map(),
attendance_type = 'time_in';
var event_room = {
    init:()=>{
        event_id = jsAddon.display.getQueryParam("event_id");
        event_room.ajax.get({
            'event_id':event_id
        });
    },
    ajax:{
        
        recognize_face_event_attendance:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:recognize_face_event_attendance_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        event_room.ajax.get({
                            'event_id':event_id
                        });
                    }
                    jsAddon.display.swalMessage(response._isError,response.message);
                })
                 
            })
        },
        add_event_attendance:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'post',
                    url:add_attendance_api,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    if(!response._isError){
                        event_room.ajax.get({
                            'event_id':event_id
                        });
                    }
                    jsAddon.display.swalMessage(response._isError,response.message);
                })
                 
            })
        },
        get: (payload) => {
            return new Promise((resolve, reject) => {
                jsAddon.display.ajaxRequest({
                    type: 'get',
                    url: `${get_event_attendance_api}`,
                    dataType: 'json',
                    payload: payload
                }).then((response) => {
                    $("#eventsList").empty();
                    if (!response._isError) {
                        var v = response.event;
        
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
                        const dateString = v.date;
                        const timeString = v.end_time;
                        const combinedDateTimeString = `${dateString}T${timeString}`; 
                       
                        const givenDateTime = new Date(combinedDateTimeString);
                        const currentDateTime = new Date();
                       
                        // if (givenDateTime < currentDateTime) {
                        //     $("#btn-open-attendance-camera").addClass("hidden")
                        // }else if (givenDateTime > currentDateTime) {
                        //     $("#btn-open-attendance-camera").addClass("hidden")
                        // } else {
                        //     $("#btn-open-attendance-camera").removeClass("hidden")
                        // }

                       
    
                        $("#event-name").text(v.name);
                        $("#event-description").text(v.description);
                        $("#event-month").text(monthName);
                        $("#event-day").text(day);
                        $("#event-year").text(year);
                        $("#event-time").text(`${jsAddon.display.convertTo12HourFormat(v.start_time)} - ${jsAddon.display.convertTo12HourFormat(v.end_time)}`);
                        $("#event-image").attr({
                            src: v.event_image
                        });


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
                                            $("<td>").text(v.college_short_name),
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
                                            $("<td>").text(v.college_short_name),
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

    
                        
                        
                    }
                });
            }).then(data => {
                if (data) {
                    // Use jQuery to initialize Bootstrap collapse for dynamic elements
                  
                }
            });
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
                                event_room.ajax.get({
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
    }
}


$(document).ready(function() {
    event_room.init();

    let html5QrCode;
        
    
    // Start the QR Code scanner when modal is shown
    $('#qrScannerModal').on('shown.bs.modal', function () {
        // Initialize the QR Code scanner
        html5QrCode = new Html5Qrcode("qr-reader");

        // Start scanning
        html5QrCode.start(
            { facingMode: "environment" }, // Use the back camera
            { fps: 10, qrbox: 250 },      // Frame rate and QR box size
            onScanSuccess,
            onScanError
        ).catch((err) => {
            console.log("Error starting the scanner: ", err);
        });
    });

    // Stop the QR Code scanner when modal is hidden
    $('#qrScannerModal').on('hidden.bs.modal', function () {
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                console.log("QR scanner stopped.");
            }).catch((err) => {
                console.log("Error stopping the scanner: ", err);
            });
        }
    });

    // Handle QR code scan success
    function onScanSuccess(decodedText, decodedResult) {
        
        decodedText = JSON.parse(decodedText);
        // $attendance_type = $this->input->post("attendance_type");
        // $user_type       = $this->input->post("user_type");
        // $student_id      = $this->input->post("student_id");
        // $teacher_id      = $this->input->post("teacher_id");
        // $event_id        = $this->input->post("event_id");
       
        if(decodedText.hasOwnProperty("app") && decodedText.app == "scan_and_go"){
         
            if(decodedText.student_id != undefined){
                event_room.ajax.add_event_attendance({
                    attendance_type:attendance_type,
                    user_type:'student',
                    student_id:decodedText.student_id,
                    event_id:event_id
                })
            }else if(decodedText.teacher_id != undefined){
                event_room.ajax.add_event_attendance({
                    attendance_type:attendance_type,
                    user_type:'teacher',
                    teacher_id:decodedText.teacher_id,
                    event_id:event_id
                })
            }
        }else{
            $('#result').text(`This is not a valid Scan and Go QR Code`);
        }
        // $('#result').text(`Scanned QR Code: ${decodedText}`);
    }

    // Handle error
    function onScanError(errorMessage) {
        console.warn(errorMessage);
    }

    $("#btn-open-attendance-qr").click(function(){
        Swal.fire({
            title: 'Select Attendance Status',
            text: 'Please select whether it is Time In or Time Out',
            input: 'select',  // This tells Swal2 to create a select dropdown
            inputOptions: {
                'time_in': 'Time In',
                'time_out': 'Time Out'
            },
            inputPlaceholder: 'Choose Time In or Time Out',
            showCancelButton: true,  // Allow the user to cancel
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to select Time In or Time Out'; // Validation message
                }
            }
        }).then((result) => {
            // When the user confirms, handle the selection

            if (result.value != "undefined") {
                verifiedFaces = new Map();
                const selectedValue = result.value;
                attendance_type = selectedValue;
                $("#qrScannerModal").modal("show");
            }
        });
    })
    $('#btn-open-attendance-camera').click(function(){
       
        Swal.fire({
            title: 'Select Attendance Status',
            text: 'Please select whether it is Time In or Time Out',
            input: 'select',  // This tells Swal2 to create a select dropdown
            inputOptions: {
                'time_in': 'Time In',
                'time_out': 'Time Out'
            },
            inputPlaceholder: 'Choose Time In or Time Out',
            showCancelButton: true,  // Allow the user to cancel
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to select Time In or Time Out'; // Validation message
                }
            }
        }).then((result) => {
            // When the user confirms, handle the selection

            if (result.value != "undefined") {
                verifiedFaces = new Map();
                const selectedValue = result.value;
                attendance_type = selectedValue;
                loadModel();
                $("#faceScan").modal("show");
            }
        });
    
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
    function euclideanDistance(a, b) {
        console.log(a);
        console.log(b);
        // Check if both descriptors are arrays
        if (!Array.isArray(a) || !Array.isArray(b)) {
            console.error('Descriptors are not arrays', a, b);
            return Infinity;  // Return a high value if descriptors are invalid
        }
    
        // Calculate the Euclidean distance
        return Math.sqrt(a.reduce((sum, value, index) => sum + Math.pow(value - b[index], 2), 0));
    }
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

                    verificationStatus.textContent = 'Face Detected!';
                    if (faceDescriptor) {
                        const stringifyPredictionData = JSON.stringify(faceDescriptor);
                        
                       

                        let isMatched = false;
                        verifiedFaces.forEach((_, savedFaceDescriptor) => {

                            console.log("Saved face descriptor:", savedFaceDescriptor);
                            const savedDescriptor = JSON.parse(savedFaceDescriptor);
                            let savedDescriptorArray = Object.values(savedDescriptor);
                            let faceDescriptorArray = Object.values(faceDescriptor);
                            // Calculate Euclidean distance between incoming and saved descriptors
                            const distance = euclideanDistance(savedDescriptorArray, faceDescriptorArray);
                
                            // Set a threshold for matching, e.g., 0.6
                            if (distance < 0.6) {
                                isMatched = true;
                                console.log('Face already matched with an existing one!');
                            }
                        });
                
                        // If no match found, save the new face descriptor
                        if (!isMatched) {
                            verifiedFaces.set(stringifyPredictionData, true);
                            console.log('New face captured!');
                            captureFace();
                        } else {
                            console.log('Face already verified, no need to capture again.');
                        }

                    }
                } else {
                    verificationStatus.textContent = 'No Face Detected.';
                }
            }
        }, 2000); // Update every 100ms
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
                    student.ajax.get({
                        student_id:student_id,
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
            var payload  = {
                event_id:event_id,
                type:attendance_type,
                descriptor:JSON.stringify(Array.from(capturedFaceDescriptor))
            }
            event_room.ajax.recognize_face_event_attendance(payload).then((response)=>{
                jsAddon.display.swalMessage(true,response.reason);
            })
           
        } else {
            messageElement.textContent = 'No face detected to capture.';
        }
    }

    async function captureImage(){
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a base64 string
        const base64Image = canvas.toDataURL('image/jpeg');
        student_image = base64Image;
        // Display the base64 string in the textarea
        $("#scan-prewview").attr({
            src:base64Image
        })
        // base64Result.value = base64Image;

    }

    // Save the captured face descriptor to the server
    function saveFaceDescriptor(faceDescriptor) {
        let payload =  { descriptor: JSON.stringify(Array.from(faceDescriptor)), student_id: student_id,student_image:student_image }
        student.ajax.update_face(payload);
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
    // $('#capture').on('click', function() {
    //     captureFace();
    // });

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
