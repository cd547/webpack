class Page{
    constructor(){
        this.pageSize=3;
        this.currentPage=1;
    }
    setCurrentPage(currentPage){
        this.currentPage=currentPage
    }
}
export default new Page();