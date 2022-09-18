import {Platform, StatusBar} from 'react-native';
import store from '../store';
import Api from './Api';
const reloginCode = [401,];
let errcb = null;
let key=null;
export default class Request {
    /**
     * 拼接请求头
     * @param headers

     * @return {{timestamp: any}}
     */
    static makeHeaders(headers = {"Content-Type": 'application/json'}) {
        let _h = {...headers};
        if (Request.isEmpty(_h['Content-Type'])) {
            _h['Content-Type'] = 'application/json';

        }
        _h['platform'] = Platform.OS;
        return _h;
    };
    static makeFormData(params) {
        if(params.fileEntityList!==undefined){
            params.fileEntityList.map((item,index)=>{
                if (item.type === "application/octet-stream") {
                    params.fileEntityList.splice(index,1)
                }
            })
        }
        if (!params) return new FormData();
        if (typeof params !== "object") return new FormData();
        let formData = new FormData();
        Object.keys(params).forEach(k => {
            if (params.hasOwnProperty(k) && !Request.isEmpty(params[k])) {
                ///如果需要添加到表单的值是数组
                if (Array.isArray(params[k]) && !Request.isEmpty(params[k])) {
                    params[k].forEach((i, index) => {
                        ///如果是文件 直接添加到formDate
                        if (i.type === "application/octet-stream") {
                            formData.append(k, i);
                        }
                        ///如果是对象 需要转换为 form字段[数组下标].对象的key 这个形式的key再添加到formData
                        else if (typeof i === 'object') {
                            Object.keys(i).forEach(kk => {
                                formData.append(`${k}[${index}].${kk}`, i[kk]);
                            });
                        } else {
                            formData.append(k, i)
                        }
                    });
                }
                ///如果需要添加到表单的是对象
                else if(params[k].type == "application/octet-stream"){
                    formData.append(k,params[k]);
                }
                else if (typeof params[k] === 'object') {
                    Object.keys(params[k]).forEach(kk => {
                        formData.append(`${k}.${kk}`, params[k][kk]);
                    });
                } else {
                    formData.append(k, params[k]);
                }
            }
        });
        return formData;
    }
    /**
     * 检查对象是否为空  ''，'  '，[],{},...,都默认为空对象
     * @param obj
     * @returns {boolean}
     */
    static isEmpty(obj) {
        if (obj === null) return true;
        if (obj === undefined) return true;
        if (typeof obj === 'string') {
            let _obj = obj.trim();
            return _obj.length <= 0
        }
        if (Array.isArray(obj)) {
            return obj.length <= 0
        }
        if (typeof obj === 'object') {
            return Object.keys(obj).length <= 0
        }
        return false
    };
    /**
     * 根据请求头 生成请求参数
     * @param params
     * @param headers
     * @returns {string}
     */
    static getParamsWithHeaders = (params, headers,formData) => {
        let isJsonParams = false;
        let body = "";
        try {
            isJsonParams = (headers['Content-Type']+'' === 'application/json')
        } catch (error) {
            isJsonParams = false
        }
        if (!Request.isEmpty(params)) {
            if (typeof params === 'string') {
                body = params;
            } else {
                let newParams = {...params};
                if (isJsonParams) {
                    body = JSON.stringify(newParams);
                } else {
                    body = Request.makeFormData(params);
                }
            }
        }
        return body
    };

    /**
     *
     * @param params
     * @return {*}
     */
    static makeQueryString(params) {
        if (!params) return null;
        let keys = Object.keys(params);
        const newArr = keys.sort((s1, s2) => s1 > s2);
        const ifFilter = (k) => {
            if (!params.hasOwnProperty(k)) return false;
            if (params[k] === null || params[k] === 'undefined') return false;
            if (typeof params[k] === 'string' && params[k].length === 0) return false;
            if (Array.isArray(params[k]) && params[k].length <= 0) return false;
            if (typeof params[k] === 'object' && Object.keys(params[k]).length <= 0) return false;
            return true
        };
        const _a = newArr.filter(ifFilter);
        if (_a && _a.length > 0) {
            return _a.map((v) => (`${v}=${params[v]}`)).join('&')
        }
        return null;
        // let queryString = newArr.filter(ifFilter).map((v) => (`${v}=${params[v]}`)).join('&');
        // return queryString;
    }

    //设置ios段网络活动标识
    static setNetworkActivityIndicatorVisible(active) {
        if (Platform.OS === 'ios') {
            StatusBar.setNetworkActivityIndicatorVisible(active);
        }
    }
    /***
     * method:请求方式
     * url：api
     * params:params,
     *formData:是否formdata
     * token:是否携带token
     * ***/

    static http = ({method=null,url=null, params={},formData=false,token=true}) => {
        console.log('loading...');
        global.$ld() //使用loading
        let apiUrl = Api.Request_url + url;
        let h:any = { platform:Platform.OS};
        if(token){
            // @ts-ignore
            h={
                token:store.userState.getToken,
                ...h
            }
        }
        Request.setNetworkActivityIndicatorVisible(true);
        if(method+''==='GET' || method+''==='DELETE'){
            let queryString = Request.makeQueryString(params);
            if (queryString) {
                queryString = `?${decodeURIComponent(queryString)}`
            } else {
                queryString = ''
            }
            apiUrl = apiUrl+ queryString;
            return Request.timeout(fetch(apiUrl, {
                method: method,
                headers:h
            })).then(Request.checkResponse).then(Request.checkCode).catch(e => {
                console.error(e.message)
            });
        }else{
            if(formData){
                h={...h,"Content-Type":'multipart/form-data'}
            }else{
                h={...h,"Content-Type":'application/json'}
            }
            let headers:any;
            if(method+''!=='GET' && method+''!=='DELETE'){
                headers = Request.makeHeaders(h);
                params = Request.getParamsWithHeaders(params, headers, formData);
            }else{
                headers={...h}
            }
            return Request.timeout(fetch(apiUrl, {
                method: method,
                body:params,
                headers
            })).then(Request.checkResponse).then(Request.checkCode).catch(e => {
                global.$cld() //关闭loading
                console.error(e.message)
            });
        }
    };
    //手动控制请求超时
    static timeout(promise, ms = 300 * 100) {
        if (ms <= 0) return promise;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('网络请求超时!'))
            }, ms);
            return promise.then(resolve, reject)
        })
        return promise;
    };

    //检查响应
    static checkResponse(response) {
        global.$cld() //关闭loading
        Request.setNetworkActivityIndicatorVisible(false);
        if (response.ok === true) {
            return response.json();
        } else {
            if (response.status + '' === '403') {
                let error:any = new Error();
                error.message = '授权信息无效,请重新登录';
                error.code = 403;
                throw error
            }
            if (response.status + '' === '400'||response.status + '' === '500') {
                let error:any = new Error();
                error.message = '服务器异常';
                error.code = 400;
                throw error
            }
            let error:any = new Error();
            error.code = Number(response.status);
            return response.json()
                .then(data => {
                    if (data.error) {
                        error.message = data.error.replace('java.lang.Exception:', '');
                    } else {
                        error.message = '请求失败';
                    }
                    throw error
                });
        }
    };

    //检查返回状态码
    static checkCode(response) {
        global.$cld() //关闭loading
        const code = Number(response.status);
        if (reloginCode.indexOf(code) !== -1) {
            let error:any = {};
            error.message = response.message.replace('java.lang.Exception:', '');
            error.code = response.code;
            throw error
        } else {
            if (code+'' === '9000' || code+'' === '9001') {
                console.error('登陆超时，即将退出');
                setTimeout(()=>{
                    // store.userState.loginOut();
                },800)
            }else{
                if(response.title+''==='error'){
                    let error:any = new Error();
                    error.message = response.data;
                    error.code = code;
                    throw error
                }else{
                    return {
                        ...response,
                        code: code,
                    }
                }
            }
        }
    }

    /**
     * 打印错误
     * @param error
     * @param {any} api
     * @return {{code: number; msg: string | any}}
     */
    static logError(error) {
        global.$cld() //关闭loading
        console.log('请求错误', error);
        if (error.message) {
            console.error(error.message.replace('java.lang.Exception:', ''));
        } else {
            console.error(error.message);
        }

        return {
            code: 0,
            msg: error.message,
        };
    }
}
