import http from '../utils/http'
const auth = async () => {
    try {
        let { result } = await http({
            url: "http://101.34.125.200:3547/api/v1/users/isAuth"
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

export {
    auth
}
