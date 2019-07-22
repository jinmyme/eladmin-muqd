<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      row-key="id"
      size="small">
      <el-table-column prop="name" label="组件名称"/>
      <el-table-column prop="component" label="组件路径"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { component_list,component_del } from '@/api/FormModule'
import { parseTime } from '@/utils/index'
import eHeader from './module/assembly/header'
import edit from './module/assembly/edit'
export default {
  components: { eHeader, edit },
  data() {
    return {
      delLoading: false,
      sup_this: this,
      loading: true,
      data: [],
      page: 0,
      size: 10,
      total: 0,
      url: '',
      params: {},
      query: {},
      time: 170
    }
  },
  created() {
    this.$nextTick(() => {
      this.componentistL()
    })
  },
  methods: {
    parseTime,
    componentistL() {//组件列表
      component_list().then(res=>{
        this.data =res.data
        setTimeout(() => {
          this.loading = false
        }, this.time)
      }).catch(err => {
        this.loading = false
      })
    },
    subDelete(id) {
      this.delLoading = true
      component_del({
        id	:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.componentistL()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
//        console.log(err.response.data.message)
      })
    },
    openContList(data){
      this.index_this.switchbtn({
        component:'contList',
        data:data
      })
    }
  }
}
</script>

<style scoped>

</style>
