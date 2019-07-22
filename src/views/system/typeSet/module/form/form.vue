<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '添加' : '编辑'" append-to-body width="70%">
    <el-form class="w-75" ref="form" label-width="160px">
      <el-form-item
        v-for="(item,index) in formDiv"
        :key="index"
        :label="item.input_type_name">
        <!--1=>输入框,2=>文本框,3=>富文本编辑器,4=>多选框,5=>单选框,6=>下拉框,7=>上传口,8=>日期时间框,9=>多文件上传,10=>开关）-->
        <el-input v-model="form[index].line" v-if="item.input_type_id==1"></el-input>
        <el-input type="textarea" v-model="form[index].line" v-if="item.input_type_id==2"></el-input>
        <div ref="editor" class="editor" v-if="item.input_type_id==3"/>
        <el-checkbox-group v-model="form[index].line" v-if="item.input_type_id==4">
          <el-checkbox
            :label="checkboxItem.input_name"
            name="type"
            v-for="(checkboxItem,checkboxIndex) in item.children"
            :key="'checkbox'+checkboxIndex"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-model="form[index].line" v-if="item.input_type_id==5">
          <el-radio :label="radioItem.input_name" v-for="(radioItem,radioIndex) in item.children" :key="'radio'+radioIndex"></el-radio>
        </el-radio-group>
        <el-select v-model="form[index].line" v-if="item.input_type_id==6">
          <el-option :label="selectItem.input_name" :value="selectItem.input_default" v-for="(selectItem,selectIndex) in item.children" :key="'select'+selectIndex"></el-option>
        </el-select>
        <el-col :span="6" v-if="item.input_type_id==8">
          <el-date-picker type="date" placeholder="选择日期" v-model="form[index].line" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-upload
          v-if="item.input_type_id==7"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-switch v-model="form[index].line" v-if="item.input_type_id==10"></el-switch>
      </el-form-item>
      <el-form-item label="是否连表查询">
        <el-radio v-model="radioTables" label="1">备选项</el-radio>
        <el-radio v-model="radioTables" label="2">备选项</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { lookForm,lookFormEdit } from '@/api/typeSet'
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
    return {
      radioTables:'1',
      dialog: false,
      loading: false,
      form: [],
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
      },
      formDiv:[],
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
    look(data) {
      var that=this
      lookForm({
        type_id:data.type_id
      }).then(res => {
        var list=res.data.input_type_list;
        var input_type=1;
        that.formDiv=list;
        list.forEach(function(item,index){
          if(item.input_type==4){
            that.form.push({line:[]});
          }else if(item.input_type==10) {
            if(!item.input_default || item.input_default==1) {
              that.form.push({line: true});
            }else{
              that.form.push({line: false});
            }
          }else{
            that.form.push({line:''});
          }
          if(item.input_type==3) input_type=3
        })
        if(input_type==3){
          setTimeout(function(){
            that.creatEditor()
          },1000)
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
