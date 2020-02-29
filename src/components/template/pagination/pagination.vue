<template>
  <div>
    <div class="pagination">
      <el-pagination background
                     layout="total, prev, pager, next"
                     :current-page="pageInfo.page"
                     :page-size="pageInfo.page_size"
                     :total="pageInfo.count"
                     @current-change="handlePageChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import interList from '@/common/mixins/list'

export default {
  mixins: [interList],
  props: {
    pageInfo: {
      type: Object,
      default: 'default'
    }

  },
  data () {
    return {

    }
  },
  methods: {
    getData () {

    }
  }

}
</script>

<style lang="scss" scoped>
</style>