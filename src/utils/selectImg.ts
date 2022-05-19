import {Platform,PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CameraRoll from "@react-native-community/cameraroll";
export const SelectImg = (option) => {
  return new Promise((resolve, reject) => {
    getAlbumPermissions().then(()=>{
      ImagePicker.openPicker({
        cropperToolbarTitle:'编辑图片',
        loadingLabelText:'loading...',
        cropperCancelText:'取消',
        cropperChooseText:'确定',
        ...option,
      }).then((res:any)=>{
        resolve(res);
      }).catch(err=>{
        console.log('err---',err.message);
        reject(false);
      })
    }).catch(()=>{
      reject(false);
    })
  })
}
/**
 * url    string
 * option object
 * **/
export const SaveImg = (url,option) => {
  return new Promise((resolve, reject) => {
    getAlbumPermissions().then(()=>{
      CameraRoll.save(url,option).then(()=>{
        resolve(true);
      }).catch(()=>{
        resolve(false);
      })
    }).catch(()=>{
      reject(false);
    })
  })
}



export const getAlbumPermissions = async() => {
  let status = true;
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        //第一次请求【拒绝】后提示用户你为什么要这个权限
        'title': '我要读取相册的权限',
        'message': '没权限我不能工作，同意就好了',
        buttonNeutral: "过会儿问我",
        buttonNegative: "取消",
        buttonPositive: "确定"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('你已获取了读写权限');
        status = true;
    } else {
        console.log('获取读写权限失败');
        status = false;
    }
  }
  return new Promise((resolve, reject) => {
    if(status){
      resolve(true)
    }else{
      reject(false);
    }
  })
}