import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
        requiresAuth: true,
        is_admin : true
    }
  },
  {
    path: '/companyDash',
    name: 'dashboardCompany',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboardCompany" */ '../views/DashboardCompany.vue'),
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/employeeDash',
    name: 'dashboardEmployee',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboardEmployee" */ '../views/DashboardEmployee.vue'),
    meta: {
      requiresAuth: true
  }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
         // let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(localStorage.getItem('user') == 'admin'){
                  next()
              }
              else{
                  next({ name: 'login'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') == null){
          next()
      }
      else{
          next({ name: 'dashboardCompany'})
      }
  }else {
      next()
  }
})

export default router
