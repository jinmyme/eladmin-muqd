<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--<el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">-->
        <!--<div class="head-container">-->
          <!--<el-input v-model="deptName" clearable placeholder="输入部门名称搜索" prefix-icon="el-icon-search" style="width: 100%;" class="filter-item" @input="getDeptDatas"/>-->
        <!--</div>-->
        <!--<el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"/>-->
      <!--</el-col>-->
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <eHeader :query="query" :sup_this="sup_this"/>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="rolename" label="角色名"/>
          <el-table-column label="头像">
            <template slot-scope="scope">
              <img class="w-15" :src="imgUrl+scope.row.headpic"/>
            </template>
          </el-table-column>
          <!--<el-table-column label="状态" align="center">-->
            <!--<template slot-scope="scope">-->
              <!--<div v-for="item in dicts" :key="item.id">-->
                <!--<el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>-->
              <!--</div>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ parseTime(scope.row.createTime) }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <edit :data="scope.row" :sup_this="sup_this"/>
              <el-popover
                :ref="scope.row.admin_id"
                placement="top"
                width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.admin_id].doClose()">取消</el-button>
                  <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.admin_id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!--<el-pagination-->
          <!--:total="total"-->
          <!--style="margin-top: 8px;"-->
          <!--layout="total, prev, pager, next, sizes"-->
          <!--@size-change="sizeChange"-->
          <!--@current-change="pageChange"/>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { userList,del } from '@/api/user'
import { getDepts } from '@/api/dept'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import Config from '@/config'
export default {
  components: { eHeader, edit },
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
      time: 170,
      imgUrl:Config.imgUrl,
    }
  },
  created() {
//    this.getDeptDatas()
    this.$nextTick(() => {
      this.userList()
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
    checkPermission,
    beforeInit() {
      this.url = 'api/users'
      const sort = 'id,desc'
      const query = this.query
      const value = query.value
      return true
    },
    //管理员列表
    userList(){
      var that=this
      userList().then(res=>{
        that.data = res.data.user_list
        that.alldata = res.data.user_list
        setTimeout(() => {
          that.loading = false
        }, that.time)
      }).catch(res=>{

      })
    },
    subDelete(id) {
      this.delLoading = true
      del({
        admin_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.userList()
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
    getDeptDatas() {
      const sort = 'id,desc'
      const params = { sort: sort }
      if (this.deptName) { params['name'] = this.deptName }
      getDepts(params).then(res => {
        this.depts = res.content
      })
    },
    handleNodeClick(data) {
      if (data.pid === 0) {
        this.deptId = null
      } else {
        this.deptId = data.id
      }
      this.init()
    }
  }
}
</script>

<style scoped>
</style>
