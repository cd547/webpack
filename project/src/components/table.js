

/*
    tableName:数据表名
    $table:元素节点（tbody）
    tplurl:模板路径
    data:数据内容
    removeClassName:删除按钮的类名
    num:序号开始值默认0
*/
// const table=(tableName,$table,tableTpl,data,removeClassName,num=0)=>{
//         $table.html(tableTpl({ data: data, num: num,format:sd.format,otherData:obj}));
//         _bindEvent(tableName,$table,removeClassName) 
// }
const table=(tableName,$table,tableTpl,tplData,removeClassName,editClassName)=>{
   let { data, num, format, otherData }=tplData
    $table.html(tableTpl({modelName:tableName,data, num, format, otherData}));
    _bindEvent(tableName,$table,removeClassName,editClassName,otherData.indexName) 
   // console.log(otherData.deleteNam)
}
const _bindEvent=(tableName,$table,removeClassName,editClassName,indexName=null)=>{
    //console.log(deleteName)
    //删除,先解除删除按钮的绑定事件
    $table.off('click', removeClassName).on('click', removeClassName, function (e) {
        e.preventDefault();
        //通知外部有数据删除
        $('body').trigger("deletedata_"+tableName,[$(this).data('id'),indexName] )
    })
    //编辑
    $table.off('click', editClassName).on('click', editClassName, function (e) {
        e.preventDefault();
        //通知外部有数据更新
        $('body').trigger("editdataModal_"+tableName,[$(this).data('id'),indexName] )
    })

}
export default table