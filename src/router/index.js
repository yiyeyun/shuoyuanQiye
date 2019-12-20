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
      path: '/admin-data',
      component: () => import('../views/login/admin-data')
    },
    {
      path: '/',
      component: () => import('../views/home'),
      children: [
        {
          path: '/company-list',
          component: () => import('@/views/zhengfu/company-manage/company-list')
        },
        {
          path: '/setting',
          component: () => import('@/views/setting')
        },
        {
          path: '/code-list',
          component: () => import('@/views/zhengfu/suyuan-manage/code-list')
        },
        {
          path: '/industry',
          component: () => import('@/views/zhengfu/suyuan-manage/industry')
        },
        {
          path: '/tourism',
          component: () => import('@/views/zhengfu/suyuan-manage/tourism')
        },
        {
          path: '/goods-list',
          component: () => import('../views/goods/list')
        },
        {
          path: '/source',
          component: () => import('../views/source/list')
        },
        {
          path: '/map',
          component: () => import('../views/source/list/map')
        },
        {
          path: '/suyuan-list',
          component: () => import('../views/source/suyuan')
        }
      ]
    }
  ]
})
