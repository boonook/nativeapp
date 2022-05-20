import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform,Alert} from 'react-native';
const permissionArr = [
  {
    type:'CAMERA',
    title:'我需要您的相机权限',
  },
  {
    type:'Contacts',
    title:'我需要获取您的通讯录权限',
  },
  {
    type:'Contacts',
    title:'我需要获取您的通讯录权限',
  }
]
export const ApplyPermissions = () => {
  let params={
    title:'我要读写权限',
    message: '没权限我不能工作，同意就好了',
    buttonNeutral: "过会儿问我",
    buttonNegative: "取消",
    buttonPositive: "确定"
  }
  check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)',);
          Alert.alert('此功能不可用（在此设备上/在此上下文中）');
          break;
      case RESULTS.DENIED:
          console.log('开始请求权限');
          request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,params).then(result2 => {
            switch (result2) {
              case RESULTS.UNAVAILABLE:
                Alert.alert('此功能不可用（在此设备上/在此上下文中）');
                break;
              case RESULTS.DENIED:
                Alert.alert('权限被拒绝');
              case RESULTS.BLOCKED:
                Alert.alert('权限被拒绝且不再可请求');
                break;
              case RESULTS.GRANTED:
                Alert.alert('已通过');
            }
          }).catch(err=>{
            console.log('err',err)
          });
          break;
      case RESULTS.GRANTED:
          Alert.alert('已通过');
          break;
      case RESULTS.BLOCKED:
          Alert.alert('权限被拒绝且不再可请求');
          break;
      }
  })
}