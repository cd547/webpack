const http = ({url,type='get',data={}}) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            dataType:'json',
            type:type,
            data:data,
            headers: {
                'X-Access-Token': localStorage.getItem("login-token") || ''
            },
            success: function (result, textStatus, jqXHR) {
                resolve({ result, textStatus, jqXHR })
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

export default http