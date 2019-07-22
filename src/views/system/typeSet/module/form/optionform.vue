<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '添加' : '编辑'" append-to-body width="50%">
    <el-form ref="optionform" :model="form" :rules="rules" size="small" label-width="160px">
      <el-form-item label="选项名称" prop="input_name">
        <el-input v-model="form.input_name"/>
      </el-form-item>
      <el-form-item label="选项值" prop="input_name">
        <el-input v-model="form.input_default"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { add_child } from '@/api/typeSet'
import E from 'wangeditor'
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
      if(/^[A-Za-z]+$/.test(value) == false){
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
        input_id: '',
        input_name:'',
        input_default:'',
      },
      input_type_list:[],
      lay_verify_list:[],
      data_type_list:[],
      style: 'width: 184px',
      rules: {
        input_name: [
          { required: true, message: '请输入选项名称', trigger: 'blur' }
        ],
        input_default: [
          { required: true, message: '请输入选项值', trigger: 'blur' }
        ],
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
      this.$refs['optionform'].validate((valid) => {
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
      add_child(that.form).then(res => {
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
        if(form[key]!=''){
          data[''+key+'']=form[key]
        }
      }
      add_child(data).then(res => {
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
      this.$refs['optionform'].resetFields()
      this.form ={
        type_id: '',
        input_id: '',
        input_name:'',
        input_default:'',
      }
    },
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
