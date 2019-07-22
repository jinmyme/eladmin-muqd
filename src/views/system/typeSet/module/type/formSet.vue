<template>
  <div>
    <el-button size="mini" type="primary" @click="to">设置表单</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
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
    // index.vue 的this 可用于刷新数据
    sup_this: {
      type: Object,
      required: true
    },
  },
  methods: {
    to() {
      const _this = this.$refs.form
      this.sup_this.switchbtn({
        component:'formSetDetails',
        formSetupId:this.data.type_id,
      })
    }
  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
