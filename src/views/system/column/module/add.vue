<template>
  <div>
    <el-button size="mini" @click="to">添加子栏目</el-button>
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
      console.log(this.data)
      _this.columnLook({
        column_id:this.data.column_id
      }).then(res=>{
        _this.form = {
          column_name: '',
          parent_id:this.data.column_id,
          column_type:'',
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
