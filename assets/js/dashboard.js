var dashboard = {
    init:()=>{
        let token = localStorage.getItem("token")
        if(token == null){
            localStorage.removeItem('session');
            localStorage.removeItem('token');
            window.location.href = base;
        }
        dashboard.ajax.checkToken().then((data)=>{
            if(data){
                var session =   localStorage.removeItem('session');
                session = atob(session);
                alert(session)
                $("#dash-name").text();
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
    }
}
dashboard.init();