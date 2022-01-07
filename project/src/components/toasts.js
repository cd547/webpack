require('../public/plugins/toastr/toastr.min.js')//模板中引用的静态资源直接在这里引入
require('../public/plugins/toastr/toastr.min.css')//模板中引用的静态资源直接在这里引入
let mytoast = {
    success(title, subtitle, content) {
        $(document).Toasts('create', {
            class: 'bg-success',
            delay: 10,
            title: title,
            subtitle: subtitle,
            body: content
        })
    },
    info(title, subtitle, content) {
        $(document).Toasts('create', {
            class: 'bg-info',
            delay: 10,
            title: title,
            subtitle: subtitle,
            body: content
        })
    },
    warning(title, subtitle, content) {
        $(document).Toasts('create', {
            class: 'bg-warning',
            delay: 10,
            title: title,
            subtitle: subtitle,
            body: content
        })
    },
    danger(title, subtitle,content){
        $(document).Toasts('create', {
            class: 'bg-danger',
            delay: 10,
            title: title,
            subtitle: subtitle,
            body: content
        })
    },

}
module.exports = mytoast