//导入公共弹窗

import { Message } from 'element-ui';

export const t = {
    success: '操作成功',
    error: '操作失败',
    delSuccessText: '删除成功',
    delErrorText: '删除失败',
    time: 6000            //6秒
}


export const active = {

    success: () => {

        Message({
            message: t.success,
            type: 'success',
            duration: t.time
        });
        // Message({
        //     message: t.error,
        //     type: 'error',
        //     duration: t.time
        // });

    },
    error: () => {
        Message({
            message: t.error,
            type: 'error',
            duration: t.time
        });
    }

    //标准

}


//add 添加成功


//添加失败




