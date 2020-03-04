export const route = [{
    path: '/dashboard',
    component: () => import( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
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
    component: () => import( /* webpackChunkName: "table" */ '../components/admin/user/userAdd.vue'),
    meta: {
      title: '团队成员添加'
    }
  }, {
    path: '/userList',
    component: () => import( /* webpackChunkName: "table" */ '../components/admin/user/userList.vue'),
    meta: {
      title: '团队成员列表'
    }
  },
  // 团队员工管理
  {
    path: '/addSingle',
    component: () => import( /* webpackChunkName: "table" */ '../components/admin/single/addSingle.vue'),
    meta: {
      title: '添加录单'
    }
  },

  {
    path: '/documentary',
    component: () => import( /* webpackChunkName: "table" */ '../components/admin/single/documentary.vue'),
    meta: {
      title: '跟单列表'
    }
  },


  {
    path: '/achievement',
    component: () => import( /* webpackChunkName: "table" */ '../components/admin/achievement/achievement.vue'),
    meta: {
      title: '导入列表(多维度统计)'
    }
  }, {
    path: '/performance',
    component: () => import( /* webpackChunkName: "table" */ '../components/admin/performance/performance.vue'),
    meta: {
      title: '业绩概括'
    }
  }
]