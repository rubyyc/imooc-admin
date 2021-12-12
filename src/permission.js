import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */

router.beforeEach(async (to, from, next) => {
	// to and from are both route objects. must call `next`.

	if (store.getters.token) {
		// 1.用户已登录,则不允许进入login
		if (to.path === '/login') {
			next('/')
		} else {
			// 判断用户资料是否存在
			if (!store.getters.hasUserInfo) {
				await store.dispatch('user/getUserInfo')
			}
			next()
		}
	} else {
		// 2.用户未登录,只允许进入login
		if (whiteList.includes(to.path)) {
			next()
		} else {
			next('/login')
		}
	}
})
