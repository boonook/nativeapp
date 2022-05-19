import React,{useEffect,useState,useRef} from 'react';
import {
    View,
    StyleSheet,
    BackHandler,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import {
  Button,
} from 'react-native-ui-lib';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import Spinner from 'react-native-spinkit'
import Headers from '@/Components/header/Headers';
import qs from '@/utils/querystring'
import NavigationService from '@/utils/NavigationService';
let WebViewScreen = (props:any)=>{
    const { pathUrl='' } = props.route.params;
    let systemType = DeviceInfo.getSystemName();
    let [backButtonEnabled,setBackButtonEnabled] = useState(false);
    let [pageToBackgroundColor,setPageToBackgroundColor] = useState('#fff');
    let [centerColor,setCenterColor] = useState('#444');
    let [barStyle,setBarStyle] = useState(0);
    let [title,setTitle] = useState('帮办管家');
    let [rightContent,setRightContent] = useState(null);
    const [notCloseApp,setNotCloseApp] = useState(true);

    const WEB_VIEW_REF = useRef<any>(null);

    function openUrl(url){
      if(url.indexOf('boonookbbgj://')==0){
        let obj = qs.parse(url.split('?')[1])
        if(obj.type=='home'){
          return NavigationService.navigate('home',{...obj})
        }else if(obj.type=='shoppingcart'){
          return NavigationService.navigate('shoppingcart',{...obj})
        }else if(obj.type=='mine'){
          return NavigationService.navigate('mine',{...obj})
        }
      }else{
        console.log('地址异常'+url);
        return false;
      }
    }

    function _onNavigationStateChange(e:any){
      if(systemType!='Android'){
        if((e.url).indexOf('http')==0){
          ///处理如果是web-view中打开二级以及多级页面点击返回事返回web-view的上一页而不是直接关闭web-view
          setBackButtonEnabled(e.canGoBack);
          setNotCloseApp(e.canGoBack);
          setTitle(e.title||'航班管家');
        }else{
          console.log('_onNavigationStateChange------:'+(e.url));
          openUrl(e.url);
          // Linking.canOpenURL(e.url).then(supported => {
          //   if (!supported) {
          //     console.log('无法处理该URL：' + e.url);
          //   } else {
          //     console.log('-------------' + e.url);
          //     return Linking.openURL(e.url);
          //   }
          // })
        }
      }else{
        return;
      }
    }

    function onClickleftBtn(){
        WEB_VIEW_REF.current.goBack();
    }

    function onBackClicked(){////监听安卓返回键
      if(WEB_VIEW_REF.current){
        WEB_VIEW_REF.current.goBack();
        return notCloseApp;
      }else{
        props.navigation.goBack();
      }
      return false;
    }

    function handleRefresh(){
        WEB_VIEW_REF.current.reload()
    }

    useEffect(()=>{
      if(systemType=='Android'){
          BackHandler.addEventListener('hardwareBackPress',onBackClicked);
          return():void=>{
            BackHandler.removeEventListener('hardwareBackPress',onBackClicked);
          }
      }
    },[notCloseApp])

    function renderErrorView(){
        return (
          <View style={styles.errorContainer}>
              <Text>数据加载失败，请确认网络连接</Text>
              <View style={{marginTop:20}}>
                <Button
                  backgroundColor="#30B650"
                  label="重新加载"
                  outline
                  labelStyle={{fontWeight: '600'}}
                  enableShadow
                  onPress={handleRefresh}
                />
              </View>
          </View>
        )
    }

    function onHandle(data){
      ////向h5传值
      const injectJavascriptStr =  `(function() {
        window.WebViewBridge.sendToJavaScript(${JSON.stringify({method:'headerRightBtnClick'})});
      })();return true;`; 
      // 通过 injectJavaScript  将数据传递给WebView页面，并立即执行为js
      if(WEB_VIEW_REF) {
        WEB_VIEW_REF.current.injectJavaScript(injectJavascriptStr)
      } 
    }



    function _onMessage(e){
      // console.log(JSON.stringify(e));
      console.log('_onMessage------:'+JSON.stringify(e));
      if(e.data){
        if(e.data!='navigationStateChange'){
          let data = e.data?JSON.parse(e.data):{};
          let params = data.params?data.params:{};
          console.log(typeof(data.params));
          ////触发h5的方法
          ///修改头部导航栏的颜色
          if(data.method=='setPageTopBackgroundColor'){
            setPageToBackgroundColor(params.backgroundColor);
          }
          if(data.method=='setNavigationBarTintColor'){
            setCenterColor(params.tintColor);
            setBarStyle(params.statusBarStyle);
          }
          if(data.method=='updateHeaderRightBtn'){
            setRightContent(()=>{
              return (<TouchableOpacity onPress={()=>onHandle(data)}><View><Text style={{color:params.color||'#444'}}>{params.text||'分享'}</Text></View></TouchableOpacity>);
            })
          }
        }
      }
      /**接受来自h5的消息start**/
      // console.log(JSON.stringify(e));
      /**接受来自h5的消息end**/
      if(systemType=='Android'){
        setBackButtonEnabled(e.canGoBack);
        setNotCloseApp(e.canGoBack); 
      }
      setTitle(e.title||'帮办管家');
    }

    function handleInjectJavascript(){
      ////向h5传值
      const injectJavascriptStr =  `(function() {
        window.WebViewBridge.onMessage(${JSON.stringify({msg:'boonook'})});
        // window.WebViewBridge.receiveMessage(${JSON.stringify({msg:'boonook'})});
      })();return true;`; 
      // 通过 injectJavaScript  将数据传递给WebView页面，并立即执行为js
      if(WEB_VIEW_REF) {
        WEB_VIEW_REF.current.injectJavaScript(injectJavascriptStr)
      } 
    }

    function renderLoadingView(){
      return (
        <View style={styles.loadingBody}>
            <Spinner type='Wave' color={'#999'} size={30}/>
            <Text style={{ marginLeft: 10,color:"#444",marginTop:10 }}>正在加载...</Text>
        </View>
      )
    }

    return (
        <View style={styles.container}>
            <Headers
              backgroundColor={pageToBackgroundColor}
              leftIcon={require('@/assess/images/icon/back.png')}
              closeIcon={backButtonEnabled}
              centerColor={centerColor}
              barStyle={barStyle}
              onClickleftBtn={onClickleftBtn}
              title={title}
              rightContent={rightContent}
              {...props}
            />
            <View style={{flex:1}}>
              <WebView
                originWhitelist={['*']}
                javaScriptEnabled={true}
                bounces = {false}
                ref={WEB_VIEW_REF}
                // domStorageEnabled={true}////开启缓存
                thirdPartyCookiesEnabled={true}
                allowFileAccess={true}///允许文件上传
                useWebkit={true}
                style={{flex:1}}
                // 加载时强制使用loading转圈视图，注意如果为true，在低性能下，webview可能会加载失败，显示为空白
                // startInLoadingState={false}
                // webview加载错误页面
                renderError={renderErrorView}
                source={{ uri:pathUrl}}
                onLoad={()=>handleInjectJavascript()}
                renderLoading={renderLoadingView}
                startInLoadingState={true}
                allowsBackForwardNavigationGestures
                onNavigationStateChange={(e)=>_onNavigationStateChange(e)}
                // injectedJavaScript={`
                //     (function() {
                //       window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
                //     })();
                // `}
                injectedJavaScript={systemType=='Android'?`
                  (function() {
                    window.ReactNativeWebView.postMessage = true;
                    function wrap(fn) {
                      return function wrapper() {
                        var res = fn.apply(this, arguments);
                        window.ReactNativeWebView.postMessage('navigationStateChange');
                        return res;
                      }
                    }
                    history.pushState = wrap(history.pushState);
                    history.replaceState = wrap(history.replaceState);
                    window.addEventListener('popstate', function(e) {
                      console.log('----',JSON.stringify(e));
                      window.ReactNativeWebView.postMessage('navigationStateChange'); // web端向APP端发送消息
                    });
                  })();
                  return true; 
                `:`
                (function() {
                  window.ReactNativeWebView.postMessage = true;
                  function wrap(fn) {
                    return function wrapper() {
                      var res = fn.apply(this, arguments);
                      // window.ReactNativeWebView.postMessage('navigationStateChange');
                      return res;
                    }
                  }
                  history.pushState = wrap(history.pushState);
                  history.replaceState = wrap(history.replaceState);
                  window.addEventListener('popstate', function(e) {
                    console.log('----',JSON.stringify(e));
                    window.ReactNativeWebView.postMessage('navigationStateChange'); // web端向APP端发送消息
                  });
                })();
                return true; 
              `}
                onMessage={({ nativeEvent: state }) => {  // App接受从 web端传来的消息
                  _onMessage(state);
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
      position:'absolute',
      top:0,
      left:0,
      height:'100%',
      width:"100%",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f9f9'
    },
    loadingBody:{
      position:'absolute',
      top:0,
      left:0,
      height:'100%',
      width:"100%",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f9f9'
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
        borderColor: '#444'
    }
});

export default WebViewScreen;

