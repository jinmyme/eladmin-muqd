<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      row-key="id"
      size="small">
      <el-table-column prop="column_name" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.meta.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="column_name" label="菜单名称">
        <template slot-scope="scope">
          <span>{{scope.row.meta.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加子菜单" align="center">
        <template slot-scope="scope">
          <add :data="scope.row" :sup_this="sup_this"/>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="URL"/>
      <el-table-column prop="addtime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.addtime) }}</span>
        </template>
      </el-table-column>
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
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { menu_list,menu_del } from '@/api/FormModule'
import { parseTime } from '@/utils/index'
import eHeader from './module/menu/header'
import edit from './module/menu/edit'
import add from './module/menu/add'
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
      this.menuList()
    })
  },
  methods: {
    parseTime,
    menuList() {//菜单栏目列表
      menu_list().then(res=>{
        let list=res.data
        list.splice(0,1)
        this.data = list
        setTimeout(() => {
          this.loading = false
        }, this.time)
      }).catch(err => {
        this.loading = false
      })
    },
    subDelete(id) {
      this.delLoading = true
      menu_del({
        id	:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.menuList()
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
