import React,{useState,useEffect} from "react";
import _ from 'lodash';
import { StyleSheet, ScrollView,Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
    Text,
    View,
    Typography,
    Icon,
    TouchableOpacity,
    Dialog,
    PanningProvider,
    Button
} from 'react-native-ui-lib';
import ImageScreen from '@/Components/Image/ImageScreen'
import ImageBackgroundScreen from '@/Components/Image/ImageBackgroundScreen'
import Headers from '@/Components/header/Headers';
import {openCameraPermission} from '@/utils/camera';
import NavigationService from "@/utils/NavigationService";
import ImageZoomViewer from '@/Components/ImageZoomViewer/index';
import {size} from '@/utils';

let MeScreen = (props:any)=>{
    let [visible,setVisible] = useState(false);
    let [modalVisible,setModalVisible] = useState(false);
    const imgArr = [
        {url:"https://cdn.133.cn/ticket/vue/promotion/zhoubichang/gtgjshare.png"},
        {url:'https://cdn.133.cn/ticket/vue/promotion/zhoubichang/hbgjshare.png'}
    ]

    function onGoUserInfoPage(){
        NavigationService.navigate('userPage');
    }

    function onGoMySettingPage(){
        NavigationService.navigate('mySetting');
    }

    function onGoGuanwang(){
        NavigationService.navigate('webView',{
            pathUrl:'https://boonook.top'
        });
    }

    ////扫一扫
    function onGoScanCodePage(){
        openCameraPermission().then(res=>{
            if(res){
                NavigationService.navigate('scanCode');
            }
        }).catch(err=>{
            setVisible(true);
        });
    }

    ///图片预览
    function onViewImg(){
        setModalVisible(true);
    }

    ////前往设置中心
    function onSure(){
        Linking.openSettings();
    }

    ///打开侧边栏
    function openDrawer(){
        props.navigation.toggleDrawer();
    }

    function onAboutMe(){
        NavigationService.navigate('aboutMe');
    }

    useEffect(()=>{
        console.log('DeviceInfo--------------',DeviceInfo.getVersion());
        console.log('DeviceInfo--------------',DeviceInfo.getApplicationName());
    },[])

    return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                <Headers
                    //  title={Language.t("mine.title")}
                    border={false}
                    barStyle={0}
                    backgroundColor={`rgba(255,255,255,1)`}
                    centerColor={'#666'}
                    // rightIcon={require('@/assess/images/icon/menu.png')}
                    {...props}
                />
                <ScrollView 
                    style={{flex: 1,}}
                >   
                    <TouchableOpacity onPress={()=>onGoUserInfoPage()}>
                        <View style={styles.headerbox}>
                            <View style={styles.touxiangbox}>
                                <ImageScreen width={size(80)} source={require('@/assess/images/me/touxiang.png')}/>
                            </View>   
                            <View style={styles.userinfo}>
                                <Text numberOfLines={1} style={styles.username}>猪猪</Text>
                                <Text numberOfLines={1} style={styles.zhiwei}>开发部 Web前端开发工程师</Text>
                            </View>
                            <Icon source={require('@/assess/images/me/right.png')} size={20} tintColor={'#444'}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.qianming}>
                        <View style={styles.qianmingleft}>
                            
                        </View>   
                        <View style={styles.qianminginfo}>
                            <TouchableOpacity>
                                <View style={styles.addbox}>
                                    <Icon source={require('@/assess/images/me/add.png')} size={size(15)} tintColor={'#444'}/><Text style={styles.addboxText}>工作签名</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cardbox}>
                        <TouchableOpacity onPress={()=>onGoScanCodePage()}>
                            <View style={styles.cardboxItem}>
                                <View>
                                    <ImageScreen width={size(30)} setHeight={height=>{    }} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                </View>
                                <View style={styles.cardboxItemTextBox}>
                                    <Text style={styles.cardboxItemText}>扫一扫</Text>
                                    <Icon source={require('@/assess/images/me/right.png')} size={size(20)} tintColor={'#444'}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>onViewImg()}>
                            <View style={styles.cardboxItem}>
                                <View>
                                    <ImageScreen width={size(30)} setHeight={height=>{    }} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                </View>
                                <View style={styles.cardboxItemTextBox}>
                                    <Text style={styles.cardboxItemText}>图片预览</Text>
                                    <Icon source={require('@/assess/images/me/right.png')} size={size(20)} tintColor={'#444'}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>openDrawer()}>
                            <View style={styles.cardboxItem}>
                                <View>
                                    <ImageScreen width={size(30)} setHeight={height=>{    }} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                </View>
                                <View style={styles.cardboxItemTextBox}>
                                    <Text style={styles.cardboxItemText}>打开抽屉</Text>
                                    <Icon source={require('@/assess/images/me/right.png')} size={size(20)} tintColor={'#444'}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>onGoMySettingPage()}>
                            <View style={styles.cardboxItem}>
                                <View>
                                    <ImageScreen width={size(30)} setHeight={height=>{    }} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                </View>
                                <View style={styles.cardboxItemTextBox}>
                                    <Text style={styles.cardboxItemText}>设置中心</Text>
                                    <Icon source={require('@/assess/images/me/right.png')} size={size(20)} tintColor={'#444'}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardbox}>
                        <TouchableOpacity onPress={()=>onGoGuanwang()}>
                            <View style={styles.cardboxItem}>
                                <View>
                                    <ImageScreen width={size(30)} setHeight={height=>{    }} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                </View>
                                <View style={styles.cardboxItemTextBox}>
                                    <Text style={styles.cardboxItemText}>官网</Text>
                                    <Icon source={require('@/assess/images/me/right.png')} size={size(20)} tintColor={'#444'}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>onAboutMe()}>
                            <View style={styles.cardboxItem}>
                                <View>
                                    <ImageScreen width={size(30)} setHeight={height=>{    }} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                </View>
                                <View style={styles.cardboxItemTextBox}>
                                    <Text style={styles.cardboxItemText}>关于我们</Text>
                                    <Icon source={require('@/assess/images/me/right.png')} size={size(20)} tintColor={'#444'}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ImageScreen width={size(100)} source={{uri:'https://cdn.133.cn/ticket/vue/promotion/zhoubichang/gtgjshare.png'}}/>
                    <ImageBackgroundScreen width={size(100)} source={{uri:'https://cdn.133.cn/ticket/vue/promotion/zhoubichang/hbgjshare.png'}}>
                        <View>
                            <Text>测试</Text>
                            <Text>测试</Text>
                            <Text>测试</Text>
                            <Text>测试</Text>
                            <Text>测试</Text>
                        </View>
                    </ImageBackgroundScreen>
                </ScrollView>
                <Dialog
                    visible={visible}
                    renderPannableHeader={()=>{
                        return (
                            <View>
                            <View margin-20>
                                <Text>温馨提示！</Text>
                            </View>
                            <View height={size(2)} bg-grey70/>
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
};

const styles = StyleSheet.create({
    title: {
        ...Typography.text20
    },
    headerbox:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingLeft:size(15),
        paddingRight:size(15),
    },
    qianming:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingLeft:size(15),
        paddingRight:size(15),
        paddingBottom:size(24),
        paddingTop:size(12)
    },
    qianmingleft:{
        width:size(80),
        marginRight:size(10)
    },
    touxiangbox:{
        borderRadius:size(80),
        width:size(80),
        height:size(80),
        overflow:'hidden',
        marginRight:size(10)
    },
    userinfo:{
        flex:1,
    },
    username:{
        fontSize:size(24),
    },
    zhiwei:{
        fontSize:size(14),
        marginTop:size(8)
    },
    addbox:{
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#eee',
        borderWidth:size(1),
        borderStyle:'solid',
        paddingTop:size(4),
        paddingBottom:size(4),
        paddingLeft:size(8),
        paddingRight:size(8),
        borderRadius:size(15),
    },
    qianminginfo:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    addboxText:{
        fontSize:size(14),
        marginLeft:size(3),
    },
    cardbox:{
        marginTop:size(12),
        backgroundColor:'#fff',
        paddingLeft:size(15),
    },
    cardboxItem:{
        flexDirection:'row',
        alignItems:'center',
    },
    cardboxItemTextBox:{
        flex:1,
        marginLeft:size(10),
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#eee',
        borderBottomWidth:size(1),
        borderStyle:'solid',
        paddingTop:size(15),
        paddingBottom:size(15),
        paddingRight:size(15),
        fontSize:size(14)
    },
    cardboxItemText:{
        flex:1,
        fontSize:size(14)
    },
    roundedDialog:{
        backgroundColor:'#fff',
        padding:size(16),
        borderRadius:size(8)
    },
    dialogModalHeader:{
        fontSize:size(16),
        fontWeight:'500',
        color:'orange'
    },
    dialogModal:{

    }
})

export default MeScreen;

