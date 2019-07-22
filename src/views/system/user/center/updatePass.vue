<template>
  <div style="display: inline-block">
    <el-dialog :visible.sync="dialog" :title="title" append-to-body width="500px" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" auto-complete="on" style="width: 370px;" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row :gutter="20">
            <el-col :span="16"><el-input v-model="form.code" auto-complete="on" style="width: 100%;"/></el-col>
            <el-col :span="4"><el-button type="primary" @click="sendCode">{{sendCode_txt}}</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="text" auto-complete="on" style="width: 370px;"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import { ChangeNewPwd,send_validate_code_backup } from '@/benzhenApi/common'
//import ElRow from "_element-ui@2.8.2@element-ui/packages/row/src/row";
//import ElCol from "_element-ui@2.8.2@element-ui/packages/col/src/col";
export default {
//  components: {
//    ElCol,
//    ElRow},
  props: {
    mobile: {
      type: String,
      required: true
    },
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value) {
        validPass(value).then(res => {
          if (res.status === 200) {
            callback()
          } else {
            callback(new Error('旧密码错误，请检查'))
          }
        })
      } else {
        callback(new Error('请输入旧密码'))
      }
    }
    const confirmPass = (rule, value, callback) => {
      if (this.form.newPass !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false, dialog: false, title: '修改密码',
      form: { mobile: this.mobile, code: '', password: '' },
      sendCode_txt:'发送验证码',
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    //发送验证码
    sendCode(){
      const that=this
      send_validate_code_backup({
        mobile:that.mobile,
        type:4,
      }).then(res=>{
        that.$notify({
          title: '发送成功',
          type: 'success',
          duration: 1500
        });
        let time=60
        let sendTime=setInterval(()=>{
          if(time==0){
            that.sendCode_txt='发送验证码'
            clearInterval(sendTime)
          }else{
            that.sendCode_txt=time+'s'
            time--
          }
        },1000)
      })
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          ChangeNewPwd(this.form).then(res => {
            this.resetForm()
            this.$notify({
              title: '密码修改成功，请重新登录',
              type: 'success',
              duration: 1500
            })
            setTimeout(() => {
              store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }, 1500)
          }).catch(err => {
            this.loading = false
//            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { mobile: this.mobile, code: '', password: '' }
    }
  }
}
</script>

<style scoped>

</style>
