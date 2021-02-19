import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Computer from '../views/Computer.vue'
import AddComputer from '../components/AddComputer.vue'
import firebase from "firebase"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children:[
      /*add
      meta:{requiresAuth:true}
      to require authorization for specific component*/
      {
        path: '/',
        name:'Home',
        component:Home
      },
      {
        path: '/Computers',
        name:'Computers',
        component:Computer
      },
      {
        path: '/AddComputer',
        name:'AddComputer',
        component:AddComputer
      },
      {
        path: '/Login',
        name:'Login',
        component:Login
      },
      {
        path: '/Register',
        name:'Register',
        component:Register
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to,from,next) =>{
  const requireAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requireAuth && !await firebase.getCurrentUser()){
    next('Login');
  }else{
    next();
  }
})

export default router
