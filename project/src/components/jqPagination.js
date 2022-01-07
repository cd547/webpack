import '../public/plugins/jq-paginator/jq-paginator.min.js'
//$pagination:分页容器的节点
//tableName:切换页码的触发事件名
let jqInit = ($pagination,totalPages,visiblePages,currentPage,tableName)=>{
        $pagination.jqPaginator({
            totalPages: totalPages,
            visiblePages: visiblePages,
            currentPage: currentPage,
            first: '<li class="first paginate_button page-item"><a class="page-link" href="javascript:;">首页<\/a><\/li>',
            prev: '<li class="prev paginate_button page-item"><a class="page-link" href="javascript:;">上一页<\/a><\/li>',
            next: '<li class="next paginate_button page-item"><a class="page-link" href="javascript:;">下一页<\/a><\/li>',
            last: '<li class="last paginate_button page-item"><a class="page-link" href="javascript:;">尾页<\/a><\/li>',
            page: '<li class="page paginate_button page-item"><a class="page-link" href="javascript:;">{{page}}<\/a><\/li>',
            onPageChange: function (num, type) {
                //console.log("onPageChange"+num+type)
                //通知外部
                $('body').trigger("jqPagPageChange_"+tableName,{num,type})
            }
        })
    }
let jqDestory=($pagination)=>{
        $pagination.jqPaginator('destroy');
}

export {jqInit,jqDestory}