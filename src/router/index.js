import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/dashboard',
                    component: () => import( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/tabs',
                    component: () => import( /* webpackChunkName: "tabs" */ '../components/admin/Tabs.vue'),
                    meta: {
                        title: 'tab选项卡'
                    }
                },

                {
                    path: '/UserAdd',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/User/UserAdd.vue'),
                    meta: {
                        title: '用户添加'
                    }
                },
                {
                    path: '/UserList',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/User/UserList.vue'),
                    meta: {
                        title: '列表'
                    }
                },
                {
                    path: '/SingleAdd',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/Subject/SingleAdd.vue'),
                    meta: {
                        title: '单个试题添加'
                    }
                },
                {
                    path: '/OneSubjectImport',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/Subject/OneSubjectImport.vue'),
                    meta: {
                        title: '试卷导入'
                    }
                },
                {
                    path: '/SubjectList',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/Subject/SubjectList.vue'),
                    meta: {
                        title: '试卷列表'
                    }
                },
                {
                    path: '/addSingle',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/Single/addSingle.vue'),
                    meta: {
                        title: '添加单'
                    }
                },




                {
                    path: '/documentary',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/Single/documentary.vue'),
                    meta: {
                        title: '跟单列表'
                    }
                },

                // {
                //     path: '/UserOpinion',
                //     component: () => import( /* webpackChunkName: "table" */ '../components/admin/Opinion/UserOpinion.vue'),
                //     meta: {
                //         title: '用户意见反馈'
                //     }
                // },
                // {
                //     path: '/Column',
                //     component: () => import( /* webpackChunkName: "table" */ '../components/admin/ColumnManagement/Column/Column.vue'),
                //     meta: {
                //         title: '二级栏目列表'
                //     }
                // },
                // {
                //     path: '/TopColumn',
                //     component: () => import( /* webpackChunkName: "table" */ '../components/admin/ColumnManagement/TopColumn/TopColumn.vue'),
                //     meta: {
                //         title: '一级栏目列表'
                //     }
                // },
                // {
                //     path: '/ColumnManagement',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/admin/TopColumn/TopColumn.vue'),
                //     meta: { title: '栏目管理' }
                // },


                //管理员列表
                // {
                //     path: '/AdministratorsList',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/admin/Administrators/AdministratorsList.vue'),
                //     meta: { title: '管理员列表' }
                // },
                // //管理员添加

                // {
                //     path: '/AdministratorsAdd',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/admin/Administrators/AdministratorsList.vue'),
                //     meta: { title: '管理员添加' }
                // },
                // {
                //     path: '/UserVip',
                //     component: () => import( /* webpackChunkName: "table" */ '../components/admin/UserVip/UserVip.vue'),
                //     meta: {
                //         title: 'Vip等级管理'
                //     }
                // },


                {
                    path: '/achievement',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/achievement/achievement.vue'),
                    meta: {
                        title: '导入列表(多维度统计)'
                    }
                },
                {
                    path: '/performance',
                    component: () => import( /* webpackChunkName: "table" */ '../components/admin/performance/performance.vue'),
                    meta: {
                        title: '业绩概括'
                    }
                },
                //
                /*
                所有考生的考试成绩
                所有考生收藏的题目
                用户考试成绩一览
                
                */






                {
                    path: '/icon',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: {
                        title: '自定义图标'
                    }
                },
                // {
                //     path: '/table',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                //     meta: { title: '基础表格' }
                // },
                {
                    path: '/tabs',
                    component: () => import( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: {
                        title: 'tab选项卡'
                    }
                },
                {
                    path: '/form',
                    component: () => import( /* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: {
                        title: '基本表单'
                    }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import( /* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: {
                        title: 'markdown编辑器'
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import( /* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: {
                        title: '文件上传'
                    }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import( /* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: {
                        title: 'schart图表'
                    }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import( /* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: {
                        title: '拖拽列表'
                    }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import( /* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: {
                        title: '拖拽弹框'
                    }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import( /* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: {
                        title: '国际化'
                    }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: {
                        title: '权限测试',
                        permission: true
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
                    component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: {
                        title: '403'
                    }
                },
                {
                    path: '/donate',
                    component: () => import( /* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: {
                        title: '支持作者'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
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