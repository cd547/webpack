import user_dataList_DataTpl from '../../views/users/users-Data.art'//数据模板
import user_table_thsTpl from '../../views/users/users-th.art'//数据模板

import { listData } from '../data/listData'//页面模块

const users = (router) => {
    const modelName = "users" //表名
    const user_data_modalLabel = "用户"//模态框标题
    let g_pageSize = 5 //每页显示多少
    let user_dataPagUrl = "/api/v1/users/usersPag" //分页api
    let user_dataRemoveUrl = "/api/v1/users/"//删除api
    let user_dataAddUrl = "/api/v1/users/"//添加api
    //init()
   let a= listData(modelName,user_dataList_DataTpl,user_table_thsTpl({}),user_data_modalLabel,g_pageSize,user_dataPagUrl,user_dataRemoveUrl,user_dataAddUrl)
   
   
   return a
}

export {
    users
}