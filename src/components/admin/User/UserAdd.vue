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

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form :model="ruleForm"
                       :rules="rules"
                       ref="ruleForm"
                       label-width="100px"
                       class="demo-ruleForm">

                <el-form-item label="用户电话"
                              prop="userPhone">
                  <el-input v-model.number="ruleForm.userPhone"></el-input>
                </el-form-item>

                <el-form-item label="用户姓名"
                              prop="userName">
                  <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <!-- @on-change="ruleForm.user_birthday=$event" -->

                <el-form-item label="用户密码"
                              prop="userPwd">
                  <el-input v-model="ruleForm.userPwd"></el-input>
                </el-form-item>

                <!--   @closeDraw="closeDraw"
                       @applySubmit="applySubmit"
                       :title="'新建练习题/修改练习题'" -->
                <el-form-item>
                  <el-button type="primary"
                             @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>

      </div>
    </div>

  </div>
</template>

<script>
import { UserSave, UserInfo } from '../../../api/index';
export default {
  name: 'userAdd',
  data () {
    return {
      isShowDrawer: false,
      id: '',
      ruleForm: {
        userPhone: '',//用户电话
        userName: '',//用户真实姓名
        userPwd: '',//用户密码
      },
      rules: {
        userPhone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { type: 'number', message: '手机号码必须为数字值' },
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
            console.log("res=", res)
            if (res) {
              this.ruleForm = {}
              this.active.success()
            }

          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      //重置操作

      // this.ruleForm = {
      //   userPhone: '',//用户电话
      //   user_img: '',//用户头像
      //   userName: '',//用户昵称
      //   userName: '',//用户真实姓名
      //   user_birthday: '',//用户生日
      //   userPwd: '',//用户密码
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
