<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>字典列表</span>
            <div style="float: right;">
              <el-button
                class="filter-item"
                size="mini"
                style="padding: 4px 10px"
                type="primary"
                @click="selectBtn(4)">刷新</el-button>
              <el-button
                class="filter-item"
                size="mini"
                style="padding: 4px 10px"
                type="primary"
                @click="selectBtn(1)">批量备份</el-button>
              <el-button
                class="filter-item"
                size="mini"
                style="padding: 4px 10px"
                type="primary"
                @click="selectBtn(2)">批量优化</el-button>
              <el-button
                class="filter-item"
                size="mini"
                style="padding: 4px 10px"
                type="primary"
                @click="selectBtn(3)">批量修复</el-button>
            </div>
          </div>
          <eHeader ref="header" :query="query" :sup_this="sup_this"/>
          <!--表格渲染-->
          <el-table
            v-loading="loading"
            :data="data"
            size="small"
            highlight-current-row style="width: 100%;"
            @current-change="handleCurrentChange"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              fixed
              width="45">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" width="120"/>
            <el-table-column :show-overflow-tooltip="true" prop="comment" label="描述" width="100"/>
            <el-table-column :show-overflow-tooltip="true" prop="engine" label="引擎" width="80"/>
            <el-table-column :show-overflow-tooltip="true" prop="rows" label="数据条数" width="80" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="data_length" label="大小" width="80" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="collation" label="排序规则"/>
            <el-table-column :show-overflow-tooltip="true" prop="create_time" label="创建时间"/>
            <el-table-column :show-overflow-tooltip="true" prop="update_time" label="修改时间"/>
            <!--<el-table-column label="操作" width="150px" align="center">-->
              <!--<template slot-scope="scope">-->
                <!--<edit v-if="checkPermission(['ADMIN','DICT_ALL','DICT_EDIT'])" :data="scope.row" :sup_this="sup_this"/>-->
                <!--<el-popover-->
                  <!--v-if="checkPermission(['ADMIN','DICT_ALL','DICT_DELETE'])"-->
                  <!--:ref="scope.row.id"-->
                  <!--placement="top"-->
                  <!--width="180">-->
                  <!--<p>此操作将删除字典与对应的字典详情，确定要删除吗？</p>-->
                  <!--<div style="text-align: right; margin: 0">-->
                    <!--<el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>-->
                    <!--<el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>-->
                  <!--</div>-->
                  <!--<el-button slot="reference" type="danger" size="mini">删除</el-button>-->
                <!--</el-popover>-->
              <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
          <!--分页组件-->
          <!--<el-pagination-->
            <!--:total="total"-->
            <!--style="margin-top: 8px;"-->
            <!--layout="total, prev, pager, next, sizes"-->
            <!--@size-change="sizeChange"-->
            <!--@current-change="pageChange"/>-->
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>字典详情
              <span style="color: #317EF3">
                {{ this.$refs.dictDetail ? this.$refs.dictDetail.dictName : '' }}
              </span>
            </span>
            <el-button
              v-if="checkPermission(['ADMIN','DICT_ALL','DICT_CREATE']) && this.$refs.dictDetail && this.$refs.dictDetail.dictName"
              class="filter-item"
              size="mini"
              style="float: right;padding: 4px 10px"
              type="primary"
              icon="el-icon-plus"
              @click="$refs.dictDetail.$refs.header.$refs.form.dialog = true">新增</el-button>
          </div>
          <dictDetail ref="dictDetail"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { dictionary } from '@/api/Dictionary'
import eHeader from './module/header'
import edit from './module/edit'
import dictDetail from '../dictDetail/index'
import initData from '../mixins/initData'
export default {
  components: { eHeader, edit, dictDetail },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
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
      handleSelection:[],//选中的选项
    }
  },
  created() {
    this.$nextTick(() => {
      this.dictionary()
    })
  },
  methods: {
    checkPermission,
    //获取字典列表
    dictionary(){
      var that=this;
      if (!that.beforeInit()) {
        return
      }
      dictionary({}).then(res=>{
        that.data = res.data
        that.alldata = res.data
        setTimeout(() => {
          that.loading = false
        }, that.time)
      })
    },
    beforeInit() {
      this.url = 'api/dict'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      if (this.$refs.dictDetail) {
        this.$refs.dictDetail.data = []
        this.$refs.dictDetail.dictName = ''
      }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
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
    handleCurrentChange(val) {
      if (val) {
        this.$refs.dictDetail.dictName = val.name
        this.$refs.dictDetail.data=val.field_info
      }
    },
    //勾选的选中选项
    handleSelectionChange(val){
      var that=this
      if(val){
        var data=[];
        val.forEach(function (item,index) {
          data.push(item.name)
        });
        that.handleSelection=data
      }
    },
    //选择字典操作
    selectBtn(type){
      var that=this;
      switch (type){
        case 1:
          var tables_name=that.handleSelection
          that.backup_export({
            tables_name:tables_name
          }).then(res=>{
            that.$message({
              message: '备份成功！',
              type: 'success'
            });
          }).catch(res=>{
            that.$message.error('备份失败！');
          })
          break;
        case 2:
          var tables_name=that.handleSelection
          that.optimize({
            tables_name:tables_name
          }).then(res=>{
            that.$message({
              message: '优化成功！',
              type: 'success'
            });
          }).catch(res=>{
            that.$message.error('优化失败！');
          })
          break;
        case 3:
          var tables_name=that.handleSelection
          that.repair({
            tables_name:tables_name
          }).then(res=>{
            that.$message({
              message: '修复成功！',
              type: 'success'
            });
          }).catch(res=>{
            that.$message.error('修复失败！');
          })
          break;
        case 4:
          that.clear().then(res=>{
            that.$message({
              message: '刷新成功！',
              type: 'success'
            });
            that.dictionary();
          }).catch(res=>{
            that.$message.error('刷新失败！');
          })
          break;
      }
    }
  }
}
</script>

<style scoped>

</style>
