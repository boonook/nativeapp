import React,{useState,useRef} from "react";
import {StyleSheet,Text,View} from 'react-native';
import Headers from '@/Components/header/Headers';
import ImageScreen from '@/Components/Image/ImageScreen'
import QRCodeScreen from '@/Components/QRCodeScreen/index'
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet'
import {size} from '@/utils';  

let UserInfoScreen = (props:any)=>{
    let [visible,setVisible] = useState(false);
    let Action_Sheet_REF:any = useRef<any>(null);
    function onClickRightBtn(){
        Action_Sheet_REF.current.show();
    }

    return(
        <View style={styles.container}>
            <Headers
                title={'个人信息'}
                border={true}
                barStyle={0}
                leftIcon={require('@/assess/images/icon/back.png')}
                rightIcon={require('@/assess/images/icon/menu.png')}
                leftTitle={'返回'}
                backgroundColor={'#eee'}
                onClickRightBtn={()=>onClickRightBtn()}
                centerColor={'#444'}
                {...props}
            />
            <View style={styles.bodybox}>
                <View style={styles.cardbox}>
                    <View style={styles.userInfobox}>
                        <ImageScreen  style={styles.userInfoboxLeft} width={size(80)} source={require('@/assess/images/me/touxiang.png')}/>
                        <View style={styles.userInfoboxRight}>
                            <Text style={styles.userInfoboxRightTop}>猪猪</Text>
                            <Text style={styles.userInfoaddress}>湖北 十堰</Text>
                        </View>
                    </View>
                    <View style={styles.QRCodebox}>
                        <View style={{width:size(260),height:size(260),marginTop:size(10)}}>
                            <QRCodeScreen value={'http://boonook.top'} size={size(240)} {...props}/>
                        </View>
                    </View>
                    <Text style={styles.QRCodeboxText}>扫一扫上面的二维码，加我为好友</Text>
                </View>
            </View>
            <ActionSheet
                ref={Action_Sheet_REF}
                cancelButtonIndex={2}
                destructiveButtonIndex={5}
                options={[
                    <Text style={styles.actionBox}>保存二维码</Text>,
                    <Text style={styles.actionBox}>换个样式</Text>,
                    <Text style={[styles.actionBox,{color:'red'}]}>取消</Text>
                ]}
                onPress={(index)=>{

                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#eee",
        flexDirection:'column'
    },
    bodybox:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    cardbox:{
        backgroundColor:'#fff',
        width:'90%',
        padding:size(20),
        borderRadius:size(8)
        // flexDirection:'column',
    },
    userInfobox:{
        flexDirection:'row',
        alignItems:'center'
    },
    userInfoboxRight:{
        flex:1,
        marginLeft:size(15),
    },
    userInfoboxLeft:{
        borderRadius:size(4),
    },
    userInfoboxRightTop:{
        fontSize:size(16),
        fontWeight:'600',
        marginBottom:size(10)
    },
    userInfoaddress:{
        color:'#999',
        fontSize:size(14),
    },
    QRCodebox:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:size(20)
    },
    QRCodeboxText:{
        textAlign:'center',
        marginTop:size(20),
        fontSize:size(12),
        color:'#999',
    },
    actionBox:{
        fontSize:size(14),
        color:'#666' 
    }
})

export default UserInfoScreen;

