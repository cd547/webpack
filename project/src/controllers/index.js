import indexTpl from '../views/index.art'
import mainMsgTpl from '../views/main-msg.art'
import { auth as authModel } from "../models/authModel"
import { loginOut as loginOutModel } from "../models/loginModel"
import pageHeader from '../components/pageheader'

const index = (router, socket, headerContext) => {
    return async (req, res, next) => {
        console.log("index")
        try {
            let result = await authModel()
            if (result.message != "ok") {
                console.log("!ok")
                router.go("/login")
            }
            else {
                //配置消息框
                toastr.options = {
                    closeButton: true,
                    showDuration: "300",
                    hideDuration: "1000",
                    timeOut: "2500",
                    extendedTimeOut: "2000",
                };
                if (headerContext == undefined) {
                    headerContext = '<a id="more_msg" href="#" class="dropdown-item dropdown-footer">更多消息</a>'
                }
                let pageData = {
                    username: result.data
                }
                const html = indexTpl({ subRouter: res.subRoute(), headerContext, pageData })
                next(html)
                $("body").attr("class", "hold-transition sidebar-mini");
                //加载页面导航
                pageHeader()

                //let isconnect=$('#sk').html()

                if (socket == undefined) {
                    console.log(socket)
                    socket = io.connect("http://101.34.125.200:3547", {
                        query: 'token=' + localStorage.getItem("login-token")
                    })
                    socket.on("connect", () => {
                        console.log(socket.connected, socket.id); // true
                        // $('#sk').html(socket.id)
                        toastr.success("连接建立了！");
                    });


                    socket.on('connected', function () {
                        toastr.success("已连上了！");
                        socket.emit('receive', "hello1");//向后端发送

                    })

                    socket.on('message', function (msg) {
                        if (msg.type == "add_msg") {
                            console.log(msg.loginUserName+localStorage.getItem("login-user"))
                            if(msg.loginUserName!=localStorage.getItem("login-user")){
                            let message_num = ~~$('#message_num').text()//~~字符串转整形，必须是整形
                            console.log(message_num)
                            $('#message_num').text(++message_num)
                            $('#msg-list').prepend(mainMsgTpl({ msg }))
                            headerContext = $('#msg-list').html()
                          
                                $('body').trigger("editData_article")
                            }
                            
                        }
                        else if (msg.type == "update_msg"){
                            if(msg.loginUserName!=localStorage.getItem("login-user")){
                            let message_num = ~~$('#message_num').text()//~~字符串转整形，必须是整形
                            console.log(message_num)
                            $('#message_num').text(++message_num)
                            $('#msg-list').prepend(mainMsgTpl({ msg }))
                            headerContext = $('#msg-list').html()
                           
                                $('body').trigger("editData_article")
                            }
                        }
                    })

                    socket.on("disconnect", () => {
                        console.log(socket.connected); // false
                        toastr.warning("连接断开了！");
                    });
                }
                // console.log(socket)

                //注销
                $('#loginout').off('clikc').on("click", async function (e) {
                    e.preventDefault();//或者a连接里：javascript:(0)
                    try {
                        let result = await loginOutModel()
                        if (result.success) {
                            if (result.message == 'ok') {
                                localStorage.removeItem('login-token');
                                localStorage.removeItem("login-user")
                                console.log(socket)
                                if (socket != undefined) {
                                    socket.disconnect()
                                    socket = undefined
                                }
                                console.log(socket)
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
            router.go("/login")
        }



    }
}

export {
    index
}