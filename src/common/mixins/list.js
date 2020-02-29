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
        page: 1, //第一页
        page_size: 10, //页数
        count: 0,
        multipleSelection: [], //删除选中的数据
        DelId: [], //被删除数据的id

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

    currentChange() {
      // console.log(1)
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
      console.log(this.query)
      this.$set(this.query, 'page', 1);
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