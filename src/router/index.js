import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import sidebar from "../components/sidebar";

const routes = [
  {
    path:'',
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
