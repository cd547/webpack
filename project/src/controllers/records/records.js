import record_dataList_DataTpl from '../../views/records/records-Data.art'//数据模板
import record_table_thsTpl from '../../views/records/records-th.art'//数据模板
import { listData } from '../data/listData'//页面模块
const records = (router) => {
    const modelName = "record" //表名
    const record_data_modalLabel = "记录"//模态框标题
    let g_pageSize = 5 //每页显示多少
    let record_dataPagUrl = "/api/v1/records/recordsPag" //分页api
    let record_dataRemoveUrl = ""//删除api
    let record_dataAddUrl = ""//添加api
    //init()
   let a= listData(modelName,record_dataList_DataTpl,record_table_thsTpl({}),record_data_modalLabel,g_pageSize,record_dataPagUrl,record_dataRemoveUrl,record_dataAddUrl,{jsurl:"./public/plugins/sparklines/sparkline.js"})

   return a
}

export {
    records
}