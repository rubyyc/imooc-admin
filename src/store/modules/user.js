import {
	login,
	getUserInfo
} from '@/api/sys'

import md5 from 'md5'

import {
	setItem,
	getItem,
	removeAllItem
} from '@/utils/storage'

import {
	TOKEN
} from '@/constant'

import {
	setTimeStamp
} from '@/utils/auth'

import router from '@/router'
export default {
	namespaced: true,
	state: () => ({
		token: getItem(TOKEN) || '',
		userInfo: {}
	}),
	mutations: {
		setToken(state, token) {
			state.token = token
			setItem(TOKEN, token)
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		}
	},
	actions: {
		// 登录请求动作
		login(context, userInfo) {
			const {
				username,
				password
			} = userInfo
			return new Promise((resolve, reject) => {
				login({
					username,
					password: md5(password)
				}).then(data => {
					this.commit('user/setToken', data.token)

					router.push('/')
					// 保存登录时间
					setTimeStamp()
					resolve(data)
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 获取用户信息并保存
		async getUserInfo(context) {
			const res = await getUserInfo()
			this.commit('user/setUserInfo', res)
			return res
		},
		// 退出登录
		logout() {
			this.commit('user/setToken', '')
			this.commit('user/setUserInfo', {})
			// 清除缓存
			removeAllItem()
			// TODO: 清理权限相关的
			router.push('/login')
		}
	}
}
