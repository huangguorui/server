/**
 * 自定义Set混合
 * @author Maybe
 */
export default {
  name: 'Set',
  data () {
    return {
      isDisabled: true,
      delShow: false,
      delDisabled: true,
      delLoading: false,
      delList: [],
      updateList: [],
      updateDisabled: true,
      toggle: false,
      formData: {},
      btnLoading: false,
      delFlag: '0' //  '0 => checkbox'  or ' 1 => single'
    }
  },
  computed: {

  },
  created () {},
  methods: {
    checkDelSelect (selection, row) {
      if (selection.length > 0 && selection !== null) {
        this.delDisabled = false
        this.delList = selection
        console.log('selection', selection)
        this.delFlag = '0'
        this.delList = []
        selection.forEach((item) => {
          // this.delList.push({
          //   id: item.id
          // })
          this.delList.push(item.id)
        })
        console.log('删除的列表的id')
        console.log(this.delList)
      } else {
        this.delDisabled = true
      }
    },
    /**
     * 重置set表单
     */
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
