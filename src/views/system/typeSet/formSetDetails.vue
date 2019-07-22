<template>
  <div class="app-container">
    <el-row :gutter="20">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      row-key="input_id"
      style="width: 100%;">
      <el-table-column prop="input_id" label="表单id"/>
      <el-table-column prop="input_name" label="表单名称"/>
      <el-table-column prop="input_default" label="表单默认值"/>
      <el-table-column prop="input_type_name" label="表单类型"/>
      <el-table-column prop="field_name" label="字段名称"/>
      <el-table-column prop="data_type_value" label="数据类型"/>
      <el-table-column prop="data_len" label="数据长度"/>
      <el-table-column prop="decimal_point" label="小数点位数"/>
      <el-table-column prop="placeholder_text" label="占位文本"/>
      <el-table-column prop="input_verify" label="验证规则">
        <template slot-scope="scope">
          <span class="w-100">{{lay_verify | verifyFilter(scope.row.input_verify)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="aux_text" label="辅助信息"/>
      <el-table-column label="操作" align="left" width="250">
        <template slot-scope="scope">
          <div v-if="scope.row.children">
            <addOption :data="scope.row" :sup_this="sup_this" v-if="scope.row.input_type==4 || scope.row.input_type==5 || scope.row.input_type==6"></addOption>
            <edit :data="scope.row" :sup_this="sup_this"/>
            <el-popover
              :ref="scope.row.input_id"
              placement="top"
              width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.input_id].doClose()">取消</el-button>
                <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.input_id)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popover>
          </div>
          <div v-else>
            <editOption :data="scope.row" :sup_this="sup_this"/>
            <el-popover
              :ref="scope.row.input_id"
              placement="top"
              width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.input_id].doClose()">取消</el-button>
                <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.input_id)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>
    </el-row>
  </div>
</template>

<script>
import { lookFormSet,delForm } from '@/api/typeSet'
import eHeader from './module/form/header'
import edit from './module/form/edit'
import addOption from './module/form/addOption'
import editOption from './module/form/editOption'
import formSet from './module/form/formSet'
import { parseTime } from '@/utils/index'
export default {
  components: { eHeader,edit,formSet,addOption,editOption },
  props: {
    index_this: {
      type: Object,
      required: true
    },
    formsetupid:{
      type:Number,
      required: true
    }
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
      time: 170,
      lay_verify:{},//验证方式
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
  filters:{
    verifyFilter(lay_verify,val){
      var that=this;
      if(val){
        var strArray=val.split('|');
        var str='';
        for(var key in strArray){
          var i=lay_verify[strArray[key]]
          str=str==''?i:str+','+i
        }
        return str;
      }
    }
  },
  watch: {
    formsetupid:{ //深度监听，可监听到对象、数组的变化
      handler (newV, oldV) {
        this.dataList()
      },
      deep:true
    }
  },
  methods: {
    parseTime,
    //类型设置列表
    dataList(){
      var that=this
      lookFormSet({
        type_id:that.formsetupid
      }).then(res=>{
        that.data = res.data.input_list
        that.alldata = res.data.input_list
        that.lay_verify=res.data.lay_verify
        setTimeout(() => {
          that.loading = false
        }, that.time)
      }).catch(res=>{
      })
    },
    subDelete(id) {
      this.delLoading = true
      delForm({
        input_id:id
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
    view(row){
      if (this.expands.indexOf(row.name) < 0) {
        this.expands = []
        this.expands.push(row.name);
      } else {
        this.expands = []
      }
    },
  }
}
</script>

<style scoped>
</style>
