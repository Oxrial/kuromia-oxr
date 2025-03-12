import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import 'nprogress/nprogress.css'

// static
export const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/song-list',
		meta: { hidden: true }
	},
	{
		path: '/404',
		component: () => import('@/views/error/404.vue'),
		meta: { hidden: true }
	},
	{
		name: 'Home',
		path: '/home',
		component: () => import('@/views/home/index.vue'),
		meta: {
			title: '按钮',
			icon: 'Lollipop'
		}
	},
	{
		name: 'Test',
		path: '/test',
		component: () => import('@/views/test/index.vue'),
		meta: {
			title: '测试',
			icon: 'Lollipop'
		}
	},
	{
		name: 'SongList',
		path: '/song-list',
		component: () => import('@/views/song-list/index.vue'),
		meta: {
			title: '库洛米娅',
			icon: 'Tickets'
		}
	},
	{
		name: 'ChenZai',
		path: '/chenzai',
		component: () => import('@/views/chenzai/index.vue'),
		meta: {
			title: '一只晨仔',
			icon: 'Tickets'
		}
	},
	{
		name: 'GoToSeeU',
		path: '/gotoseeu',
		component: () => import('@/views/gotoseeu/index.vue'),
		meta: {
			title: '古兔希尤',
			icon: 'Tickets'
		}
	},
	{
		name: 'Aurora',
		path: '/aurora',
		component: () => import('@/views/aurora/index.vue'),
		meta: {
			title: '阿池',
			icon: 'Tickets'
		}
	},
	{
		path: '/:pathMatch(.*)*', // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
		redirect: '/404',
		name: 'ErrorPage',
		meta: {
			hidden: true
		}
	}
]
const router = createRouter({
	history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
	routes: constantRoutes
})

export default router
