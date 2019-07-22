<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--<el-input v-model="query.value" clearable placeholder="输入字典标签查询" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>-->
    <!--<el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>-->
    <!--<div style="display: inline-block;margin: 0px 2px;">-->
      <!--<eForm ref="form" :is-add="true" :dict-id="dictId"/>-->
    <!--</div>-->
    <div style="float: right;">
      <el-button
        class="filter-item"
        size="mini"
        style="padding: 4px 10px"
        type="primary"
        @click="selectBtn(1)">备份</el-button>
      <el-button
        class="filter-item"
        size="mini"
        style="padding: 4px 10px"
        type="primary"
        @click="selectBtn(2)">优化</el-button>
      <el-button
        class="filter-item"
        size="mini"
        style="padding: 4px 10px"
        type="primary"
        @click="selectBtn(3)">修复</el-button>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import eForm from './form'
import initData from '../../mixins/initData'
export default {
  components: { eForm },
  mixins: [initData],
  props: {
//    query: {
//      type: Object,
//      required: true
//    },
    dictId: {
      type: Number,
      required: true
    },
    dictName: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    checkPermission,
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
    //选择字典操作
    selectBtn(type){
      var that=this;
      switch (type){
        case 1:
          var tables_name=that.dictName
          that.backup_export({
            tables_name:tables_name
          }).then(res=>{
            that.$message({
              message: '备份成功！',
              type: 'success'
            });
          }).catch(res=>{
            that.$message.error('备份失败！');
          })
          break;
        case 2:
          var tables_name=that.dictName
          that.optimize({
            tables_name:tables_name
          }).then(res=>{
            that.$message({
              message: '优化成功！',
              type: 'success'
            });
          }).catch(res=>{
            that.$message.error('优化失败！');
          })
          break;
        case 3:
          var tables_name=that.dictName
          that.repair({
            tables_name:tables_name
          }).then(res=>{
            that.$message({
              message: '修复成功！',
              type: 'success'
            });
          }).catch(res=>{
            that.$message.error('修复失败！');
          })
          break;
      }
    }
  }
}
</script>
