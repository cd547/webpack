import indexPageHeaderTpl from '../views/index-pageheader.art'
const pageHeader=()=>{
   
    const nav={
        '#/index':{
            mainNav:"主页",
            subNav:""
        },
        '#/index/users':{
            mainNav:"用户管理",
            subNav:"用户列表"
        },
        '#/index/article':{
            mainNav:"内容管理",
            subNav:"内容列表"
        },
        '#/index/weusers':{
            mainNav:"微信用户管理",
            subNav:"微信用户列表"
        },
        '#/index/records':{
            mainNav:"记录管理",
            subNav:"记录列表"
        }
    }
    const hash=location.hash
    console.log(hash)
    const html=indexPageHeaderTpl({
        mainNav:nav[hash]["mainNav"],
        subNav:nav[hash]["subNav"]
    })
    $('#mainContent').before(html)
}

export default pageHeader