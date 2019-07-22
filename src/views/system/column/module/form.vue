<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增栏目' : '编辑栏目'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="栏目名称" prop="column_name">
        <el-input v-model="form.column_name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="父级" prop="parent_id">
        <treeselect v-model="form.parent_id" :options="parents" style="width: 370px;" placeholder="选择父级" />
      </el-form-item>
      <el-form-item label="栏目类型" prop="column_type">
        <el-select v-model="form.column_type" placeholder="请选择栏目类型" style="width: 370px;">
          <el-option :label="item.type_name" :value="item.type_id" v-for="(item,index) in type_list" :key="index"></el-option>
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
import { columnLook,columnEdit } from '@/api/column'
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
      form: {
        column_name: '',
        parent_id:'',
        column_type:'',
      },
      parents:[],
      type_list:[],
      rules: {
        column_name: [
          { required: true, message: '栏目名称', trigger: 'blur' }
        ],
        parent_id: [
          { required: true, message: '请选择父级', trigger: 'change' }
        ],
        column_type: [
          { required: true, message: '请选择栏目类型', trigger: 'change' }
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
      columnEdit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        console.log(this.sup_this)
        this.sup_this.columnList()
      }).catch(err => {
        this.loading = false
//        console.log(err.response.data.message)
      })
    },
    doEdit() {
      columnEdit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.columnList()
      }).catch(err => {
        this.loading = false
//        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        column_name: '',
        parent_id:'',
        column_type:'',
      }
    },
    columnLook(data){//查看栏目
      return new Promise((resolve, reject) => {
        columnLook(data).then(res => {
          let list = res.data.parents
          this.form.parent_id = list[0].id
          this.parents = list
          this.type_list = res.data.type_list
          resolve(res);
        });
      })
    },
  }
}
</script>

<style scoped>

</style>
