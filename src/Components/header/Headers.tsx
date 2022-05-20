import React, {Component, ReactElement} from 'react';
import { View, Text,StyleSheet,SafeAreaView,Platform,NativeModules,TouchableOpacity,StatusBar} from 'react-native';
import {size} from '@/utils';
import {
    Icon,
  } from 'react-native-ui-lib';

const { StatusBarManager } = NativeModules;

let statusBarHeight;
if (Platform.OS === "ios") {
    StatusBarManager.getHeight(height => {
        statusBarHeight = 0;
    });
} else {
    statusBarHeight = 12;
}

type HeaderProps = {
    leftContent?:ReactElement
    backgroundColor?:string
    border?:boolean
    leftIcon?:any
    leftTitle?:string
    centerContent?:ReactElement
    title?:string
    leftColor?:string
    centerColor?:string
    rightContent?:ReactElement
    rightTitle?:string
    rightIcon?:any
    rightColor?:string
    navigation?:{
        goBack?:(...args)=>void
        navigate?:(...args)=>void
    }
    onClickRightBtn?:Function
} | any

export default class Headers extends Component<HeaderProps,any>{
    constructor(props) {
        super(props);
        this.state = {
            title:'首页',
            headerBoxStyle:styles.headerBox
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.backgroundColor!=this.props.backgroundColor || nextProps.barStyle!=this.props.barStyle|| nextProps.hidden!=this.props.hidden){
            StatusBar.setBarStyle(nextProps.barStyle==0?'dark-content':'light-content');
            StatusBar.setBackgroundColor(nextProps.backgroundColor);
            StatusBar.setTranslucent(false);
            StatusBar.setHidden(nextProps.hidden?nextProps.hidden:false);
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle(this.props.barStyle==0?'dark-content':'light-content');
            StatusBar.setBackgroundColor(this.props.backgroundColor?this.props.backgroundColor:'#fff');
            StatusBar.setTranslucent(false);
            StatusBar.setHidden(this.props.hidden?this.props.hidden:false);
        });
        this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor(this.props.backgroundColor?this.props.backgroundColor:'#fff');
            StatusBar.setTranslucent(false);
            StatusBar.setHidden(false);
        });
    }
    
    goBack=()=>{
        if(this.props.closeIcon){
            /////处理如果是web-view中打开二级以及多级页面点击返回事返回web-view的上一页而不是直接关闭web-view
            this.props.onClickleftBtn();
        }else{
            this.props && this.props.navigation && this.props.navigation.goBack && this.props.navigation.goBack();
        }
    }



    onClose=()=>{
        this.props && this.props.navigation && this.props.navigation.goBack && this.props.navigation.goBack();
    }

    onClickRightBtn=()=>{
        this.props.onClickRightBtn && this.props.onClickRightBtn();
    }

    render() {
        return(
            <SafeAreaView style={{backgroundColor:this.props.backgroundColor||'#2d1c4d',paddingTop: statusBarHeight}}>
                <View style={[styles.headerBox,this.props.border?styles.headerBoxBorder:null]}>
                    <View style={styles.headerBoxLeft}>
                        {this.props.leftContent}
                        {this.props.leftIcon?<TouchableOpacity onPress={()=>{this.goBack()}}><Icon source={this.props.leftIcon||require('@/assess/images/icon/back.png')} size={size(20)} tintColor={this.props.centerColor||'#444'}/></TouchableOpacity>:null}
                        {this.props.closeIcon?<TouchableOpacity onPress={()=>{this.onClose()}}><Icon source={require('@/assess/images/icon/close.png')} size={size(20)} style={{marginLeft:size(10)}} tintColor={this.props.centerColor||'#444'}/></TouchableOpacity>:null}
                    </View>
                    <View style={styles.headerBoxCenter}>
                        {this.props.centerContent}
                        {this.props.title?<Text style={[styles.headerBoxCenterText,{color:this.props.centerColor||'#444'}]} numberOfLines={1}>{this.props.title||'帮办管家'}</Text>:null}
                    </View>
                    <TouchableOpacity style={styles.headerBoxRight} onPress={()=>{
                        this.onClickRightBtn();
                    }}>
                        {this.props.rightContent}
                        {this.props.rightTitle?<Text style={[styles.headerBoxRightText,{color:this.props.rightColor||'#444'}]} numberOfLines={1}>{this.props.rightTitle}</Text>:null}
                        {this.props.rightIcon?<Icon source={this.props.rightIcon||require('@/assess/images/icon/menu.png')} size={size(20)} tintColor={this.props.leftColor||'#444'}/>:null}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    headerBox:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:size(12),
        paddingRight:size(12),
        paddingBottom:size(15),
    },
    headerBoxBorder:{
        borderStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    headerBoxCenter:{
        width:size(120),
        textAlign:'center',
    },
    headerBoxLeft:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        height:size(30)
    },
    headerBoxRight:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    headerBoxLeftText:{
        textAlign:'left',
        color:'#666',
    },
    headerBoxRightText:{
        textAlign:'right',
        color:'#666'
    },
    headerBoxCenterText:{
        textAlign:'center',
        fontWeight:'600',
        fontSize:size(16)
    }
})
