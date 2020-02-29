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

        <el-divider content-position="left">将没有栏目的考卷和栏目进行关联</el-divider>

        <!-- {{subjectNumber}} -->

        <el-select v-model="link.route"
                   placeholder="请选择未选择栏目的考卷">
          <el-option :label="item"
                     :value="item"
                     v-for="item in subjectNumber"
                     :keys="item"></el-option>
        </el-select>
        <!-- 栏目名  栏目名id要传到后台 -->
        <el-select v-model="link.column_id"
                   style="margin:0 20px"
                   placeholder="请选择栏目">
          <el-option :label="item.name"
                     :value="item.id"
                     v-for="item in column"
                     :keys="item.id"></el-option>
        </el-select>
        <!-- column -->
        <el-input v-model="link.name"
                  style="width:300px"
                  placeholder="试卷标题"></el-input>

        <el-button type="primary"
                   style="margin:0 20px"
                   @click="postLink">点击建立关联</el-button>

        <el-divider></el-divider>

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
        <el-divider content-position="left">试卷提交</el-divider>
        <!-- {{isFile}} -->

        <div class="file"
             v-if="isFile">
          <span> 333请选择文件进行上传吧！</span>
          <input type="file"
                 id="excel-file"
                 @change="addData($event)"
                 ref="dataFile">

        </div>
        <div class="file"
             v-if="!isFile">
          <span> 请选择文件进行上传吧！</span>
          <input type="file"
                 id="excel-file"
                 @change="addData($event)"
                 ref="dataFile">

        </div>
        <el-button type="primary"
                   @click="postList(($event))">立即上传试卷</el-button>
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
          <el-table-column prop="type"
                           label="试题属性">
          </el-table-column>

          <el-table-column prop="test_paper_name"
                           label="试题标题"
                           width="200">
          </el-table-column>
          <el-table-column prop="a"
                           label="答案A">
          </el-table-column>
          <el-table-column prop="b"
                           label="答案B">
          </el-table-column>
          <el-table-column prop="c"
                           label="答案C">
          </el-table-column>
          <el-table-column prop="d"
                           label="答案D">
          </el-table-column>
          <el-table-column prop="answer"
                           label="答案">
          </el-table-column>
          <el-table-column prop="score"
                           label="分数">
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
      link: {
        column_id: '', //栏目id
        name: '', //当前试题名
        route: '' //当前路由名
      },
      subjectNumber: [],
      //栏目ID获取
      subject: [{
        subjectName: '',
        columnName: ''
      }],
      column_id: '',
      column: [
        {
          id: '0',
          name: '栏目'
        },
      ],
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
    this.getColumnList()   //获取栏目
    this.getSubjectList() //获取考试列表以及没有添加栏目的试题
  },
  methods: {
    getSubjectList () {
      SubjectList().then(res => {
        this.subject = res.list
        this.subjectNumber = res.number
        // this.active.success()
      });
    },
    getColumnList () {
      ColumnList({ page_size: 50 }).then(res => {
        this.column = res.list
        // this.active.success()
      });
    },
    postLink () {
      //Relation
      Relation(this.link).then(res => {
        if (res == undefined) {
        } else {
          this.$message.success('关联成功!')
        }
        // this.active.success()

      });
      this.link = {
        column_id: '', //栏目id
        name: '', //当前试题名
        route: '' //当前路由名
      }
    },

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
        _this.tableData = persons
        // _this.tableData.forEach((item, index) => {
        //   _this.tableData[index].route = 10
        // })
      };

      console.log('this.tableData', this.tableData)
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0]);

      //console.log('files',files[0].name)
    },
    postList (e) {

      if (this.tableData.length == 0) {
        this.$message.error('请添加试卷后在点击上传')
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
          this.getSubjectList()
        }

      });
      this.getColumnList()
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
