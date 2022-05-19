import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Spinner from 'react-native-spinkit'
import ImageScreen from '@/Components/Image/ImageScreen';

export const  ListFooter=({list=[], total=0})=>{
  if(list.length==0){
    return null;
  }else if (list.length===total){
    if (list.length===total){
      return (
        <View style={{paddingTop:20,paddingBottom:15}}>
            <Text style={{color:'#ccc',fontSize:12,textAlign:'center',}}>数据加载完毕</Text>
        </View>
      )
    }else{
      return null;
    }
  }else{  
    return (
      <View
        style={{
          paddingVertical: 20,
          alignItems:'center'
        }}
      >
        <Spinner type='Wave' color={'#0078ff'} size={24}/>
      </View>
    );
  }
}

export const  ListEmptyComponent=()=>{
  return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:200}}>
          <ImageScreen width={200} source={require('@/assess/images/nodata.png')}/>
          <Text style={{fontSize:12,color:'#999'}}>暂无数据</Text>
      </View>
  )
}
