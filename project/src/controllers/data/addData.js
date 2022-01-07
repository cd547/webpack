import dataListAddModalTpl from '../../views/dataList/dataList-AddModal.art'
import { dataAdd as dataAddModel } from "../../models/dataModel"
//添加用户
export const addData = (modelName,data_modalLabel,addUrl) => {
     const html = dataListAddModalTpl({modelName,data_modalLabel})
     $("#"+modelName+"_dataList").after(html);
    //添加动作
    const _addUser = async () => {
        const data = $('#'+modelName+'_data_form').serialize();
        try {
            let result = await dataAddModel(addUrl,data)
            if (result.success) {
                if (result.message == 'ok') {
                    toastr.success("添加成功");
                    //数据页面刷新
                    $('body').trigger("addData_"+modelName)
                    //await _loadData();
                    //$('#username,#password').val('');
                    const $btnClose = $("#"+modelName+"_data_modal_close");
                    $btnClose.trigger("click");
                    
                }
                else {
                    toastr.warning(result.data.message);
                }
            }
            else {
                toastr.warning(result.data);
            }
        }
        catch (e) {
            toastr.error(e.statusText)
        }

       
    }
    $('#'+modelName+'_data_save').off("click").on('click', _addUser)

}

