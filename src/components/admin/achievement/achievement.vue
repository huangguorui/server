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

        <el-divider content-position="left">业绩提交</el-divider>
        <!-- <span> 请选择文件进行上传吧！</span> -->
        <el-button type="primary"
                   @click="postList(($event))"
                   style="margin-right:50px">立即上传业绩表</el-button>
        <input type="file"
               id="excel-file"
               @change="addData($event)"
               ref="dataFile">
        <!-- <input type="file"
                 id="excel-file"
                 @change="addData($event)"
                 ref="dataFile"> -->

        <div>
          <el-button type="primary"
                     icon="el-icon-delete"
                     class="handle-del mr10"
                     size="mini"
                     style="margin:10px 0"
                     :disabled="isBtnDisable"
                     @click="delAllSelection">批量删除</el-button>
        </div>
        <el-table :data="excelData"
                  v-loading="loading"
                  border
                  class="table"
                  size="small"
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

          <el-table-column prop="importPeople"
                           label="导入人">
          </el-table-column>

          <el-table-column prop="defaultFileName"
                           label="原始文件名">
          </el-table-column>
          <el-table-column prop="importTime"
                           label="导入时间">
          </el-table-column>
          <!-- <el-table-column prop="excelExportUrl"
                           label="导入路径">
          </el-table-column> -->
          <el-table-column label="操作"
                           width="300">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleDownload(scope.row.id)">下载</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="delAllSelection(scope.row.id,'single')">删除文件</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="delExcelOrderDel(scope.row.id,'single')">删除文件+业绩</el-button>
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
        <!-- <el-table :data="excelData"
                  stripe
                  border
                  size="small"
                  v-loading="loading"
                  style="width: 100%;margin-top:30px">

        </el-table> -->

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
import { getExcelList, postExcelFalseDel, postExcelOrderDel, getExcelExport, OneSubjectImport, ColumnList, SubjectList, Relation } from '@/api/index';


import interList from '@/common/mixins/list'
// import { parseTime } from '@/utils'


export default {
  name: 'basetable',
  data () {
    return {
      isFile: false,
      defaultFileName: '',  //导入的文件名
      excelData: [
        {
          id: '',
          defaultFileName: '',
          importTime: '',
          excelExportUrl: '',
          importPeople: '',
        }
      ],
      excelExportData: [],
      tableData: []
    }
  },
  mixins: [interList],
  methods: {

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
          postExcelFalseDel({ id: this.DelId }).then(res => {
            this.active.success()
            this.getData()
          })
        })
        .catch(() => {
          this.loading = false
        });
      this.multipleSelection = [];
    },

    //开始预加载
    getData () {
      let _this = this
      this.loading = true
      getExcelList(this.query).then(res => {
        this.excelData = res.list;
        this.query = res.page_info
        this.loading = false

      }).catch(function (error) {
        this.active.error()
        this.loading = false
      })
    },

    addData (e) {
      console.log(e)
      let _this = this
      var files = e.target.files;
      console.log(' e.target.files', e.target.files)
      this.defaultFileName = e.target.files[0].name
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

          if (item.订单状态 != "已失效") {
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

          }

          // for (let i = 0; i <= 100; i++)
          // console.log("_this.tableData=====", _this.tableData);
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
        console.log('this.tableData', this.tableData)

      };

      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0]);

      //console.log('files',files[0].name)
    },
    delExcelOrderDel (id, flag) {
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
          //excel和订单统统删除
          postExcelOrderDel({ id: this.DelId }).then(res => {
            this.active.success()
            this.getData()
          })
        })
        .catch(() => {
          this.loading = false
        });
      this.multipleSelection = [];
    },

    handleDownload (excelID) {
      getExcelExport({ excelID: excelID }).then(res => {
        this.excelExportData = res.list;
        console.log("this.excelExportData=", this.excelExportData)
        // debugger;
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['员工', '旺旺', '店铺', '出单数量', '预估付款服务费', '订单生成时间']

          const filterVal = ['userName', 'shopkeeperWangWang', 'affiliatedShop', 'issueNumber', 'estimatePay', 'orderTime']
          // const data = this.formatJson(filterVal)
          const data = this.formatJson(filterVal)

          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: res.excelExportName
          })
        })

      }).catch(function (error) {
        this.active.error()
      })
    },
    formatJson (filterVal) {
      return this.excelExportData.map(v => filterVal.map(j => {

        if (j === 'orderTime') {
          if (v[j] == '') {
            return v[j]
          }
          return this.parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    postList (e) {
      console.log("this.tableData", this.tableData)
      if (this.tableData.length == 0) {
        this.$message.error('请添加业绩表后在点击上传')
        return false;
      }
      OneSubjectImport({ data: this.tableData, defaultFileName: this.defaultFileName }).then(res => {

        if (res == undefined) {

        } else {
          this.active.success()
          console.log(e)
          this.getData()   //发送成功，刷新界面
          this.tableData = []
          this.defaultFileName = ""
          // var obj = document.getElementById('excel-file');
          // obj.outerHTML = obj.outerHTML;
        }

      });
      //添加完成清空

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
    },
    /**
     * Parse the time to string
     * @param {(Object|string|number)} time
     * @param {string} cFormat
     * @returns {string | null}
     */
    parseTime (time, cFormat) {
      if (arguments.length === 0) {
        return null
      }
      const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
          time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
      })
      return time_str
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
.file {
    display: inline-block;
}
.file input {
    /* width: 260px; */
    background: #409eff;
    /* height: 50px; */
    /* background: red; */
    /* text-align: center; */
    /* padding-top: 10px; */
    padding: 3px;
    margin-right: 30px;
    /* background: red; */
    color: #fff;
    border-radius: 5px;
    padding-left: 30px;
}
</style>
