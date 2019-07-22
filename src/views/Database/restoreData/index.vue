<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据还原</span>
          </div>
          <!--表格渲染-->
          <el-table
            v-loading="loading"
            :data="data"
            size="small"
            highlight-current-row style="width: 100%;">
            <el-table-column :show-overflow-tooltip="true" prop="name" label="备份文件名称" width=""/>
            <el-table-column :show-overflow-tooltip="true" prop="format_time" label="备份时间" width=""/>
            <el-table-column :show-overflow-tooltip="true" prop="format_size" label="备份文件大小" width=""/>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button class="filter-item" slot="reference" type="primary" size="mini" @click="restoreImport(scope.row.time)">还原</el-button>
                <el-button class="filter-item" slot="reference" type="success" size="mini" @click="GoDownload(scope.row.time)">备份</el-button>
                <el-button class="filter-item" slot="reference" type="danger" size="mini" @click="delFile(scope.row.time,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '../mixins/initData'
import ElRow from "element-ui/packages/row/src/row";

export default {
  components: {ElRow},
  mixins:[initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      loading: true,
      data:[]
    }
  },
  created() {
    var that=this
    this.$nextTick(() => {
      that.restoreList()
    })
  },
  methods: {
    checkPermission,
    //还原数据列表
    restoreList(){
      var that=this
      that.restore().then(res=>{
        that.data=res.data
        that.loading=false
      })
    },
    //还原导入
    restoreImport(data){
      var that=this
      that.restore_import({
        time:data
      }).then(res=>{
        that.$message({
          message: '还原成功！',
          type: 'success'
        });
      })
    },
    //备份文件下载
    GoDownload(data){
      var that=this
      that.download({
        time:data
      }).then(res=>{
        window.open(res.data)
      })
    },
    //删除备份文件
    delFile(data,index){
      var that=this
      that.del_file({
        time:data
      }).then(res=>{
        that.$message({
          message: '删除成功！',
          type: 'success'
        });
        that.data.splice(index,1)
      })
    },
  }
}
</script>

<style scoped>

</style>
