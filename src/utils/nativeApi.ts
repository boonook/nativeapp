import {Linking,Alert} from 'react-native';
import Clipboard from '@react-native-community/clipboard'
import {} from 'react-native-device-info'
/*
拨打电话
* @param phone
* @private
*/
export const callPthon = (phone) => {
  const url = `tel:${phone}`;
  Linking.canOpenURL(url).then(supported=>{
    if(!supported){
      return Alert.alert('提示',`你的设备不支持该功能，请手动拨打${phone}`)
    }
  }).catch(err=>{
    Alert.alert(`出错了：${err}`)
  })
};

/*
复制到剪切板
* @param text
* @private
*/
export const copyText = (text) => {
  return new Promise((resolve,reject)=>{
    try{
      Clipboard.setString(text);
      resolve(true);
    }catch(err){
      reject(err);
    }
  })
};

/**
 * @returns {{version: string,name:string,uuid:string,imei:string}}
 * @private
 */
export const getDeviceInfo = () => {
  return new Promise((resolve,reject)=>{
   
  })
};