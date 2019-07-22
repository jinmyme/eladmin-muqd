<template>
  <div class="app-container">
    <el-row :gutter="20">
        <eHeader :query="query" :sup_this="sup_this"/>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
          <el-table-column prop="type_name" label="类型名称"/>
          <el-table-column prop="table_name" label="数据库表名"/>
          <el-table-column prop="engine" label="数据库引擎"/>
          <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.addtime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <formSet :data="scope.row" :sup_this="sup_this"/>
              <edit :data="scope.row" :sup_this="sup_this"/>
              <el-popover
                :ref="scope.row.type_id"
                placement="top"
                width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.type_id].doClose()">取消</el-button>
                  <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.type_id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
    </el-row>
    <el-row :gutter="20">
    </el-row>
  </div>
</template>

<script>
import { typeList,delType } from '@/api/typeSet'
import eHeader from './module/type/header'
import edit from './module/type/edit'
import formSet from './module/type/formSet'
import { parseTime } from '@/utils/index'
export default {
  components: { eHeader,edit,formSet },
  props: {
    index_this: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      height: document.documentElement.clientHeight - 180 + 'px;',
      delLoading: false, sup_this: this, deptName: '', depts: [], deptId: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      loading: true,
      data: [],
      alldata:[],
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
      this.dataList()
    })
  },
  mounted: function() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + 'px;'
    }
  },
  methods: {
    parseTime,
    //类型设置列表
    dataList(){
      var that=this
      typeList().then(res=>{
        that.data = res.data
        that.alldata = res.data
        setTimeout(() => {
          that.loading = false
        }, that.time)
      }).catch(res=>{
      })
    },
    subDelete(id) {
      this.delLoading = true
      delType({
        type_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dataList()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
      })
    },
    //切换内容
    switchbtn(data) {
      this.$emit('switchbtn',data);
    },
  }
}
</script>

<style scoped>
</style>
