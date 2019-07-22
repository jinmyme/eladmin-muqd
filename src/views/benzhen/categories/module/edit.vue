<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
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
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.classifyValue({
        classify_id:this.data.classify_id
      }).then(res=>{
        _this.show_classify_img=this.data.classify_img
        _this.form = {
          classify_id:this.data.classify_id,
          parent_id:this.data.parent_id,
          classify_img:this.data.classify_img.replace(Config.imgUrl,''),
          classify_name:this.data.classify_name,
          is_recommend:''+this.data.is_recommend+'',
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
