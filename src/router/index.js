import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
// 公开路由表
const publicRoutes = [{
		path: '/',
		// 懒加载
		component: () => import('@/layout/index')
	},
	{
		path: '/login',
		// 懒加载
		component: () => import('@/views/login/index')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes: publicRoutes
})

export default router
