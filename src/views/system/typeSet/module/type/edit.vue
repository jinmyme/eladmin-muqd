<template>
  <div>
    <el-button size="mini" type="success" @click="to">修改</el-button>
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
      _this.look(this.data.type_id)
      _this.form ={
        type_id:this.data.type_id,
        type_name:this.data.type_name,
        table_name: this.data.table_name,
        engine: this.data.engine,
        type_old_name:this.data.type_name,
        table_old_name: this.data.table_name,
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
