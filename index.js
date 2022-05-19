import 'react-native-reanimated'
import {AppRegistry,LogBox,StatusBar} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
LogBox.ignoreAllLogs(true)//关闭全部黄色警告
LogBox.ignoreLogs([
    'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
])
if(process.env.NODE_ENV !=='development') {
    console.log = function(){}
}
AppRegistry.registerComponent(appName, () => App);
