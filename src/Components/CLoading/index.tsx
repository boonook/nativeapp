import React from 'react';
import { View,Text,ActivityIndicator} from 'react-native'
import Spinner from 'react-native-spinkit'
let CLoading = (props:any)=>{

    return (
        <>
            {props.loading?<View style={{alignItems:'center',marginTop:80}}>
                <Spinner type='Wave' color={'#999'} size={30}/>
            </View>:props.children}
        </>
    )
}

export default CLoading;