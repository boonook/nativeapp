import React,{useEffect,useState,useRef} from 'react';
import {
    View,
    StyleSheet,
    BackHandler,
    Text,
    TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import Headers from '@/Components/header/Headers';

let WebViewScreen = (props:any)=>{
    let systemType = DeviceInfo.getSystemName();
    let [backButtonEnabled,setBackButtonEnabled] = useState(false);

    const WEB_VIEW_REF = useRef<any>();

    function onNavigationStateChange(e){
        /////处理如果是web-view中打开二级以及多级页面点击返回事返回web-view的上一页而不是直接关闭web-view
        setBackButtonEnabled(e.canGoBack);
    }

    function onClickleftBtn(){
        WEB_VIEW_REF.current.goBack();
    }

    function onBackClicked(){////监听安卓返回键
        WEB_VIEW_REF.current.goBack();
        return true;
    }

    function handleRefresh(){
        WEB_VIEW_REF.current.reload()
    }

    useEffect(()=>{
        if(systemType=='Android'){
            BackHandler.addEventListener('hardwareBackPress',onBackClicked);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackClicked);
            };
        }
    },[])

    function renderErrorView(){
        return (
          <View style={styles.errorContainer}>
            <View style={styles.errorDetail}>
              <Text>数据加载失败，请确认网络连接</Text>
              <TouchableOpacity onPress={handleRefresh} style={styles.refreshBtn}><Text>重新加载</Text></TouchableOpacity>
            </View>
          </View>
        )
      }

    return (
        <View style={styles.container}>
            <Headers
                backgroundColor={'#fff'}
                leftIcon={require('@/assess/images/icon/back.png')}
                closeIcon={backButtonEnabled}
                centerColor={'#444'}
                barStyle={0}
                onClickleftBtn={onClickleftBtn}
                title={'webView'}
                {...props}
            />
            <View style={{flex:1}}>
                <WebView
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    bounces = {false}
                    ref={WEB_VIEW_REF}
                    domStorageEnabled={true}////开启缓存
                    thirdPartyCookiesEnabled={true}
                    allowFileAccess={true}///允许文件上传
                    useWebkit={true}
                    // 加载时强制使用loading转圈视图，注意如果为true，在低性能下，webview可能会加载失败，显示为空白
                    startInLoadingState={false}
                    // webview加载错误页面
                    renderError={renderErrorView}
                    source={{ uri: 'https://h5.133.cn/webapp/promotion/liezuitujian/home'}}
                    onNavigationStateChange={onNavigationStateChange}
                    injectedJavaScript={`
                        (function() {
                        function wrap(fn) {
                            return function wrapper() {
                            var res = fn.apply(this, arguments);
                            window.ReactNativeWebView.postMessage('navigationStateChange');
                            return res;
                            }
                        }

                        history.pushState = wrap(history.pushState);
                        history.replaceState = wrap(history.replaceState);
                        window.addEventListener('popstate', function() {
                            window.ReactNativeWebView.postMessage('navigationStateChange'); // web端向APP端发送消息
                        });
                        })();
                        true; 
                    `}
                    onMessage={({ nativeEvent: state }) => {  // App接受从 web端传来的消息
                        setBackButtonEnabled(state.canGoBack);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    errorDetail: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    refreshBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#FF5D26'
    }
});

export default WebViewScreen;

