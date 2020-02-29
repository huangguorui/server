<style scoped>
.drawer {
    /* box-sizing: border-box; */
    /* padding: 3%; */
}
.submit {
    padding-left: 5%;
}
</style>


<style>
.drawer .el-drawer__body {
    padding: 7% 7% 7% 2% !important;
}
</style>

<template>
  <div>
    <!-- {{forData}} -->
    <!-- :wrapperClosable="false" -->

    <el-drawer class="drawer"
               :title="drawerTitle"
               :visible.sync="isDrawer"
               :show-close='false'
               size="35%"
               :before-close="handleClose">
      <slot name="header">from表单提交</slot>
      <div class="submit">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="submit">确定</el-button>
      </div>
    </el-drawer>

  </div>
</template>


<script>
export default {
  name: 'DrawerModel',
  props: {
    isDrawer: {
      type: Boolean,
      default: false
    },
    forData: {
      type: Object,
      default: 'default'
    },
    drawerTitle: {
      type: String,
      default: '默认标题'
    }
  },
  data () {

    return {
      value: true
    };
  },
  methods: {
    cancel () {
      this.$emit('update:isDrawer', false)
      this.$emit('closeDraw');
    },
    submit () {
      //  this.$emit('update:isDrawer', false)
      //this.$emit('applySubmit', { a: 1 });
      this.$emit('applySubmit', this.forData, 'formData');

    },
    handleClose (done) {
      //告诉父组件我的值变了
      this.$emit('update:isDrawer', false)
    },

  }
};
</script>