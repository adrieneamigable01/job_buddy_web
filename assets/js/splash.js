var splash = {
    init:()=>{
        // document.querySelector('.loading-container').style.display = 'none';
        let token = localStorage.getItem("token")
        if(token == null){
            jsAddon.display.removeItem('session');
            jsAddon.display.removeItem('token');
            window.location.href = base;
        }
        splash.ajax.checkToken().then((data)=>{
            setTimeout(() => {
                if(data){
                    window.location.href = 'dashboard.php';
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
