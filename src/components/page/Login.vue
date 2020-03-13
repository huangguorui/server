<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>

      <el-form :model="param"
               :rules="rules"
               ref="login"
               label-width="0px"
               class="ms-content">
        <el-form-item prop="userPhone">
          <el-input v-model="param.userPhone"
                    clearable
                    placeholder="请输入电话号码">
            <el-button slot="prepend"
                       icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="userPwd"
                    placeholder="请输入密码"
                    clearable
                    v-model="param.userPwd"
                    show-password
                    @keyup.enter.native="submitForm()">
            <el-button slot="prepend"
                       icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item label=""
                      prop="isUser">
          <el-radio-group v-model="param.isUser">
            <el-radio label="用户登录"></el-radio>
            <el-radio label="管理员登录"></el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary"
                     @click="submitForm()">登录</el-button>
        </div>
        <!-- <p class="login-tips">Tips : 用户名和密码随便填。123</p> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { getAdminLogin, getUserLogin } from './../../api/index';


import { adminRouters, userRouters } from "./../../utils/route"
import { adminSliderRouters, userSliderRouters } from "./../../utils/slide"

// console.log(routers)
export default {
  data: function () {
    return {
      param: {
        userPhone: '12345678999',
        userPwd: '123456',
        isUser: "用户登录",
      },
      rules: {
        userPhone: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        isUser: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
      },
    };
  },
  methods: {
    //管理员登录
    isAdmin () {
      getAdminLogin(this.param).then(res => {
        if (res) {
          localStorage.setItem('ms_username', this.param.userPhone);
          localStorage.setItem('isRouters', "admin");
          localStorage.setItem('isSlider', JSON.stringify(adminSliderRouters));
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          // 
          this.$router.push('/');

        }

      })
    },
    //普通用户登录
    isUser () {

      getUserLogin(this.param).then(res => {
        if (res) {
          localStorage.setItem('ms_username', this.param.userPhone);
          localStorage.setItem('token', res.token);
          //添加相对于的路由

          localStorage.setItem('isRouters', "user");

          localStorage.setItem('isSlider', JSON.stringify(userSliderRouters));
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          // 
          this.$router.push('/');


        }

      })

      // this.$message({
      //   message: '暂不可用',
      //   type: 'error'
      // });


    },

    submitForm () {

      this.$refs.login.validate(valid => {


        if (valid) {
          // this.$message.success('登录成功');
          // localStorage.setItem('ms_userPhone', this.param.userPhone);
          if (this.param.isUser == "用户登录") this.isUser()
          if (this.param.isUser == "管理员登录") this.isAdmin()

        } else {
          this.$message.error('请输入账号和密码');
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>