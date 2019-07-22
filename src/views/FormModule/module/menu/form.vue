<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增菜单' : '编辑菜单'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="父级" prop="parent_id">
        <treeselect v-model="form.parent_id" :options="parents" style="width: 370px;" placeholder="选择父级" />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="图标名称" prop="icon">
        <el-select v-model="form.icon" placeholder="请选择图标名称" style="width: 370px;">
          <el-option :label="item.icon" :value="item.icon" v-for="(item,index) in icon_list" :key="index">
            <i :class=item.icon></i>
            <span>{{ item.icon }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="URL" prop="path">
        <el-input v-model="form.path" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="组件" prop="component">
        <el-select v-model="form.component" placeholder="请选择组件" style="width: 370px;">
          <el-option :label="item.component" :value="item.id" v-for="(item,index) in component_list" :key="index"></el-option>
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
import { component_list,menu_list,menu_add,menu_edit } from '@/api/FormModule'
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
        name: '',
        parent_id:'',
        icon:'',
        path:'',
        component:'',
      },
      parents:[],
      component_list:[],
      icon_list:[
        {icon:'el-icon-setting'},
        {icon:'el-icon-user-solid'},
        {icon:'el-icon-user'},
        {icon:'el-icon-copy-document'},
        {icon:'el-icon-chat-dot-round'},
        {icon:'el-icon-bank-card'},
        {icon:'el-icon-folder-add '},
        {icon:'el-icon-set-up'},
        {icon:'el-icon-map-location'},
        {icon:'el-icon-folder-opened'},
        {icon:'el-icon-more-outline'},
        {icon:'el-icon-delete'},
        {icon:'el-icon-guide'},
        {icon:'el-icon-wallet'},
        {icon:'el-icon-shopping-cart-full'},
        {icon:'el-icon-picture-outline'},
      ],
      rules: {
        parent_id: [
          { required: true, message: '请选择父级', trigger: 'change' }
        ],
        name: [
          { required: true, message: '菜单名称', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请选择图标名称', trigger: 'change' }
        ],
        path: [
          { required: true, message: '请输入URL', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请选择组件', trigger: 'change' }
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
      menu_add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.menuList()
      }).catch(err => {
        this.loading = false
//        console.log(err.response.data.message)
      })
    },
    doEdit() {
      menu_edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.menuList()
      }).catch(err => {
        this.loading = false
//        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        name: '',
        parent_id:'',
        icon:'',
        path:'',
        component:'',
      }
    },
    parentList(data){//父级列表
      const that=this
      return new Promise(function (resolve,reject) {
        menu_list().then(res=>{
          that.form.parent_id=data?data.id:res.data[0].id
          that.parents=res.data;
          resolve()
        })
      });
    },
    componentList(data){//组件列表
      let that=this
      component_list(data).then(res => {
        that.component_list=res.data
      });
    },
  }
}
</script>

<style scoped>

</style>
