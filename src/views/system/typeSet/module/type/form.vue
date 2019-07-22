<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '添加' : '编辑'" append-to-body width="570px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small">
      <el-form-item label="类型名称" prop="type_name">
        <el-input v-model="form.type_name" style="width: 300px;"/>
      </el-form-item>
      <el-form-item label="数据库表名" prop="table_name">
        <el-input v-model="form.table_name" style="width: 300px;"/>
      </el-form-item>
      <el-form-item style="margin-bottom: 0px;" label="引擎" prop="engine">
        <el-select v-model="form.engine" style="width: 450px;" placeholder="请选择">
          <el-option
            v-for="(item, index) in engine"
            :key="item + index"
            :label="item"
            :value="index"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { look,lookEdit } from '@/api/typeSet'
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
    return {
      dialog: false,
      loading: false,
      form: {
        type_id:'',
        type_name:'',
        table_name: '',
        engine: '',
        type_old_name:'',
        table_old_name:''
      },
      style: 'width: 184px',
      engine:[],
      rules: {
        type_name: [
          { required: true, message: '请输入类型名称', trigger: 'blur' }
        ],
        table_name: [
          { required: true, message: '请输入数据库表名', trigger: 'blur' }
        ],
        engine: [
          { required: true, message: '请选择引擎', trigger: 'change' }
        ],
      }
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
      this.$refs['form'].validate((valid) => {
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
      lookEdit(data).then(res => {
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
      lookEdit(data).then(res => {
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
      this.$refs['form'].resetFields()
      this.form ={
        type_id:'',
        type_name:'',
        table_name: '',
        engine: '',
        type_old_name:'',
        table_old_name:''
      }
    },
    //添加选项显示内容
    look(id) {
      var that=this
      look({
        type_id:id
      }).then(res => {
        if(id){
          that.engine = res.data.engineList
        }else{
          that.engine = res.data
        }
      }).catch(err => {
        console.log(err.response.data.message)
      })
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
