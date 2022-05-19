//@ts-nocheck
import {Dimensions} from 'react-native';
import Api from '@/utils/Api';
export const size = s =>Dimensions.get('window').width / 375 * s;



type TitokotoParams = {
    c?:'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j'|'k'|'l'
    min_length?:number
    max_length?:number
}

/**
 * 获取一言
 * @param params
 */
export const hitokoto = (params?:TitokotoParams)=>{
    const baseUrl = 'https://v1.hitokoto.cn/';
    let query = '';
    if (params){
        query = '?' + Object.keys(params).map(key=>`${key}=${params[key]}`).join('&');
    }
    return fetch(baseUrl + query,{
        method:'get',
    }).then(res=>res.json()).then(res=>{
        return res;
    }).catch(()=>{
        return null;
    });
};

// const rn = ()=>parseInt(Math.random() * 15 + 1 + '')
// export const randomImage = ()=>`http://api.mtyqx.cn/api/random.php?a=${rn()}`

/**
 * @param {string} url ///图片名称
 * **/
export const fileImgUrl = (url)=>{
    return Api.baseUrlImg + url;
};
