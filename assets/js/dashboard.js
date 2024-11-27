var dashboard = {
    init:()=>{
        let token = localStorage.getItem("token")

        if(token == null){
            jsAddon.display.removeItem('session');
            jsAddon.display.removeItem('token');
            window.location.href = base;
        }
        dashboard.ajax.checkToken().then((data)=>{
            if(data){
                var session =   jsAddon.display.getSessionData('session');
                // session = atob(session);
                // alert(JSON.stringify(session))
                $("#dash-name").text(session.full_name);
            }  
        })
    },
    ajax:{
        checkToken:()=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${check_token_api}`,
                    dataType:'json',
                }).then((response)=>{
                    resolve(!response._isError)
                })
                 
            })
        },
        logout:()=>{
            Swal.fire({
                title: 'Ready to Leave?',
                text: "Select (Logout) below if you are ready to end your current session.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Logout'
            }).then((result) => {
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addfullPageLoader();
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:logoutApi,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                            localStorage.clear();
                            setTimeout(() => {
                                window.location.href = baseUrl;
                            }, 2000);
                        }
                    })
                     
                })
            })
        }
    }
}
dashboard.init();

$(".logout").click(function(){
    isLogout = true;
    dashboard.ajax.logout();
})