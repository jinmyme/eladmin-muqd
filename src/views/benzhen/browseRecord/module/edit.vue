<template>
  <div>
    <el-button size="mini" type="success" @click="to">查看商品</el-button>
    <!--<eForm ref="form" :sup_this="sup_this" :query="query" :is-add="false"/>-->
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
    index_this: {
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
      const that=this
//      const _this = this.$refs.form
//      _this.form =this.data
//      _this.dialog = true
      that.index_this.switchbtn({
        component:'contList',
        data:{
          goods_id:that.data.goods_id
        }
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
