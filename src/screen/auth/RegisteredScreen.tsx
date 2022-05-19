import React,{useState} from "react";
import {StyleSheet, StatusBar} from 'react-native';
import Headers from '@/Components/header/Headers';
import {userStore} from '@/contexts/storeHooks';
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
let RegisteredScreen = (props:any)=>{
    const store:any = userStore();
    const [visible,setVisible] = useState(false)

    function onLoginOut(){
        setVisible(true);
    }

    function onSure(){
        setVisible(false);
        store.userState.loginOut();
    }

    return(
        <View style={{ flex: 1,backgroundColor:"#f8f8f8"}}>
            <Headers
                title={'注册'}
                border={true}
                barStyle={0}
                leftIcon={require('@/assess/images/icon/back.png')}
                rightIcon={require('@/assess/images/icon/menu.png')}
                leftTitle={'返回'}
                backgroundColor={'orange'}
                centerColor={'#666'}
                {...props}
            />
            <View>
                <TouchableOpacity style={styles.loginOutBtn} onPress={()=>onLoginOut()}>
                    <View>
                        <Text style={styles.loginOutBtnText}>退出登录</Text>
                    </View>
                </TouchableOpacity>
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
        backgroundColor:"#fff",
        height:50,
        marginTop:20,
        borderRadius:5
    },
    oginOutBtn:{
        width:'100%',
        backgroundColor:"#fff",
        height:50,
        marginTop:20,
        borderRadius:5
    },
    loginOutBtnText:{
        lineHeight:50,
        textAlign:'center'
    },
    contentBoxTop:{
        marginTop:20
    },
    roundedDialog: {
        backgroundColor: Colors.white,
        marginBottom: Constants.isIphoneX ? 0 : 20,
        borderRadius: 12
    },
})

export default RegisteredScreen;

