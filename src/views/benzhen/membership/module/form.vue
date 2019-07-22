<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '修改'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="积分" prop="score">
        <el-input type="number" min="0" v-model="form.score" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="归属" prop="admin_id">
        <el-select v-model="form.admin_id" placeholder="归属" style="width: 370px">
          <el-option v-for="(item,index) in query.adminList" :key="item.admin_id" :label="item.username" :value="item.admin_id"/>
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
import {member_update} from '@/benzhenApi/common'
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
    query: {
      type: Object,
      required: true
    },
  },
  data() {
    const validator=(rule, value, callback) => {
      if (value<0) {
        callback(new Error('输入数不能少于0'))
      }else{
        callback()
      }
    };
    return {
      loading: false, dialog: false, depts: [],
      form: {
        user_id:'',
        admin_id:'',
        score:'',
      },
      rules: {
        score: [
          { required: true, message: '请输入积分', trigger: 'blur' },
          { required: true, validator: validator, trigger: 'blur' },
        ],
        admin_id: [
          { required: true, message: '请选择归属', trigger: 'change' }
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
          this.doEdit()
        }
      })
    },
    doEdit() {
      member_update(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.memberList()
      }).catch(err => {
        this.loading = false
//        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form={
        user_id:'',
        admin_id:'',
        score:'',
      }
    },
  }
}
</script>

<style scoped>

</style>
