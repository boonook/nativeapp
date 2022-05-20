import React,{useState,useEffect} from "react";
import {StyleSheet,ActivityIndicator,Dimensions} from 'react-native';
import {
    Camera,
    useCameraDevices,
} from 'react-native-vision-camera';
import {useScanBarcodes,BarcodeFormat} from 'vision-camera-code-scanner'
import Headers from '@/Components/header/Headers';
import {openCameraPermission} from '@/utils/camera';
import NavigationService from '@/utils/NavigationService';
import {SelectImg} from '@/utils/selectImg'
import {readerQR} from 'react-native-lewin-qrcode'
import {
    Text,
    View,
    TouchableOpacity,
    Colors,
    Constants,
    Icon,
    Incubator
  } from 'react-native-ui-lib';
  import {size} from '@/utils';  
  const width = Dimensions.get('window').width;
let ScanCodeScreen = (props:any)=>{
    const {Toast} = Incubator;
    let [toastShow,setToastShow] = useState(false);
    let [message,setMessage] = useState('数据加载异常！');
    let [isPermission,setIsPermission] = useState(true);

    const devices = useCameraDevices();
    const device = devices.back;

    function goBack(){
        props.navigation.goBack();
    }

    function openXiangCe(){
        SelectImg({
            width:width,
            cropperToolbarTitle:'选择',
            loadingLabelText:'loading...',
        }).then((res:any)=>{
            readerQR(res.path).then(ress=>{
                console.log('ress----',ress);
                if(ress.indexOf('http')==0){
                    NavigationService.replace('webView',{
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

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    });

    useEffect(()=>{
        openCameraPermission().then(res=>{
            setIsPermission(true);
        }).catch(()=>{
            setMessage('尚未获得相机权限');
            setToastShow(true);
            setIsPermission(false);
        }); 
    },[openCameraPermission])

    useEffect(()=>{
        // setMessage(JSON.stringify(barcodes));
        // setToastShow(true);
        if(barcodes.length>0){
            NavigationService.replace('webView',{
                pathUrl:barcodes[0].displayValue
            });
        }
        // Toast('')
    },[barcodes])

    if(device==null || !isPermission){
        return (
            <View style={{ flex: 1,backgroundColor:"#f2f2f2"}}>
                <Headers
                    border={false}
                    hidden={true}
                    barStyle={1}
                    centerColor={'#fff'}
                    leftContent={
                        <TouchableOpacity onPress={()=>goBack()}>
                            <View style={styles.backBtn}>
                                <Icon source={require('@/assess/images/icon/back.png')} size={size(14)} tintColor={'#000'}/>
                            </View>
                        </TouchableOpacity>
                    }
                    backgroundColor={'transparent'}
                    {...props}
                />
                <View style={styles.LoadingPage}>
                    <View style={{marginTop:size(-200)}}>
                        <ActivityIndicator size="large" color="#444" />
                        <Text style={{ marginLeft:size(10),color:"#444",marginTop:size(10) }}>正在加载...</Text>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <>
        <Camera 
            style={{ flex: 1,backgroundColor:"#000"}} 
            device={device} 
            nativeID={'123'} 
            isActive={true}
            frameProcessorFps={5}
            frameProcessor={frameProcessor}
        >
            <Headers
                border={false}
                hidden={true}
                barStyle={1}
                centerColor={'#fff'}
                leftContent={
                    <TouchableOpacity onPress={()=>goBack()}>
                        <View style={styles.backBtn}>
                            <Icon source={require('@/assess/images/icon/back.png')} size={14} tintColor={'#000'}/>
                        </View>
                    </TouchableOpacity>
                }
                rightContent={
                    <TouchableOpacity onPress={()=>openXiangCe()}>
                        <View style={styles.backBtnColor}>
                           <Text style={styles.backBtnTextColor}>相册</Text>
                        </View>
                    </TouchableOpacity>
                }
                backgroundColor={'transparent'}
                {...props}
            />
            <Toast
                visible={toastShow}
                position={'bottom'}
                showLoader={true}
                backgroundColor="rgba(0,0,0,0.5)"
                message={message}
                messageStyle={{color:'#fff'}}
                autoDismiss={3000}
                onDismiss={() =>{
                    setToastShow(false);
                    console.log('dismissed')
                }}
            />
        </Camera>
        </>
    )
};

const styles = StyleSheet.create({
    loginOutBtn:{
        width:'100%',
        backgroundColor:"#fff",
        height:size(50),
        marginTop:size(20),
        borderRadius:size(5)
    },
    oginOutBtn:{
        width:'100%',
        backgroundColor:"#fff",
        height:size(50),
        marginTop:size(20),
        borderRadius:size(5)
    },
    loginOutBtnText:{
        lineHeight:size(50),
        textAlign:'center'
    },
    contentBoxTop:{
        marginTop:size(20)
    },
    roundedDialog: {
        backgroundColor: Colors.white,
        marginBottom: Constants.isIphoneX ? 0 : size(20),
        borderRadius: size(12)
    },
    backBtn:{
        backgroundColor:Colors.white,
        padding:size(5),
        borderRadius:size(25)
    },
    LoadingPage: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    barcodeTextURL: {
        fontSize:size(20),
        color: 'white',
        fontWeight: 'bold',
    },
    backBtnColor:{
        color: '#fff',
        backgroundColor:'transparent'
    },
    backBtnTextColor:{
        color: '#fff',
        fontWeight:'600'
    }
})

export default ScanCodeScreen;

