import Request from '@/utils/Request';
///咨询详情、公告详情
export const getProductDetailData = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/merchantInfo/getDetail',
        params:params,
        formData:false,
        token:true
    })
};

////商品类型列表
export const getShopTypeList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/merchantType/list',
        params:params,
        formData:false,
        token:true
    })
};

////商品类型列表
export const addPlaceAnOrder = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/orderInfo/placeAnOrder',
        params:params,
        formData:false,
        token:true
    })
};

///商品详情的拼团信息
export const getGroupInfo = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/orderInfo/getGroupInfo',
        params:params,
        formData:false,
        token:true
    })
};

////商品类型列表
export const getJoinGroupList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/merchantInfo/joinGroupList',
        params:params,
        formData:false,
        token:true
    })
};

////发起拼团
export const getStartAGroup = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/orderInfo/startAGroup',
        params:params,
        formData:false,
        token:true
    })
};
