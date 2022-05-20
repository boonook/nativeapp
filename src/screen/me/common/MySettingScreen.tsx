import React,{useState,useEffect} from "react";
import {StyleSheet, Linking, Alert} from 'react-native';
import Headers from '@/Components/header/Headers';
import {userStore} from '@/contexts/storeHooks';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient'
import RNFetchBlob from 'rn-fetch-blob';
import {ImageCache} from 'react-native-img-cache';
import {
    Text,
    View,
    TouchableOpacity,
    Dialog,
    PanningProvider,
    Colors,
    Constants,
    Button
  } from 'react-native-ui-lib';
import I18n from 'i18n-js'
import {size} from '@/utils';
import NavigationService from '@/utils/NavigationService';

let MySettingScreen = (props:any)=>{
    const store:any = userStore();
    const [visible,setVisible] = useState(false)
    const [cacheSize,setCacheSize] = useState('0M')

    function onLoginOut(){
        setVisible(true);
    }

    function onSure(){
        setVisible(false);
        store.userState.loginOut();
    }

    async function onLanguage(data){
        await AsyncStorage.setItem('language',data)
        I18n.locale = data;
        NavigationService.reset('main')
    }

    useEffect(()=>{
        getSize();
    },[]);

        ///获取缓存
    function getSize(){
        RNFetchBlob.fs.lstat(RNFetchBlob.fs.dirs.CacheDir + '/react-native-img-cache').then((stats) => {
            let bytes = 0;
            stats.map(f => {
                bytes += Number(f.size);
            });
            let cacheSize = bytesToSize(bytes);
            setCacheSize(cacheSize);
        })
        .catch((err) => {
            console.log(err);
        })
    };
    
    function bytesToSize(bytes) {
        if (bytes === 0) {
            return '0 B';
        }

        let k = 1024;

        let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        let i = Math.floor(Math.log(bytes) / Math.log(k));

        let num = bytes / Math.pow(k, i);
        return num.toPrecision(3) + ' ' + sizes[i];
    }

    function onClear(){
        ImageCache.get().clear();
        setCacheSize('0M');
    }

    // function onOpen(){
    //     let e= {
    //         url:"boonookbbgj://home?type=1234"
    //     }
    //     Linking.canOpenURL(e.url).then(supported => {
    //         if (!supported) {
    //             console.log('无法处理该URL：' + e.url);
    //         } else {
    //             console.log('-------------' + e.url);
    //             return Linking.openURL(e.url);
    //             // NavigationService.navigate('home')
    //         }
    //     })
    // }

    return(
        <View style={{ flex: 1,backgroundColor:"#eee"}}>
            <Headers
                title={'设置'}
                border={true}
                barStyle={0}
                leftIcon={require('@/assess/images/icon/back.png')}
                rightIcon={require('@/assess/images/icon/menu.png')}
                leftTitle={'返回'}
                backgroundColor={'#fff'}
                centerColor={'#666'}
                {...props}
            />
           <View style={styles.cardbox}>
                <View>
                    <TouchableOpacity style={styles.loginOutBtn} onPress={()=>onLanguage('en')}>
                        <View>
                            <Text style={styles.loginOutBtnText}>语言切换en</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginOutBtn} onPress={()=>onLanguage('zh')}>
                        <View>
                            <Text style={styles.loginOutBtnText}>语言切换zh</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginOutBtn} onPress={()=>onLoginOut()}>
                        <View>
                            <Text style={styles.loginOutBtnText}>退出登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginOutBtn} onPress={()=>onClear()}>
                        <View style={styles.listItemBox}>
                            <Text style={[styles.loginOutBtnText,{flex:1}]}>缓存数据</Text>
                            <Text style={styles.cacheText}>{cacheSize}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <View>
                    <TouchableOpacity style={styles.loginOutBtn}>
                        <LinearGradient start={{x:0,y:0}} end={{x:1,y:0}} colors={['#4c66f9','#3b5998','#192f6a']}>
                            <Text style={styles.loginOutBtnText}>颜色渐变</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> */}
           </View>
           <View style={styles.cardbox}>
                <View>
                    <TouchableOpacity style={styles.loginOutBtn} onPress={()=>onLoginOut()}>
                        <View>
                            <Text style={[styles.loginOutBtnText,{color:"red",textAlign:'center'}]}>退出登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
           </View>
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
                pannableHeaderProps={{title: '你确定要退出登录吗？'}}
                onDismiss={() =>{
                    setVisible(false);
                }}
                panDirection={PanningProvider.Directions.DOWN}
                ignoreBackgroundPress={false}
                >
                {<View spread>
                    <View marginT-20 marginH-20>
                        <Text>退出登录之后将会清楚您的全部的用户信息～</Text>
                    </View>
                    <View margin-20 style={styles.btngroup}>
                        <Button style={[styles.btngroupItem]} color='#444' label="取消" link onPress={()=>{setVisible(false);}}/>
                        <Button style={styles.btngroupItem} label="确定" link onPress={()=>{onSure()}}/>
                    </View>
                </View>}
            </Dialog>
        </View>
    )
};

const styles = StyleSheet.create({
    loginOutBtn:{
        width:'100%',
        height:size(50),
        borderColor:'#eee',
        borderBottomWidth:size(1),
        borderStyle:'solid',
    },
    oginOutBtn:{
        width:'100%',
        height:size(50),
        marginTop:size(20),
        borderRadius:size(5)
    },
    loginOutBtnText:{
        lineHeight:size(50),
        textAlign:'left',
        fontSize:size(14)
    },
    cacheText:{
        fontSize:size(16)
    },
    contentBoxTop:{
        marginTop:size(20)
    },
    roundedDialog: {
        backgroundColor: Colors.white,
        marginBottom: Constants.isIphoneX ? 0 : size(20),
        borderRadius: size(12)
    },
    cardbox:{
        backgroundColor: Colors.white,
        paddingLeft:size(15),
        paddingRight:size(15),
        marginTop:size(15),
        borderRadius:size(4)
    },
    listItemBox:{
        flexDirection:'row',
        alignItems:'center'
    },
    btngroup:{
        flexDirection:'row',
        alignItems:'center'
    },
    btngroupItem:{
        flex:1,
    },
    btngroupItemLeft:{
        color:'#444'
    }
})

export default MySettingScreen;

