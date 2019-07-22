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
      _this.componentList()
      _this.parentList().then(()=>{
        _this.form={
          id:this.data.id,
          name: this.data.meta.title,
          parent_id:this.data.pid,
          icon:this.data.meta.icon,
          path:this.data.path,
          component:this.data.component_id,
        }
        _this.dialog = true
      })
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
