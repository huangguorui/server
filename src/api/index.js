import request from '../utils/request';

//先放着
export const fetchData = query => {
    return request({
        url: '/user/user-list',
        method: 'get',
        params: query
    });
};

//用户列表
export const UserList = query => {
    return request({
        url: '/user/user-list',
        method: 'get',
        params: query
    });
};
//删除用户
export const UserDel = query => {
    return request({
        url: '/user/user-del',
        method: 'post',
        params: query
    });
};
//用户添加以及修改
export const UserSave = query => {
    return request({
        url: '/user/user-save',
        method: 'post',
        params: query
    });
};


import qs from 'qs'

//列表 保存
//跟单列表
export const getDocumentarysList = query => {
    return request({
        url: '/documentary/documentary-list',
        method: 'get',
        params: query
    });
};
//添加 and 删除单
export const postDocumentarySave = query => {
    return request({
        url: '/documentary/documentary-save',
        method: 'post',
        params: query
    });
};

//删除单
export const postDocumentaryDel = query => {
    return request({
        url: '/documentary/documentary-del',
        method: 'post',
        params: query
    });
};



//业绩概括列表
export const getUserOrderList = query => {
    return request({
        url: '/userorder/user-order-list',
        method: 'get',
        params: query
    });
};

//excel列表
export const getExcelList = query => {
    return request({
        url: '/excel/excel-list',
        method: 'get',
        params: query
    });
};
//excel删除 -1
export const postExcelFalseDel = query => {
    return request({
        url: '/excel/excel-false-del',
        method: 'post',
        params: query
    });
};

export const postExcelOrderDel = query => {
    return request({
        url: '/excel/excel-order-del',
        method: 'post',
        params: query
    });
};

//excel导出
export const getExcelExport = query => {
    return request({
        url: '/excel/excel-export',
        method: 'get',
        params: query
    });
};



//用户登录
export const getAdminLogin = query => {
    return request({
        url: '/user/admin-login',
        method: 'get',
        params: query
    });
};



//excel导入
export const OneSubjectImport = query => {
    return request({
        url: '/userorder/add-order',
        method: 'post',
        data: qs.stringify(query)
    });
};
//qs.stringify(query)


/* OneSubjectImport  试题导入界面*/

//栏目列表
export const ColumnList = query => {
    return request({
        url: '/column/column-list',
        method: 'get',
        params: query
    });
};

//关联试卷和栏目的关系，并且给试卷取名
export const Relation = query => {
    return request({
        url: '/column/relation',
        method: 'post',
        data: qs.stringify(query)
    });
};

/* OneSubjectImport  试题导入界面*/


/* column  栏目增删改查*/

//添加a and 修改栏目
export const ColumnSave = query => {
    return request({
        url: '/column/column-save',
        method: 'post',
        data: qs.stringify(query)

    });
};

export const ColumnDel = query => {
    return request({
        url: '/column/column-del',
        method: 'post',
        data: qs.stringify(query)

    });
};



/* column  栏目增删改查*/

export const UserInfo = query => {
    return request({
        url: '/user/user-info',
        method: 'get',
        params: query
    });
};

/* userlist*/

// getUserInfo

/* userlist*/

// 试题列表


export const SubjectList = query => {
    return request({
        url: '/column/subject-status-list',
        method: 'get',
        params: query

    });
};

//postExamSave
//试卷名称修改
export const ExamSave = query => {
    return request({
        url: '/subject/exam-save',
        method: 'post',
        data: qs.stringify(query)

    });
};
//试卷删除
export const ExamDel = query => {
    return request({
        url: '/subject/exam-del',
        method: 'get',
        params: query

    });
};

// export const SubjectList = query => {
//     return request({
//         url: '/subject/subject-list',
//         method: 'get',
//         params: query

//     });
// };






/*

一级栏目列表展示

*/








/**
//  *  Api Get请求参数格式化
//  * @author Maybe
//  */
export const formatGetParm = (url, params) => {
    if (params) {
        url = url + '?' + param + '&'
        let propertys = Object.keys(params)
        propertys.forEach((key, index) => {
            if (index === propertys.length - 1) {
                url = url + key + '=' + params[key]
            } else {
                url = url + key + '=' + params[key] + '&'
            }
        })
    } else {
        url = url + '?' + param
    }
    return url
}