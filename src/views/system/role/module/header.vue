<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
    <!-- 导出 -->
    <!--<el-button v-if="checkPermission(['ADMIN'])" :loading="downloadLoading" size="mini" class="filter-item" type="primary" icon="el-icon-download" @click="download">导出</el-button>-->
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import { parseTime } from '@/utils/index'
import eForm from './form'
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
    }
  },
  data() {
    return {
      downloadLoading: false
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
      for (var i=0;i<_this.sup_this.data.length;i++){
        //for循环数据中的每一项（根据name值）
        var name=_this.sup_this.data[i].rolename
        if(name.search(this.query.value)!=-1){
          //判断输入框中的值是否可以匹配到数据，如果匹配成功
          arrByZM.push(_this.sup_this.data[i]);
          //向空数组中添加数据
        }
      }
      _this.sup_this.data=arrByZM;
    },
    download() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '名称', '描述', '创建日期']
        const filterVal = ['id', 'name', 'remark', 'createTime']
        const data = this.formatJson(filterVal, this.$parent.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
