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

        <el-form ref="form"
                 :model="form"
                 label-width="120px">
          <el-form-item label="单子兴致">
            <el-radio-group v-model="form.resource">
              <el-radio label="团长"
                        value="0" />
              <el-radio label="跑单"
                        value="1" />
            </el-radio-group>
          </el-form-item>

          <!-- 必填项（方便业绩统计） 选填项（非必填，录单跟单使用）
统计方式

掌柜旺旺
一次性录入多个，请用“|”进行分隔，如    旺旺1|旺旺2 -->

          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-divider content-position="left">必填项（方便业绩统计）</el-divider>
                <el-form-item label="统计方式">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="根据掌柜旺旺" />
                    <el-radio label="根据活动ID" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="掌柜旺旺">
                  <el-input v-model="form.name" />
                  一次性录入多个，请用“|”进行分隔，如 旺旺1|旺旺2
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-divider content-position="left"> 选填项（非必填，录单跟单使用）</el-divider>

                <el-form-item label="联系方式">
                  <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="报名连接">
                  <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="店铺名称">
                  <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="有无优惠券">
                  <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="优惠券链接">
                  <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="优惠券开始时间">
                  <el-input v-model="form.name" />
                </el-form-item>

                <el-form-item label="优惠券结束时间">
                  <el-input v-model="form.name" />

                </el-form-item>
                <el-form-item label="活动时间">
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
                </el-form-item>
                <el-form-item label="佣金+服务费%">
                  <el-input v-model="form.name" />
                </el-form-item>

                <el-form-item label="活动id">
                  <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="活动链接">
                  <el-input v-model="form.name" />
                </el-form-item>

              </div>
            </el-col>

          </el-row>

          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">立即提交</el-button>
            <el-button @click="onCancel">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>

  </div>
</template>


<script>
// import { getUserList } from '@/api/user'

export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created () {
    // console.log(getUserList)
    // getUserList().then(response => {
    //   this.list = response.data.items
    //   this.listLoading = false
    // })
  },
  methods: {
    onSubmit () {
      this.$message('submit!')
    },
    onCancel () {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>

