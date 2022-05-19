// @ts-ignore
import Request from '@/utils/Request';
export const getAddressList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/userAddress/list',
        params:params,
        formData:false,
        token:true
    })
};
///新增地址
export const addressList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/userAddress/save',
        params:params,
        formData:false,
        token:true
    })
};
///删除地址
export const delAddressList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/userAddress/delete',
        params:params,
        formData:false,
        token:true
    })
};

///我的订单
export const getMyOrderList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/orderInfo/list',
        params:params,
        formData:false,
        token:true
    })
};

///默认收货地址
export const defaultAddress = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/userAddress/getDefault',
        params:params,
        formData:false,
        token:true
    })
};

///我的订单
export const orderInfoList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/orderInfo/list',
        params:params,
        formData:false,
        token:true
    })
};

///确认收货
export const sureShouHuoOrder = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/orderInfo/confirmReceipt',
        params:params,
        formData:false,
        token:true
    })
};

///我的团队
export const myTeamList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/user/myFansList',
        params:params,
        formData:false,
        token:true
    })
};

////我的团队汇总
export const myTuanDuiTopInfo = (params)=>{
    return Request.http({
        method:'POST',
        url:'/wlapi/user/myFansSum',
        params:params,
        formData:false,
        token:true
    })
}

////我的钱包
export const myWallet = (params)=>{
    return Request.http({
        method:'POST',
        url:'/wlapi/user/getWallet',
        params:params,
        formData:false,
        token:true
    })
}

////我的物流
export const getLogistics = (params)=>{
    return Request.http({
        method:'POST',
        url:'/wlapi/orderInfo/getLogistics',
        params:params,
        formData:false,
        token:true
    })
}

////签到任务记录
export const listVideoReward = (params)=>{
    return Request.http({
        method:'POST',
        url:'/wlapi/user/listVideoReward',
        params:params,
        formData:false,
        token:true
    })
}
