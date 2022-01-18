import user_dataList_DataTpl from '../../views/weusers/weusers-Data.art'//数据模板
import user_table_thsTpl from '../../views/weusers/weusers-th.art'//数据模板
import weuser_AddFormTpl from '../../views/weusers/weuser-AddForm.art'
import weuser_EditFormTpl from '../../views/weusers/weuser-EditForm.art'
import { listData } from '../data/listData'//页面模块


const weusers = (router,headerContext) => {
    headerContext=$('#msg-list').html()
    const modelName = "weusers" //表名
    const user_data_modalLabel = "微信用户"//模态框标题
    let g_pageSize = 5 //每页显示多少
    let weuser_dataPagUrl = "http://101.34.125.200:3547/api/v1/weusers/weusersPag" //分页api
    let weuser_dataRemoveUrl = "http://101.34.125.200:3547/api/v1/weusers/"//删除api
    let weuser_dataAddUrl = "http://101.34.125.200:3547/api/v1/weusers/"//添加api
    let weuser_dataEditUrl=""//更新api
    let weuser_dataFindUrl=""//更新前查找
    let events_data=["add","search"]
    let otherData={
        indexName:"openid"
    }
   return listData(modelName,user_dataList_DataTpl,user_table_thsTpl({}),user_data_modalLabel,g_pageSize,weuser_dataPagUrl,weuser_dataRemoveUrl,weuser_dataAddUrl,weuser_AddFormTpl,weuser_dataEditUrl,weuser_EditFormTpl,weuser_dataFindUrl,events_data,otherData)

}

export {
    weusers
}