<template>
  <div>
    <el-button size="mini" type="success" @click="to">修改</el-button>
    <eForm ref="addform" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './addform'
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
      const _this = this.$refs.addform
      _this.look({
        type_id:this.data.type_id,
        input_id:this.data.input_id
      });
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
