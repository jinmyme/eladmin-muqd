<template>
  <div>
    <el-button size="mini" type="primary" @click="to">添加选项</el-button>
    <eForm ref="optionform" :sup_this="sup_this" :is-add="true"/>
  </div>
</template>
<script>
import eForm from './optionform'
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
      const _this = this.$refs.optionform
      _this.form={
        type_id: this.data.type_id,
        input_id: this.data.input_id,
        input_name:'',
        input_default:'',
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
