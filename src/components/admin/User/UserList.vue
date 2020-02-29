<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> {{$route.meta.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary"
                   icon="el-icon-delete"
                   class="handle-del mr10"
                   size="mini"
                   :disabled="isBtnDisable"
                   @click="delAllSelection">批量删除</el-button>

        <el-input v-model="searchForm.userName"
                  clearable
                  @input="handleSearch"
                  size="mini"
                  placeholder="请输入队员名称"
                  style="width:150px"
                  class="handle-input mr10"></el-input>

        <el-date-picker v-model="searchForm.userRegTime"
                        type="date"
                        @input="handleSearch"
                        size="mini"
                        clearable
                        style="width:150px"
                        class="mr10"
                        @on-change="searchForm.userRegTime=$event"
                        format="yyyy-MM-dd"
                        placeholder="创建时间">
        </el-date-picker>

        <el-button type="primary"
                   icon="el-icon-search"
                   size="mini"
                   @click="handleSearch">搜索</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="add">添加用户</el-button>
      </div>
      <el-table :data="tableData"
                v-loading="loading"
                border
                class="table"
                size="small"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column prop="id"
                         label="ID"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column prop="userName"
                         label="用户名"></el-table-column>

        </el-table-column>

        <el-table-column prop="userPhone"
                         label="电话号码"></el-table-column>

        <el-table-column prop="userRegTime"
                         label="用户注册"></el-table-column>

        <el-table-column prop="userLogoutTime"
                         label="用户退出"></el-table-column>
        <el-table-column prop="userIP"
                         label="用户ID"></el-table-column>

        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="edlt(scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="delAllSelection(scope.row.id,'single')">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination :page-info="query"></pagination>

    </div>
    <DrawerModel :for-data="formData"
                 @closeDraw="closeDraw"
                 :drawerTitle="drawerTitle "
                 @applySubmit="applySubmit"
                 :isDrawer.sync="isShowDrawer">
      <template slot="header">
        <el-form :model="formData"
                 :rules="rules"
                 ref="formData"
                 label-width="100px"
                 class="demo-formData">
          <el-form-item label="用户电话"
                        prop="userPhone">
            <el-input v-model.number="formData.userPhone"></el-input>
          </el-form-item>

          </el-form-item>

          <el-form-item label="真实姓名"
                        prop="userName">
            <el-input v-model="formData.userName"></el-input>
          </el-form-item>
          <!-- @on-change="formData.user_birthday=$event" -->

          <el-form-item label="用户密码"
                        prop="userPwd">
            <el-input v-model="formData.userPwd"></el-input>
          </el-form-item>
          </el-form-item>

        </el-form>
      </template>
    </DrawerModel>
  </div>
</template>

<script>
import interList from '@/common/mixins/list'
import set from '@/common/mixins/set'

import { UserSave, UserDel, UserList } from '../../../api/index';
export default {
  name: 'userList',
  data () {
    return {
      formData: {

        userPhone: '',//用户电话
        userName: '',//用户真实姓名
        userPwd: '',//用户密码

      },
      rules: {

        userPhone: [
          // { type: 'number', message: '手机号码必须为数字值' },
          { required: true, message: '手机号码不能为空', trigger: 'blur' },

          // { min: 1, max: 5, message: '长度在 5 到 11 个字符', trigger: 'blur' },
        ],
        userName: [
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }, ,
          { required: true, message: '请输入用户真实姓名', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }, ,
        ],
      },
      drawerTitle: '新增用户',
      isShowDrawer: false,
      tableData: [], //当前表数据
      editVisible: false, //弹框删除
    };
  },
  mixins: [interList],
  created () {
    this.getData();
  },
  methods: {
    add () {
      this.formData = {}
      this.isShowDrawer = true
    },

    edlt (row) {
      this.drawerTitle = '编辑用户信息'
      this.formData = Object.assign({}, row)
      this.isShowDrawer = true
    },
    applySubmit (data, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UserSave(data).then(res => {
            //清空数据
            this.$refs[formName].resetFields()
            if (res) {
              this.getData()
            } else {
              this.active.success()
              this.getData()
            }
          })
          this.isShowDrawer = false

        } else {
          return false;
        }


      });
    },
    closeDraw (data) {

    },
    getData () {
      let _this = this
      this.loading = true
      UserList(this.query).then(res => {
        this.tableData = res.list;
        this.query = res.page_info
        this.loading = false

      }).catch(function (error) {
        this.active.error()
        _this.loading = false
      })
    },
    //单选多选都可删除
    delAllSelection (id, flag) {
      //通过点击删除进来的 传入的参数必须为一个数组
      if (flag == 'single') {
        this.DelId = [id]
        console.log('id', id)
      }
      // 二次确认删除
      this.$confirm(`确定要删除ID序号为[${this.DelId}]`, '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          UserDel({ id: this.DelId }).then(res => {
            this.active.success()
            this.getData()
          })
        })
        .catch(() => {
          this.loading = false
        });
      this.multipleSelection = [];
    },
  }
};
</script>

<style scoped>
/* @import "./../index.css"; */
/* @import '../../../assets/css/user_index.css'; */
@import '~@/assets/css/user_index.css';
</style>
