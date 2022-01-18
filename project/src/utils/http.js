const http = ({ url, type = 'get', data = {}, dataType = "json", cache = true, processData = true, contentType = "application/x-www-form-urlencoded" }) => {
    return new Promise((resolve, reject) => {
        try {
            $.ajax({
                url: url,
                dataType: dataType,
                type: type,
                data: data,
                cache: cache,
                processData: processData,
                contentType: contentType,
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
        }
        catch (e) {
            console.log(e)
        }

    })
}

export default http