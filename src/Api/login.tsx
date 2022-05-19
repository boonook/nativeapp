import Request from '@/utils/Request';
export const Login = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/login/login',
        params:params,
        formData:false,
        token:false,
    });
};

export const getCode = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/login/getRegisterVerificationCode',
        params:params,
        formData:false,
        token:false,
    });
};

///忘记密码
export const getForgetPwdCode = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/login/getResetVerificationCode',
        params:params,
        formData:false,
        token:false,
    });
};

export const registered = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/login/registered',
        params:params,
        formData:false,
        token:false,
    });
};

export const resetPassword = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/login/resetPassword',
        params:params,
        formData:false,
        token:false,
    });
};

export const userInfo = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/user/getUserIdByToken',
        params:params,
        formData:false,
        token:true,
    });
};
