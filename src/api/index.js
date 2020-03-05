import request from '../utils/request';


//用户列表
export const UserList = query => {
    return request({
        url: '/adminapi/user/user-list',
        method: 'get',
        params: query
    });
};
//删除用户
export const UserDel = query => {
    return request({
        url: '/adminapi/user/user-del',
        method: 'post',
        params: query
    });
};
//用户添加以及修改
export const UserSave = query => {
    return request({
        url: '/adminapi/user/user-save',
        method: 'post',
        params: query
    });
};


import qs from 'qs'

//跟单列表
export const getDocumentarysList = query => {
    return request({
        url: '/adminapi/documentary/documentary-list',
        method: 'get',
        params: query
    });
};
//添加 and 编辑跟单记录
export const postDocumentarySave = query => {
    return request({
        url: '/adminapi/documentary/documentary-save',
        method: 'post',
        params: query
    });
};

//删除添加的接单记录
export const postDocumentaryDel = query => {
    return request({
        url: '/adminapi/documentary/documentary-del',
        method: 'post',
        params: query
    });
};



//业绩概括列表
export const getUserOrderList = query => {
    return request({
        url: '/adminapi/userorder/user-order-list',
        method: 'get',
        params: query
    });
};

//excel列表
export const getExcelList = query => {
    return request({
        url: '/adminapi/excel/excel-list',
        method: 'get',
        params: query
    });
};
//excel删除 -1  删除导入excel记录但是保留订单表
export const postExcelFalseDel = query => {
    return request({
        url: '/adminapi/excel/excel-false-del',
        method: 'post',
        params: query
    });
};
//彻底删除excel表
export const postExcelOrderDel = query => {
    return request({
        url: '/adminapi/excel/excel-order-del',
        method: 'post',
        params: query
    });
};

//excel表格导出
export const getExcelExport = query => {
    return request({
        url: '/adminapi/excel/excel-export',
        method: 'get',
        params: query
    });
};



//管理员登录
export const getAdminLogin = query => {
    return request({
        url: '/adminapi/user/admin-login',
        method: 'get',
        params: query
    });
};



//excel导入
export const OneSubjectImport = query => {
    return request({
        url: '/adminapi/userorder/add-order',
        method: 'post',
        data: qs.stringify(query)
    });
};








//下面为用户接口

export const getUserDocumentarysList = query => {
    return request({
        url: '/api/documentary/documentary-list',
        method: 'get',
        params: query
    });
};