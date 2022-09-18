import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions,TextInput } from 'react-native';
import Events from './event';
import {size} from '@/utils';
import {
    Modal,
    Incubator
} from 'react-native-ui-lib';

const { width, height } = Dimensions.get('window');
const {Toast} = Incubator;
export default class ToastModal extends React.Component {
    
    constructor () {
        super();
        this.state = {
            modalVisible: false,
            modalOptions: {},
            payPwd:null,
            toastShow:false,
            toastMsg:'请输入支付密码'
        }
    }
    componentDidMount () {
        Events.addListener("modal",this._modal)
    }
    _modal = (options) => {
        this.setState({
            modalVisible: true,
            modalOptions: options,
        })
    }

    _sure=()=>{
        var pwd =/^[A-Za-z0-9]+$/;
        if(this.state.payPwd){
            if (!pwd.test(this.state.payPwd)) {
                this.setState({
                    toastShow:true,
                    toastMsg:"支付密码格式异常！"
                })
                return false
            }else{
                this.setState({
                    modalVisible: false,
                    modalOptions: {},
                    payPwd:null
                })
                this.state.modalOptions.callback({paypwd:this.state.payPwd});
            }
        }else{
            this.setState({
                toastShow:true,
            })
        }
    }

    render () {
        return (
            <Modal
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                transparent={true}
                animationType="fade"
                overlayBackgroundColor={'rgba(0,0,0,0)'}
                >
                <View style={styles.modal}>
                    <View style={styles.content}>
                        <Text style={styles.tips}>{this.state.modalOptions.text}</Text>
                        <View style={styles.formItem}>
                            <TextInput value={this.state.payPwd} placeholderTextColor={'#999'} onChange={value =>{
                                const newText = value.nativeEvent.text;
                                this.setState({
                                    payPwd:newText
                                })
                            }} placeholder="请输入支付密码" secureTextEntry={true} style={styles.formItemRightText}/>
                        </View>
                        <View style={{ flexDirection: "row",marginLeft:size(15),marginRight:size(15),marginBottom:size(20)}}>
                            <Pressable onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                    modalOptions: {}
                                })
                            }} style={[styles.btns,{marginRight:size(15)}]}>
                                <Text style={styles.btnsText}>取消</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                this._sure();
                            }} style={styles.btns}>
                                <Text style={styles.btnsText}>确定</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <Toast
                    visible={this.state.toastShow}
                    position={'top'}
                    showLoader={true}
                    backgroundColor="rgba(0,0,0,0.5)"
                    message={this.state.toastMsg}
                    messageStyle={{color:'#fff'}}
                    autoDismiss={1500}
                    onDismiss={() =>{
                        this.setState({
                            toastShow:false,
                        })
                    }}
                />
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"rgba(0,0,0,0.4)"
    },
    content: {
        width: width * 0.8,
        paddingTop: 10,
        borderRadius: 4,
        backgroundColor: "#fff",
        fontSize: 16
    },
    tips: {
        fontSize: 16,
        lineHeight: 20,
        minHeight: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        textAlign: "center",
        padding: 10
    },
    btns: {
        textAlign: "center",
        height: 40,
        flex: 1,
        backgroundColor:'#78A4A1',
        borderRadius:size(8)
    },
    btnsText: {
        textAlign: "center",
        lineHeight: 40,
        fontSize: 16,
        color: "#fff"
    },
    formItem:{
        backgroundColor:'#eee',
        marginLeft:size(15),
        marginRight:size(15),
        paddingLeft:size(12),
        paddingRight:size(12),
        borderRadius:size(5),
        marginBottom:size(40)
    },
    formItemRightText:{
        width:'100%',
        height:size(50),
        color:'#333',
    }
})
