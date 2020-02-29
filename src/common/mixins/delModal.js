/**
 * 自定义删除模态框混合
 * @author Maybe
 */
export default {
  name: 'DelModal',
  data () {
    return {
      delLoading: true,
      delShow: false
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    submitDel () {
      this.delLoading = true
    }
  }
}
