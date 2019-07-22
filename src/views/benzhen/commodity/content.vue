<template>
  <div class="w-100 app-container">
    <eHeader :sup_this="sup_this" :index_this="index_this"/>
    <div class="w-100 flex flex-row justify-content-center p-5">
      <el-form class="w-75" ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="商品分类" prop="classify_id">
          <treeselect v-model="form.classify_id" noChildrenText="没有更多" :disable-branch-nodes="true" :options="treeselect" placeholder="选择父级" />
        </el-form-item>
        <el-form-item label="商品编号" prop="goods_num">
          <el-input v-model="form.goods_num"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="inventory">
          <el-input v-model="form.inventory" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="money">
          <el-input v-model="form.money" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="商品标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品副标题" prop="vice_title">
          <el-input v-model="form.vice_title"></el-input>
        </el-form-item>
        <el-form-item label="品种" prop="variety">
          <el-input v-model="form.variety"></el-input>
        </el-form-item>
        <el-form-item label="商品参数" prop="parameter">
          <el-input v-model="form.parameter"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="cover_img">
          <el-upload
            accept="image/*"
            :action="actionUpload"
            :file-list="form.cover_img"
            :before-remove="selectFileBtn()"
            :on-success="SuccessFile"
            :on-remove="handleRemove"
            :limit="1"
            class="upload-demo"
            list-type="picture">
            <el-button size="small" type="primary" @click="selectFileBtn('cover_img')">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，数量为1，建议尺寸：336px*336px</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品轮播图" prop="banner_img">
          <el-upload
            accept="image/*"
            :action="actionUpload"
            :file-list="form.banner_img"
            :before-remove="selectFileBtn()"
            :on-success="SuccessFile"
            :on-remove="handleRemove_banner"
            class="upload-demo"
            list-type="picture">
            <el-button size="small" type="primary" @click="selectFileBtn('banner_img')">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,建议尺寸：690px*455px</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品详情富文本" prop="product_details">
          <div ref="editor_product_details" class="editor"/>
        </el-form-item>
        <el-form-item label="	售后服务富文本" prop="after_sale">
          <div ref="editor_after_sale" class="editor"/>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-switch
            v-model="form.is_recommend"
            active-value="1"
            inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="是否上下架">
          <el-switch
            v-model="form.is_putaway"
            active-value="1"
            inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="门店地址" prop="address">
          <el-checkbox-group v-model="form.address">
            <el-checkbox :label="item.address_id" name="address" v-for="(item,index) in addressList" :key="index"><span>{{item.address}}</span></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm()">确定</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {goods_value,goods_change} from '@/benzhenApi/common'
  import E from 'wangeditor'
  import Config from '@/config'
  import eHeader from './module/contList/contheader'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {
    name: '',
    components: { eHeader,Treeselect },
    props:{
      index_this: {
        type: Object,
        required: true
      },
      contData: {
        type: Object,
        required: true
      },
    },
    filters:{
      replaceImgUrl(url){
        return url.indexOf(Config.imgUrl)==0?url:(Config.imgUrl+url)
      }
    },
    data() {
      const validator=(rule, value, callback) => {
        if (value<0) {
          callback(new Error('输入数不能少于0'))
        }else{
          callback()
        }
      };
      const validatorLength=(rule, value, callback) => {
        if (value.length<3) {
          callback(new Error('上传图片数量不少于3'))
        }else{
          callback()
        }
      };
      return {
        sup_this: this,
        form: {
          classify_id: '',
          goods_num: '',
          inventory: '',
          money: '',
          title: '',
          vice_title: '',
          cover_img: [],
          banner_img: [],
          product_details: '',
          variety:'',
          parameter:'',
          after_sale:'',
          is_recommend:'1',//（0=>不推荐，1=>推荐）
          is_putaway:'1',//（0=>下架,1=>上架）
          address:[],
        },
        treeselect:[],
        addressList:[],//地址列表,
        selectFileIndex:'',
        actionUpload:Config.ajaxRequest+'/index.php/manage/File/upload_big_file',//上传文件接口,
        rules: {
          classify_id: [
            { required: true, message: '请选择商品分类', trigger: 'change' },
          ],
          goods_num: [
            { required: true, message: '请输入商品编号', trigger: 'blur' },
          ],
//          inventory: [
//            { required: true, message: '请输入库存', trigger: 'blur' },
//            { required: true, validator: validator, trigger: 'blur' },
//          ],
//          money: [
//            { required: true, message: '请输入商品价格', trigger: 'blur' },
//            { required: true, validator: validator, trigger: 'blur' },
//          ],
//          title: [
//            { required: true, message: '请输入商品标题', trigger: 'blur' },
//          ],
//          vice_title: [
//            { required: true, message: '请输入商品副标题', trigger: 'blur' },
//          ],
//          cover_img: [
//            { required: true, message: '请上传封面图', trigger: 'change' },
//          ],
//          banner_img: [
//            { required: true, message: '请上传商品轮播图', trigger: 'change' },
//            { required: true, validator: validatorLength, trigger: 'blur' },
//          ],
          product_details: [
            { required: true, message: '请编辑产品详情富文本', trigger: 'change' },
          ],
//          variety: [
//            { required: true, message: '请输入品种', trigger: 'blur' },
//          ],
          parameter: [
            { required: true, message: '请输入商品参数', trigger: 'blur' },
          ],
//          after_sale: [
//            { required: true, message: '请编辑售后服务富文本', trigger: 'blur' },
//          ],
//          address: [
//            { required: true, message: '请勾选地址', trigger: 'change' },
//          ],
        },
      }
    },
    mounted() {
      var that = this;
      if(that.contData.goods_id){
        this.goodsalue(that.contData)
        if(that.contData.goods_id) that.form.goods_id=that.contData.goods_id
      }else that.goodsalue({});
    },
    watch:{
      contData:function(newVal,oldVal){
        const that=this
        this.goodsalue(that.contData)
        if(that.contData.goods_id) that.form.goods_id=that.contData.goods_id
      },
    },
    methods: {
      filterHandler(value, row, column) {
      },
      //选中的上传图片按钮
      selectFileBtn:function(name){
        const that=this
        that.selectFileIndex=name
        switch (name){
          case 'cover_img':
            let coverArray=that.form['cover_img'];
            if(coverArray.length==1){
              that.$message({
                message: '上传数量已到上限！',
                type: 'warning'
              });
              return;
            }
            break;
          case 'banner_img':
            let bannerArray=that.form['banner_img'];
            if(bannerArray.length==5){
              that.$message({
                message: '上传数量已到上限！',
                type: 'warning'
              });
              return;
            }
            break;
        }
      },
      //删除图片列表
      handleRemove:function (file, fileList) {
        const that=this
        that.form.cover_img=[]
      },
      //删除图片列表
      handleRemove_banner:function (file, fileList) {
        const that=this
        that.form.banner_img=fileList.length==0?[]:fileList
      },
      //图片上传成功
      SuccessFile:function (response, file, fileList) {
        const that=this
        let str=(response.data).split('/')
        that.form[''+that.selectFileIndex+''].push({name: str[str.length-1], url: Config.imgUrl+response.data,baseUrl:response.data})
      },
      //获取详情
      goodsalue(data){
        const that=this;
        goods_value(data).then(res=>{
          that.addressList=res.data.address
          let classify=res.data.classify
          classify.forEach(function(item,index){
            if(item.children){
              item.id=item.classify_id
              item.label=item.classify_name
              item.children.forEach(function(item2,index2){
                item2.id=item2.classify_id
                item2.label=item2.classify_name
              })
            }
          });
          that.treeselect=classify
          if(res.data.goods_info){
            let form=res.data.goods_info
            let coverStr=(form.cover_img).split('/')
            form.cover_img=[
              {name:coverStr[coverStr.length-1],url: form.cover_img,baseUrl:form.cover_img.replace(Config.imgUrl,'')}
            ]
            let bannerArray=[]
            form.banner_img.forEach((item,index)=>{
              let bannerStr=item.split('/')
              bannerArray.push({name:bannerStr[bannerStr.length-1],url: item,baseUrl:item.replace(Config.imgUrl,'')})
              if(index==form.banner_img.length-1) form.banner_img=bannerArray
            })
            form.is_putaway=String(form.is_putaway)
            form.is_recommend=String(form.is_recommend)
            let addressArray=[]
            form.address.forEach((item,index)=>{
              addressArray.push(Number(item))
            })
            form.address=addressArray
            delete form.classify_name
            delete form.parent_classify_id
            delete form.parent_classify_name
            that.form=form
            that.creatEditor_productDetails(form.product_details)
            that.creatEditor_afterSale(form.after_sale)
          }else{
            that.creatEditor_productDetails()
            that.creatEditor_afterSale()
          }
        })
      },
      //创建富文本
      creatEditor_productDetails(htmlTxt,index){
        var editor = new E(this.$refs.editor_product_details)
//        editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
        // 不可修改
//        editor.customConfig.uploadImgHeaders = this.headers
        // 自定义文件名，不可修改，修改后会上传失败
        editor.customConfig.uploadFileName = 'file'
        // 上传到哪儿，按需选择
        editor.customConfig.uploadImgServer = this.actionUpload // 上传图片到服务器
        editor.customConfig.uploadImgHooks = {
          customInsert: function (insertImg, result, editor) {
            var url = Config.ajaxRequest+result.data
            insertImg(url)
          }
        }
        editor.customConfig.onchange = (html) => {
          this.form.product_details = html
        }
        editor.create();
        if(htmlTxt){
          editor.txt.html(htmlTxt)
        }else{
          editor.txt.html('');
        }
      },
      //创建售后服务富文本
      creatEditor_afterSale(htmlTxt,index){
        var editor = new E(this.$refs.editor_after_sale)
//        editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
//        // 不可修改
//        editor.customConfig.uploadImgHeaders = this.headers
        // 自定义文件名，不可修改，修改后会上传失败
        editor.customConfig.uploadFileName = 'file'
        // 上传到哪儿，按需选择
        editor.customConfig.uploadImgServer = this.actionUpload // 上传图片到服务器
        editor.customConfig.uploadImgHooks = {
          customInsert: function (insertImg, result, editor) {
            var url = Config.ajaxRequest+result.data
            insertImg(url)
          }
        }
        editor.customConfig.onchange = (html) => {
          this.form.after_sale = html
        }
        editor.create();
        if(htmlTxt){
          editor.txt.html(htmlTxt)
        }else{
          editor.txt.html('');
        }
      },
      //取消
      cancel(){
        var that=this
        that.$refs.form.resetFields()
        that.addressList=[]
        that.form={
          classify_id: '',
          goods_num: '',
          inventory: '',
          money: '',
          title: '',
          vice_title: '',
          cover_img: [],
          banner_img: [],
          product_details: '',
          variety:'',
          parameter:'',
          after_sale:'',
          is_recommend:'1',//（0=>不推荐，1=>推荐）
          is_putaway:'1',//（0=>下架,1=>上架）
          address:[],
        }
        that.index_this.switchbtn({
          component:'indexList'
        })
      },
      //确定
      confirm(){
        const that=this
        that.$refs['form'].validate((valid) => {
          if (valid) {
              that.doAdd()
          } else {
            return false
          }
        })
      },
      doAdd(){
        const that=this
        let form=that.form
        form.cover_img.forEach(function (item,index) {
          form.cover_img=item.baseUrl
        })
        let str='';
        form.banner_img.forEach(function (item,index) {
          str=str==''?item.baseUrl:''+str+','+item.baseUrl+''
        })
        form.banner_img=str;
        let addressStr='';
        form.address.forEach(function (item,index) {
          addressStr=addressStr==''?item:''+addressStr+'|'+item+''
        })
        form.address=addressStr
        goods_change(form).then(res=>{
          that.$message({
            message: '成功',
            type: 'success'
          });
          that.cancel()
          that.index_this.switchbtn({
            component:'indexList',
            data:{
              addStatus:that.contData.addStatus
            }
          })
        })
      },
      doClose(id){
        this.$refs[id][0].doClose()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
