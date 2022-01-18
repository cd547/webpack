import article_dataList_DataTpl from '../../views/article/article-Data.art'//数据模板
import article_table_thsTpl from '../../views/article/article-th.art'//数据表头模板
import article_AddFormTpl from '../../views/article/article-AddForm.art'//添加模板
import article_EditFormTpl from '../../views/article/article-EditForm.art'//更新模板
import { listData } from '../data/listData'//页面模块


const article = (router,headerContext) => {

    headerContext=$('#msg-list').html()
    const modelName = "article" //表名
    const article_data_modalLabel = "文章"//模态框标题
    let g_pageSize = 5 //每页显示多少
    let article_dataPagUrl = "http://101.34.125.200:3547/api/v1/article/articlePag" //分页api
    let article_dataRemoveUrl = "http://101.34.125.200:3547/api/v1/article/"//删除api
    let article_dataAddUrl = "http://101.34.125.200:3547/api/v1/article/"//添加api
    let article_dataEditUrl="http://101.34.125.200:3547/api/v1/article/edit"//更新api
    let article_dataFindUrl="http://101.34.125.200:3547/api/v1/article/find"//更新前查找
    let otherData={
        indexName:"title",
        loginUserName:localStorage.getItem("login-user"),
        wysiwyg_css:"https://cdn.jsdelivr.net/gh/cd547/webpack/project/src/public/plugins/wysiwyg-editor/css/froala_editor.pkgd.min.css",
        wysiwyg_js:"https://cdn.jsdelivr.net/gh/cd547/webpack/project/src/public/plugins/wysiwyg-editor/js/froala_editor.pkgd.min.js",
        wysiwyg_lang:"https://cdn.jsdelivr.net/gh/cd547/webpack/project/src/public/plugins/wysiwyg-editor/js/languages/zh_cn.js",
        fileUpload_js:"https://cdn.jsdelivr.net/gh/cd547/webpack/project/src/public/plugins/bs-custom-file-input/bs-custom-file-input.min.js",
        uploadPicUrl:"http://101.34.125.200:3547/api/v1/article/uploadPic?token="+localStorage.getItem("login-token")
    }

    //init()
   return listData(modelName,article_dataList_DataTpl,article_table_thsTpl({}),article_data_modalLabel,g_pageSize,article_dataPagUrl,article_dataRemoveUrl,article_dataAddUrl,article_AddFormTpl,article_dataEditUrl,article_EditFormTpl,article_dataFindUrl,["add","search"],otherData)

}

export {
    article
}