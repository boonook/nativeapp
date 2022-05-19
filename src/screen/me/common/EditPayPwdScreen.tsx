import React, { useState,useEffect } from "react";
import { View,Text,StyleSheet,TextInput,StatusBar,Dimensions,TouchableOpacity} from 'react-native';
import theme from '@/theme/theme.js'
import Headers from "@/Components/header/Headers";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getForgetPwdCode,resetPassword} from "@/Api/login";
import constant from "@/utils/constant";
const {height,width} =  Dimensions.get('window');
const EditPayPwdScreen = (props) => {
    /****密码是否可见start****/
    const [settingLoginPwdStatus,setSettingLoginPwdStatus] = useState(true);
    const [querenLoginPwdStatus,setQuerenLoginPwdStatus] = useState(true);
    const [settingPayPwdStatus,setSettingPayPwdStatus] = useState(true);
    const [querenPayPwdStatus,setQuerenPayPwdStatus] = useState(true);
    /****密码是否可见end****/
    const [code,setCode] = useState(null);
    const [timer,setTimer] = useState(59);
    const [phone,setPhone] = useState(null);
    const [codeTitle,setCodeTitle] = useState('获取验证码')
    const [loginPassword,setLoginPassword] = useState(null);
    const [againLoginPassword,setAgainLoginPassword] = useState(null);

    const [userName,setUserName] = useState('boonook22');
    const [userPwd,setUserPwd] = useState('boonook')

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
        });
    })

    function onSetSettingLoginPwdStatus() {
        setSettingLoginPwdStatus(!settingLoginPwdStatus)
    }

    function onSetQuerenLoginPwdStatus() {
        setQuerenLoginPwdStatus(!querenLoginPwdStatus)
    }

    function onSetSettingPayPwdStatus() {
        setSettingPayPwdStatus(!settingPayPwdStatus)
    }

    function onSetQuerenPayPwdStatus() {
        setQuerenPayPwdStatus(!querenPayPwdStatus)
    }

    function onSureAndLogin() {
        
    }

    function _onGetCode(){
        let params={
            phone
        }
        // @ts-ignore
        getForgetPwdCode(params).then(res=>{
            if(res && res.code+''===constant.SUCCESS+''){
               
            }
        })
    }

    return(
        <>
            <KeyboardAwareScrollView>
                <View style={{ height:height,width:width,flexDirection:'column',backgroundColor:'#fff'}}>
                    <Headers
                        leftIcon={'left'}
                        leftColor={'#444'}
                        border={true}
                        backgroundColor={'#fff'}
                        centerContent={<Text style={[styles.headerBoxCenterText,{color:'#444'}]} numberOfLines={1}>{'修改支付密码'}</Text>}
                        {...props}
                    />
                    <View style={styles.formContent}>
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>手机号</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput value={phone} onChange={value =>{
                                    const newText = value.nativeEvent.text.replace(/[^\d]+/, '');
                                    setPhone(newText);
                                }} placeholder="请输入手机号" style={styles.formItemRightText}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.loginBtn}>
                        <TouchableOpacity onPress={onSureAndLogin}>
                            <View style={{backgroundColor:theme.backgroundColor,borderRadius:5}}>
                                <Text style={styles.loginBtnText}>确认修改支付密码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    leftContent:{
        flexDirection:'row'
    },
    leftContentTitle:{
        color:'#fff',
        paddingLeft:5
    },
    headerBoxCenterText:{
        textAlign:'center',
        fontWeight:'600',
        fontSize:16
    },
    formContent:{
        flex:1,
        paddingLeft:24,
        paddingRight:24,
    },
    formContentTop:{
        backgroundColor:theme.backgroundColor,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:30,
        paddingBottom:30
    },
    formContentTopLogoBox:{
        width:80,
        height:80,
        backgroundColor:'#fff',
        borderRadius:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    formContentTopTitle:{
        paddingTop:30,
        color:'#fff',
        fontSize:16
    },
    formContentCenter:{
        flex:1,
        paddingLeft:24,
        paddingRight:24,
    },
    formItem:{
        backgroundColor:'#eee',
        flexDirection:'row',
        alignItems:'center',
        height:50,
        lineHeight:50,
        paddingLeft:12,
        paddingRight:12,
        borderRadius:5
    },
    IconImage:{
        width:34,
        height:34
    },
    formItemRight:{
        flex:1
    },
    formItemRightText:{
        paddingLeft:12
    },
    loginBtn:{
        width:'100%',
        height:50,
        marginTop:20,
        borderRadius:5,
        marginBottom:30,
        paddingLeft:24,
        paddingRight:24,
    },
    forgetBox:{
        width:'100%',
        marginTop:20,
    },
    zhuCeBox:{
        width:'100%',
        marginTop:20,
    },
    zhuCeBoxText:{
        textAlign:'center',
        color:'#666'
    },
    loginBtnText:{
        color:'#fff',
        lineHeight:50,
        textAlign:'center',
        fontSize:16
    },
    forgetBoxText:{
        textAlign:'right',
        color:'#666'
    },
    zhuCeBoxBtnText:{
        color:theme.backgroundColor
    },
    textArexx:{
        backgroundColor:'#eee',
        paddingLeft:12,
        paddingRight:12,
        paddingTop:12,
        paddingBottom:12,
        marginTop:20,
        borderRadius:5
    },
    textArexxInput:{
        marginTop:12
    },
    formItemLeft:{
        width:100
    },
    formItemLeftText:{
        color:'#666'
    },
    getCodeBtn:{
        marginLeft:15
    }
})


export default EditPayPwdScreen;
