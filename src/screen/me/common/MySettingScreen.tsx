import React,{useState} from "react";
import {StyleSheet, Linking, Alert} from 'react-native';
import Headers from '@/Components/header/Headers';
import {userStore} from '@/contexts/storeHooks';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient'
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
import NavigationService from '@/utils/NavigationService';

let MySettingScreen = (props:any)=>{
    const store:any = userStore();
    const [visible,setVisible] = useState(false)

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
                // NavigationService.navigate('home')
            }
        })
    }

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
                    <TouchableOpacity style={styles.loginOutBtn} onPress={()=>onOpen()}>
                        <View>
                            <Text style={styles.loginOutBtnText}>openURL</Text>
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
                          <View height={2} bg-grey70/>
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
                    <View margin-20 right>
                        <Button text80 label="确定" link onPress={()=>{onSure()}}/>
                    </View>
                </View>}
            </Dialog>
        </View>
    )
};

const styles = StyleSheet.create({
    loginOutBtn:{
        width:'100%',
        height:50,
        borderColor:'#eee',
        borderBottomWidth:1,
        borderStyle:'solid',
    },
    oginOutBtn:{
        width:'100%',
        height:50,
        marginTop:20,
        borderRadius:5
    },
    loginOutBtnText:{
        lineHeight:50,
        textAlign:'left'
    },
    contentBoxTop:{
        marginTop:20
    },
    roundedDialog: {
        backgroundColor: Colors.white,
        marginBottom: Constants.isIphoneX ? 0 : 20,
        borderRadius: 12
    },
    cardbox:{
        backgroundColor: Colors.white,
        paddingLeft:15,
        paddingRight:15,
        marginTop:15,
        borderRadius:4
    }
})

export default MySettingScreen;

