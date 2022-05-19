export const forEach = (arr, fn) => {
    if (!arr.length || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
        let item = arr[i]
        fn(item, i, arr)
    }
}

/**
 * 从 x=1&y=1 形式的字符串中获取参数 {x:1,y:1}
 * @param url
 * @returns {{fileName: string}}
 * @private
 */
export const getQueryParams = (url) => {
    let params = null;
    const arr = url.split('?');
    if (arr && Array.isArray(arr) && arr.length > 0) {
        params = {};
        arr[arr.length - 1].split('&').map(s => {
            const p = s.split('=');
            let _p = {};
            params[p[0]] = p[1];
        });
    } else {
        return null;
    }

    return params;
};


/**
 * 对象深层合并
 * @param def 源对象
 * @param obj 目标对象
 * @returns {any}
 */
export const merge = (def, obj) => {
    try {
        if (!obj) {
            return def;
        } else if (!def) {
            return obj;
        }

        for (let i in obj) {
            // if its an object
            if (obj[i] != null && obj[i].constructor == Object) {
                def[i] = merge(def[i], obj[i]);
            }
            // if its an array, simple values need to be joined.  Object values need to be remerged.
            else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
                // test to see if the first element is an object or not so we know the type of array we're dealing with.
                if (obj[i][0].constructor == Object) {
                    let newobjs = [];
                    // create an index of all the existing object IDs for quick access.  There is no way to know how many items will be in the arrays.
                    let objids = {};
                    for (let x = 0, l = def[i].length; x < l; x++) {
                        objids[def[i][x].id] = x;
                    }

                    // now walk through the objects in the new array
                    // if the ID exists, then merge the objects.
                    // if the ID does not exist, push to the end of the def array
                    for (let x = 0, l = obj[i].length; x < l; x++) {
                        let newobj = obj[i][x];
                        if (objids[newobj.id] !== undefined) {
                            def[i][x] = merge(def[i][x], newobj);
                        }
                        else {
                            newobjs = newobjs.concat(newobj);
                        }
                    }

                    for (let x = 0, l = newobjs.length; x < l; x++) {
                        // def[i].push(newobjs[x]);
                        def[i] = def[i].contact(newobjs[x]);
                    }
                }
                else {
                    for (let x = 0; x < obj[i].length; x++) {
                        let idxObj = obj[i][x];
                        if (def[i].indexOf(idxObj) === -1) {
                            // def[i]
                            def[i] = def[i].concat(idxObj);
                        }
                    }
                }
            }
            else {
                def[i] = obj[i];
            }
        }
        return def;
    } catch (e) {
        console.log('merge->error', e);
        return def;
    }

};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
        const item = arr2[i]
        if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
    return targetarr.some(_ => (arr||[]).indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
    const timeStr = String(timeStamp)
    return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
    return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
    return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType=null) => {
    const d = new Date(timeStamp * 1000)
    const year = d.getFullYear()
    const month = getHandledValue(d.getMonth() + 1)
    const date = getHandledValue(d.getDate())
    const hours = getHandledValue(d.getHours())
    const minutes = getHandledValue(d.getMinutes())
    const second = getHandledValue(d.getSeconds())
    let resStr = ''
    if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
    else resStr = month + '-' + date + ' ' + hours + ':' + minutes
    return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
    // 判断当前传入的时间戳是秒格式还是毫秒
    const IS_MILLISECOND = isMillisecond(timeStamp)
    // 如果是毫秒格式则转为秒格式
    if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
    // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
    timeStamp = Number(timeStamp)
    // 获取当前时间时间戳
    let time:any=new Date();
    const currentTime:any = Math.floor(Date.parse(time) / 1000)
    // 判断传入时间戳是否早于当前时间戳
    const IS_EARLY = isEarly(timeStamp, currentTime)
    // 获取两个时间戳差值
    let diff = currentTime - timeStamp
    // 如果IS_EARLY为false则差值取反
    if (!IS_EARLY) diff = -diff
    let resStr = ''
    const dirStr = IS_EARLY ? '前' : '后'
    // 少于等于59秒
    if (diff <= 59) resStr = diff + '秒' + dirStr
    // 多于59秒，少于等于59分钟59秒
    else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
    // 多于59分钟59秒，少于等于23小时59分钟59秒
    else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
    // 多于23小时59分钟59秒，少于等于29天59分钟59秒
    else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
    // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
    else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
    else resStr = getDate(timeStamp, 'year')
    return resStr
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
    if (key) return key in obj
    else {
        let keysArr = Object.keys(obj)
        return keysArr.length
    }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}


/**
 * 对象是否为空
 * @param obj
 * @return {boolean}
 */
export const isEmpty = (obj, strict = false) => {
    if (obj === null || obj === undefined)  return true;
    if (typeof obj === 'number') return false
    if (typeof obj === 'string') {
        if (strict) {
            return obj.length <= 0;
        }
        return false;
    }
    if (typeof obj === 'object') {
        if (strict) {
            return Object.keys(obj).length <= 0
        }
        return false
    }
    if (obj === undefined) return true;
    if (obj === null) return true;
    if (isNaN(obj)) return true;
    return false
};
/**
 *
 * @param {object} obj
 * @return {string}
 */
export const makeQueryString = (obj) => {
    if (!obj) return '';
    const query = Object.keys(obj).filter(k => obj.hasOwnProperty(k) && !isEmpty(obj[k], true)).map(k => `${k}=${obj[k]}`).join('&');
    if (isEmpty(query)) {
        return ''
    }
    return `?${query}`
};

/**
 *
 * @param dataurl
 * @returns {Blob}
 */
export const base64ToBlob = (dataurl) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

/**
 *  从身份证号码里面获取 信息
 * @param idCard{ string } 省份证号码
 * @returns {Object} |null
 */
export const getInfoFromIdCard = (idCard) => {

    const n:any = idCard + '';
    const re = /^\d{6}(((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}([0-9]|x|X))|(\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}))$/;
    let user = {
        birthday: null,
        sex: 0,
        nation: null,
        age: 0,
    };

    if (!re.test(n)) {
        return null;
    }

    //获取性别
    user.sex = parseInt(n.substr(16, 1)) % 2 === 0 ? 1 : 0;
    //获取年龄
    let myDate = new Date();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let age = myDate.getFullYear() - n.substring(6, 10) - 1;
    if (n.substring(10, 12) < month || n.substring(10, 12) === month && n.substring(12, 14) <= day) {
        age++;
    }
    user.age = age;
    let year = '';
    //判断出生日期
    if (n.length === 15) {
        year = '19' + n.substring(6, 8) + '-' + n.substring(8, 10) + '-' + n.substring(10, 12);

    }
    if (n.length === 18) {
        year = n.substring(6, 10) + '-' + n.substring(10, 12) + '-' + n.substring(12, 14);
    }
    user.birthday = year;
    // cities.forEach((v, i) => {
    //   if (n.substring(0, 6) === cities[i].code) {
    //     user.nation = cities[i].title;
    //   }
    // });
    return user;
};

/**
 * 打印页面内容
 * @param id 要打印对象的id
 * @returns {boolean}
 */
export const printContent =(id)=>{
    let subOutputRankPrint = document.getElementById(id);
    console.log(subOutputRankPrint.innerHTML);
    let newContent =subOutputRankPrint.innerHTML;
    let oldContent = document.body.innerHTML;
    document.body.innerHTML = newContent;
    window.print();
    window.location.reload();
    document.body.innerHTML = oldContent;
    return false;
};
/**
 *对数组进行排序
 * @param array  json对象数组
 * @param key   要排序的key
 * @param order 升序还是降序
 */
export const orderArray=(array,key,order)=>{
    return array.sort(function(index,next){
        let a = index[key];
        let b = next[key];
        if('asc'===order+''){
            return ((a<b)?-1:((a>b)?1:0))
        }else{
            return ((a>b)?-1:((a<b)?1:0))
        }
    })
};

////将数字类型转成千分制
/**
 * @param {number} num 21,222,222,222.00
 * **/
export const formatNum = (num)=>{
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

