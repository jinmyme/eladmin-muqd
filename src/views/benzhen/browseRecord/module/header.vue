<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.goods_name" clearable placeholder="输入关键词搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-date-picker
      size="min"
      :editable="false"
      @change="toQuery"
      v-model="timeValue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy年MM月dd日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
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
      timeValue:'',
    }
  },
  methods: {
    toQuery() {
      if(this.timeValue.length>0){
        this.query.start_time=this.timeValue[0]
        this.query.end_time=this.timeValue[1]
      }
      this.sup_this.browseList('search')
    },
    resetQuery() {
      const that=this
      that.timeValue='';
      that.sup_this.current_page=1
      that.query.start_time=''
      that.query.end_time=''
      that.sup_this.browseList()
    },
    add() {
      this.$refs.form.dialog = true
    },
  }
}
</script>
