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
        <el-button type="primary"
                   icon="el-icon-delete"
                   class="handle-del mr10"
                   :disabled="isBtnDisable"
                   @click="delAllSelection">批量删除</el-button>
        <el-input v-model="query.search"
                  clearable
                  @input="handleSearch"
                  placeholder="请输入栏目名"
                  style="width:200px"
                  class="handle-input mr10"></el-input>

        <el-button type="primary"
                   icon="el-icon-search"
                   @click="handleSearch">搜索</el-button>
        <el-button type="primary"
                   @click="add">添加栏目</el-button>
      </div>
      <el-table :data="tableData"
                v-loading="loading"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column prop="route"
                         label="ID"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column prop="top_column_name"
                         label="一级栏目名称"></el-table-column>
        <el-table-column prop="columnName"
                         label="二级栏目名称"></el-table-column>
        <el-table-column prop="subjectName"
                         label="试卷名称"></el-table-column>
        <el-table-column prop="route"
                         label="试卷路由"></el-table-column>
        </el-table-column>
        <el-table-column label="操作"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       icon="el-icon-edit"
                       @click="edlt(scope.row)">编辑</el-button>
            <!-- <el-button type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->

            <el-button type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="delAllSelection(scope.row.route,'single')">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background
                       layout="total, prev, pager, next"
                       :current-page="query.page"
                       :page-size="query.page_size"
                       :total="count"
                       @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <DrawerModel :for-data="formData"
                 @closeDraw="closeDraw"
                 :drawerTitle="drawerTitle "
                 @applySubmit="applySubmit"
                 :isDrawer.sync="isShowDrawer">
      <template slot="header">
        <el-form :model="formData"
                 :rules="rules"
                 ref="formData"
                 label-width="100px"
                 class="demo-formData">

          <!-- <el-form-item label="请选择栏目"
                        prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item> -->
          <el-form-item label="一级栏目"
                        prop="columnId">
            <el-select v-model="formData.TopColumnId"
                       placeholder="一级栏目">
              <el-option :label="item.name"
                         :value="item.id"
                         v-for="item in TopColumn"
                         :keys="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="二级栏目"
                        prop="columnId">
            <el-select v-model="formData.columnId"
                       placeholder="二级栏目">
              <el-option :label="item.name"
                         :value="item.id"
                         v-for="item in column"
                         :keys="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="输入标题"
                        prop="subjectName">
            <el-input v-model="formData.subjectName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="栏目名称"
                        prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item> -->

        </el-form>
      </template>
    </DrawerModel>
  </div>
</template>

<script>
import interList from '@/common/mixins/list'
import set from '@/common/mixins/set'

import { ExamSave, ExamDel, ExamList, ColumnList, TopColumnList, TopColumnSave } from '../../../api/index';
export default {
  name: 'SubectList',
  data () {
    return {
      drawerTitle: '建立关联',
      isShowDrawer: false,
      column: [],
      TopColumn: [],
      formData: {
        subjectName: '',
        columnId: '',   //栏目ID
        route: '',
        TopColumnId: ''
      },//表单数据
      tableData: [], //当前表数据
      editVisible: false, //弹框删除
      rules: {
        subjectName: [
          { required: true, message: '试卷题目名称不能为空', trigger: 'blur' },
        ],
        columnId: [
          { required: true, message: '栏目名称不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  mixins: [interList],
  created () {
    this.getData();
  },
  methods: {
    //添加数据
    add () {
      this.formData = {}
      this.isShowDrawer = true
    },
    //编辑数据
    edlt (row) {
      this.drawerTitle = '编辑栏目名称'
      console.log('row', row)
      this.formData = Object.assign({}, row)
      this.isShowDrawer = true
    },
    applySubmit (data, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData = {}
          ExamSave(data).then(res => {
            if (res == undefined) {
              this.getData()
            } else {
              this.active.success()
              this.getData()
            }
          })
          this.isShowDrawer = false
        } else {
          return false;
        }
      });
    },
    closeDraw (data) {

    },
    getData () {
      let _this = this
      this.loading = true
      ExamList(this.query).then(res => {
        this.tableData = res.list;
        this.count = res.page_info.count
        this.loading = false

      }).catch(function (error) {
        this.active.error()
        _this.loading = false
      })


      ColumnList({ page_size: 50 }).then(res => {
        console.log('res=', res)
        if (res != undefined) {
          this.column = res.list
          console.log('this.column', this.column)
        } else {
          this.active.error()
        }
      })

      TopColumnList

      TopColumnList({ page_size: 50 }).then(res => {
        console.log('res=', res)
        if (res != undefined) {
          this.TopColumn = res.list
          console.log('this.TopColumn', this.TopColumn)
        } else {
          this.active.error()
        }
      })


    },
    //单选多选都可删除
    delAllSelection (route, flag) {
      //通过点击删除进来的 传入的参数必须为一个数组
      if (flag == 'single') {
        this.DelId = [route]
      }
      // 二次确认删除
      this.$confirm(`确定要删除ID序号为[${this.DelId}]`, '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          ExamDel({ route: this.DelId }).then(res => {
            this.active.success()
            this.getData()
          })
        })
        .catch(() => {
          this.loading = false
        });
      this.multipleSelection = [];
    },
  }
};
</script>

<style scoped>
@import '~@/assets/css/user_index.css';
</style>
