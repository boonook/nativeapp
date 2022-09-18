import React from 'react';
import { ActivityIndicator, StyleSheet, Dimensions,View } from 'react-native';
import Events from './event';
import {size} from '@/utils';
const { width, height } = Dimensions.get('window');

export default class ToastLoading extends React.Component {
    constructor () {
        super();
        this.state = {
            loading: false
        }
    }
    componentDidMount () {
        Events.addListener("loading",this._loading)
    }
    _loading = (bl) => {
        this.setState({
            loading: bl,
        })
    }
    render () {
        return (
            <View style={[styles.loading,{zIndex: this.state.loading ? 10 : -1}]}>
                <View style={styles.loadingbox}>
                    <ActivityIndicator animating={this.state.loading} size="large" color="#fff" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        width,
        height,
        backgroundColor: "rgba(0,0,0,0)",
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    loadingbox:{
        backgroundColor: "rgba(0,0,0,8)",
        width:size(120),
        height:size(120),
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:size(6),
    }
})