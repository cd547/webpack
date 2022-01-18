//import dataListAddModalTpl from '../../views/dataList/dataList-AddModal.art'
import { dataAdd as dataAddModel, dataAdd_file as dataAddFileModel,dataFindOne as dataFindOneModel,
    dataEdit as dataEditModel, dataEdit_file as dataEditFileModel
} from "../../models/dataModel"
//添加用户
export const addData = (modelName, data_modalLabel, dataListAddFormTpl, addUrl, otherData) => {
    if (dataListAddFormTpl) {
        const html = dataListAddFormTpl({ modelName, data_modalLabel, otherData })
        $("#" + modelName + "_dataList").after(html);
        //添加动作
        const _addData = async () => {

            try {
                let form_enctype = $('#' + modelName + '_data_form').attr('enctype')
                let result
                if (form_enctype == "multipart/form-data") {
                    var form = new FormData($('#' + modelName + '_data_form')[0]);
                    result = await dataAddFileModel(addUrl, form)
                }
                else {
                    const data = $('#' + modelName + '_data_form').serialize();
                    result = await dataAddModel(addUrl, data)
                }

                if (result.success) {
                    if (result.message == 'ok') {
                        toastr.success("添加成功");
                        //表单重置
                        $('#' + modelName + '_data_form')[0].reset();
                        //数据页面刷新
                        $('body').trigger("addData_" + modelName)
                        //await _loadData();
                        //$('#username,#password').val('');
                        const $btnClose = $("#" + modelName + "_data_modal_close");
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
                toastr.error(e)
            }
        }
        $('#' + modelName + '_data_save').off("click").on('click', _addData)
    }
}
export const editData=async (modelName,id,data_modalLabel,dataListEditFormTpl,findUrl,editUrl,otherData)=>{
    if (dataListEditFormTpl) {
        //clean
        if($("#" + modelName + "_dataEdit_modal").length>0){
            $("#" + modelName + "_dataEdit_modal").remove();
        }
        //find
        let findData=null;
        let result = await dataFindOneModel(findUrl, {id})
        if (result.success) {
            findData=result.data
            const html = dataListEditFormTpl({ modelName, data_modalLabel,findData, otherData})
            $("#" + modelName + "_dataList").after(html);
        }
       
        $('#'+modelName+'_dataEdit_modal').modal('show')
        //更新动作
        const _editData = async () => {

            try {
                let form_enctype = $('#' + modelName + '_dataEdit_form').attr('enctype')
                let result
                if (form_enctype == "multipart/form-data") {
                    var form = new FormData($('#' + modelName + '_dataEdit_form')[0]);
                    result = await dataEditFileModel(editUrl, form)
                }
                else {
                    const data = $('#' + modelName + '_dataEdit_form').serialize();
                    result = await dataEditModel(editUrl, data)
                }

                if (result.success) {
                    if (result.message == 'ok') {
                        toastr.success("修改成功");
                        //数据页面刷新
                        $('body').trigger("editData_" + modelName)
                        //await _loadData();
                        //$('#username,#password').val('');
                        const $btnClose = $("#" + modelName + "_dataEdit_modal_close");
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
        $('#' + modelName + '_dataEdit_save').off("click").on('click', _editData)
    }
}

