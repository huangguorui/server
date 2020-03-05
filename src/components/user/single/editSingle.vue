<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>{{$route.meta.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">

        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="120px"
                 class="demo-ruleForm">

          </el-form-item>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-divider content-position="left">必填项（方便业绩统计）</el-divider>
                <el-form-item label="掌柜旺旺"
                              prop="shopkeeperWangWang">
                  <el-input v-model.trim="ruleForm.shopkeeperWangWang" />
                </el-form-item>

                <el-form-item label="用户姓名"
                              prop="userID">
                  <el-select v-model="ruleForm.userID"
                             placeholder="请选择用户姓名">
                    <el-option :label="item.userName"
                               v-for="item in userList"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>

              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-divider content-position="left"> 选填项（非必填，录单跟单使用）</el-divider>

                <el-form-item label="联系方式"
                              prop="orderPhone">
                  <el-input v-model="ruleForm.orderPhone" />
                </el-form-item>
                <el-form-item label="商品链接"
                              prop="shopLink">
                  <el-input v-model="ruleForm.shopLink" />
                </el-form-item>
                <el-form-item label="店铺名称"
                              prop="shopName">
                  <el-input v-model="ruleForm.shopName" />
                </el-form-item>

                <!-- <el-form-item label="有无优惠券">
                  <el-input v-model="ruleForm.name" />
                </el-form-item> -->
                <!-- <el-form-item label="有无优惠券">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="无" />
                    <el-radio label="有" />
                  </el-radio-group>
                </el-form-item> -->

                <el-form-item label="优惠券链接"
                              prop="couponLink">
                  <el-input v-model="ruleForm.couponLink" />
                </el-form-item>

                <el-form-item label="优惠券时间">
                  <el-col :span="11">
                    <el-form-item prop="couponStartTime">
                      <el-date-picker v-model="ruleForm.couponStartTime"
                                      type="date"
                                      placeholder="开始时间"
                                      style="width: 100%;" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="2"
                          class="line">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="couponEndTime">
                      <el-date-picker v-model="ruleForm.couponEndTime"
                                      type="date"
                                      placeholder="结束时间"
                                      style="width: 100%;" />
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-form-item prop="activityStartTime">
                      <el-date-picker v-model="ruleForm.activityStartTime"
                                      type="date"
                                      placeholder="开始时间"
                                      style="width: 100%;" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="2"
                          class="line">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="activityEndTime">
                      <el-date-picker v-model="ruleForm.activityEndTime"
                                      type="date"
                                      placeholder="结束时间"
                                      style="width: 100%;" />
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item label="佣金+服务费%"
                              prop="commission">
                  <el-input v-model="ruleForm.commission" />
                </el-form-item>
                {{ruleForm.coupomTime}}
                <el-form-item label="活动ID"
                              prop="activityID">
                  <el-input v-model="ruleForm.activityID" />
                </el-form-item>
                <el-form-item label="活动链接"
                              prop="activityLink">
                  <el-input v-model="ruleForm.activityLink" />
                </el-form-item>
                <el-form-item label="备注"
                              prop="remarks">
                  <el-input type="textarea"
                            v-model="ruleForm.remarks"
                            :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                </el-form-item>
              </div>
            </el-col>

          </el-row>

          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">立即提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>

  </div>
</template>


<script>
import { UserList, getDocumentarysList, postDocumentarySave } from '../../../api/index';

export default {
  data () {
    return {
      ruleForm: {
        id: '',
        shopkeeperWangWang: "", //根据掌柜旺旺  1
        orderPhone: "",       //店铺联系人1
        shopLink: "",         //商品链接
        couponLink: "",         //优惠券链接 1
        couponStartTime: "",    //优惠券开始时间1
        couponEndTime: "",     //优惠券结束时间1
        couponTime: "",                 //优惠券时间切割返回   代替上面两参数
        activityStartTime: "",  //活动开始时间1
        activityEndTime: "", //活动结束时间1
        activityTime: "",     //同上
        commission: "",   //佣金+服务费  1
        // userID: "",
        shopName: "",    //店铺名称1
        activityID: "", //活动ID 1
        activityLink: "",//活动链接1
        remarks: "",     //备注  1
        documentaryTime: "",  //订单生产时间，后台生成
      },
      userList: [],
      rules: {
        shopkeeperWangWang: [
          { required: true, message: '请输入店铺旺旺名称', trigger: 'blur' },
        ],
        userID: [
          { required: true, message: '请选择用户', trigger: 'blur' },
        ],
      }
    };
  },
  created () {
    //没有ID跳转到列表页面
    if (!this.$route.query.id) {
      this.$router.push({  //核心语句
        path: '/documentary',   //跳转的路径
        query: {           //路由传参时push和query搭配使用 ，作用时传递参数
        }
      })
    }
    this.getUser()
  },

  methods: {

    change (value) {
    },
    defaultTime () {
    },
    getUser () {

      UserList({ page_size: 200 }).then(res => {
        console.log(res)
        this.userList = res.list;
      }).catch(function (error) {
        this.active.error()

      })
      // 判断是否有id信息，有的话就要浮现数据

      if (this.$route.query.id) {
        getDocumentarysList({ id: this.$route.query.id }).then(res => {
          console.log(res)
          this.ruleForm = res.list[0]
          if (this.ruleForm.couponStartTime) {
            this.ruleForm.couponTime = [this.ruleForm.couponStartTime, this.ruleForm.couponEndTime]
          }
        })
      } else {
        this.ruleForm = {}
      }
    },
    submitForm (formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (this.ruleForm.couponStartTime != '') {
            this.ruleForm.couponStartTime = this.formatDate(this.ruleForm.couponStartTime)
            this.ruleForm.couponEndTime = this.formatDate(this.ruleForm.couponEndTime)
          }
          if (this.ruleForm.activityStartTime != '') {
            this.ruleForm.activityStartTime = this.formatDate(this.ruleForm.activityStartTime)
            this.ruleForm.activityEndTime = this.formatDate(this.ruleForm.activityEndTime)
          }

          if ('1970-1-1' == this.ruleForm.couponStartTime) {
            this.ruleForm.couponStartTime = ''
          }
          if ('1970-1-1' == this.ruleForm.couponEndTime) {
            this.ruleForm.couponEndTime = ''
          }
          if ('1970-1-1' == this.ruleForm.activityStartTime) {
            this.ruleForm.activityStartTime = ''
          }
          if ('1970-1-1' == this.ruleForm.activityEndTime) {
            this.ruleForm.activityEndTime = ''
          }


          console.log("this.ruleForm=", this.ruleForm)


          postDocumentarySave(this.ruleForm).then(res => {
            if (res) {
              this.$refs[formName].resetFields()
              this.active.success()

              if (this.$route.query.id) {
                this.$router.push({  //核心语句
                  path: '/documentary',   //跳转的路径
                  query: {           //路由传参时push和query搭配使用 ，作用时传递参数
                  }
                })
              }

              this.getDate()
            }

          })


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    //格式化时间
    formatDate (dataTime) {
      var d = new Date(dataTime);
      let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return youWant
    },
    //格式化时间
    // formatDate (dataTime) {
    //   var d = new Date(dataTime);
    //   let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    //   return youWant
    // },

  }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>

