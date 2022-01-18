import http from '../utils/http'

const usersList =async () => {
    try {
        let  { result } = await http({
            url: "http://101.34.125.200:3547/api/v1/users/"
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

const usersListPagination =async (querydata) => {
    try {
        let  { result } = await http({
            url: "http://101.34.125.200:3547/api/v1/users/usersPag?"+querydata
        })
        return result
    }
    catch (err) {
        return err
    }
}

const usersAdd =async (data) => {
    try {
        let  { result } = await http({
            url: "http://101.34.125.200:3547/api/v1/users/",
            type:"post",
            data:data
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

const usersRemove=async (data) => {
    try {
        let  { result } = await http({
            url: "http://101.34.125.200:3547/api/v1/users/",
            type:"delete",
            data:data
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

export {
    usersList,
    usersListPagination,
    usersAdd,
    usersRemove
}


