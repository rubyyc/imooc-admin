import {
	getItem,
	setItem
} from '@/utils/storage'
import {
	LANG
} from '@/constant'
export default {
	namespaced: true,
	state: () => ({
		sidebarOpened: true,
		language: getItem(LANG) || 'zh'
	}),
	mutations: {
		triggerSidebarOpened(state) {
			state.sidebarOpened = !state.sidebarOpened
		},
		setLanguage(state, language) {
			setItem(LANG, language)
			state.language = language
		}
	}
}
