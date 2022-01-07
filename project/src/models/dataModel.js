import http from '../utils/http'

const dataList =async (url) => {
    try {
        let  { result } = await http({
            url: url
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

const dataListPagination =async (url,querydata) => {
    try {
        let  { result } = await http({
            url: url+"?"+querydata
        })
        return result
    }
    catch (err) {
        return err
    }
}

const dataAdd =async (url,data) => {
    try {
        let  { result } = await http({
            url: url,
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

const dataRemove=async (url,data) => {
    try {
        let  { result } = await http({
            url: url,
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

const dataSchema =async (url) => {
    try {
        let  { result } = await http({
            url: url
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

export {
    dataList,
    dataListPagination,
    dataAdd,
    dataRemove,
    dataSchema
}


