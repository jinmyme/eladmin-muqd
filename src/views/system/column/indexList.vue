<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" row-key="column_id" size="small">
      <el-table-column prop="column_name" label="栏目名称"/>
      <el-table-column prop="column_type" label="栏目类型"/>
      <el-table-column label="添加子栏目" align="center">
        <template slot-scope="scope">
          <add :data="scope.row" :sup_this="sup_this"/>
        </template>
      </el-table-column>
      <el-table-column label="内容列表" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="openContList(scope.row)">内容列表</el-button>
        </template>
      </el-table-column>j
      <el-table-column prop="create_time" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            :ref="scope.row.column_id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.column_id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.column_id)">确定</el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { columnList,columnDel } from '@/api/column'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import add from './module/add'
export default {
  components: { eHeader, edit,add },
  props: {
    index_this: {
      type: Object,
      required: true
    },
  },
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
      this.columnList()
    })
  },
  methods: {
    parseTime,
    columnList() {//栏目列表
      columnList().then(res=>{
        this.data = res.data
        setTimeout(() => {
          this.loading = false
        }, this.time)
      }).catch(err => {
        this.loading = false
      })
    },
    subDelete(id) {
      this.delLoading = true
      columnDel({
        column_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.columnList()
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
