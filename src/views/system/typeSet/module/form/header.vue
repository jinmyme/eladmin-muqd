<template>
  <div class="head-container">
    <!-- 返回 -->
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-arrow-left" @click="toBack">返回</el-button>
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入关键字搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add">新增</el-button>
      <eForm ref="addform" :sup_this="sup_this" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import eForm from './addform'
// 查询条件
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
    toBack(){
      this.sup_this.index_this.switchbtn({
        component:'typeList'
      })
    },
    add() {
      this.$refs.addform.look({type_id:this.sup_this.formsetupid})
      this.$refs.addform.dialog = true
    },
    // 去查询
    toQuery() {
      var _this = this;
      if(_this.query.value==''){
        _this.sup_this.data=_this.sup_this.alldata;
        return;
      }
      //逻辑-->根据input的value值筛选List中的数据
      var arrByZM = [];//声明一个空数组来存放数据
      for (var i=0;i<_this.sup_this.data.length;i++){
        //for循环数据中的每一项（根据name值）
        var name=_this.sup_this.data[i].username
        if(name.search(_this.query.value)!=-1){
          //判断输入框中的值是否可以匹配到数据，如果匹配成功
          arrByZM.push(_this.sup_this.data[i]);
          //向空数组中添加数据
        }
      }
      _this.sup_this.data=arrByZM;
    },
  }
}
</script>
