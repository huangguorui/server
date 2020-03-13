

export function errorPageSetup(appStore) {

    appStore.addPage({
        name: 'icon',
        path: '/icon',
        component: () => import('./page/Icon.vue'),
        meta: {
            title: '自定义图标'
        }
    }).addPage({
        name: '404',
        path: '*',
        component: () => import( './page/404.vue'),
        meta: {
            title: '404'
        }
    })
}

export function adminSetup(appStore) {


    appStore.addView({
        name:'dashboard',
        path: '/',
        component: () => import('./page/Dashboard.vue'),
        meta: {
            title: '系统首页'
        }
    }).addView({
        name:'userAdd',
        path: '/userAdd',
        component: () => import('./admin/User/UserAdd.vue'),
        meta: {
            title: '团队成员添加'
        }
    }).addView({
        name:'userList',
        path: '/userList',
        component: () => import('./admin/User/UserList.vue'),
        meta: {
            title: '团队成员列表'
        }
    }).addView({
        name: 'addSingle',
        path: '/addSingle',
        component: () => import('./admin/Single/addSingle.vue'),
        meta: {
            title: '添加录单'
        }
    }).addView({
        name: 'editSingle',
        path: '/editSingle',
        component: () => import('./admin/Single/editSingle.vue'),
        meta: {
            title: '编辑录单'
        }
    }).addView({
        name: 'documentary',
        path: '/documentary',
        component: () => import('./admin/Single/documentary.vue'),
        meta: {
            title: '跟单列表'
        }
    }).addView({
        name: 'achievement',
        path: '/achievement',
        component: () => import('./admin/achievement/achievement.vue'),
        meta: {
            title: '导入列表(多维度统计)'
        }
    }).addView({
        name: 'performance',
        path: '/performance',
        component: () => import('./admin/performance/performance.vue'),
        meta: {
            title: '业绩概括'
        }
    }).addView({
        name: 'uaddSingle',
        path: '/uaddSingle',
        component: () => import('./user/single/addSingle.vue'),
        meta: {
            title: '添加录单'
        }
    }).addView({
        name: 'ueditSingle',
        path: '/ueditSingle',
        component: () => import('./user/single/editSingle.vue'),
        meta: {
            title: '编辑录单'
        }
    }).addView({
        name: 'udocumentary',
        path: '/udocumentary',
        component: () => import('./user/single/documentary.vue'),
        meta: {
            title: '跟单列表'
        }
    }).addView({
        name: 'uperformance',
        path: '/uperformance',
        component: () => import('./user/performance/performance.vue'),
        meta: {
            title: '业绩概括'
        }
    })
}

export function userSetup(appStore){
    appStore.addView({
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('./page/Dashboard.vue'),
        meta: {
            title: '系统首页'
        }
    }).addView({
        name: 'addSingle',
        path: '/addSingle',
        component: () => import('./user/single/addSingle.vue'),
        meta: {
            title: '添加录单'
        }
    }).addView({
        name: 'documentary',
        path: '/documentary',
        component: () => import('./admin/Single/documentary.vue'),
        meta: {
            title: '跟单列表'
        }
    }).addView({
        name: 'achievement',
        component: () => import('./admin/achievement/achievement.vue'),
        meta: {
            title: '导入列表(多维度统计)'
        }
    }).addView({
        name: 'performance',
        path: '/performance',
        component: () => import('./admin/performance/performance.vue'),
        meta: {
            title: '业绩概括'
        }
    })
}