<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" row-key="classify_id" size="small">
      <el-table-column prop="title" label="商品名称"/>
      <el-table-column prop="goods_num" label="规格参数"/>
      <el-table-column prop="username" label="用户昵称"/>
      <el-table-column prop="mobile" label="手机号码"/>
      <el-table-column prop="register_time" label="浏览时间">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.time)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this" :query="query" :index_this="index_this"/>
          <!--<el-popover-->
            <!--:ref="scope.row.suggest_id"-->
            <!--placement="top"-->
            <!--width="180">-->
            <!--<p>确定删除本条数据吗？</p>-->
            <!--<div style="text-align: right; margin: 0">-->
              <!--<el-button size="mini" type="text" @click="$refs[scope.row.suggest_id].doClose()">取消</el-button>-->
              <!--<el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.suggest_id)">确定</el-button>-->
            <!--</div>-->
            <!--<el-button slot="reference" type="danger" size="mini">删除</el-button>-->
          <!--</el-popover>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="flex flex-row justify-content-center my-5">
      <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        @current-change="browseList"
        :current-page.sync="current_page"
        :page-size="per_page"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import initData from '@/views/benzhen/mixins/initData'
import {browse_list} from '@/benzhenApi/common'
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
      this.browseList()
    })
  },
  methods: {
    parseTime,
    browseList(type) {
      const that=this
      let data={
        page: that.current_page
      }
      if(that.query.goods_name) data.goods_name=that.query.goods_name
      if(that.query.start_time) data.start_time=that.query.start_time
      if(that.query.end_time) data.end_time=that.query.end_time
      if(type=='search') data.page=1
      browse_list(data).then(res=>{
        that.data = res.data.data
        that.total=res.data.totalRows
        that.per_page=res.data.listRows
        if(!type && type!='search'){
          that.query= {
            goods_name: '',
            start_time:'',
            end_time: ''
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
