// 快捷访问的作用

const getters = {
  token: state => state.user.token,
  // 判断是否有用户信息
	hasUserInfo: state => {
		return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo
}

export default getters
