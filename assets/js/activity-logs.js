var activity_logs_id = null;
var table = null;
var activity_logs = {
    init:()=>{
        activity_logs.ajax.get();
    },
    ajax:{

        get:(payload)=>{
            return new Promise((resolve,reject)=>{
                jsAddon.display.ajaxRequest({
                    type:'get',
                    url:`${get_activity_logs_api}`,
                    dataType:'json',
                    payload:payload,
                }).then((response)=>{
                    $("#activity-logs-table tbody")
                    .empty()
                    .append(
                        $("<tr>")
                            .append(
                                $("<td colspan='5'>")
                                    .addClass("text-center")
                                    .append(
                                        $("<i>").addClass("fa fa-spinner fa-spin"),
                                        ' Loading...'
                                    )
                            )
                    )
                    if ($.fn.DataTable.isDataTable("#activity-logs-table")) {
                        table.clear();
                        table.destroy();
                        $("#activity-logs-table tbody").empty();
                    }
                  
                    if(!response.isError){
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                let name = `${v.firstname} ${v.lastname} ${v.lastname}`
                                $("#activity-logs-table tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>").text(v.id),
                                                $("<td>").text(name),
                                                $("<td>").text(v.activity_type),
                                                $("<td>").text(v.activity_details),
                                                $("<td>").text(v.created_at),
                                            )
                                    )
                                    if (Object.keys(response.data).length - 1 == k) {
                                        $("#activity-logs-table tbody").find("i").closest("tr").remove();
                                        resolve(true);
                                    }
                            })  
                        }else{
                            resolve(true);
                        }
                    }else{
                        $("#activity-logs-table tbody")
                        .empty();
                        resolve(true);
                    }
                })
            })
            .then(data=>{
                if(data){
                    table = $("#activity-logs-table").DataTable({
                        "autoWidth":false, 
                    });
                    jsAddon.display.removefullPageLoader()
                }
            })
        },
    }
}

activity_logs.init();

