//import './assets/main.css'
import router from './routes/index'
const hash= location.hash.slice(1)
console.log(hash)
router.go(hash||"/")