import {AppRegistry} from 'react-native'
import AppNavigator from './js/navigator/AppNavigators'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => AppNavigator)