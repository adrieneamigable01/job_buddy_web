var splash = {
    init:()=>{
        // document.querySelector('.loading-container').style.display = 'none';
        let token = localStorage.getItem("token")
        if(token == null){
            jsAddon.display.removeItem('session');
            jsAddon.display.removeItem('token');
            window.open('index.php',"_self");
        }
        splash.ajax.checkToken()
        .then((data)=>{
            setTimeout(() => {
                if(data){
                    let redirect = 'dashboard.php';
                    var session =   jsAddon.display.getSessionData('session');
                    if(session.user_type == "admin"){
                        window.location.href = redirect;
                    }else{
                        Swal.fire({
                            title: 'System Warning',
                            text: "You are not allowed on this page?",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonText: 'Back to Login',
                        }).then((result) => {
                            if (result.value) {
                                window.location.href = 'index.php';
                            }
                        });
                    }
                    
                } else{
                    window.location.href = 'index.php';
                }
            }, 3000);
        })
    },
    ajax:{
        checkToken:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxChecking({
                    type:'get',
                    url:`${check_token_api}`,
                    dataType:'json',
                }).then((response)=>{
                    resolve(response)
                })
                 
            })
        },
    }
}
splash.init();
