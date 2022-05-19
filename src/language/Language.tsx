import * as RNLocalize from 'react-native-localize';
import {Alert} from 'react-native'
import I18n from 'i18n-js'
import en from './locales/en';
import zh from './locales/zh';
import store from '@/store/index'
import AsyncStorage from '@react-native-community/async-storage';

const locales:any = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode;

AsyncStorage.getItem('language').then(res=>{
  if(res){
    I18n.locale = res;
  }else if(systemLanguage){
    I18n.locale = systemLanguage;
  }else{
    I18n.locale = 'zh';
  }
})

I18n.fallbacks = true;

I18n.translations = {
  en,
  zh
};
 
export default I18n;
export {systemLanguage};