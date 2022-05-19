import Request from '@/utils/Request';
///咨询、公告
export const getNewList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/notice/list',
        params:params,
        formData:false,
        token:true
    })
};
///咨询详情、公告详情
export const getNewListDetail = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/notice/getDetail',
        params:params,
        formData:false,
        token:true
    })
};
///首页列表
export const getHomeList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/merchantInfo/homeList',
        params:params,
        formData:false,
        token:true
    })
};

////商品列表
export const getShopList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/merchantInfo/list',
        params:params,
        formData:false,
        token:true
    })
};

