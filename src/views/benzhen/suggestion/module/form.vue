<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '查看'" width="800px">
    <el-form ref="form" :model="form" size="small" label-width="80px">
      <el-form-item label="会员id" prop="suggest_id">
        <el-input v-model="form.suggest_id" style="width: 100%;" readonly="readonly"/>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username" style="width: 100%;" readonly="readonly"/>
      </el-form-item>
      <el-form-item label="联系电话" prop="iphone">
        <el-input v-model="form.iphone" style="width: 100%;" readonly="readonly"/>
      </el-form-item>
      <el-form-item label="投诉类型" prop="suggest_type">
        <el-input v-model="form.suggest_type" style="width: 100%;" readonly="readonly"/>
      </el-form-item>
      <el-form-item label="上传图片" prop="suggest_img" v-if="form.suggest_img.length>0">
        <el-row :gutter="20">
          <el-col :span="4" v-for="(item,index) in form.suggest_img" :key="index">
            <div class="flex flex-row flex-warp">
              <el-popover
                placement="top-start"
                title=""
                width="500"
                trigger="hover">
                <el-image
                  :src="item"
                  fit="fill"></el-image>
                <el-image
                  slot="reference"
                  style="width: 100px; height: 100px;border: 1px solid #666666;border-radius: 5px;overflow: hidden"
                  :src="item"
                  fit="fill"></el-image>
              </el-popover>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content" style="width: 100%;" readonly="readonly"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="cancel">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
        suggest_id:'',
        username:'',
        iphone:'',
        suggest_type:'',
        content:'',
        suggest_img:[],
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form={
        suggest_id:'',
        username:'',
        iphone:'',
        suggest_type:'',
        content:'',
        suggest_img:[],
      }
    },
  }
}
</script>

<style scoped>

</style>
