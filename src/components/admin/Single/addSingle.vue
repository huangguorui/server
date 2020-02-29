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
                 label-width="120px"
                 class="demo-ruleForm">

          </el-form-item>

          <!-- 必填项（方便业绩统计） 选填项（非必填，录单跟单使用）
统计方式

掌柜旺旺
一次性录入多个，请用“|”进行分隔，如    旺旺1|旺旺2 -->

          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-divider content-position="left">必填项（方便业绩统计）</el-divider>
                <!-- <el-form-item label="统计方式">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="根据掌柜旺旺" />
                    <el-radio label="根据活动ID" />
                  </el-radio-group>
                </el-form-item> -->
                <el-form-item label="掌柜旺旺"
                              prop="shopkeeperWangWang">
                  <el-input v-model="ruleForm.shopkeeperWangWang" />
                  一次性录入多个，请用“|”进行分隔，如 旺旺1|旺旺2
                </el-form-item>

                <el-form-item label="用户姓名"
                              prop="region">
                  <el-select v-model="ruleForm.userID"
                             placeholder="请选择活动区域">
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

                <el-form-item label="联系方式">
                  <el-input v-model="ruleForm.orderPhone" />
                </el-form-item>
                <el-form-item label="商品链接">
                  <el-input v-model="ruleForm.shopLink" />
                </el-form-item>
                <el-form-item label="店铺名称">
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

                <el-form-item label="优惠券链接">
                  <el-input v-model="ruleForm.couponLink" />
                </el-form-item>

                <!-- <el-form-item label="优惠券时间">
                  <el-col :span="11">
                    <el-date-picker v-model="form.date1"
                                    type="date"
                                    placeholder="优惠券开始时间"
                                    style="width: 100%;" />
                  </el-col>
                  <el-col :span="2"
                          class="line">-</el-col>
                  <el-col :span="11">
                    <el-time-picker v-model="form.date2"
                                    type="fixed-time"
                                    placeholder="优惠券结束时间"
                                    style="width: 100%;" />
                  </el-col>
                </el-form-item> -->
                <el-form-item label="优惠券时间">
                  <!-- 时间注意识别 -->
                  <el-date-picker v-model="ruleForm.couponTime"
                                  style="width:100%"
                                  type="datetimerange"
                                  range-separator="至"
                                  start-placeholder="优惠券开始时间"
                                  end-placeholder="优惠券结束时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="活动时间">
                  <el-date-picker v-model="ruleForm.activityTime"
                                  style="width:100%"
                                  type="datetimerange"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker v-model="form.date1"
                                    type="date"
                                    placeholder="开始时间"
                                    style="width: 100%;" />
                  </el-col>
                  <el-col :span="2"
                          class="line">-</el-col>
                  <el-col :span="11">
                    <el-time-picker v-model="form.date2"
                                    type="fixed-time"
                                    placeholder="结束时间"
                                    style="width: 100%;" />
                  </el-col>
                </el-form-item> -->
                <el-form-item label="佣金+服务费%">
                  <el-input v-model="ruleForm.commission" />
                </el-form-item>
                {{ruleForm.coupomTime}}
                <el-form-item label="活动ID">
                  <el-input v-model="ruleForm.activityID" />
                </el-form-item>
                <el-form-item label="活动链接">
                  <el-input v-model="ruleForm.activityLink" />
                </el-form-item>
                <el-form-item label="备注">
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
// import { getUserList } from '@/api/user'
import { UserSave, UserList, postDocumentarySave } from '../../../api/index';

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
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    };
  },
  created () {
    this.getDate()
  },

  methods: {
    getDate () {
      UserList({ page_size: 100 }).then(res => {
        this.userList = res.list;

      }).catch(function (error) {
        this.active.error()
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          //验证的数据中有两个数据要切换为四个数据


          this.ruleForm.couponStartTime = this.formatDate(this.ruleForm.couponTime[0])
          this.ruleForm.couponEndTime = this.formatDate(this.ruleForm.couponTime[1])
          this.ruleForm.activityStartTime = this.formatDate(this.ruleForm.activityTime[0])
          this.ruleForm.activityEndTime = this.formatDate(this.ruleForm.activityTime[1])


          postDocumentarySave(this.ruleForm).then(res => {

            console.log(res)
            //清空数据
            // this.$refs[formName].resetFields()
            // this.active.success()
          })

          console.log('ruleForm', this.ruleForm)

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
      let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return youWant
    },


  }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>

