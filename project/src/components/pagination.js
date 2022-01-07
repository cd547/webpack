import PaginationTpl from '../views/userList-Pagination.art'
//import page from "../databus/page"

const _setCurrentPage = (index) => {
    $('#userList-Pagination #users-pagination li:not(:first-child,:last-child)')
        .eq(index - 1)
        .addClass('active').siblings().removeClass('active');
}

const pagination = (data,page) => {

    const total = data.length;//数据总条数
    const pageCount = Math.ceil(total / page.pageSize);//页数
    //const pageArray = [...new Array(pageCount).keys()];//或者，使用Array自带的keys方法
    const pageArray = Array.from({ length: pageCount }, (item, index) => index + 1);//生成序列
    //const pageArray =new Array(pageCount)
    //console.log(pageArray)
    const htmlPage = PaginationTpl({
        pageArray
    });
    $('#userList-Pagination').html(htmlPage);
    _setCurrentPage(page.currentPage);
    _bindEvent(data,page);
}
//分页事件绑定
const _bindEvent = (data,page) => {
    //分页事件
    $('#userList-Pagination').on('click', '#users-pagination li:not(:first-child,:last-child)', function (e) {
        e.preventDefault();
        const index = $(this).index();

        //_getList(index);
        // currentPage = index;
        page.setCurrentPage(index)
        //通知外部
        $('body').trigger("changeCurrentPage", page.currentPage)

        _setCurrentPage(page.currentPage);
    })
    $('#userList-Pagination').on('click', '#users-pagination li:first-child', function (e) {
        e.preventDefault();
        if (page.currentPage > 1) {
            page.setCurrentPage(page.currentPage - 1);
            //通知外部
            $('body').trigger("changeCurrentPage", page.currentPage)
            //_getList(currentPage);

        }
        _setCurrentPage(page.currentPage);
    })
    $('#userList-Pagination').on('click', '#users-pagination li:last-child', function (e) {
        e.preventDefault();
        if (page.currentPage < Math.ceil(data.length / page.pageSize)) {
            page.setCurrentPage(page.currentPage + 1);
            //_getList(currentPage);
            //通知外部
            $('body').trigger("changeCurrentPage", page.currentPage)
        }
        _setCurrentPage(page.currentPage);
    })
}


export default pagination