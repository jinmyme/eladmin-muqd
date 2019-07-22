<template>
  <div>
    <el-button size="mini" @click="to">添加子菜单</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="true"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.parentList({
        id:this.data.id
      })
      _this.componentList()
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
