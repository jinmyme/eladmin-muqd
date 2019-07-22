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
    // index.vue 的this 可用于刷新数据
    sup_this: {
      type: Object,
      required: true
    },
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.getRoles()
      _this.form = {
        admin_id: this.data.admin_id,
        username: this.data.username,
        password: '',
        mobile:this.data.mobile,
        imageUrl: Config.imgUrl+this.data.headpic,
        headpic:{},
        role_id: this.data.role_id,
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
