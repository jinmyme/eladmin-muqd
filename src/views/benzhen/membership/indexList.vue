<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" row-key="classify_id" size="small">
      <el-table-column prop="user_id" label="会员id"/>
      <el-table-column prop="nickname" label="昵称"/>
      <el-table-column prop="mobile" label="电话号码"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="genderTxt" label="性别"/>
      <el-table-column prop="industry" label="从事行业"/>
      <el-table-column prop="company_name" label="公司"/>
      <el-table-column prop="register_time" label="注册时间">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.register_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="积分"/>
      <el-table-column prop="admin" label="归属"/>
      <el-table-column label="操作" width="300" align="center" v-if="is_operation==1">
        <template slot-scope="scope">
          <el-popover
            :ref="'Audit'+scope.row.user_id"
            placement="top"
            width="180"
            v-if="scope.row.is_verify==0">
            <p>确定通过审核吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs['Audit'+scope.row.user_id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="memberVerify(scope.row.user_id)">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" size="mini">{{scope.row.is_verify==1?'审核通过':'未审核'}}</el-button>
          </el-popover>
          <edit :data="scope.row" :sup_this="sup_this" :query="query" v-if="scope.row.is_verify==1"/>
          <el-popover
            :ref="scope.row.user_id"
            placement="top"
            width="180"
            v-if="scope.row.is_verify==1">
            <p>确定{{scope.row.is_freeze==1?'解开冻结':'进行冻结'}}吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.user_id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.user_id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">{{scope.row.is_freeze==1?'已冻结':'冻结'}}</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex flex-row justify-content-center my-5">
      <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        @current-change="memberList"
        :current-page.sync="current_page"
        :page-size="per_page"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import initData from '@/views/benzhen/mixins/initData'
import {member_list,member_freeze,member_verify} from '@/benzhenApi/common'
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
      downloadExcel:'',
      is_operation:1
    }
  },
  created() {
    this.$nextTick(() => {
      this.memberList()
    })
  },
  methods: {
    parseTime,
    memberList(type) {
      const that=this
      let data={
        page: that.current_page
      }
      if(that.query.nickname) data.nickname=that.query.nickname
      if(that.query.admin_id) data.admin_id=that.query.admin_id
      if(that.query.industry_id) data.industry_id=that.query.industry_id
      member_list(data).then(res=>{
        var list=res.data.data.member_list
        list.forEach((item,index)=>{
          item.genderTxt=(item.gender==1?'男':'女')
        })
        that.data = list
        if(!type && type!='search'){
          that.query={
            nickname:'',
            admin_id:'',
            industry_id:'',
            adminList:res.data.data.admin,//用户名列表
            industryList:res.data.data.industry,//从事行业列表
          }
        }
        that.total=res.data.totalRows
        that.per_page=res.data.listRows
        that.downloadExcel=res.data.data.export_excel
        that.is_operation=res.data.data.is_operation
        setTimeout(() => {
          that.loading = false
        }, this.time)
      }).catch(err => {
        that.loading = false
      })
    },
    subDelete(id) {
      this.delLoading = true
      member_freeze({
        user_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.memberList()
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
    memberVerify(id){
      this.delLoading = true
      member_verify({
        user_id:id
      }).then(res => {
        this.delLoading = false
        this.$refs['Audit'+id].doClose()
        this.memberList()
        this.$notify({
          title: '通过成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs['Audit'+id].doClose()
//        console.log(err.response.data.message)
      })
    },
  }
}
</script>

<style scoped>

</style>
