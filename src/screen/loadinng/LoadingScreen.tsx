import React from "react";
import { View,StyleSheet,Platform,StatusBar} from 'react-native';
// import {inject, observer} from "mobx-react";
import SplashScreen from 'react-native-splash-screen'
import NavigationService from "@/utils/NavigationService";
import {userStore} from '@/contexts/storeHooks';
import {size} from '@/utils';

let LoadingScreen = (props:any)=>{
    const store:any = userStore();
    function onLayouts() {
        SplashScreen.hide();
        StatusBar.setHidden(false);
        // if(Platform.OS !== 'ios'){
        //     SplashScreen.hide();
        // }
        let data = store.userState.getIsLogin;
        if(data+''==='true'){
            NavigationService.reset('main');
        }else{
            NavigationService.reset('login');
        }
    }

    return(
        <>
            <StatusBar
                animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden 
                hidden={false} //是否隐藏状态栏。 
                backgroundColor={'transparent'} //状态栏的背景色 
                translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。 
                barStyle={'dark-content'} // enum('default', 'light-content', 'dark-content') 
            >
            </StatusBar> 
            <View style={{ flex: 1}} onLayout={onLayouts}/>
        </>
    )
}

const styles = StyleSheet.create({
    fullScreen: {
        flex:1,
        flexDirection: 'row',
    },
    videoBox:{
        flex:1,
        position:'relative',
    },
    timeBox:{
        position:'absolute',
        zIndex:9999,
        elevation:9999,
        top:size(60),
        right:size(10),
    },
    timeBoxText:{
        color:'#fff'
    }
})

export default LoadingScreen;
