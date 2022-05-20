import React, { useState,useEffect } from "react";
import { View,Text,StyleSheet,TextInput,StatusBar,Dimensions,TouchableOpacity} from 'react-native';
import { colors } from '@/assess/styles';
import Headers from "@/Components/header/Headers";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getForgetPwdCode,resetPassword} from "@/Api/login";
import constant from "@/utils/constant";
import {size} from '@/utils';

const {height,width} =  Dimensions.get('window');
const EditLoginPwdScreen = (props) => {
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
        <View>
            <KeyboardAwareScrollView>
                <View style={{ height:height,width:width,flexDirection:'column',backgroundColor:'#fff'}}>
                    <Headers
                        leftIcon={'left'}
                        border={true}
                        leftColor={'#444'}
                        backgroundColor={'#fff'}
                        centerContent={<Text style={[styles.headerBoxCenterText,{color:'#444'}]} numberOfLines={1}>{'修改登陆密码'}</Text>}
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
                            <View style={{backgroundColor:colors.primary,borderRadius:5}}>
                                <Text style={styles.loginBtnText}>确认修改登陆密码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    leftContent:{
        flexDirection:'row'
    },
    leftContentTitle:{
        color:'#fff',
        paddingLeft:size(5)
    },
    headerBoxCenterText:{
        textAlign:'center',
        fontWeight:'600',
        fontSize:size(16)
    },
    formContent:{
        flex:1,
        paddingLeft:size(24),
        paddingRight:size(24),
    },
    formContentTop:{
        backgroundColor:'#1868EF',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:size(30),
        paddingBottom:size(30)
    },
    formContentTopLogoBox:{
        width:size(80),
        height:size(80),
        backgroundColor:'#fff',
        borderRadius:size(40),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    formContentTopTitle:{
        paddingTop:size(30),
        color:'#fff',
        fontSize:size(16)
    },
    formContentCenter:{
        flex:1,
        paddingLeft:size(24),
        paddingRight:size(24),
    },
    formItem:{
        backgroundColor:'#eee',
        flexDirection:'row',
        alignItems:'center',
        height:size(50),
        lineHeight:size(50),
        paddingLeft:size(12),
        paddingRight:size(12),
        borderRadius:size(5)
    },
    IconImage:{
        width:size(34),
        height:size(34)
    },
    formItemRight:{
        flex:1
    },
    formItemRightText:{
        paddingLeft:size(12)
    },
    loginBtn:{
        width:'100%',
        height:size(50),
        marginTop:size(20),
        borderRadius:size(5),
        marginBottom:size(30),
        paddingLeft:size(24),
        paddingRight:size(24),
    },
    forgetBox:{
        width:'100%',
        marginTop:size(20),
    },
    zhuCeBox:{
        width:'100%',
        marginTop:size(20),
    },
    zhuCeBoxText:{
        textAlign:'center',
        color:'#666'
    },
    loginBtnText:{
        color:'#fff',
        lineHeight:size(50),
        textAlign:'center',
        fontSize:size(16)
    },
    forgetBoxText:{
        textAlign:'right',
        color:'#666'
    },
    zhuCeBoxBtnText:{
        color:'#1868EF',
    },
    textArexx:{
        backgroundColor:'#eee',
        paddingLeft:size(12),
        paddingRight:size(12),
        paddingTop:size(12),
        paddingBottom:size(12),
        marginTop:size(20),
        borderRadius:size(5)
    },
    textArexxInput:{
        marginTop:size(12)
    },
    formItemLeft:{
        width:size(100)
    },
    formItemLeftText:{
        color:'#666'
    },
    getCodeBtn:{
        marginLeft:size(16)
    }
})


export default EditLoginPwdScreen;
