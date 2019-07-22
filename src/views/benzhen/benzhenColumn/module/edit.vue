<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
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
    sup_this: {
      type: Object,
      required: true
    },
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.columnLook({
        column_id:this.data.column_id
      }).then(res=>{
        _this.form = {
          column_id: this.data.column_id,
          column_name: this.data.column_name,
          parent_id:this.data.parent_id,
          column_type:this.data.column_type,
        }
      });
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
