<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <!--<el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">-->
      <!--<el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>-->
    <!--</el-select>-->
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <div style="display: inline-block;margin: 0px 2px;">
      <eForm ref="form" :is-add="true" :sup_this="sup_this"/>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
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
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'name', display_name: '字典名称' },
        { key: 'remark', display_name: '描述' }
      ]
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      var _this = this;
      if(this.query.value==''){
        _this.sup_this.data=_this.sup_this.alldata;
        return;
      }
      //逻辑-->根据input的value值筛选List中的数据
      var arrByZM = [];//声明一个空数组来存放数据
      for (var i=0;i<_this.sup_this.alldata.length;i++){
        //for循环数据中的每一项（根据name值）
        var name=_this.sup_this.alldata[i].name
        if(name.search(this.query.value)!=-1){
          //判断输入框中的值是否可以匹配到数据，如果匹配成功
          arrByZM.push(_this.sup_this.alldata[i]);
          //向空数组中添加数据
        }
      }
      _this.sup_this.data=arrByZM;
    }
  }
}
</script>
