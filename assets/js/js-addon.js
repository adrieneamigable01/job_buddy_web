jsAddon = {
    display:{
        getDate:(date) => {
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        swalMessage:(indicator,message)=>{

            icon = !indicator ? 'success' : 'error';
            
            let Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: icon,
                title: message
              })
        },
        addFormLoading:(elem)=>{
            $(elem).find("input").prop("disabled",'disabled');
            $(elem).find("select").prop("disabled",'disabled');
            $(elem).find("textarea").prop("disabled",'disabled');
            $(elem).find("button").prop("disabled",'disabled');
            $(elem).find("button[type=submit]").prepend(
                $("<i>")
                    .addClass('fas fa-spinner fa-spin')
            )
        },
        removeFormLoading:(elem)=>{
            $(elem).find("input").prop("disabled",'');
            $(elem).find("select").prop("disabled",'');
            $(elem).find("textarea").prop("disabled",'');
            $(elem).find("button").prop("disabled",'');
            $(elem).find("i").remove();
        },
        addfullPageLoader:()=>{
            $(".loading").show();
        },
        removefullPageLoader:()=>{
            $(".loading").hide();
        },
        setSessionData:(name,data)=>{
            localStorage.setItem(name,btoa(JSON.stringify(data)));
        },
        getSessionData:(name)=>{
            $data = localStorage.getItem(name);
            return JSON.parse(atob($data))
        },
        getSessionDataNoParse:(name)=>{
            data = localStorage.getItem(name);
            singleQ =  atob(data.replace(/"/g, ''));
            return singleQ.replace(/"/g, "");
        },
        deleteSesionDAta:(name)=>{
            sessionStorage.deleteSesionDAta(name);
        },
        showConfirmMessage:(payload = null)=>{
            payload.icon = payload.hasOwnProperty('icon') ? payload.icon : 'warning';
            payload.title = payload.hasOwnProperty('icon') ? payload.title : 'Do you want to save the changes?';
            payload.showCancelButton =  payload.hasOwnProperty('showCancelButton') ? payload.showCancelButton :true;
            payload.confirmButtonText =  payload.hasOwnProperty('confirmButtonText') ? payload.confirmButtonText :"Save";
            payload.text = payload.hasOwnProperty('text') ? payload.text :"Error";
            Swal.fire({
                icon: payload.icon,
                title: payload.title,
                showCancelButton: payload.showCancelButton,
                confirmButtonText: payload.confirmButtonText,
                text:payload.text,
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
    
                if (result.value) {
                    if( payload.hasOwnProperty('redirectLink') ){
                        window.location.href = payload.redirectLink;
                    }
                }
            });
        },
        userdata:()=>{
            return localStorage.getItem('session')!= null ? JSON.parse(atob(localStorage.getItem('session'))) : null;
        },
        ajaxChecking:(payload)=>{
            let token = jsAddon.display.getSessionDataNoParse('token');
            payload.icon = payload.hasOwnProperty('type') ? payload.type : 'get';
            payload.url = payload.hasOwnProperty('url') ? payload.url : '/';
            payload.dataType =  payload.hasOwnProperty('dataType') ? payload.dataType : 'json';
            payload.payload =  payload.hasOwnProperty('payload') ? payload.payload : {};
            // payload.payload['token'] = token;
            return new Promise((res,rej)=>{

                
                $.ajax({
                    type:payload.type,
                    url:payload.url,
                    dataType:payload.dataType,
                    data:payload.payload,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    error:function(xhr, status, error){
                        res(false)
                    },
                    success:function(response){
                        res(!response._isError)
                        
                    }
                })
            })
        },
        ajaxRequest:(payload)=>{
            let token = jsAddon.display.getSessionDataNoParse('token');
            payload.icon = payload.hasOwnProperty('type') ? payload.type : 'get';
            payload.url = payload.hasOwnProperty('url') ? payload.url : '/';
            payload.dataType =  payload.hasOwnProperty('dataType') ? payload.dataType : 'json';
            payload.payload =  payload.hasOwnProperty('payload') ? payload.payload : {};
            // payload.payload['token'] = token;
            return new Promise((res,rej)=>{

                
                $.ajax({
                    type:payload.type,
                    url:payload.url,
                    dataType:payload.dataType,
                    data:payload.payload,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    error:function(xhr, status, error){
                        console.log(`error : ${error}`)
                        console.log(`status : ${status}`)
                        jsAddon.display.removefullPageLoader()
                        let data = JSON.parse(xhr.responseText);
                        let payload = {
                            icon:'warning',
                            title:'System Error',
                            showCancelButton:false,
                            confirmButtonText:'Ok',
                            text:data.message
                        };
                        if(data._isError){
                            if(xhr.status == 401){
                                payload.redirectLink = 'index.php';
                                
                            }
                            jsAddon.display.showConfirmMessage(payload)
                            jsAddon.display.logout();
                        }
                    },
                    success:function(response){
                        // if(!response._isError){
                        //     res(response)
                        // }else{
                        //     jsAddon.display.showConfirmMessage({
                        //         icon:'warning',
                        //         title:'System Error',
                        //         text:response.reason,
                        //         showCancelButton:false,
                        //         confirmButtonText:'Ok',
                        //     })
                        // }
                        res(response)
                        
                    }
                })
            })
        },
        ajaxFilesRequest:(payload)=>{
            let token = jsAddon.display.getSessionDataNoParse('token');
            payload.icon = payload.hasOwnProperty('type') ? payload.type : 'get';
            payload.url = payload.hasOwnProperty('url') ? payload.url : '/';
            payload.dataType =  payload.hasOwnProperty('dataType') ? payload.dataType : 'json';
            payload.payload =  payload.hasOwnProperty('payload') ? payload.payload : {};
            return new Promise((res,rej)=>{

               
                $.ajax({
                    type:payload.type,
                    url:payload.url,
                    dataType:payload.dataType,
                    data:payload.payload,
                    contentType: false,
                    processData: false,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    error:function(xhr, status, error){
                        jsAddon.display.removefullPageLoader()
                        let data = JSON.parse(xhr.responseText);
                        let payload = {
                            icon:'warning',
                            title:'System Error',
                            showCancelButton:false,
                            confirmButtonText:'Ok',
                            text:data.message
                        };
                        if(data._isError){
                            if(xhr.status == 401){
                                payload.redirectLink = 'index.php';
                                
                            }
                            jsAddon.display.showConfirmMessage(payload)
                            jsAddon.display.logout();
                        }
                    },
                    success:function(response){
                        if(!response._isError){
                            res(response)
                        }else{
                            jsAddon.display.showConfirmMessage({
                                icon:'warning',
                                title:'System Error',
                                text:response.reason,
                                showCancelButton:false,
                                confirmButtonText:'Ok',
                            })
                        }
                        
                    }
                })
            })
        },
        objectToFormData:(obj, form, namespace) => {
            const formData = form || new FormData();
            let formKey;
    
            for (const property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (namespace) {
                        formKey = namespace + '[' + property + ']';
                    } else {
                        formKey = property;
                    }
    
                    if (obj[property] instanceof File) {
                        formData.append(formKey, obj[property]);
                    } else if (obj[property] instanceof Array) {
                        for (let i = 0; i < obj[property].length; i++) {
                            if (obj[property][i] instanceof File) {
                                formData.append(formKey + '[]', obj[property][i]);
                            } else {
                                formData.append(formKey + '[' + i + ']', obj[property][i]);
                            }
                        }
                    } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                        objectToFormData(obj[property], formData, formKey);
                    } else {
                        formData.append(formKey, obj[property]);
                    }
                }
            }
            return formData;
        },
        getQueryParam:(param) => {
            // Create a new URLSearchParams object from the current URL's query string
            const urlParams = new URLSearchParams(window.location.search);
            // Use the get() method to retrieve the value of the specified query parameter
            return urlParams.get(param);
        },
        formatNumber:(num, decimalPlaces = 2) => {
            if (isNaN(num)) return null; // Return null for invalid numbers
        
            // Convert to a fixed decimal format
            const fixedNum = num.toFixed(decimalPlaces);
            
            // Use a regular expression to add commas
            const number =  fixedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `₱ ${number}`;
        },
        convertTo12HourFormat:(time) =>{
            // Split the time into hours and minutes
            var timeParts = time.split(':');
            var hours = parseInt(timeParts[0], 10);
            var minutes = timeParts[1];
            
            // Determine AM or PM
            var period = hours >= 12 ? 'PM' : 'AM';
            
            // Convert to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12;  // If hour is 0 (midnight), convert to 12
            
            // Return formatted time
            return hours + ':' + minutes + ' ' + period;
        }
        
    }
}