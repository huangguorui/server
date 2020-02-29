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
                   @click="add">添加新的Vip等级</el-button>
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
        <el-table-column prop="id"
                         label="ID"
                         width="55"
                         align="center"></el-table-column>

        <el-table-column prop="integral"
                         label="升级所需积分"></el-table-column>

        <el-table-column prop="vip_number"
                         label="VIP等级"></el-table-column>
        <el-table-column prop="vip_text"
                         label="VIP等级描述文本"></el-table-column>

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
                       @click="delAllSelection(scope.row.id,'single')">删除</el-button>

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

          <el-form-item label="所需积分"
                        prop="integral">
            <el-input v-model="formData.integral"></el-input>
          </el-form-item>
          <el-form-item label="VIP等级"
                        prop="vip_number">
            <el-input v-model="formData.vip_number"></el-input>
          </el-form-item>

          <el-form-item label="描述文本"
                        prop="vip_text">
            <el-input v-model="formData.vip_text"></el-input>
          </el-form-item>

        </el-form>
      </template>
    </DrawerModel>
  </div>
</template>

<script>
import interList from '@/common/mixins/list'
import set from '@/common/mixins/set'

import { UserVipSave, UserVipDel, UserVipList } from '../../../api/index';
export default {
  name: 'Column',
  data () {
    return {
      drawerTitle: '添加栏目名称',
      isShowDrawer: false,
      name: '',  //栏目名
      formData: {
        integral: '',  //升级所需积分
        vip_number: '',  //vip等级
        vip_text: '',  //vip等级描述文本
        id: ''
      },//表单数据
      tableData: [], //当前表数据
      editVisible: false, //弹框删除
      rules: {
        integral: [
          { required: true, message: '升级所需积分不能为空', trigger: 'blur' },
        ],
        vip_number: [
          { required: true, message: 'vip等级不能为空', trigger: 'blur' },
        ],
        vip_text: [
          { required: true, message: 'vip等级描述文本不能为空', trigger: 'blur' },
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
      this.formData = Object.assign({}, row)
      this.isShowDrawer = true
    },
    applySubmit (data, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData = {}
          UserVipSave(data).then(res => {
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
      UserVipList(this.query).then(res => {
        this.tableData = res.list;
        this.count = res.page_info.count
        this.loading = false

      }).catch(function (error) {
        this.active.error()
        _this.loading = false
      })
    },
    //单选多选都可删除
    delAllSelection (id, flag) {
      //通过点击删除进来的 传入的参数必须为一个数组
      if (flag == 'single') {
        this.DelId = [id]
      }
      // 二次确认删除
      this.$confirm(`确定要删除ID序号为[${this.DelId}]`, '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          UserVipDel({ id: this.DelId }).then(res => {
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
