// 全局导航跳转工具类
export default class NavigationUtil {
	static goPage(params) {
		const navigation = NavigationUtil.navigation
		if (!navigation) {
			console.log('navigation can not be null')
			return
		}

		navigation.navigate(page, {
			...params
		})
	}
	static goBack(navigation) {
		navigation.goBack()
	}

	static resetToHomPage(params) {
		const {navigation} = params
		navigation.navigate('Main')
	}
}