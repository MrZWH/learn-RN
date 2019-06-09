import {
	createStackNavigator,
	createMaterialTopTabNavigator,
	createBottomTabNavigator,
	createSwitchNavigator,
} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'

const InitNavigator = createStackNavigator({
	WelcomePage: {
		screen: WelcomePage,
		navigationOptions: {
			header: null, // 全屏显示
		}
	}
})

export default createSwitchNavigator({
	Init: InitNavigator,
	Main: MainNavigator,
}, {
	navigationOptions: {
		header: null
	}
})