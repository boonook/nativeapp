
import React, { useState } from 'react';
import {
    View,
    Modal,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll'
import ImageViewer from 'react-native-image-zoom-viewer';
import {Dialog,Toast} from 'react-native-ui-lib';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
let ImageZoomViewer = (props:any)=>{
  let [toastShow,setToastShow] = useState(false);
  let [toastMsg,setToastMsg] = useState('数据加载异常！');
  function renderLoad() { //这里是写的一个loading
      return (
          <View style={{ marginTop: (screenHeight / 2) - 20 }}>
              <ActivityIndicator animating={true} size={"large"} />
          </View>
      )
  }

  function savePhoto() {
    let index = props.curentImage;
    let url = props.imaeDataUrl[index].url;
    CameraRoll.saveToCameraRoll(url).then(res=>{
      console.log('res----',res);
      setToastMsg('图片保存成功！');
      setToastShow(true);
    }).catch(err=>{
      setToastMsg('无法访问您的相册！');
      setToastShow(true);
    })
  }

  function _Close() {
    props.cancel();
  }

  return (
    <Dialog
          visible={props.modalVisible}
          onDismiss={()=>_Close()}
          bottom
          width={screenWidth}
          height={screenHeight}
        >
        <ImageViewer
          style={{width:screenWidth}}
          imageUrls={props.imaeDataUrl} // 照片路径
          enableImageZoom={true} // 是否开启手势缩放
          saveToLocalByLongPress={true} //是否开启长按保存
          index={props.curentImage} // 初始显示第几张
          loadingRender={renderLoad}
          enableSwipeDown={false}
          menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}
          onChange={(index) => {

          }} // 图片切换时触发
          onClick={() => { // 图片单击事件
            _Close()
          }}
          onSave={() => {savePhoto()}}
        />
         <Toast
            visible={toastShow}
            position={'bottom'}
            showLoader={true}
            backgroundColor="rgba(0,0,0,0.5)"
            message={toastMsg}
            autoDismiss={3000}
            onDismiss={() =>{
                setToastShow(false);
            }}
          />
      </Dialog>
  );
}

export default ImageZoomViewer;



