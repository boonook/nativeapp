import Request from '@/utils/Request';
///任务列表
export const getTaskList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/task/list',
        params:params,
        formData:false,
        token:true
    })
};

///任务列表详情
export const getTaskListDetail = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/task/getTaskById',
        params:params,
        formData:false,
        token:true
    })
};


///已参与任务列表
export const getTaskUserList = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/taskUser/list',
        params:params,
        formData:false,
        token:true
    })
};

///接取任务
export const getTask = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/taskUser/takeOver',
        params:params,
        formData:false,
        token:true
    })
};

///领取任务奖励
export const getTaskJiangLi = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/taskUser/receiveAward',
        params:params,
        formData:false,
        token:true
    })
};

///领奖记录
export const getAwardRecordLogs = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/taskUser/awardRecord',
        params:params,
        formData:false,
        token:true
    })
};

///领奖数量
export const statisticsOfAwards = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/taskUser/statisticsOfAwards',
        params:params,
        formData:false,
        token:true
    })
};

///领奖记录
export const submitTaskReview = (params) => {
    return Request.http({
        method:'POST',
        url:'/wlapi/taskUser/submitTaskReview',
        params:params,
        formData:true,
        token:true
    })
};

