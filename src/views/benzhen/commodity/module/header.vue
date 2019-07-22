<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入关键词" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add">新增</el-button>
      <!--<eForm ref="form" :is-add="true" :sup_this="sup_this"/>-->
    </div>
  </div>
</template>

<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    query: {
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
  },
  data() {
    return {
    }
  },
  methods: {
    toQuery() {
      this.sup_this.goodsList(this.query.value)
    },
    add() {
      this.index_this.switchbtn({
        component:'contList',
        data:{
          addStatus:true
        }
      })
    }
  }
}
</script>
