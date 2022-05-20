import {colors} from '@/assess/styles';
import {size} from '@/utils';
import React,{useState,useEffect} from 'react';
import {userStore} from '@/contexts/storeHooks';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Language from '@/language/Language'

let LoginScreen = (props:any)=>{
    let [phone,setPhone] = useState('13838384438');
    let [password,setPassword] = useState('123456');
    let [test,setTest] = useState('123456');
    const store:any = userStore();

    function handleLogin() {
        let params={
            phone,
            password
        }
        store.userState.setUserInfo(params);
    }

    function onRegistered(){
        props.navigation.push('registered');
    }

    function onForgetPwd(){
        props.navigation.push('forgetPwd');
    }

    useEffect(()=>{
        setTest(store.userState.name);
        props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#ffffff');
            StatusBar.setTranslucent(false);
        });
    },[])

    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.logopage}>{Language.t("signIn.title")}</Text>
                    </View>
                    <View style={styles.formItem}>
                        <Image style={styles.icon} source={require('@/assess/images/auth/icon_phone.png')} />
                        <TextInput
                            value={phone}
                            onChangeText={(text) => {
                                const newText = text.replace(/[^\d]+/, '');
                                setPhone(newText)
                            }}
                            style={styles.input} placeholder={"请输入手机号"} keyboardType={'phone-pad'} />
                    </View>
                    <View style={[styles.formItem, { marginTop: 15 }]}>
                        <Image style={styles.icon} source={require('@/assess/images/auth/icon_pwd.png')} />
                        <TextInput
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                            }} style={styles.input} placeholder={'请输入登陆密码'} secureTextEntry={true} />
                    </View>
                    <View style={styles.forget} >
                        <Text onPress={() => onForgetPwd()}>忘记密码？</Text>
                    </View>
                    <View style={[{ marginTop: 20 }]}>
                        <TouchableOpacity onPress={() => {
                            handleLogin();
                        }}>
                            <View style={styles.login_box_footer_btn}>
                                <Text style={styles.login_box_footer_btn_text}>登陆</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ marginTop: size(20) }}>
                            <Text style={{ textAlign: 'center' }}>还没有账号?<Text onPress={() =>onRegistered()} style={{ color: colors.primary }}>立即注册</Text></Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.loginBox}>武汉万领商贸有限公司</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    head: {
        width: size(375),
        height: size(225.5),
    },
    logo: {
        width: size(85.5),
        height: size(85.5),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
        marginTop: -size(30),
        backgroundColor: '#fff',
        zIndex: 1,
        overflow: 'hidden',
        borderStyle: 'solid',
        borderColor: '#175DEF',
        borderWidth: 1,
    },
    logoIcon: {
        width: size(85.5),
        height: size(85.5),
    },
    form: {
        width: '100%',
        paddingRight: 30,
        paddingLeft: 30,
    },
    formItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingLeft: 30,
        paddingRight: 30,
    },
    icon: {
        width: size(15),
        height: size(22),
    },
    input: {
        flex: 1,
        height: size(35),
        marginLeft: 15,
        fontSize: size(15),
    },
    forget: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    login_box_footer_btn: {
        width: '100%',
        backgroundColor: '#3875F6',
        alignItems: 'center',
        borderRadius: 25.5,
    },
    login_box_footer_btn_text: {
        height: 45,
        lineHeight: 45,
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
    },
    logopage: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 30,
    },
    loginBox: {
        textAlign: 'center',
        paddingBottom: 30,
        color: '#999',
    },
});

export default LoginScreen;