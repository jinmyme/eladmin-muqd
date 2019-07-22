<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入部门名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add">新增</el-button>
      <eForm ref="form" :sup_this="sup_this" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import eForm from './form'
export default {
  components: { eForm },
  props: {
    sup_this: {
      type: Object,
      required: true
    },
    query: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      this.$parent.init()
    },
    add() {
      this.$refs.form.dialog = true
      this.$refs.form.componentList()
      this.$refs.form.parentList()
    }
  }
}
</script>
