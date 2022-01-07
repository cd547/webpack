import http from '../utils/http'
const login =async (data) => {
    try {
        let { result,jqXHR } = await http({
            url: "/api/v1/users/doLogin",
            type:"post",
            data:data
        })
        return {result,jqXHR}
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

const loginOut=async ()=>{
    try {
        let { result,jqXHR } = await http({
            url: "/api/v1/users/doLoginOut",
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

export {
    login,
    loginOut
}
