import router from '../router'
import { getToken } from './auth'
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken() || to.path === '/login') {
    next()
  } else {
    next({
      path: '/login'
    })
  }
})

export default router
