import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../components/login'

const routes = [
  {
    path:'',
    redirect:"/home"
  },
  {
    path: '/login',
    component:login,
    meta:{requireAuth: false}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{requireAuth:true}
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  let islogin=localStorage.getItem("islogin")
  console.log(islogin)
  console.log(to.path)
  islogin=Boolean(Number(islogin))
  console.log("this is where it from",from.path)
  if(to.path=='/login'){
    localStorage.setItem("islogin",0)
    next()
  }else{
    if(to.meta.requireAuth && islogin){
      next()
    }else{
      swal('提示','请先登录','warning')
      next('/login')
    }
  }
})
export default router
