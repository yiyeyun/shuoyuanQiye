import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../views/login')
    },
    {
      path: '/',
      component: () => import('../views/home'),
      children: [
        {
          path: '',
          component: () => import('@/views/home/default')
        },
        {
          path: '/model-manage',
          component: () => import('@/views/model-manage')
        },
        {
          path: '/order-manage',
          component: () => import('@/views/order-manage')
        }
      ]
    }
  ]
})
