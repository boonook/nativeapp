import React,{useState,useEffect} from "react";
import _ from 'lodash';
import { StyleSheet, ScrollView,Dimensions,Linking,Alert} from 'react-native';
import {
    Text,
    View,
    Button,
    Typography,
    Incubator,
    TouchableOpacity,
    PanningProvider,
    Dialog,
} from 'react-native-ui-lib';
import QRCodeScreen from '@/Components/QRCodeScreen/index'
import ImageScreen from '@/Components/Image/ImageScreen'
import Headers from '@/Components/header/Headers';
import {openCameraPermission} from '@/utils/camera';
import ImageZoomViewer from '@/Components/ImageZoomViewer/index';
import {SelectImg} from '@/utils/selectImg'
import {callPthon,copyText} from '@/utils/nativeApi'
import Language from '@/language/Language'
import {userStore} from '@/contexts/storeHooks';
import I18n from 'i18n-js'
import * as RNLocalize from 'react-native-localize';
import {readerQR} from 'react-native-lewin-qrcode'
import {ApplyPermissions} from '@/utils/permissions'
import {phonecall} from '@/utils/AKCommunications'
const width = Dimensions.get('window').width;
const DrawerScreen = (props) => {
    const ButtonSpace = 20;
    const {Toast} = Incubator;
    let [toastShow,setToastShow] = useState(false);
    let [visible,setVisible] = useState(false);
    let [toastMsg,setToastMsg] = useState('生成图片失败！');
    let [opciaty,setOpciaty] = useState(0);
    let [files,setFiles] = useState([]);
    let [modalVisible,setModalVisible] = useState(false);
    const store:any = userStore();
    const [value, setValue] = useState(0); // integer state

    const imgArr = [
        {url:"https://cdn.133.cn/ticket/vue/promotion/zhoubichang/gtgjshare.png"},
        {url:'https://cdn.133.cn/ticket/vue/promotion/zhoubichang/hbgjshare.png'}
    ]

    function onGoMySettingPage(){
        props.navigation.navigate('mySetting');
    }

    function openDrawer(){
        props.navigation.toggleDrawer();
    }

    function onGoWebViewPage(){
        props.navigation.navigate('webView',{
            pathUrl:'http://192.168.101.179:8080/login'
        });
    }

    function onGoScanCodePage(){
        ///授权
        openCameraPermission().then(res=>{
            if(res){
                ///scanCode
                props.navigation.navigate('scanCode');
                // props.navigation.navigate('webView');
            }
        }).catch(err=>{
            setVisible(true);
        });
    }

    function onSure(){
        Linking.openSettings();
    }

    function onClickRightBtn(){

    }

    function onViewImg(){
        console.log(imgArr);
        setModalVisible(true);
    }

    function onUploadImg(){
        SelectImg({
            width:300,
            height:300,
            cropping:true,
            cropperToolbarTitle:'编辑图片',
            loadingLabelText:'loading...',
            cropperCancelText:'取消',
            cropperChooseText:'确定',
            cropperCircleOverlay:true
        }).then(res=>{
            console.log('res----',res)
        }).catch(err=>{
            console.log('err----',err)
        })
    }

    function onSelectImg(){
        SelectImg({
            width:width,
            // multiple:true,
            loadingLabelText:'loading...',
            includeBase64:true,
        }).then((res:any)=>{
            // setFiles(res);
            console.log('res----',res.data)
        }).catch(err=>{
            console.log('err----',err)
        })
    }

    function saveImg(data){
        setToastMsg(data);
        setToastShow(true);
    }

    function onCallMerchant(){
        // phonecall('17798235471',true);
        callPthon('17798235471');
    }

    function onCopy(){
        copyText('boonook@163.com').then(res=>{
            if(res){
                setToastMsg('复制成功!');
                setToastShow(true);
            }
        })
    }

    function useForceUpdate(){
        return () => setValue(value => value + 1); // update the state to force render
    }

    function onOpen(){
        let e= {
            url:"boonookbbgj://home?type=1234"
        }
        Linking.canOpenURL(e.url).then(supported => {
            if (!supported) {
                console.log('无法处理该URL：' + e.url);
            } else {
                console.log('-------------' + e.url);
                return Linking.openURL(e.url);
            }
        })
    }

    function onQrcodeShibie(){
        SelectImg({
            width:width,
            cropperToolbarTitle:'选择',
            loadingLabelText:'loading...',
        }).then((res:any)=>{
            readerQR(res.path).then(ress=>{
                console.log('ress----',ress);
                if(ress.indexOf('http')==0){
                    props.navigation.navigate('webView',{
                        pathUrl:ress
                    });
                }else{
                    console.log('二维码识别信息----',ress);
                }
            })
        }).catch(err=>{
            console.log('err----',err)
        })
    }

    function onGetQuanXian() {
        ApplyPermissions();
    }
    return(
        <View style={{ flex: 1,flexDirection:'column'}}>
            <Headers
                title={'侧边卡'}
                border={false}
                barStyle={0}
                rightIcon={require('@/assess/images/icon/menu.png')}
                leftTitle={''}
                backgroundColor={`rgba(255,255,255,${opciaty})`}
                centerColor={'#666'}
                {...props}
            />
            <View style={{flex: 1,}}>
                <ScrollView 
                    onScroll = {(event)=>{{
                        console.log(event.nativeEvent.contentOffset.x);//水平滚动距离
                        console.log(event.nativeEvent.contentOffset.y);//垂直滚动距离 
                        if(event.nativeEvent.contentOffset.y>90){
                            setOpciaty(1);
                        }else{
                            setOpciaty(event.nativeEvent.contentOffset.y/90);
                        }
                    }}}
                >
                    <View style={{paddingLeft:15,paddingRight:15}}>
                        <View>
                            <View>
                                <TouchableOpacity onPress={()=>onGoMySettingPage()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} setHeight={height=>{    }} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>设置中心</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onGoScanCodePage()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>扫一扫</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onGoWebViewPage()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>前往WebView</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onViewImg()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>图片预览</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onUploadImg()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>上传头像</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onSelectImg()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>选择图片</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onCallMerchant()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>联系商家</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onCopy()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>复制文本到剪切板</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onOpen()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>Linking openURL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onQrcodeShibie()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>识别图片中的二维码2</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>onGetQuanXian()}>
                                    <View>
                                        <View>
                                            <ImageScreen width={30} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>权限操作</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {files.map((item,index)=>{
                                return (
                                    <View key={index}>
                                        <ImageScreen width={120} setHeight={(height)=>{console.log(height)}} source={{uri:item.path}}/>
                                    </View>
                                )
                            })}
                            <QRCodeScreen value={'http://boonook.top'} size={140} saveImg={saveImg} {...props}/>
                            <Button
                                backgroundColor="#30B650"
                                label="打开抽屉"
                                onPress={()=>{openDrawer()}}
                                labelStyle={{fontWeight: '600'}}
                                style={{marginBottom: ButtonSpace}}
                                enableShadow
                            />
                        </View>
                    </View>
                    <ImageScreen width={width} key='1' setHeight={(height)=>{console.log(height)}} source={require('@/assess/images/bg.png')}/>
                    {/* <View>
                        <ImageScreen width={200} key='2' setHeight={(height)=>{console.log(height)}} source={{uri:'https://cdn.133.cn/ticket/vue/promotion/bjuniversalstudios/pengyouquan.png'}}/>
                    </View> */}
                    <View style={{margin:15,marginBottom:0}}>
                        <Button
                            backgroundColor="#30B650"
                            label="关闭抽屉"
                            onPress={()=>{props.navigation.closeDrawer()}}
                            labelStyle={{fontWeight: '600'}}
                            style={{marginBottom: ButtonSpace}}
                            enableShadow
                        />
                    </View>
                </ScrollView>
            </View>
            <Toast
                    visible={toastShow}
                    position={'bottom'}
                    showLoader={true}
                    backgroundColor="rgba(0,0,0,0.5)"
                    message={toastMsg||'数据加载异常！'}
                    messageStyle={{color:'#fff'}}
                    autoDismiss={3000}
                    onDismiss={() =>{
                        setToastShow(false);
                        console.log('dismissed')
                    }}
                />
                <Dialog
                    visible={visible}
                    renderPannableHeader={()=>{
                        return (
                            <View>
                            <View margin-20>
                                <Text>温馨提示！</Text>
                            </View>
                            <View height={2} bg-grey70/>
                            </View>
                        );
                    }}
                    containerStyle={styles.roundedDialog}
                    pannableHeaderProps={{title: '温馨提示'}}
                    onDismiss={() =>{
                        setVisible(false);
                    }}
                    panDirection={PanningProvider.Directions.DOWN}
                    ignoreBackgroundPress={false}
                    >
                    {<View spread>
                        <View marginT-20 marginH-20>
                            <Text>需要你前往设置中心开启相册权限</Text>
                        </View>
                        <View margin-20 right>
                            <Button text80 label="我知道了" onPress={()=>{onSure()}}/>
                        </View>
                    </View>}
                </Dialog>
                <ImageZoomViewer curentImage={0} imaeDataUrl={imgArr} modalVisible={modalVisible} cancel={()=>{
                    setModalVisible(false);
                }}/>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        ...Typography.text20
    },
    cardbox:{
        flexDirection:'row',
        marginLeft:15,
    },
    cardboxItem:{
        flex:1,
        marginRight:15
    },
    roundedDialog:{
        backgroundColor:'#fff',
        padding:16,
        borderRadius:8
    },
    dialogModalHeader:{
        fontSize:16,
        fontWeight:'500',
        color:'orange'
    },
    dialogModal:{

    }
})

export default DrawerScreen;

