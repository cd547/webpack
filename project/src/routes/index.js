import gp21_router from 'gp21-router'
const router = new gp21_router('tp')
import { auth as authModel } from "../models/authModel"
import { users } from "../controllers/users/users"
import { weusers } from "../controllers/weusers/weusers"
import { records } from "../controllers/records/records"
import { article } from "../controllers/article/article"
import { login } from "../controllers/login"
import { index } from "../controllers/index"

console.log("index")

// router.use(async (req) => {
//     try {
//         let result = await authModel()
//         console.log(result)
//         if (result.message != "ok") {
//             console.log("!ok")
//             router.go("/login")
//         }
//         // else{
//         //     router.go(req.url)
//         // }
//     }
//     catch (e) {
//         alert(e.statusText)
//     }

// })



router.route('/', login(router))
//首页
router.route('/index', index(router))
router.route('/login', login(router))
router.route('/index/users', users(router))
router.route('/index/article', article(router))
router.route('/index/weusers', weusers(router))
router.route('/index/records', records(router))

export default router
