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

          <el-form-item>

            <el-form-item label="题目类型"
                          prop="region">
              <el-select v-model="ruleForm.region"
                         placeholder="请选择题型">
                <el-option label="选择题"
                           value="x"></el-option>
                <el-option label="判断题"
                           value="p"></el-option>
                <el-option label="填空题"
                           value="t"></el-option>
                <el-option label="简单题"
                           value="j"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="试卷路由"
                          prop="region">
              <el-select v-model="ruleForm.aaa"
                         placeholder="请选择题型">
                <el-option label="第一套选择题"
                           value="x"></el-option>
                <el-option label="第一套选择题"
                           value="p"></el-option>
                <el-option label="第一套选择题"
                           value="t"></el-option>
                <el-option label="第一套选择题"
                           value="j"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="本题分值"
                          prop="desc">
              <el-input style="width:100px"
                        v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <el-form-item label="试题标题"
                          prop="desc">
              <el-input type="textarea"
                        :rows="5"
                        v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <template v-if="ruleForm.region=='x'">
              <el-form-item label="选项A"
                            prop="a">
                <el-input type="textarea"
                          v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item label="选项B"
                            prop="b">
                <el-input type="textarea"
                          v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item label="选项C"
                            prop="c">
                <el-input type="textarea"
                          v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item label="选项D"
                            prop="d">
                <el-input type="textarea"
                          v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item label="正确答案"
                            prop="d">
                <el-input type="textarea"
                          v-model="ruleForm.desc"></el-input>
              </el-form-item>

              <el-form-item label="题目答案"
                            prop="region">
                <el-select v-model="ruleForm.aaa"
                           placeholder="请选择正确的答案">
                  <el-option label="A"
                             value="x"></el-option>
                  <el-option label="B"
                             value="p"></el-option>
                  <el-option label="C"
                             value="t"></el-option>
                  <el-option label="D"
                             value="j"></el-option>
                </el-select>
              </el-form-item>

            </template>

            <template v-if="ruleForm.region=='p'">
              <el-form-item label="正确答案"
                            prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="对"></el-radio>
                  <el-radio label="错"></el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
            <template v-if="ruleForm.region=='t'">
              <el-form-item label="答案"
                            prop="desc">
                <el-input style="width:100px"
                          v-model="ruleForm.desc"></el-input>
              </el-form-item>
            </template>
            <template v-if="ruleForm.region=='j'">
              <el-form-item label="答案"
                            prop="desc">
                <el-input type="textarea"
                          :rows="5"
                          v-model="ruleForm.desc"></el-input>
              </el-form-item>
            </template>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { fetchData } from '../../../api/index';
export default {
  name: 'basetable',
  data () {
    return {
      ruleForm: {
        name: '',
        region: 'x',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
