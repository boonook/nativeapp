import React,{useState,useEffect} from 'react';
import {
    Image,
    ImageBackground,
    View
} from 'react-native';
import {CachedImageBackground} from 'react-native-img-cache';
let ImageBackgroundScreen = (props:any)=>{
    let [imgH,setImgH] = useState(100);
    let [isHttp,setIsHttp] = useState(false);
    let [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        if(props.source.uri){
            setIsHttp(true);
            Image.getSize(props.source.uri,(width, height)=>{
                const finalHeight = props.width * height / width;
                setImgH(finalHeight);
                setIsLoading(false);
            })
        }else{
            setIsHttp(false);
            const result =  Image.resolveAssetSource(props.source)
            let height = result.height
            let width = result.width
            const finalHeight = props.width * height / width;
            setImgH(finalHeight);
            setIsLoading(false);
        }
    },[props])

    if(isLoading){
        return (
            <View style={{width:props.width,height:props.width,backgroundColor:'#eee'}}></View>
        )
    }else if(isHttp){
        return (
            <>
                <CachedImageBackground source={props.source} style={[props.style,{height:imgH,width:props.width}]}>
                    {props.children}
                </CachedImageBackground>
            </>
        )
    }else{
        return (
            <>
                <ImageBackground source={props.source} style={[props.style,{height:imgH,width:props.width}]}>
                    {props.children}
                </ImageBackground>
            </>
        )
    }
}

export default ImageBackgroundScreen;