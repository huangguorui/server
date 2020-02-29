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
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">

          <!-- <el-form-item label="本题分值"
                        prop="desc">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item> -->

          <el-form-item label="用户电话"
                        prop="user_phone">
            <el-input v-model.number="ruleForm.user_phone"></el-input>
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

            <!-- <el-input v-model="ruleForm.user_img"></el-input> -->
          </el-form-item>
          <el-form-item label="用户邮箱"
                        prop="user_mailbox">
            <el-input v-model="ruleForm.user_mailbox"></el-input>
          </el-form-item>

          <el-form-item label="用户昵称"
                        prop="user_nickname">
            <el-input v-model="ruleForm.user_nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户真实姓名"
                        prop="user_username">
            <el-input v-model="ruleForm.user_username"></el-input>
          </el-form-item>
          <!-- @on-change="ruleForm.user_birthday=$event" -->

          <el-form-item label="用户生日"
                        prop="user_birthday">
            <el-date-picker v-model="ruleForm.user_birthday"
                            type="date"
                            @on-change="ruleForm.user_birthday=$event"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="用户密码"
                        prop="user_pwd">
            <el-input v-model="ruleForm.user_pwd"></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户vip等级"
                        prop="user_vip">
            <el-input v-model="ruleForm.user_vip"></el-input> -->
          </el-form-item>
          <el-form-item label="用户积分"
                        prop="user_integral">
            <el-input v-model.number="ruleForm.user_integral"></el-input>
          </el-form-item>

          <el-form-item label="用户性别"
                        prop="user_sex">
            <el-select v-model="ruleForm.user_sex"
                       placeholder="请选择性别">
              <el-option label="男"
                         value="0"></el-option>
              <el-option label="女"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
          <!--   @closeDraw="closeDraw"
                       @applySubmit="applySubmit"
                       :title="'新建练习题/修改练习题'" -->
          <el-button type="primary"
                     @click="submitForm('ruleForm')">立即创建用户</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { UserSave, UserInfo } from '../../../api/index';
export default {
  name: 'UserAdd',
  data () {
    return {
      isShowDrawer: false,
      id: '',
      ruleForm: {
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
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { type: 'number', message: '手机号码必须为数字值' },
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
          { type: 'date', required: true, required: true, message: '请选择用户生日', trigger: 'blur' }
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

      }
    };
  },
  created () {

  },
  methods: {
    submitForm (formName) {
      // console.log('formName',formName)
      console.log(this.ruleForm.user_birthday)
      // this.ruleForm.user_birthday = this.dateConversion(this.ruleForm.user_birthday)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          UserSave(this.ruleForm).then(res => {
            this.active.success()
            this.ruleForm = {}
            this.active.success()
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      //重置操作

      // this.ruleForm = {
      //   user_phone: '',//用户电话
      //   user_img: '',//用户头像
      //   user_nickname: '',//用户昵称
      //   user_username: '',//用户真实姓名
      //   user_birthday: '',//用户生日
      //   user_pwd: '',//用户密码
      //   user_vip: '',//用户vip等级
      //   user_integral: '',//用户积分
      //   user_sex: '',//用户性别
      // }




    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
