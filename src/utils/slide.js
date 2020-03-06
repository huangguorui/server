export const adminSliderRouters = [
  // {
  //   icon: 'el-icon-lx-home',
  //   index: 'dashboard',
  //   title: '系统首页'
  // },
  {
    icon: 'el-icon-lx-copy',
    index: 'tabs',
    title: '团队员工管理',
    subs: [{
        index: 'userAdd',
        title: '团队成员添加'
      },
      {
        index: 'userList',
        title: ' 团队成员列表'
      },
    ]
  },
  {
    icon: 'el-icon-lx-calendar',
    index: 'hhh',
    title: ' 员工业绩核算',
    subs: [

      {
        icon: 'el-icon-lx-copy',
        index: 'achievement',
        title: '导入列表(多维度统计)'
      },
    ]
  },
  {
    icon: 'el-icon-lx-calendar',
    index: 'a',
    title: '录单&跟单管理',
    subs: [{
        icon: 'el-icon-lx-copy',
        index: 'addSingle',
        title: '添加录单'
      },
      {
        icon: 'el-icon-lx-copy',
        index: 'documentary',
        title: '跟单列表'
      },
    ]
  },
  {
    icon: 'el-icon-lx-copy',
    index: 'performance',
    title: '业绩概括'
  },

]

export const userSliderRouters = [
  // {
  //   icon: 'el-icon-lx-home',
  //   index: 'dashboard',
  //   title: '系统首页'
  // },
  {
    icon: 'el-icon-lx-calendar',
    index: 'a',
    title: '录单&跟单管理',
    subs: [{
        icon: 'el-icon-lx-copy',
        index: 'uaddSingle',
        title: '添加录单'
      },
      {
        icon: 'el-icon-lx-copy',
        index: 'udocumentary',
        title: '跟单列表'
      },
    ]
  },
  {
    icon: 'el-icon-lx-copy',
    index: 'uperformance',
    title: '业绩概括'
  },

]