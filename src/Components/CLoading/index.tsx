import React from 'react';
import { View,Text,ActivityIndicator} from 'react-native'
import Spinner from 'react-native-spinkit'
import {size} from '@/utils';

let CLoading = (props:any)=>{

    return (
        <>
            {props.loading?<View style={{alignItems:'center',marginTop:size(80)}}>
                <Spinner type='Wave' color={'#999'} size={size(30)}/>
            </View>:props.children}
        </>
    )
}

export default CLoading;