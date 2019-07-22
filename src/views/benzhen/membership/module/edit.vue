<template>
  <div>
    <el-button size="mini" type="success" @click="to">修改</el-button>
    <eForm ref="form" :sup_this="sup_this" :query="query" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
import Config from '@/config'
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
    query: {
      type: Object,
      required: true
    },
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form ={
        user_id:this.data.user_id,
        admin_id:this.data.admin_id,
        score:this.data.score,
      }
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
