<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.mobile" clearable placeholder="输入电话搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.suggest_type_id" clearable placeholder="投诉类型" class="filter-item" style="width: 130px" @change="toQuery">
      <el-option v-for="(item,index) in query.suggest_type" :key="item.suggest_type_id" :label="item.suggest_name" :value="item.suggest_type_id"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-refresh-left" @click="resetQuery">重置</el-button>
    <!-- 新增 -->
    <!--<div style="display: inline-block;margin: 0px 2px;">-->
      <!--<el-button-->
        <!--class="filter-item"-->
        <!--size="mini"-->
        <!--type="primary"-->
        <!--icon="el-icon-plus"-->
        <!--@click="add">新增</el-button>-->
      <!--<eForm ref="form" :is-add="true" :sup_this="sup_this"/>-->
    <!--</div>-->
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
  },
  data() {
    return {
      downloadLoading: false,
    }
  },
  methods: {
    toQuery() {
      this.sup_this.suggestList('search')
    },
    resetQuery() {
      const that=this
      that.sup_this.current_page=1
      that.sup_this.mobile=''
      that.sup_this.suggest_type_id=''
      that.sup_this.suggestList()
    },
    add() {
      this.$refs.form.dialog = true
    },
  }
}
</script>
