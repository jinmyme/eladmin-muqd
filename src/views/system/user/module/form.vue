<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增用户' : '编辑用户'" append-to-body width="570px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"/>
      </el-form-item>
      <el-form-item label="用户头像">
        <el-upload
          :action="UploadFile"
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleAvatarChange"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-bottom: 0px;" label="角色">
        <el-select v-model="form.role_id" style="width: 450px;" placeholder="请选择">
          <el-option
            v-for="(item, index) in roles"
            :key="item.rolename + index"
            :label="item.rolename"
            :value="item.role_id"/>
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

import { add, edit,roleList } from '@/api/user'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Config from '@/config'
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
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!this.isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      dialog: false,
      loading: false,
      form: {
        admin_id:'',
        username: '',
        password: '',
        imageUrl: '',
        headpic:{},
        role_id: '',
      },
      imgUrl:Config.imgUrl,
      roleIds: [],
      roles: [],
      depts: [],
      deptId: null,
      jobId: null,
      jobs: [],
      style: 'width: 184px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      UploadFile:Config.UploadFile,
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
      if (this.imageUrl === '') {
        this.$message({
          message: '请上传头像',
          type: 'warning'
        })
      }else if (this.form.role_id === '') {
        this.$message({
          message: '角色不能为空',
          type: 'warning'
        })
      } else {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.isAdd) {
              this.doAdd()
            } else this.doEdit()
          } else {
            return false
          }
        })
      }
    },
    doAdd() {
      var that=this;
      add({
        headpic:that.form.headpic,
        username:that.form.username,
        password:that.form.password,
        role_id:that.form.role_id
      }).then(res => {
        that.loading = true
        that.form.roles = []
        that.resetForm()
        that.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        that.loading = false
        that.sup_this.userList()
      }).catch(err => {
        that.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      var that=this
      edit({
        admin_id:that.form.admin_id,
        headpic:that.form.headpic,
        username:that.form.username,
        password:that.form.password,
        role_id:that.form.role_id
      }).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.userList()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.deptId = null
      this.jobId = null
      this.roleIds = []
      this.form ={
        username: '',
        password: '',
        imageUrl: '',
        headpic:{},
        role_id: '',
      }
    },
    getRoles() {
      var that=this
      roleList().then(res => {
        that.roles = res.data
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    //上传头像预览
    handleAvatarChange(file,fileList) {
//      this.form.imageUrl = URL.createObjectURL(file.raw);
//      this.form.headpic = file;
    },
    //上传头像成功
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
      this.form.headpic = res.data;
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
