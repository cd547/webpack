import indexTpl from '../views/index.art'

import { auth as authModel } from "../models/authModel"
import {loginOut as loginOutModel} from "../models/loginModel"
import pageHeader from '../components/pageheader'


const index = (router) => {
    return async (req, res, next) => {
        console.log("cindex")
            try {
                let result = await authModel()

                if (result.message != "ok") {
                    console.log("!ok")
                    res.go("/login")
                }
                else {
                    //res.render(indexTpl({}))
                    const html = indexTpl({ subRouter: res.subRoute() })
                    next(html)
                    $("body").attr("class", "hold-transition sidebar-mini");
                    //加载页面导航
                    pageHeader()
                    //配置消息框
                    toastr.options = {  
                        closeButton: true,  
                        showDuration: "300",  
                        hideDuration: "1000",  
                        timeOut: "2500",  
                        extendedTimeOut: "2000",  
                    };  
                    //注销
                    $('#loginout').on("click", async function (e) {
                        e.preventDefault();//或者a连接里：javascript:(0)
                        try {
                            let result = await loginOutModel()
                            if (result.success) {
                                if (result.message == 'ok') {
                                    localStorage.removeItem('login-token');
                                    router.go('/login')
                                }
                                else {
                  
                                    toastr.warning(result.data);
                                }
                            }
                            else {
    
                                toastr.warning(result.data);
                            }
                        }
                        catch (e) {
    
                            toastr.error(e.statusText)
                        }

                    })
                    //高亮
                    let hash = location.hash
                    $("#sidebar-menu li a").removeClass("active").filter(`[href='${hash}']`).addClass("active").parent().addClass("active").siblings().removeClass('active')


                }
            }
            catch (e) {
                console.log(e);
                res.go("/login")
            }
        


    }
}

export {
    index
}