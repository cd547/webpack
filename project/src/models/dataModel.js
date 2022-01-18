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
            data:data,
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}
const dataAdd_file =async (url,data) => {
    try {
        let  { result } = await http({
            url: url,
            type:"post",
            data:data,
            cache: false,
            processData: false,
            contentType: false,
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

const dataFindOne =async (url,data) => {
    try {
        let  { result } = await http({
            url: url,
            type:"post",
            data:data,
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}

const dataEdit =async (url,data) => {
    try {
        let  { result } = await http({
            url: url,
            type:"put",
            data:data,
        })
        return result
    }
    catch (err) {
       // console.log(err)
        return err
    }
}
const dataEdit_file =async (url,data) => {
    try {
        let  { result } = await http({
            url: url,
            type:"put",
            data:data,
            cache: false,
            processData: false,
            contentType: false,
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
    dataAdd_file,
    dataFindOne,
    dataEdit,
    dataEdit_file,
    dataRemove,
    dataSchema
}


