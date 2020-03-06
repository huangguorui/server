import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [{
            path: '/',
            redirect: '/performance'
        }, //dashboard
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: {
                        title: '系统首页'
                    }
                },
                // {
                //     path: '/tabs',
                //     component: () => import( /* webpackChunkName: "tabs" */ '../components/admin/Tabs.vue'),
                //     meta: {
                //         title: 'tab选项卡'
                //     }
                // },

                {
                    path: '/userAdd',
                    component: () => import('../components/admin/user/userAdd.vue'),
                    meta: {
                        title: '团队成员添加'
                    }
                },
                {
                    path: '/userList',
                    component: () => import('../components/admin/user/userList.vue'),
                    meta: {
                        title: '团队成员列表'
                    }
                },
                // 团队员工管理
                {
                    path: '/addSingle',
                    component: () => import('../components/admin/single/addSingle.vue'),
                    meta: {
                        title: '添加录单'
                    }
                },
                {
                    path: '/editSingle',
                    component: () => import('../components/admin/single/editSingle.vue'),
                    meta: {
                        title: '编辑录单'
                    }
                },
                {
                    path: '/documentary',
                    component: () => import('../components/admin/single/documentary.vue'),
                    meta: {
                        title: '跟单列表'
                    }
                },


                {
                    path: '/achievement',
                    component: () => import('../components/admin/achievement/achievement.vue'),
                    meta: {
                        title: '导入列表(多维度统计)'
                    }
                },
                {
                    path: '/performance',
                    component: () => import('../components/admin/performance/performance.vue'),
                    meta: {
                        title: '业绩概括'
                    }
                },

                {
                    path: '/uaddSingle',
                    component: () => import('../components/user/single/addSingle.vue'),
                    meta: {
                        title: '添加录单'
                    }
                },
                {
                    path: '/ueditSingle',
                    component: () => import('../components/user/single/editSingle.vue'),
                    meta: {
                        title: '编辑录单'
                    }
                },
                {
                    path: '/udocumentary',
                    component: () => import('../components/user/single/documentary.vue'),
                    meta: {
                        title: '跟单列表'
                    }
                },
                {
                    path: '/uperformance',
                    component: () => import('../components/user/performance/performance.vue'),
                    meta: {
                        title: '业绩概括'
                    }
                },


                {
                    path: '/icon',
                    component: () => import('../components/page/Icon.vue'),
                    meta: {
                        title: '自定义图标'
                    }
                },
                {
                    path: '/404',
                    component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: () => import('../components/page/403.vue'),
                    meta: {
                        title: '403'
                    }
                },
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});