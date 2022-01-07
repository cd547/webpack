import '../../public/plugins/jq-paginator/jq-paginator.min.js'
import { auth as authModel } from "../../models/authModel"
import dataListTpl from '../../views/dataList/dataList.art'//整体页面
import { addData } from './addData'
import { dataListPagination as dataListPagModel, dataRemove as dataRemoveModel, dataSchema as dataSchemaModel } from "../../models/dataModel"
import dataTable from '../../components/table'//表格组件
import { jqInit, jqDestory } from '../../components/jqPagination'//分页组件
const sd = require('silly-datetime');
//////////////////////////////////////////
let dataList_DataTpl = null
let modelName = null
let data_modalLabel = null
let g_pageSize = 5 //每页显示多少
let dataPagUrl = null
let dataRemoveUrl = null
let dataAddUrl = null
let table_thsTpl = null
let g_otherData=null
///////////////////////////////////////////////////

let $jqPag
let $table
let g_currentPage = 1
let g_totalPage = null
let g_dataLength = 0
let g_queryString = ""

const _loadData = async (currentPage, pagesize, queryString = "",) => {
    try {
        const queryurl = "page=" + currentPage + "&keyword=" + queryString + "&pagesize=" + pagesize
        let result = await dataListPagModel(dataPagUrl, queryurl)
        if (result.success) {
            if (result.data) {
                if (result.data.length == 0) {
                    toastr.warning('无数据')
                }
                g_queryString = queryString
                g_totalPage = result.totalPages
                g_currentPage = currentPage
                g_dataLength = result.data.length || 0
                g_pageSize = pagesize
                dataTable(modelName, $table, dataList_DataTpl,{ data: result.data, num: (result.page - 1) * result.pageSize, format: sd.format, otherData: g_otherData }, ".remove-data")
                jqInit($jqPag, Number(result.totalPages), 5, Number(result.page), modelName)
                $("#" + modelName + "_dataPage_info").html("查询关键字\"" + g_queryString + "\" 共" + result.totalPages + "页/" + result.total + "条");
            }
        }
        else {
            //查询出错
            toastr.warning(result);
        }
    }
    catch (e) {
        //意外错误
        console.log(e)
        g_currentPage = 1
        g_queryString = ""
        jqDestory($jqPag)
        _loadData(g_currentPage, g_pageSize, g_queryString)
        toastr.error("出错了！" + e)
    }
}

//注册事件
const _subscribe = () => {
    //用户添加
    $('body').off("addData_" + modelName).on('addData_' + modelName, (e, index) => {
        g_currentPage = 1
        jqDestory($jqPag)
        _loadData(g_currentPage, g_pageSize, g_queryString);
    })
    //用户删除
    $('body').off("deletedata_" + modelName).on('deletedata_' + modelName, async (e, index) => {
        console.log("deletedata_" + modelName)
        let data = { id: index }
        try {
            let result = await dataRemoveModel(dataRemoveUrl, data)
            if (result.message != "ok") {
                toastr.error('删除失败，或者数据以不存在')
                return
            }
            else {
                toastr.success("删除" + result.data.username + "成功")
            }
            const currentPage_totle = g_totalPage == g_currentPage;
            const lastPageRestList = g_dataLength == 1;
            const notFirstPage = g_currentPage > 1;
            if (currentPage_totle && notFirstPage && lastPageRestList) {
                g_currentPage = g_currentPage - 1
            }
            jqDestory($jqPag)
            _loadData(g_currentPage, g_pageSize, g_queryString);

        } catch (e) {
            console.log(e)
            toastr.error(e.statusText)
        }
    })
    //页码切换
    $('body').off("jqPagPageChange_" + modelName).on('jqPagPageChange_' + modelName, async (e, param) => {
        let num = param.num
        let type = param.type
        try {
            if (type == "change") {
                //页码改变
                const newqueryurl = "page=" + num + "&keyword=" + g_queryString + "&pagesize=" + g_pageSize
                let result = await dataListPagModel(dataPagUrl, newqueryurl)
                if (result.success) {
                    if (result.data) {
                        if (result.data.length == 0) {
                            toastr.warning('无数据')
                        }
                        //有数据
                        g_currentPage = num
                        g_queryString = g_queryString
                        if (g_totalPage != result.totalPages) {
                            //总页数有改变，重新分页
                            toastr.warning("数据页数发生变动,重新载入")
                            if (g_currentPage > result.totalPages) {
                                //页码超出最大页码时
                                g_currentPage = result.totalPages
                            }
                            jqDestory($jqPag)
                            _loadData(g_currentPage, g_pageSize, g_queryString)
                        }
                        else {
                            //直接渲染表格
                            dataTable(modelName, $table, dataList_DataTpl,{ data: result.data, num: (result.page - 1) * result.pageSize, format: sd.format, otherData: g_otherData },".remove-data")
                            g_dataLength = result.data.length
                            $("#" + modelName + "_dataPage_info").html("查询关键字\"" + g_queryString + "\" 共" + result.totalPages + "页/" + result.total + "条");
                        }
                    }
                }
            }
        }
        catch (e) {
            console.log(e)
            toastr.danger(e.statusText)
        }
    })
}

const _motheds = () => {
    //添加按钮
    $('#' + modelName + '_add_data_btn').off("click").on("click", addData(modelName, data_modalLabel, dataAddUrl))
    //搜索
    $('#' + modelName + '_dataList_search_btn').off("click").on("click", function () {
        let keyword = $('#' + modelName + '_dataList_search').val()
        console.log(keyword)
        if (new RegExp(/\\/).test(keyword)) {
            toastr.warning("请不要包含特殊字符")
            return
        }
        g_queryString = ""
        g_currentPage = 1
        if (keyword) {
            g_queryString = keyword.replace(/\*/g, "\\*")
        }
        _loadData(g_currentPage, g_pageSize, g_queryString)
        $('#' + modelName + '_dataList_search').val('')
    })
}
/**
 * router
 * @param {*} i_modelName 表名
 * @param {*} i_dataList_DataTpl  数据模板
 * @param {*} i_table_thsTpl 表头模板
 * @param {*} i_data_modalLabel 模态框标题
 * @param {*} i_g_pageSize 每页显示多少
 * @param {*} i_dataPagUrl 分页api
 * @param {*} i_dataRemoveUrl 删除api
 * @param {*} i_dataAddUrl 添加api
 * @param {*} i_otherData 数据模板中的其他数据

 */
const listData = (i_modelName, i_dataList_DataTpl, i_table_thsTpl, i_data_modalLabel, i_g_pageSize, i_dataPagUrl, i_dataRemoveUrl, i_dataAddUrl,i_otherData=null) => {
    return async (req, res, next) => {
        try {
            let result = await authModel()
            //console.log(req)
            if (result.message != "ok") {
                console.log("!ok")
                res.go("/login")
            }
            else {
                dataList_DataTpl = i_dataList_DataTpl
                modelName = i_modelName
                data_modalLabel = i_data_modalLabel
                g_pageSize = i_g_pageSize
                dataPagUrl = i_dataPagUrl
                dataRemoveUrl = i_dataRemoveUrl
                dataAddUrl = i_dataAddUrl
                table_thsTpl = i_table_thsTpl
                g_queryString = ""
                g_currentPage = 1
                g_otherData=i_otherData
                res.render(dataListTpl({ modelName: modelName, table_th: table_thsTpl }))
                $jqPag = $('#' + modelName + '_dataList_Pagination')
                $table = $('#' + modelName + '_dataList_Data')
                _loadData(g_currentPage, g_pageSize, g_queryString)
                _subscribe()
                //事件绑定
                _motheds()
            }
        }
        catch (e) {
            console.log(e);
            res.go("/login")
        }

    }

}

export {
    listData,
}