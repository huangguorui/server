/**
 * 自定义列表混合带分页带条件查询
 * @author Maybe
 */
export default {
  name: 'List',
  data() {
    return {
      loading: true, //loading加载
      query: {
        search: '', //搜索
        userName: '',

        page: 1, //第一页
        page_size: 10, //页数
        count: 0,
        multipleSelection: [], //删除选中的数据
        DelId: [], //被删除数据的id

      },
      searchForm: {
        // userName: "", //用户姓名
        // userRegTime: "", //用户注册时间

        // //接单表
        // shopkeeperWangWang: '', //旺旺名称搜索
        // searchOrderStartTime: '',
        // searchOrderEndTime: '',
      },

      count: 0, //总页数
      isBtnDisable: true, //全选按钮默认禁用
    }
  },
  computed: {

  },
  watch: {
    $route(to, from) {
      // console.log(to.path);
      this.getData()

    }
  },
  created() {
    this.currentChange()
  },
  methods: {
    customPageSize() {
      this.query.page_size = 50

    },

    // 点击切换分页
    handlePageChange(val) {
      this.$set(this.query, 'page', val);
      this.getData();
    },
    // 多选操作
    handleSelectionChange(val) {
      console.log(val)
      if (val.length == 0) {
        this.isBtnDisable = true
      } else {
        this.isBtnDisable = false

      }
      this.DelId = []
      this.multipleSelection = val;
      this.multipleSelection.forEach((item) => {
        this.DelId.push(item.id)
      })
    },
    // 触发搜索按钮
    handleSearch() {
      //时间格式化
      this.searchForm.userRegTime = this.dataFormat2(this.searchForm.userRegTime) //用户注册时间
      this.searchForm.searchOrderStartTime = this.dataFormat2(this.searchForm.searchOrderStartTime) //订单开始时间
      this.searchForm.searchOrderEndTime = this.dataFormat2(this.searchForm.searchOrderEndTime) //订单结束时间

      let data = Object.assign(this.query, this.searchForm)
      console.log(data)
      this.$set(data, 'page', 1);
      this.getData();
    },

    currentChange() {
      // 获取列表
      this.getData({
        page: this.query.page,
        page_size: this.query.page_size
      })
    },

    pageChange(page) {
      this.searchData.page = page
      let data = Object.assign({
        page,
        size: this.searchData.size
      }, this.searchForm)
      this.getData(data)
      // this._getList(page, this.searchForm)
    },
    // 格式化时间
    dataFormat2: function (row, column) {
      if (row == null) {
        return new Date()
      }
      console.log("row===", row)
      var t = new Date(row); //row 表示一行数据, updateTime 表示要格式化的字段名称
      var year = t.getFullYear(),
        month = t.getMonth() + 1,
        day = t.getDate(),
        hour = t.getHours(),
        min = t.getMinutes(),
        sec = t.getSeconds();
      var newTime = year + '-' +
        (month < 10 ? '0' + month : month) + '-' +
        (day < 10 ? '0' + day : day) + ' ' +
        (hour < 10 ? '0' + hour : hour) + ':' +
        (min < 10 ? '0' + min : min) + ':' +
        (sec < 10 ? '0' + sec : sec);
      return newTime;
    }


    // // 条件查询
    // searchPage () {
    //   console.log(this.searchForm)
    //   let data = Object.assign({
    //     page: 1,
    //     size: this.searchData.size
    //   }, this.searchForm)
    //   this._getList(data)
    //   // this._getList(this.searchData.page, this.searchForm)
    // },
    // searchChange () {
    //   this.searchData.page = 1
    // }
  }
}