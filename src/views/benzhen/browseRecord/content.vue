<template>
  <div class="w-100 app-container">
    <div class="head-container">
      <!-- 返回 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-back"
          @click="goBack">返回</el-button>
      </div>
    </div>
    <div class="w-100 flex flex-row justify-content-center p-5">
      <el-form class="w-75" ref="form" :model="form" label-width="160px">
        <el-form-item label="商品分类" prop="classify_name">
          <el-input readonly="readonly" v-model="form.classify_name"></el-input>
        </el-form-item>
        <el-form-item label="商品编号" prop="goods_num">
          <el-input readonly="readonly" v-model="form.goods_num"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="inventory">
          <el-input readonly="readonly" v-model="form.inventory" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="money">
          <el-input readonly="readonly" v-model="form.money" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="商品标题" prop="title">
          <el-input readonly="readonly" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品副标题" prop="vice_title">
          <el-input readonly="readonly" v-model="form.vice_title"></el-input>
        </el-form-item>
        <el-form-item label="品种" prop="variety">
          <el-input readonly="readonly" v-model="form.variety"></el-input>
        </el-form-item>
        <el-form-item label="商品参数" prop="parameter">
          <el-input readonly="readonly" v-model="form.parameter"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="cover_img">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in form.cover_img" :key="index">
              <div class="flex flex-row flex-warp">
                <el-popover
                  placement="top"
                  title=""
                  width="500"
                  trigger="hover">
                  <el-image
                    :src="item.url"
                    fit="fill"></el-image>
                  <el-image
                    slot="reference"
                    style="width: 100px; height: 100px;border: 1px solid #666666;border-radius: 5px;overflow: hidden"
                    :src="item.url"
                    fit="fill"></el-image>
                </el-popover>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="商品轮播图" prop="banner_img">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in form.banner_img" :key="index">
              <div class="flex flex-row flex-warp">
                <el-popover
                  placement="top"
                  title=""
                  width="500"
                  trigger="hover">
                  <el-image
                    :src="item.url"
                    fit="fill"></el-image>
                  <el-image
                    slot="reference"
                    style="width: 100px; height: 100px;border: 1px solid #666666;border-radius: 5px;overflow: hidden"
                    :src="item.url"
                    fit="fill"></el-image>
                </el-popover>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="产品详情富文本" prop="product_details">
          <div ref="editor_product_details" class="editor"/>
        </el-form-item>
        <el-form-item label="	售后服务富文本" prop="after_sale">
          <div ref="editor_after_sale" class="editor"/>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-switch
            disabled
            v-model="form.is_recommend"
            active-value="1"
            inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="是否上下架">
          <el-switch
            disabled
            v-model="form.is_putaway"
            active-value="1"
            inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="门店地址" prop="address">
          <el-checkbox-group v-model="form.address">
            <el-checkbox :label="item.address_id" name="address" v-for="(item,index) in addressList" :key="index"><span>{{item.address}}</span></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {goods_value,goods_change} from '@/benzhenApi/common'
  import E from 'wangeditor'
  import Config from '@/config'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {
    name: '',
    components: { Treeselect },
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
          classify_name: '',
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
        addressList:[],//地址列表,
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
      goBack() {
        const that=this;
        that.index_this.switchbtn({
          component:'indexList'
        })
      },
      //获取详情
      goodsalue(data){
        const that=this;
        goods_value(data).then(res=>{
          that.addressList=res.data.address
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
//            delete form.classify_name
            delete form.parent_classify_id
            delete form.parent_classify_name
            console.log(form)
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
        editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
        // 不可修改
        editor.customConfig.uploadImgHeaders = this.headers
        // 自定义文件名，不可修改，修改后会上传失败
        editor.customConfig.uploadFileName = 'file'
        // 上传到哪儿，按需选择
        editor.customConfig.uploadImgServer = this.imagesUploadApi // 上传图片到服务器
        editor.customConfig.onchange = (html) => {
          this.form.product_details = html
        }
        editor.create();
        if(htmlTxt) editor.txt.html(htmlTxt)
      },
      //创建售后服务富文本
      creatEditor_afterSale(htmlTxt,index){
        var editor = new E(this.$refs.editor_after_sale)
        editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
        // 不可修改
        editor.customConfig.uploadImgHeaders = this.headers
        // 自定义文件名，不可修改，修改后会上传失败
        editor.customConfig.uploadFileName = 'file'
        // 上传到哪儿，按需选择
        editor.customConfig.uploadImgServer = this.imagesUploadApi // 上传图片到服务器
        editor.customConfig.onchange = (html) => {
          this.form.after_sale = html
        }
        editor.create();
        if(htmlTxt) editor.txt.html(htmlTxt)
      },
      //取消
      cancel(){
        var that=this
        that.$refs.form.resetFields()
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
      doClose(id){
        this.$refs[id][0].doClose()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
