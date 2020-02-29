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

        <!-- <el-upload class="upload-demo"
                   drag
                   action="https://jsonplaceholder.typicode.com/posts/"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->

        <!-- <ul>
          <li v-for="(item,index) in subject"
              :key="index">
            题目{{index+1}} <span style="margin:15px 35px;display:inline-block;">试题名称：{{item.subjectName==0?'未指定':item.subjectName}}</span> <span style="margin:15px  25px;display:inline-block;">所属分类：{{item.columnName==0?'未指定':item.columnName}}</span>

          </li>
        </ul> -->

        <!-- <el-table :data="subject"
                  style="width: 100%">
          <el-table-column prop="subjectName"
                           label="试题名称"
                           width="220">
          </el-table-column>
          <el-table-column prop="columnName"
                           label="栏目名称"
                           width="220">
          </el-table-column>

        </el-table> -->
        <el-divider content-position="left">业绩提交</el-divider>
        <!-- {{isFile}} -->

        <div class="file">
          <span> 请选择文件进行上传吧！</span>
          <input type="file"
                 id="excel-file"
                 @change="addData($event)"
                 ref="dataFile">

        </div>
        <el-button type="primary"
                   @click="postList(($event))">立即上传业绩表</el-button>
        <el-divider></el-divider>

        <el-table :data="tableData"
                  stripe
                  style="width: 100%;margin-top:30px">

          <!-- <el-table-column prop="route"
                           label="试卷序列ID">
          </el-table-column>
          <el-table-column prop="subject_name_id"
                           label="试卷名称【ID】">
          </el-table-column> -->

          <el-table-column prop="shopkeeperWangWang"
                           label="掌柜旺旺">
          </el-table-column>

          <el-table-column prop="serviceCharge"
                           label="服务费率"
                           width="200">
          </el-table-column>
          <el-table-column prop="shopID"
                           label="商品ID">
          </el-table-column>
          <el-table-column prop="shopInfo"
                           label="商品信息">
          </el-table-column>
          <el-table-column prop="affiliatedShop"
                           label="所属店铺">
          </el-table-column>

        </el-table>

      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'

import XLSX from 'xlsx';
import { OneSubjectImport, ColumnList, SubjectList, Relation } from '@/api/index';

export default {
  name: 'basetable',
  data () {
    return {
      isFile: false,
      tableData: [
        // {
        //   subject_name_id: '',  //本套试题所属的id
        //   route: '',//试题所属id
        //   type: '',//试题属性			
        //   test_paper_name: '',//题目名
        //   a: '',
        //   b: '',
        //   c: '',
        //   d: '',
        //   answer: '',//答案
        //   score: '',//分数
        // },
        // {
        //   subject_name_id: '',  //本套试题所属的id
        //   route: '',//试题所属id
        //   type: '选择题',//试题属性			
        //   test_paper_name: '在Word的编辑状态，当前文档中有一个表格，选定列后，单击表格菜单中"删除列"命令后( )。',//题目名
        //   a: '表格中的内容全部被删除，但表格还存在',
        //   b: '表格和内容全部被删除',
        //   c: '表格被删除，但表格中的内容未被删除',
        //   d: '表格中插入点所在的列被删除',
        //   answer: 'd',//答案
        //   score: '2',//分数
        // }
      ]
    }
  },
  created () {
  },
  methods: {



    addData (e) {
      let _this = this
      var files = e.target.files;
      console.log(' e.target.files', e.target.files)
      var fileReader = new FileReader();
      fileReader.onload = function (ev) {
        console.log('ev', ev)
        var data = ev.target.result,
          workbook = XLSX.read(data, {
            type: 'binary'
          }), // 以二进制流方式读取得到整份excel表格对象
          persons = []; // 存储获取到的数据
        try {
          var data = ev.target.result,
            workbook = XLSX.read(data, {
              type: 'binary'
            }), // 以二进制流方式读取得到整份excel表格对象
            persons = []; // 存储获取到的数据
        } catch (e) {
          console.log('文件类型不正确');
          return;
        }

        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = '';
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]['!ref'];
            console.log(fromTo);
            persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }

        console.log(persons);

        _this.tableData = []


        persons.forEach((item, index) => {
          let row = {
            shopkeeperWangWang: item.掌柜旺旺,
            serviceCharge: item.服务费率,
            shopID: item.商品ID,
            shopInfo: item.商品信息,
            affiliatedShop: item.所属店铺,
            issueNumber: item.商品数,
            estimatePay: item.预估付款服务费,
            estimateMoney: item.预估结算服务费,
          }
          _this.tableData.push(row)
          console.log("_this.tableData=====", _this.tableData);
          //issueNumber = item.出单数量
          //estimatePay = item.预估付款
          //estimateMoney = item.预估结算
          // 商品数
          // id 用户ID
          // shopkeeperWangWang 掌柜旺旺
          // serviceCharge 服务费率
          // shopID 商品ID
          // shopInfo 商品信息
          // affiliatedShop 所属店铺


          //                    出单数量 issueNumber
          //                   预估付款 estimatePay
          //                   预估结算  estimateMoney


        })
      };

      console.log('this.tableData', this.tableData)
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0]);

      //console.log('files',files[0].name)
    },
    postList (e) {

      if (this.tableData.length == 0) {
        this.$message.error('请添加业绩表后在点击上传')
        return false;
      }
      OneSubjectImport({ data: this.tableData }).then(res => {

        if (res == undefined) {

        } else {
          this.active.success()
          console.log(e)
          //  $('.file input').remove()

          // setTimeout(() => {
          //   $('.file').append(` <input type="file"
          //        id="excel-file"
          //        @change="addData($event)"
          //        ref="dataFile">`)
          // }, 3000)

          setTimeout(() => {
            this.isFile = !this.isFile
          }, 3000)
          var obj = document.getElementById('excel-file');
          obj.outerHTML = obj.outerHTML;
        }

      });
      //添加完成清空
      this.tableData = [

      ]

    },

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
