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
                   :disabled="isBtnDisable"
                   @click="delAllSelection">批量删除</el-button>
        <!-- <el-select v-model="query.address"
                   placeholder="地址"
                   class="handle-select mr10">
          <el-option key="1"
                     label="广东省"
                     value="广东省"></el-option>
          <el-option key="2"
                     label="湖南省"
                     value="湖南省"></el-option>
        </el-select> -->
        <el-input v-model="query.search"
                  clearable
                  @input="handleSearch"
                  placeholder="请输入手机号或用户昵称"
                  style="width:200px"
                  class="handle-input mr10"></el-input>

        <el-button type="primary"
                   icon="el-icon-search"
                   @click="handleSearch">搜索</el-button>
        <el-button type="primary"
                   @click="add">添加用户</el-button>
      </div>
      <el-table :data="tableData"
                v-loading="loading"
                border
                class="table"
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
        <el-table-column prop="user_nickname"
                         label="用户名"></el-table-column>

        </el-table-column>
        <el-table-column label="头像(查看大图)"
                         align="center">
          <template slot-scope="scope">
            <el-image class="table-td-thumb"
                      :src="scope.row.user_img"
                      :preview-src-list="[scope.row.user_img]"></el-image>
          </template>
        </el-table-column>

        <el-table-column prop="user_mailbox"
                         label="邮箱"></el-table-column>
        <el-table-column prop="user_phone"
                         label="电话号码"></el-table-column>

        <el-table-column prop="user_reg_time"
                         label="用户注册"></el-table-column>

        <el-table-column prop="user_birthday"
                         label="用户生日"></el-table-column>
        <el-table-column prop="user_integral"
                         label="用户积分"></el-table-column>
        <el-table-column prop="user_vip"
                         label="用户等级"></el-table-column>
        <el-table-column prop="user_adress"
                         label="地址"></el-table-column>
        <el-table-column prop="user_sex"
                         label="用户性别"></el-table-column>

        <el-table-column label="操作"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       icon="el-icon-edit"
                       @click="edlt(scope.row)">编辑</el-button>
            <!-- <el-button type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->

            <el-button type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="delAllSelection(scope.row.id,'single')">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background
                       layout="total, prev, pager, next"
                       :current-page="query.page"
                       :page-size="query.page_size"
                       :total="query.count"
                       @current-change="handlePageChange"></el-pagination>
      </div>
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
                        prop="user_phone">
            <el-input v-model.number="formData.user_phone"></el-input>
          </el-form-item>

          <el-form-item label="用户头像"
                        prop="user_img">

            <!-- <el-upload class="upload-demo"
drag
action="//www.newexam.com/api/user/user-photo"
multiple>
<i class="el-icon-upload"></i>
<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
<div class="el-upload__tip"
slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> -->

            <!-- <el-input v-model="formData.user_img"></el-input> -->
          </el-form-item>
          <el-form-item label="用户邮箱"
                        prop="user_mailbox">
            <el-input v-model="formData.user_mailbox"></el-input>
          </el-form-item>

          <el-form-item label="用户昵称"
                        prop="user_nickname">
            <el-input v-model="formData.user_nickname"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名"
                        prop="user_username">
            <el-input v-model="formData.user_username"></el-input>
          </el-form-item>
          <!-- @on-change="formData.user_birthday=$event" -->

          <el-form-item label="用户生日"
                        prop="user_birthday">
            <el-date-picker v-model="formData.user_birthday"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="用户密码"
                        prop="user_pwd">
            <el-input v-model="formData.user_pwd"></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户vip等级"
prop="user_vip">
<el-input v-model="formData.user_vip"></el-input> -->
          </el-form-item>
          <el-form-item label="用户积分"
                        prop="user_integral">
            <el-input v-model.number="formData.user_integral"></el-input>
          </el-form-item>

          <el-form-item label="用户性别"
                        prop="user_sex">
            <el-select v-model="formData.user_sex"
                       placeholder="请选择性别">
              <el-option label="男"
                         value="0"></el-option>
              <el-option label="女"
                         value="1"></el-option>
            </el-select>
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
  name: 'UserList',
  data () {
    return {
      formData: {
        // user_phone: 15555555555,//用户电话
        // user_img: '',//用户头像
        // user_mailbox: '2315684325@qq.com',//用户邮箱
        // user_nickname: '一天天天天天的',//用户昵称
        // user_username: '张三',//用户真实姓名
        // user_birthday: '',//用户生日
        // user_pwd: '12345678912',//用户密码
        // user_vip: '',//用户vip等级
        // user_integral: 66666666,//用户积分
        // user_sex: '男',//用户性别

        user_phone: '',//用户电话
        user_img: '',//用户头像
        user_nickname: '',//用户昵称
        user_username: '',//用户真实姓名
        user_birthday: '',//用户生日
        user_pwd: '',//用户密码
        user_vip: '',//用户vip等级
        user_integral: '',//用户积分
        user_sex: '',//用户性别  

      },
      rules: {

        user_phone: [
          // { type: 'number', message: '手机号码必须为数字值' },
          { required: true, message: '手机号码不能为空', trigger: 'blur' },

          // { min: 1, max: 5, message: '长度在 5 到 11 个字符', trigger: 'blur' },
        ],
        user_mailbox: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        user_nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' },

        ],
        user_username: [
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }, ,
          { required: true, message: '请输入用户真实姓名', trigger: 'blur' }
        ],
        user_birthday: [
          { required: true, message: '请选择用户生日', trigger: 'blur' }
        ],
        user_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }, ,
        ],
        // user_vip: [
        //   { required: true, message: '请输入用户VIP等级', trigger: 'change' }
        // ],
        user_integral: [
          { required: true, message: '请输入用户积分', trigger: 'blur' },
          { type: 'number', message: '积分必须为数字值' },
        ],
        user_sex: [
          { required: true, message: '请输入用户性别', trigger: 'blur' },
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
            if (res == undefined) {
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
