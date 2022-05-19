import React,{useState,useEffect} from 'react';
import {
    Image,
    View,
} from 'react-native';
import {CachedImage} from 'react-native-img-cache';
let ImageScreen = (props:any)=>{
    let [imageH,setImageH] = useState(100);
    let [isLoading,setIsLoading] = useState(true);
    let [isHttp,setIsHttp] = useState(false);
    useEffect(()=>{
        if(props.source.uri){
            console.log('网络图片');
            setIsHttp(true);
            Image.getSize(props.source.uri,(width, height)=>{
                setImageH(props.width * height / width);
                console.log(props.width * height / width);
                setIsLoading(false);
            })
        }else{
            console.log('本地资源')
            setIsHttp(false);
            const result =  Image.resolveAssetSource(props.source)
            let height = result.height
            let width = result.width
            const finalHeight = props.width * height / width;
            setImageH(finalHeight);
            props.setHeight && props.setHeight(finalHeight)
            setIsLoading(false);
        }
    },[])

    if(isLoading){
        return (
            <View style={{width:props.width,height:props.width,backgroundColor:'#eee'}}></View>
        )
    }else{
        if(isHttp){
            return (
                <CachedImage
                    style={[props.style,{height:imageH,width:props.width}]}
                    source={props.source}
                />
            )
        }else{
            return (
                <Image
                    style={[props.style,{height:imageH,width:props.width}]}
                    source={props.source}
                />
            )
        }
    }
}

export default ImageScreen;