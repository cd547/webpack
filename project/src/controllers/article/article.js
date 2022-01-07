import article_dataList_DataTpl from '../../views/article/article-Data.art'//数据模板
import article_table_thsTpl from '../../views/article/article-th.art'//数据模板
import { listData } from '../data/listData'//页面模块


const article = (router) => {
    const modelName = "article" //表名
    const article_data_modalLabel = "文章"//模态框标题
    let g_pageSize = 5 //每页显示多少
    let article_dataPagUrl = "/api/v1/article/articlePag" //分页api
    let article_dataRemoveUrl = "/api/v1/article/"//删除api
    let article_dataAddUrl = "/api/v1/article/"//添加api
    //init()
   return listData(modelName,article_dataList_DataTpl,article_table_thsTpl({}),article_data_modalLabel,g_pageSize,article_dataPagUrl,article_dataRemoveUrl,article_dataAddUrl)

}

export {
    article
}