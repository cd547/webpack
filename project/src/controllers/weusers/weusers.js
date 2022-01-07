import user_dataList_DataTpl from '../../views/weusers/weusers-Data.art'//数据模板
import user_table_thsTpl from '../../views/weusers/weusers-th.art'//数据模板
import { listData } from '../data/listData'//页面模块


const weusers = (router) => {
    const modelName = "weusers" //表名
    const user_data_modalLabel = "用户"//模态框标题
    let g_pageSize = 5 //每页显示多少
    let user_dataPagUrl = "/api/v1/weusers/weusersPag" //分页api
    let user_dataRemoveUrl = "/api/v1/weusers/"//删除api
    let user_dataAddUrl = "/api/v1/weusers/"//添加api
    //init()
   return listData(modelName,user_dataList_DataTpl,user_table_thsTpl({}),user_data_modalLabel,g_pageSize,user_dataPagUrl,user_dataRemoveUrl,user_dataAddUrl)

}

export {
    weusers
}