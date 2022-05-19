import {Camera} from 'react-native-vision-camera';
import {Linking } from 'react-native';
import {Platform,PermissionsAndroid} from 'react-native';
export const openCameraPermission = async() => {
  let status = true;
  if(Platform.OS === 'android'){
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,{
      //第一次请求【拒绝】后提示用户你为什么要这个权限
      'title': '我要读写权限',
      'message': '没权限我不能工作，同意就好了',
      buttonNeutral: "过会儿问我",
      buttonNegative: "取消",
      buttonPositive: "确定"
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('你已获取了读写权限');
      status = true;
    } else {
      console.log('获取读写权限失败');
      status = false;
    }
  } else {
    let permission = await Camera.getCameraPermissionStatus();
    if(permission=='authorized'){
      status = true;
    }else if(permission=='not-determined'){
      permission = await Camera.requestCameraPermission();
      if(permission=='authorized'){
        status = true;
      }else{
        status = false;
      }
    }else if(permission=='denied'||permission=='restricted'){
      status = false;
    }
  }
  return new Promise((resolve, reject) => {
    if(status){
      resolve(true);
    }else{
      reject({msg:'权限未开启！'});
    }
  })
}

export const openMicrophonePermission = async() => {
  const permission = await Camera.requestMicrophonePermission();
  // if (permission === 'denied') await Linking.openSettings();
  return new Promise((resolve, reject) => {
    if(permission=='authorized'){
      resolve(true);
    }else{
      reject({msg:'权限未开启！'});
    }
  })
}



export const getCameraPermission = async() => {
  let cameraPermissionStatus = 'not-determined';
  let microphonePermissionStatus = 'not-determined';
  if (cameraPermissionStatus === 'authorized' && microphonePermissionStatus === 'authorized'){
     ////跳转到扫码页面
  }else{
    ////开启麦克风权限
    const permission = await Camera.requestMicrophonePermission();
    if (permission === 'denied') await Linking.openSettings();
    cameraPermissionStatus = permission;
    ////
    const permission2 = await Camera.requestCameraPermission();
    if (permission2 === 'denied') await Linking.openSettings();
    cameraPermissionStatus = permission2;
  };
}