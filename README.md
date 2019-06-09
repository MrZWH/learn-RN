构建 IOS 工程需要XCode

### 快速启动（Quick Start）：
使用Expo,手机安装客户端。
```
npm i -g expo-cli
```
初始化工程
```
expo init AwesomeProject

cd AwesomeProject
npm start
```

App.js 是整个程序的入口

### Building Projects with Native Code
MAC：
- brew install node
- brew install watchman
- npm i -g react-native-cli
- 安装 xcode，以及它的命令行工具
- react-native init my_app
- react-native run-ios 
- react-native run-android

index.js 是整个程序的入口

### 开发环境搭建
需要安装的工具：
- Node.js
- React Native Command Line
- Android Studio/XCode 

#### 在 windows 平台上搭建 React Native 开发环境
- npm i -g react-native-cli
- react-native --help
- 安装 Android Studio https://developers.google.cn
构建 Android 工程的话需要 [Android Studio](https://developer.android.com/studio/)

设置 npm taobao 镜像服务器：
打开 Program Files/nodejs/node_modules/npm/npmrc 文件，添加`registry = https://registry.npm.taobao.org`

启动 Android 上的项目：
- 确保有一个正在运行的模拟器，或连接到电脑的 Android 设备
- 启动 Android 设备模拟器 emulator -avd 5 -gpu off

通过`ctrl + M`快捷键快速打开 Developer Menu，IOS 上通过`command + D`，真机上通过摇手机。

#### Warning
`console.disableYellowBox = true`来手动禁用 Warnings 的显示，或者通过`console.ignoredYellowBox = ['Warning: ...']`来忽略相应的 Warning。  
在生产环境 release（production）下 Errors 和 Warnings 功能是不可用的。

#### 启动远程调试
Developer Menu 下单击 Debug JS Remotely，Chrome 会被打开，同时会创建一个 http://localhost:8081/debugger-ui Tab页，在该页中打开 chrome开发者工具

#### 真机调试
IOS：
打开 RCTWebSocketExecutor.m 文件，将 localhost 改为你的电脑的 ip，然后再 Developer Menu 下单击 Debug JS Remotely

Android：  
方式一：  
在 Android 5.0 以上设备上，手机连接上电脑，通过 adb 命令行工具运行`adb reverse tcp:8081 tcp:8081`  
方式二：  
在 Developer Menu 下的 Dev Settings 中设置你的电脑 ip 来进行调试。

### http://www.devio.org/2016/08/09/React-Native之React速学教程-(上)/

### react 基础知识
#### 生命周期方法的替换
componentWillReceiveProps -> static getDerivedStateFromProps  

getSnapshotBeforeUpdate(prevProps, prevState) 在最新的渲染输出提交给 DOM 前将会立即调用。它让你的组件能在当前的值可能改变前获得它们。这一生命周期返回的任何值将会作为参数被传递给 componentDidUpdate(prevProps, prevState, snapshot)

### react native 基础知识

react-navigation 有以下七种类型的导航器：
- createStackNavigator：类似于普通的 Navigator，屏幕上方导航栏
- createBotttomTabNavigator
- createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)
- createDrawerNavigator
- createSwitchNavigator

安装 react-navigation
```
npm i -S react-navigation
```
react-navigation 3.x以上的版本引入了第三方库：
```
npm i -S react-native-gesture-handler
```
因为其中有native 代码所以需要以下命令关联到项目中：
```shell
react-native link react-native-gesture-handler
```

AppNavigators.js
```js
import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native'
import HomePage from '../page/HomePage'
import Page1 from '../page/Page1'
import Page2 from '../page/Page2'
import Page3 from '../page/Page3'

const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage
  },
  Page1: {
    screen: Page1,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}页面名`  // 动态配置
    })
  },
  Page2: {
    screen: Page2,
    navigationOptions: {
      title: 'this is page2' // 静态配置
    }
  },
  Page3: {
    screen: Page3,
    navigationOptions: (props) => {
      const {navigation} = props
      const {state, setParams} = navigation
      const {params} = state
      return {
        title: params.title ? params.title : 'this is page3',
        headerRight: (
          <Button
            title={params.mode === 'edit' ? '保存': '编辑'}
            onPress={()=>setParams({
              mode: params.mode==='edit'?'':'edit'
            })}
          />
        )
      }
    }
  }
})
```

入口文件 index.js
```js
import {AppRegistry} from 'react-native'
import App from './App'
import {createAppContainer} from 'react-navigation'
import {AppStackNavigator} from './navigators/AppNavigators'
import {name as appName} form './app.json'
const AppStackNavigatorContainer = createAppContainer(AppStackNavigator)

AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer)
```

第三方图标库：
```shell
yarn add react-native-vector-icons
```

### FlatList
在 RN 0.43 版本中引入了 FlatList、SectionList、VirtualizedList，其中VirtualizedList 是 FlatList 与 SectionList 的底层实现

### 软件开发流程
- 需求分析
- UI 界面设计
- 编码开发
- 测试
- 上线

App 要具有哪些功能：
- Trending 的客户端
- 能搜索 Github 上的项目
- 有离线缓存 
- 支持 50 多种编程语言
- 订阅 取消
- 排序
- 收藏
- 分享
- 多彩主题
- 统计

#### 调试
- chrome-devtools
- YellowBox/RedBox
- Developer Menu

#### 组件
- 导航 react-navigation 2x，3x
  - react-native-gesture-handler
  - react-navigation-tabs
- 列表
  - FlatList
  - SectionList
- 图片 Image
  - 静态图片资源
  - Native图片
  - 网络图片
  - Uri图片（base64）
- 第三方组件
  - RN 组件
    - react-native-splash-screen 启动屏
    - react-native-check-box
    - react-native-easy-toast
    - react-native-event-bus 页面间通信
    - GitHUb Trending
    - react-native-code-push 热更新
    - react-native-vector-icons
  - Native 组件
    - 统计和分析
    - 社会化分享
    - 第三方登录
- 自定义组件
  - NavigationBar
  - Dialog
  - Item
  - SafeAreaViewPlus 容器组件用于适配全面屏

#### 网络和存储
- AsyncStorage
- Fetch
- 离线缓存框架

#### 状态框架
- Redux
  - react-redux
  - redux-thunk
  - react-navigation-redux-helpers
- Flux

#### 高级功能
- Native Modules
  - 图片裁剪
  - 统计 SDK
  - 分享 SDK
- React Native 混合开发
  - RN + Android 混合开发
  - RN + iOS 混合开发
- 全面屏适配指南
  - iOS 全面屏适配
  - Android 全面屏适配
- React Native 更新升级
  - 手动更新
  - react-native-git-upgrade

### 项目开发
添加 navigation：
```shell
npm add react-navigation
```

添加矢量图标库：
```shell
npm add react-native-vector-icons
# 将库里的原生代码关联到我们 Android IOS 原生项目里面去
react-native link react-native-vector-icons
```

嵌套路由的跳转：  
可以保存上一个 navigator

自定义底部 tab：
```js
import {BottomTabBar} from 'react-navigation-tabs'
```

设置参数：
```js
navigation.setParams({
  theme: {
    tintColor: 'green',

}
})
```
接收参数：
```js
const {routes, index} = this.props.navigation.state
if (routes[index].params) {
  const {theme} = routes[index].params
}
```

自定义 rudux 中间件 logger：
```js
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function')
  } else {
    console.log('dispatching', action)
  }

  const result = next(action)
  console.log('nextState', store.getState())
}
```

### 网络编程与数据存储技术
#### AsyncStorage
```js
import {AsyncStorage} from 'react-native'
```

React Native 离线缓存框架设计

TouchableOpacity 组件。  

设置阴影：shadowColor、shadowOffset、shadowOpacity、shaadowRadius是针对iOS，elevation针对安卓。  

toast 组件：
```shell
npm i react-native-easy-toast -S
```

FlatList 多次调用onEndReached 的问题：  
onMomentumScrollBegin

判断 iOS 和 Android 平台：
```js
import {Platform} from 'react-native'

Platform.OS === 'ios'
```


在 react native 里渲染 html 标签：
```shell
npm i react-native-htmlview -S
```

检测项目是否运行在 iPhoneX 上：
```js
import {DeviceInfo} from 'react-native'
DeviceInfo.isIPhoneX_deprecated ? 30 : 0
```

TabNavigator 开启 scrollEnabled 后在 Android 上初次加载闪烁问题：需要固定高度。

#### 借助 react native 里的 Modal 组件 实现自定义弹框
TouchableOpacity 组件的使用。  

时间发送器： DeviceEventEmitter

提供的 Webview 组件。  

#### 安卓物理返回键处理
```js
import React, {PropTypes} from 'react'
import {BackHandler} from 'react-native'

export default class BackPressComponent {
  constructor(props) {
    this._hardwareBackPress = this.onHardwareBackPress.bind(this)
    this.props = props
  }

  componentDidMount() {
    if (this.props.backPress) {
      BackHandler.addEventListener('handwareBackPress', this.onHardwareBackPress)
    }
  }

  componentWilUnmount() {
    if (this.props.backPress) {
      BackHandler.removeEventListener('handwareBackPress', this.onHardwareBackPress)
    }
  }

  onHardwareBackPress(e) {
    return this.props.backPress(e)
  }
}
```

### Favorite 收藏模块开发
- 如何封装 FavoriteDao 以及多数据存储设计思想？
- 如何使用最新 React 的 static-lifecycle-methods？
- 如何封装与继承 BaseItem 实现代码复用？
- 如何妙用 callback 解决 Item 跨组件更新问题？
- 跨界面通信解决方案 EventBus 的原理与使用介绍？
- 如何监听导航器的 Tab 切换？

getDerivedStateFromProps

#### 跨页面通信
react-native-event-bus

### My 页面开发
ScrollView 实现滚动列表。  

react-native-parallax-scroll-view 实现关于页面头部拉动效果。  

Dimensions from react-native 用于后去 window

Linking from react-native 打电话、发短信、唤醒其它 app。  
- openURL
- canOpenURL

Clipboard from react-native  将字符串放进剪切板。  

react-native-check-box 复选框组件。  

react-native-sortable-listview 实现拖拽排序的效果。  

this.refs.input.blur() 收起键盘。  

### 基于 Native Modules 实现数据统计、社会化分享、第三方登录功能

第三方统计提供商 umeng，友盟支持通过 Cocoapods 来添加统计 sdk 的依赖。

常用的分享与登录的提供商有 umeng 与 shareSdk

### 全面屏适配与兼容问题

启动白屏：  
react-native-splash-screen
```shell
npm i react-native-splash-screen -S

rnpm link react-native-splash-screen
```

#### 安装和注册 CodePush
管理



#### 打包发布/更新
- CodePush 热部署热更新
- Android 打包发布
- iOS 打包发布

### 打包发布与 CodePush 更新
COdePush 是微软开发，用于热更新 React Native 和 Cordova 应用的服务。

#### 安装和注册 CodePush
管理

添加矢量图标库：
```shell
npm add react-native-vector-icons
# 将库里的原生代码关联到我们 Android IOS 原生项目里面去
react-native link react-native-vector-icons
```

#### 嵌套路由的跳转
可以保存上一个 navigator

#### 安装和注册 CodePush
管理
 CodePush 账号需要通过 NodeJS-based CLI
```shell
npm i -g code-push-cli
code-push -v
```

创建账号：
```shell
code-push register
```
复制 key。  
然后登录
```shell
code-push login
```
你的 session 文件将会写在 /Users/your username/.code-push.config

相关命令：
- `code-push login`
- `code-push loout` 注销
- `code-push access-key ls` 列出登录的 token
- `code-push access-key rm <accessKey>` 删除某个 access-key





## 总结
- 第三方库查找 https://js.coach/?collection=React+Native
- 博客： http://www.devio.org/tags/#React%20Native