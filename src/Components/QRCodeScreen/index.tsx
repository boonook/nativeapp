import React, {useState,useRef} from 'react';
import { View,TouchableNativeFeedback,Text} from 'react-native'
import ViewShot,{captureRef} from "react-native-view-shot";
import QRCode from 'react-native-qrcode-svg';
import {SaveImg} from '@/utils/selectImg'
import {size} from '@/utils';
import Language from '@/language/Language'
let QRCodeScreen = (props:any)=>{
    const saveQRCode = useRef();
    function onSaveQRCode(){
        captureRef(saveQRCode, {
            format: "png",
            quality: 1
        }).then(url=>{
            SaveImg(url,{type:'photo'}).then(()=>{
                props.saveImg('二维码保存成功！');
            }).catch(err=>{
                props.saveImg('图片保存失败！');
            })
        }).catch(error=>{
            props.saveImg('生成图片失败！');
        });
    }

    return (
        <View>
            <ViewShot captureMode="mount" ref={saveQRCode} style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <TouchableNativeFeedback onLongPress={()=>onSaveQRCode()}>
                    <View style={{padding:size(10),backgroundColor:'#fff',borderRadius:size(4)}}>
                        <QRCode
                            value={props.value}
                            size={props.size||size(20)}
                        />
                    </View>
                </TouchableNativeFeedback>
            </ViewShot>
        </View>
    )
}

export default QRCodeScreen;