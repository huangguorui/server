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

        <el-date-picker v-model="searchForm.searchOrderStartTime"
                        type="date"
                        @input="handleSearch"
                        size="mini"
                        clearable
                        @on-change="searchForm.searchOrderStartTime=$event"
                        style="width:150px"
                        class="mr10"
                        format="yyyy-MM-dd"
                        placeholder="开始时间">
        </el-date-picker>

        <el-date-picker v-model="searchForm.searchOrderEndTime"
                        type="date"
                        @input="handleSearch"
                        size="mini"
                        clearable
                        @on-change="searchForm.searchOrderEndTime=$event"
                        style="width:150px"
                        class="mr10"
                        format="yyyy-MM-dd"
                        placeholder="结束时间">
        </el-date-picker>

        <el-input v-model="searchForm.affiliatedShop"
                  clearable
                  @input="handleSearch"
                  size="mini"
                  placeholder="所属店铺"
                  style="width:150px"
                  class="handle-input mr10"></el-input>

        <el-select v-model="searchForm.userName"
                   size="mini"
                   clearable
                   style="width:150px"
                   class="handle-input mr10"
                   @input="handleSearch"
                   placeholder="所属人">
          <el-option :label="item.userName"
                     v-for="item in userList"
                     :value="item.userName"></el-option>
        </el-select>

        <el-button type="primary"
                   icon="el-icon-search"
                   size="mini"
                   @click="handleSearch">搜索</el-button>

      </div>
      <el-table :data="tableData"
                v-loading="loading"
                border
                :summary-method="getSummaries"
                show-summary
                class="table"
                size="small"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection"
                         width="55"
                         align="center"></el-table-column> -->
        <el-table-column prop="id"
                         label="ID"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column prop="userName"
                         label="所属人"></el-table-column>

        </el-table-column>
        <el-table-column prop="affiliatedShop"
                         label="所属店铺"></el-table-column>
        </el-table-column>
        <el-table-column prop="estimatePay"
                         label="业绩"></el-table-column>

        <el-table-column prop="issueNumber"
                         label="数量"></el-table-column>

        <el-table-column prop="shopkeeperWangWang"
                         label="旺旺/活动ID"></el-table-column>
        <el-table-column prop="orderTime"
                         label="统计时间"></el-table-column>

        <!-- <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="edlt(scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="delAllSelection(scope.row.id,'single')">删除</el-button>
          </template>
        </el-table-column> -->

      </el-table>

      <!-- <pagination :page-info="query"></pagination> -->

      <div class="pagination">
        <el-pagination background
                       layout="total, prev, pager, next"
                       :current-page="query.page"
                       :page-size="query.page_size"
                       :total="query.count"
                       @current-change="handlePageChange"></el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
import interList from '@/common/mixins/list'
import set from '@/common/mixins/set'

import { getUserOrderList, UserList } from '../../../api/index';
export default {
  name: 'performance',
  data () {
    return {
      totalNumBerAndMoney: {
        sumMoney: '',
        sumNumber: '',
      },
      formData: {
        userPhone: '',//用户电话
        userName: '',//用户真实姓名
        userPwd: '',//用户密码
      },
      drawerTitle: '新增用户',
      isShowDrawer: false,
      tableData: [], //当前表数据
      editVisible: false, //弹框删除
      userList: [],
    };
  },
  mixins: [interList],
  created () {
    this.getData();
  },
  methods: {
    getSummaries (param) {
      console.log('a=', 1)
      console.log("param=", param)
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {

        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        if (index === 3) {
          sums[index] = this.totalNumBerAndMoney.sumNumber
        }
        if (index === 4) {
          sums[index] = this.totalNumBerAndMoney.sumMoney
        }
        // const values = data.map(item => Number(item[column.property]));
        // if (!values.every(value => isNaN(value))) {
        //   sums[index] = values.reduce((prev, curr) => {
        //     const value = Number(curr);
        //     if (!isNaN(value)) {
        //       return prev + curr;
        //     } else {
        //       return prev;
        //     }
        //   }, 0);
        //   sums[index] += ' 元';
        // } else {
        //   sums[index] = 'N/A';
        // }
      });


      return sums;
    },
    getData () {


      UserList({ page_size: 200 }).then(res => {
        console.log(res)
        this.userList = res.list;
      }).catch(function (error) {
        this.active.error()

      })


      let _this = this
      this.loading = true
      getUserOrderList(this.query).then(res => {
        this.tableData = res.list;

        this.totalNumBerAndMoney = res.totalNumBerAndMoney

        this.query = res.page_info
        this.loading = false

      }).catch(function (error) {
        this.active.error()
        this.loading = false
      })
    },
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
          UserDel({ id: this.DelId }).then(res => {
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
/* @import "./../index.css"; */
/* @import '../../../assets/css/user_index.css'; */
@import '~@/assets/css/user_index.css';
</style>
