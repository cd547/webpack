import gp21_router from 'gp21-router'
//import SMERouter from 'sme-router'

const router = new gp21_router('tp')
import { auth as authModel } from "../models/authModel"
import { users } from "../controllers/users/users"
import { weusers } from "../controllers/weusers/weusers"
import { records } from "../controllers/records/records"
import { article } from "../controllers/article/article"
import { login } from "../controllers/login"
import { index } from "../controllers/index"

console.log("routes")
// router.use(async (req) => {
//     try {
//         let result = await authModel()
//         console.log(result)
//         if (result.message != "ok") {
//             console.log("!ok")
//             router.go("/login")
//         }
//          else{
//              router.go(location.hash.slice(1))
//          }
//     }
//     catch (e) {
//         alert(e.statusText)
//     }

// })

var socket;
var headerContext;
console.log("headerContext:"+headerContext)

//首页
router.route('/index', index(router,socket,headerContext))

router.route('/index/users', users(router,headerContext))
router.route('/index/article', article(router,headerContext))
router.route('/index/weusers', weusers(router,headerContext))
router.route('/index/records', records(router,headerContext))

router.route('/login', login(router,socket))
router.route('/', login(router,socket))
export default router
