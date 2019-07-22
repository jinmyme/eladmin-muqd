<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this" :index_this="index_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small">
      <el-table-column prop="goods_id" sortable label="商品ID"/>
      <el-table-column prop="title" label="商品名称"/>
      <el-table-column prop="classify_name" label="分类"/>
      <el-table-column prop="goods_num" label="规格参数"/>
      <el-table-column prop="money" label="价格"/>
      <el-table-column prop="inventory" label="库存"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this":index_this="index_this"/>
          <el-popover
            :ref="scope.row.goods_id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.goods_id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.goods_id)">确定</el-button>
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
        @current-change="goodsList"
        :current-page.sync="current_page"
        :page-size="per_page"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import initData from '@/views/benzhen/mixins/initData'
import {goods_list,goods_del} from '@/benzhenApi/common'
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
    contData: {
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
      this.goodsList()
    })
  },
  watch:{
    contData:function(newVal,oldVal){
      const that=this
      if(newVal.addStatus) that.goodsList();
    },
  },
  methods: {
    parseTime,
    goodsList() {
      const that=this
      let data={
        page: that.current_page
      }
      if(that.query.value) data.goods_name=that.query.value
      goods_list(data).then(res=>{
        this.data = res.data.list.data
        that.total=res.data.list.totalRows
        that.per_page=res.data.list.listRows
        setTimeout(() => {
          this.loading = false
        }, this.time)
      }).catch(err => {
        this.loading = false
      })
    },
    subDelete(id) {
      this.delLoading = true
      goods_del({
        goods_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.goodsList()
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
  }
}
</script>

<style scoped>

</style>
