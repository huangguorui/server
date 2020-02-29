<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="onRoutes"
             :collapse="collapse"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index"
                      :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs"
                          :index="subItem.index"
                          :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs"
                              :key="i"
                              :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else
                            :index="subItem.index"
                            :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index"
                        :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-lx-home',
          index: 'dashboard',
          title: '系统首页'
        },
        // {
        //   icon: 'el-icon-lx-cascades',
        //   index: 'table',
        //   title: '基础表格'
        // },
        // {
        //   icon: 'el-icon-lx-calendar',
        //   index: 'fsdafad',
        //   title: '管理员管理',
        //   subs: [
        //     {
        //       index: 'AdministratorsAdd',
        //       title: '管理员添加'
        //     },
        //     {
        //       index: 'AdministratorsList',
        //       title: '管理员列表'
        //     },

        //   ]
        // },

        {
          icon: 'el-icon-lx-copy',
          index: 'tabs',
          title: '团队员工管理',
          subs: [
            {
              index: 'UserAdd',
              title: '团队成员添加'
            },
            {
              index: 'UserList',
              title: ' 团队成员列表'
            },
            // {
            //   index: 'UserList',
            //   title: '用户收藏'
            // },
            // {
            //   index: 'UserList',
            //   title: '用户成绩'
            // },

          ]
        },
        // {
        //   icon: 'el-icon-lx-calendar',
        //   index: '',
        //   title: '考试试题',
        //   subs: [
        //     {
        //       index: 'SingleAdd',
        //       title: '试题添加'
        //     },
        //     {
        //       index: 'OneSubjectImport',
        //       title: '试卷导入'
        //     },

        //     {
        //       index: 'SubjectList',
        //       title: '试题列表'
        //     },

        //   ]
        // },

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
          subs: [
            {
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

        // {
        //   icon: 'el-icon-lx-copy',
        //   index: 'UserVip',
        //   title: 'Vip等级管理'
        // },
        // {
        //   icon: 'el-icon-lx-copy',
        //   index: 'UserOpinion',
        //   title: '用户意见'
        // },


        // {
        //   icon: 'el-icon-lx-copy',
        //   index: 'SystemNotice',
        //   title: '系统通知'
        // }

        // {
        //     icon: 'el-icon-lx-calendar',
        //     index: '3',
        //     title: '表单相关',
        //     subs: [
        //         {
        //             index: 'form',
        //             title: '基本表单'
        //         },
        //         {
        //             index: '3-2',
        //             title: '三级菜单',
        //             subs: [
        //                 {
        //                     index: 'editor',
        //                     title: '富文本编辑器'
        //                 },
        //                 {
        //                     index: 'markdown',
        //                     title: 'markdown编辑器'
        //                 }
        //             ]
        //         },
        //         {
        //             index: 'upload',
        //             title: '文件上传'
        //         }
        //     ]
        // },
        // {
        //     icon: 'el-icon-lx-emoji',
        //     index: 'icon',
        //     title: '自定义图标'
        // },
        // {
        //     icon: 'el-icon-pie-chart',
        //     index: 'charts',
        //     title: 'schart图表'
        // },
        // {
        //     icon: 'el-icon-rank',
        //     index: '6',
        //     title: '拖拽组件',
        //     subs: [
        //         {
        //             index: 'drag',
        //             title: '拖拽列表'
        //         },
        //         {
        //             index: 'dialog',
        //             title: '拖拽弹框'
        //         }
        //     ]
        // },
        // {
        //     icon: 'el-icon-lx-global',
        //     index: 'i18n',
        //     title: '国际化功能'
        // },
        // {
        //     icon: 'el-icon-lx-warn',
        //     index: '7',
        //     title: '错误处理',
        //     subs: [
        //         {
        //             index: 'permission',
        //             title: '权限测试'
        //         },
        //         {
        //             index: '404',
        //             title: '404页面'
        //         }
        //     ]
        // },
        // {
        //     icon: 'el-icon-lx-redpacket_fill',
        //     index: '/donate',
        //     title: '支持作者'
        // }
      ]
    };
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '');
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
