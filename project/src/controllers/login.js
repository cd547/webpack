import loginTpl from '../views/login.art'
//import router from '../routes/index'
import { login as loginModel } from "../models/loginModel"

const _doLogin = (router) => {
    return async (e) => {
        e.preventDefault();
        //router.go('/index')
        const data = $('#login-form').serialize();
        console.log(data)
        try {
            let { result, jqXHR } = await loginModel(data);
            if (result.success) {
                if (result.message == 'ok') {
                    const token = jqXHR.getResponseHeader('X-Access-Token')
                    localStorage.setItem("login-token", token)
                    router.go('/index');
                }
                else {
                    toastr.warning(result.data);
                    // router.go('/');
                }
            }
            else {
    
                toastr.warning(result.data);
                // router.go('/');
            }
        }
        catch (e) {
            toastr.error("出错了" + e);
        }
    }
}

//登录
const login = (router) => {
    console.log("clogin")
    return (req, res) => {
        $(window,".wrapper").resize()
        $("body").attr("class", "hold-transition login-page");
        res.render(loginTpl({}))
        
        $('#login-form').on('submit', _doLogin(router))
    }
}



export {
    login
}