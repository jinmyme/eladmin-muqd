<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" row-key="classify_id" size="small">
      <el-table-column prop="classify_name" label="分类"/>
      <el-table-column label="banner" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.classify_img" class="w-10">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            :ref="scope.row.classify_id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.classify_id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.classify_id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import initData from '@/views/benzhen/mixins/initData'
import {classify_list,classify_del} from '@/benzhenApi/common'
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
      this.classifyList()
    })
  },
  methods: {
    parseTime,
    classifyList() {
      classify_list().then(res=>{
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
      classify_del({
        classify_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.classifyList()
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
