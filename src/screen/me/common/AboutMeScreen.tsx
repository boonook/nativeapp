import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View} from 'react-native';
import Headers from '@/Components/header/Headers';
import DeviceInfo from 'react-native-device-info';
import ImageScreen from '@/Components/Image/ImageScreen'
let AboutMeScreen = (props:any)=>{
    let [version,setVersion] = useState('1.0.0');
    let [appName,setAppName] = useState('帮办管家');
    useEffect(()=>{
        setVersion(DeviceInfo.getVersion());
        setAppName(DeviceInfo.getApplicationName());
    },[])

    return(
        <View style={styles.container}>
            <Headers
                title={'关于我们'}
                border={false}
                barStyle={0}
                leftIcon={require('@/assess/images/icon/back.png')}
                backgroundColor={'#fff'}
                centerColor={'#444'}
                {...props}
            />
            <View style={styles.bodybox}>
                <View style={styles.bodyboxTop}>
                    <ImageScreen width={80} source={require('@/assess/images/logo.png')}/>
                    <Text style={styles.bodyboxTopText}>{appName}</Text>
                </View>
                <View style={styles.bodyboxFooter}>
                    <Text style={styles.bodyboxFooterText}>当前版本V {version}</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#fff",
        flexDirection:'column'
    },
    bodybox:{
        flex: 1,
        flexDirection:'column',
        alignItems:'center'
    },
    bodyboxTop:{
        flex:1,
        paddingTop:40,
        flexDirection:'column',
        alignItems:'center'
    },
    bodyboxFooter:{
        paddingBottom:30,
        textAlign:'center'
    },
    bodyboxTopText:{
        fontWeight:'600',
        color:'#444',
        marginTop:8,
        fontSize:16
    },
    bodyboxFooterText:{
        fontSize:14,
        color:'#999',
    }
})

export default AboutMeScreen;

