import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Modal
} from 'react-native-ui-lib';
import Events from './event';
export default class Toast extends React.Component {
    constructor () {
        super();
        this.state = {
            modalVisible: false,
            toastText: ''
        }
    }
    componentDidMount () {
        Events.addListener("toast",this._toast)
    }
    _toast = (text) => {
        this.setState({
            modalVisible: true,
            toastText: text
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalVisible: false,
                    toastText: ''
                })
            }, 1000)
        })
    }
    render () {
        return (
            <Modal
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                transparent={true}
                animationType="fade"
                >
                <View style={styles.modal}>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>{this.state.toastText}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,0.8)",
        fontSize: 16,
        marginLeft:40,
        marginRight:40
    },
    contentText:{
        color:'#fff',
    }
})