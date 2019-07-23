<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '添加' : '编辑'" append-to-body width="50%">
    <el-form ref="addform" :model="form" :rules="rules" size="small" label-width="160px">
      <el-form-item label="表单名称" prop="input_name">
        <el-input v-model="form.input_name"/>
      </el-form-item>
      <el-form-item label="表单类型" prop="input_type">
        <el-select v-model="form.input_type" placeholder="请选择">
          <el-option
            v-for="(item, index) in input_type_list"
            :key="index"
            :label="item.input_type_name"
            :value="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="字段名称" prop="field_name">
        <el-input v-model="form.field_name"/>
      </el-form-item>
      <el-form-item label="数据类型" prop="data_type">
        <el-select v-model="form.data_type" placeholder="请选择">
          <el-option
            v-for="(item, index) in data_type_list"
            :key="index"
            :label="item.data_type_name+' ('+item.data_type_value+')'"
            :value="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="数据长度" prop="data_len">
        <el-input v-model="form.data_len"/>
      </el-form-item>
      <el-form-item label="小数点位数" prop="decimal_point" v-if="form.data_type!='' && data_type_list[form.data_type].is_decimal_point==1">
        <el-input v-model="form.decimal_point"/>
      </el-form-item>
      <el-form-item label="表单默认值">
        <el-input v-model="form.input_default"/>
      </el-form-item>
      <el-form-item label="占位文本" v-if="form.input_type!='' && input_type_list[form.input_type-1].is_placeholder==1">
        <el-input v-model="form.placeholder_text"/>
      </el-form-item>
      <el-form-item label="表单验证">
        <el-checkbox-group v-model="form.input_verify">
          <el-checkbox :label="item.lay_verify_id" v-for="(item,index) in lay_verify_list" :key="index">{{item.lay_verify_name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="辅助信息">
        <el-input v-model="form.aux_text"/>
      </el-form-item>
      <el-form-item label="是否连表查询">
        <el-radio v-model="radioTables" label="1">是</el-radio>
        <el-radio v-model="radioTables" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="连表查询">
        <el-cascader
          v-model="FieldListValue"
          :options="connectDbList"
          @active-item-change="connectFieldList"
          :props="props"
          style="width:50%"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { lookForm,lookFormEdit,connect_field_list } from '@/api/typeSet'
import E from 'wangeditor'
let id = 0;
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
  },
  data() {
    const ruleLetter=(rule,value,callback)=>{
      if(/^[a-zA-Z0-9_]+$/.test(value) == false){
        callback(new Error("字段名称只能输入字母"));
      }else{
        callback();
      }
    }
    const ruleNumber=(rule,value,callback)=>{
      if(/^\d+$/.test(value) == false){
        callback(new Error("数据长度只能输入数字"));
      }else{
        callback();
      }
    }
    return {
      dialog: false,
      loading: false,
      form: {
        type_id: '',
        input_name: '',
        input_type:'',
        field_name:'',
        data_type:'',
        data_len:'',
        decimal_point:'',
        input_default:'',
        placeholder_text:'',
        input_verify:[],
        aux_text:'',
      },
      input_type_list:[],
      lay_verify_list:[],
      data_type_list:[],
      style: 'width: 184px',
      rules: {
        input_name: [
          { required: true, message: '请输入表单名称', trigger: 'blur' }
        ],
        input_type: [
          { required: true, message: '请选择表单类型', trigger: 'change' }
        ],
        field_name: [
          { required: true, message: '请输入字段名称', trigger: 'blur' },
          { validator:ruleLetter, trigger: 'blur' },
        ],
        data_type: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        data_len: [
          { required: true, message: '请输入数据长度', trigger: 'blur' },
          { validator:ruleNumber, trigger: 'blur' },
        ],
        decimal_point: [
          { required: true, message: '请输入小数点位数', trigger: 'blur' },
          { validator:ruleNumber, trigger: 'blur' },
        ],
      },
      //查询对应表数组
      radioTables:'0',
      FieldListValue:[],
      connectDbList: [],
      props: {
        label:'label',
        value: 'value',
        children: 'field'
      },
    }
  },
  created() {
    const explorer = navigator.userAgent
    if (explorer.indexOf('Chrome') >= 0) {
      this.style = 'width: 184px'
    } else {
      this.style = 'width: 172px'
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      var that=this
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      var that=this;
      var data={};
      var form=that.form
      for(var key in form){
        if(form[key]!=''){
          data[''+key+'']=form[key]
        }
      }
      data.type_id=that.sup_this.formsetupid
      data.data_type=that.data_type_list[that.form.data_type].data_type_id
      data.input_type=that.input_type_list[that.form.input_type].input_type_id
      //连表属性
      if(that.radioTables=='1'){
        data.connect=that.radioTables
        data.connect_type_id=that.FieldListValue[0]
        data.conect_input_id=that.FieldListValue[1]
        data.conect_need_input_id=that.FieldListValue[2]
      }
//      if(data.input_verify && data.input_verify.length>0){
//        var str='';
//        data.input_verify.forEach(function(item,index){
//          str=str==''?item:str+'|'+item
//        });
//        data.input_verify=str
//      }
      lookFormEdit(data).then(res => {
        that.loading = true
        that.resetForm()
        that.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        that.loading = false
        that.sup_this.dataList()
      }).catch(err => {
        that.loading = false
      })
    },
    doEdit() {
      var that=this
      var data={};
      var form=that.form
      for(var key in form){
        if(form[key] && form[key]!=''){
          data[''+key+'']=form[key]
        }
      }
      data.type_id=that.sup_this.formsetupid
      data.data_type=that.data_type_list[that.form.data_type].data_type_id
      data.input_type=that.input_type_list[that.form.input_type].input_type_id
      //连表属性
      if(that.radioTables=='1'){
        data.connect=that.radioTables
        data.connect_type_id=that.FieldListValue[0]
        data.conect_input_id=that.FieldListValue[1]
        data.conect_need_input_id=that.FieldListValue[2]
      }
      lookFormEdit(data).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.dataList()
      }).catch(err => {
        this.loading = false
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['addform'].resetFields()
      this.form ={
        type_id: '',
        input_name: '',
        input_type:'',
        field_name:'',
        data_type:'',
        data_len:'',
        decimal_point:'',
        input_default:'',
        placeholder_text:'',
        input_verify:[],
        aux_text:'',
      }
    },
    //添加选项显示内容
    look(data) {
      var that=this
      lookForm(data).then(res => {
        that.input_type_list=res.data.input_type_list
        that.data_type_list=res.data.data_type_list
        that.lay_verify_list=res.data.lay_verify_list
        if(res.data.input_info) {
          var data = res.data.input_info;
          let inputType,dataType;
          that.input_type_list.forEach((item,index)=>{
            if(item.input_type_id==data.input_type){
              inputType=index
            }
          })
          that.data_type_list.forEach((item,index)=>{
            if(item.data_type_id==data.data_type){
              dataType=index
            }
          })
          that.form = {
            type_id: data.type_id,
            input_id:data.input_id,
            input_name: data.input_name,
            input_type: inputType,
            field_name: data.field_name,
            data_type: dataType,
            data_len: data.data_len,
            decimal_point: data.decimal_point,
            input_default: data.input_default,
            placeholder_text: data.placeholder_text,
            input_verify: data.input_verify,
            aux_text: data.aux_text,
          }
        }
        if(res.data.connect_db_list){
          var data = res.data.input_info;
          that.connectDbList=(res.data.connect_db_list).map(item=>({
            value: item.type_id,
            label: item.type_name,
            field: []
          }))
          that.radioTables = String(data.connect)
          that.FieldListValue = [data.connect_type_id, data.conect_input_id, data.conect_need_input_id]
          if(data.connect_type_id) that.connectFieldList([data.connect_type_id])
        }
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    //查询对应表
    connectFieldList(data){
      if(data.length>=2) return;
      const that=this
      connect_field_list({
        type_id:data[0]
      }).then(res=>{
        that.connectDbList.forEach(function (item,index) {
          if(data[0]==item.value){
            let mapArray=(res.data).map(item=>{
              return {
                value: item.input_id,
                label: item.input_name,
              }}
            );
            let mapArrayAll=(res.data).map(item=>{
              return {
                value: item.input_id,
                label: item.input_name,
                field: mapArray,
              }}
            );
            that.connectDbList[index].field = mapArrayAll
          }
        })
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>
