<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="分类" prop="classify_name">
        <el-input v-model="form.classify_name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="分类" prop="classify_name">
        <el-input v-model="form.classify_name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="父级" prop="parent_id" v-if="isAdd || !isAdd && form.parent_id!=0 && form.classify_name!=''">
        <treeselect v-model="form.parent_id" noChildrenText="没有更多" :options="parents" style="width: 370px;" placeholder="选择父级" />
      </el-form-item>
      <el-form-item label="banner" prop="classify_img">
        <el-upload
          :action="UploadFile"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="show_classify_img" :src="show_classify_img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="推荐" v-if="form.parent_id!=0">
        <el-switch
          v-model="form.is_recommend"
          active-value="1"
          inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {classify_value,classify_change} from '@/benzhenApi/common'
import Config from '@/config'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
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
      loading: false, dialog: false, depts: [],
      UploadFile:Config.UploadFile,
      show_classify_img:'',
      form: {
        parent_id:'',
        classify_img:'',
        classify_name:'',
        is_recommend:'0',
      },
      parents:[],
      rules: {
        classify_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        parent_id: [
          { required: true, message: '请选择父级', trigger: 'change' }
        ],
        classify_img: [
          { required: true, message: '请上传banner', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        }
      })
    },
    doAdd() {
      if(this.form.parent_id==0) delete this.form.is_recommend
      classify_change(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.classifyList()
      }).catch(err => {
        this.loading = false
//        console.log(err.response.data.message)
      })
    },
    doEdit() {
      classify_change(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.classifyList()
      }).catch(err => {
        this.loading = false
//        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.show_classify_img=''
      this.form={
        parent_id:'',
        classify_img:'',
        classify_name:'',
        is_recommend:'0',
      }
    },
    classifyValue(id){
      const that=this
      return new Promise((resole,reject)=>{
        classify_value(id).then(res=>{
          let list=id?res.data.classify:res.data
          that.parents=[]
          list.forEach((item,index)=>{
            if(!id && index==0) that.form.parent_id=item.classify_id
            that.parents.push({
              id:item.classify_id,
              label:item.classify_name,
              children:[],
            })
          })
          resole(res)
        })
      })
    },
    //上传头像成功
    handleAvatarSuccess(res, file) {
      this.show_classify_img = URL.createObjectURL(file.raw);
      this.form.classify_img = res.data;
    },
    //上传头像限制
    beforeAvatarUpload(file) {
      const isImage = (file.type.split('/'))[0] === 'image';
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (!isImage) {
        this.$message.error('上传头像图片格式错误！');
      }
      if (!isLt6M) {
        this.$message.error('上传头像图片大小不能超过 6MB!');
      }
      return isImage && isLt6M;
    }
  }
}
</script>

<style scoped>

</style>
