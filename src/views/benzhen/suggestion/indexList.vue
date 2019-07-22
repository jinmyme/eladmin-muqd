<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" row-key="classify_id" size="small">
      <el-table-column prop="username" label="会员id"/>
      <el-table-column prop="iphone" label="联系电话"/>
      <el-table-column prop="suggest_type" label="投诉类型"/>
      <el-table-column prop="content" label="内容"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this" :query="query"/>
          <el-popover
            :ref="scope.row.suggest_id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.suggest_id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.suggest_id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex flex-row justify-content-center my-5">
      <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        @current-change="suggestList"
        :current-page.sync="current_page"
        :page-size="per_page"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import initData from '@/views/benzhen/mixins/initData'
import {suggest_list,suggest_del} from '@/benzhenApi/common'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  props: {
    index_this: {
      type: Object,
      required: true
    },
  },
  mixins:[initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
    }
  },
  created() {
    this.$nextTick(() => {
      this.suggestList()
    })
  },
  methods: {
    parseTime,
    suggestList(type) {
      const that=this
      let data={
        page: that.current_page
      }
      if(that.query.mobile) data.mobile=that.query.mobile
      if(that.query.suggest_type_id) data.suggest_type_id=that.query.suggest_type_id
      suggest_list(data).then(res=>{
        that.data = res.data.list.data
        that.total=res.data.list.totalRows
        that.per_page=res.data.list.listRows
        if(!type && type!='search'){
          that.query= {
            mobile: '',
            suggest_type_id:'',
            suggest_type: res.data.suggest_type
          }
        }
        setTimeout(() => {
          that.loading = false
        }, this.time)
      }).catch(err => {
        that.loading = false
      })
    },
    subDelete(id) {
      this.delLoading = true
      suggest_del({
        suggest_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.suggestList()
        this.$notify({
          title: '操作成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
//        console.log(err.response.data.message)
      })
    },
  }
}
</script>

<style scoped>

</style>
