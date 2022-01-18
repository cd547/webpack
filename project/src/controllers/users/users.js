import user_dataList_DataTpl from '../../views/users/users-Data.art'//数据模板
import user_table_thsTpl from '../../views/users/users-th.art'//数据模板
import user_AddFormTpl from '../../views/users/user-AddForm.art'
import user_EditFormTpl from '../../views/users/user-EditForm.art'//更新模板
import { listData } from '../data/listData'//页面模块

const users = (router,headerContext) => {
    headerContext=$('#msg-list').html()
    const modelName = "users" //表名
    const user_data_modalLabel = "用户"//模态框标题
    let g_pageSize = 5 //每页显示多少
    let user_dataPagUrl = "http://101.34.125.200:3547/api/v1/users/usersPag" //分页api
    let user_dataRemoveUrl = "http://101.34.125.200:3547/api/v1/users/"//删除api
    let user_dataAddUrl = "http://101.34.125.200:3547/api/v1/users/"//添加api
    let user_dataEditUrl = "http://101.34.125.200:3547/api/v1/users/"//更新api
    let user_dataFindUrl=""//更新前查找
    let events_data=["add","search"]
    let otherData={
        indexName:"username"
    }
   let a= listData(modelName,user_dataList_DataTpl,user_table_thsTpl({}),user_data_modalLabel,g_pageSize,user_dataPagUrl,user_dataRemoveUrl,user_dataAddUrl,user_AddFormTpl,user_dataEditUrl,user_EditFormTpl,user_dataFindUrl,events_data,otherData)
   
   return a
}

export {
    users
}