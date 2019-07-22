<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <div :style="'height: auto;max-height:' + height + 'overflow-y: auto;'">
      <el-table v-loading="loading" :data="data" highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange">
        <el-table-column prop="rolename" label="名称"/>
        <el-table-column prop="roledes" label="描述"/>
        <el-table-column label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <edit :data="scope.row" :sup_this="sup_this"/>
            <el-popover
              :ref="scope.row.role_id"
              placement="top"
              width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.role_id].doClose()">取消</el-button>
                <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.role_id)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页组件-->
    <!--<el-pagination-->
      <!--:total="total"-->
      <!--style="margin-top: 8px;"-->
      <!--layout="total, prev, pager, next, sizes"-->
      <!--@size-change="sizeChange"-->
      <!--@current-change="pageChange"/>-->
    <!--这里是授权模块代码-->
    <el-row :gutter="20" style="margin-top: 5px;">
      <!--权限分配-->
      <el-col :span="24">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">权限分配</span>
            <el-button
              :loading="permissionLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 4px 10px"
              type="info"
              @click="savePermission">保存</el-button>
          </div>
          <div style="min-height: 320px;max-height:500px;overflow-y: auto;">
            <el-tree
              ref="permission"
              :data="permissions"
              :default-checked-keys="permissionIds"
              :props="defaultProps"
              show-checkbox
              default-expand-all
              node-key="menu_id">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{data.name}}</span>
              </span>
            </el-tree>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { del } from '@/api/role'
import { getPermissionTree } from '@/api/permission'
import { getMenusTree } from '@/api/menu'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import { getAllRole,authset,updateAuth } from '@/api/role'
import ajaxPost from '@/utils/ajaxRequest'
export default {
  components: { eHeader, edit },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentId: 0,
      permissionLoading: false,
      menuLoading: false,
      showButton: false,
      delLoading: false,
      sup_this: this,
      permissions: [],
      permissionIds: [],
      menus: [],
      menuIds: [],
      height: document.documentElement.clientHeight - 94.5 - 260 + 'px;',
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
      this.getAllRole()
    })
  },
  mounted: function() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 94.5 - 260 + 'px;'
    }
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.$refs.permission.setCheckedKeys([])
      this.$refs.menu.setCheckedKeys([])
      this.showButton = false
      this.url = 'api/roles'
      const sort = 'id,desc'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, sort: sort }
      if (value) { this.params['name'] = value }
      return true
    },
    //角色列表
    getAllRole(){
      var that=this;
      getAllRole().then(res=>{
        that.loading=false;
        that.data=res.data.set_role_list;
        that.alldata=res.data.set_role_list;
      })
    },
    subDelete(id) {
      this.delLoading = true
      del({
        role_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.getAllRole()
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
    getPermissions(id) {
      return new Promise((resolve, reject) => {
        authset({
          role_id: id
        }).then(res => {
          resolve(res)
        })
      })
    },
    getMenus() {
      getMenusTree().then(res => {
        this.menus = res
      })
    },
    handleCurrentChange(val) {
      if (val) {
        const _this = this
        // 清空权限与菜单的选中
        this.$refs.permission.setCheckedKeys([])
        // 保存当前的角色id
        this.currentId = val.role_id
        // 点击后显示按钮
        this.showButton = true
        // 初始化
        this.permissionIds = []
        // 处理权限数据
        this.getPermissions(val.role_id).then(res=>{
          let parentId=[]
          res.data.forEach(function (item,index) {
            parentId.push(''+item.menu_id+'');
          })
          val.auth.forEach(function(data, index) {
//            if(parentId.indexOf(data)==-1){
              _this.permissionIds.push(data)
//            }
          })
          _this.permissions = res.data
        })
      }
    },
    savePermission() {
      var that=this;
      this.permissionLoading = true
      const role = { role_id: this.currentId, auth: [] }
      this.$refs.permission.getHalfCheckedKeys().forEach(function(data, index) {
        const permission =data
        role.auth.push(permission)
      });
      this.$refs.permission.getCheckedKeys().forEach(function(data, index) {
        const permission =data
        role.auth.push(permission)
      });
      if(role.auth.length==0) role.auth.push('');
      updateAuth(role).then(res => {
        that.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
        that.permissionLoading = false
        this.getAllRole()
      }).catch(err => {
        that.permissionLoading = false
      })
    },
    saveMenu() {
      var that=this;
      this.menuLoading = true
      const role = { id: this.currentId, menus: [] }
      // 得到半选的父节点数据，保存起来
      this.$refs.menu.getHalfCheckedNodes().forEach(function(data, index) {
        const permission = { id: data.id }
        role.menus.push(permission)
      })
      // 得到已选中的 key 值
      this.$refs.menu.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data }
        role.menus.push(permission)
      })
      editMenu(role).then(res => {
        that.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
        that.menuLoading = false
//        that.getAllRole()
      }).catch(err => {
        that.menuLoading = false
      })
    },
    update() {
      // 无刷新更新 表格数据
      get(this.currentId).then(res => {
        for (let i = 0; i < this.data.length; i++) {
          if (res.id === this.data[i].id) {
            this.data[i] = res
            break
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .role-span {
    font-weight: bold;color: #303133;
    font-size: 15px;
  }
</style>
