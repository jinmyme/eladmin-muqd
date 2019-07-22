<template>
  <div class="w-100">
    <div class="w-100" v-if="mainStatus==1">
      <el-row class="p-2">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in tableHeader"
            :key="index"
            :prop="item.field_name"
            :label="item.input_name">
            <template slot-scope="scope">
              <span v-if="item.field_name!='button' && item.input_type!=7 && item.input_type!=10">{{scope.row[item.field_name]}}</span>
              <div class="" v-if="item.input_type==7">
                <img
                  class="w-25"
                  style="display: block"
                  v-for="(itemImg,indexImg) in (String(scope.row[item.field_name]).split(','))"
                  :src="itemImg | replaceImgUrl"
                  v-if="itemImg!=''"/>
              </div>
              <div class="" v-if="item.input_type==10">
                <el-switch
                  :value="scope.row[item.field_name]=='1'?true:false"
                  v-if="item.input_type==10"></el-switch>
              </div>
              <div class="w-100" v-if="item.field_name=='button'">
                <div
                  class="el-autocomplete"
                  style="margin-right: 5px"
                  v-for="(btn,btnIndex) in scope.row['button']"
                  :key="btnIndex">
                  <el-button
                    v-if="btn.type!='danger'"
                    size="mini"
                    :type="btn.type"
                    @click="selectBtnType(btn.data)">{{btn.name}}
                  </el-button>
                  <el-popover
                    v-if="btn.type=='danger'"
                    :ref="scope.row.id"
                    placement="top"
                    width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="doClose(scope.row.id)">取消</el-button>
                      <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.type_id,btn.data.content_id,scope.row.id)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                  </el-popover>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <div class="flex flex-row justify-content-center my-5">
        <el-pagination
          background
          layout="total,prev, pager, next,jumper"
          @current-change="formList"
          :current-page.sync="current_page"
          :page-size="per_page"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="w-100 flex flex-row justify-content-center p-5" v-else-if="mainStatus==2">
      <el-form :model="formObj" class="w-75" ref="form" label-width="160px">
        <el-form-item
          v-for="(item,index) in formDiv"
          :key="index"
          :label="item.input_name"
          :prop="index + '.line'"
          :rules="item.input_verify | enptyInput(enptyVerify,lay_verify)">
          <!--1=>输入框,2=>文本框,3=>富文本编辑器,4=>多选框,5=>单选框,6=>下拉框,7=>上传口,8=>日期时间框,9=>多文件上传,10=>开关）-->
          <el-input v-model="form[index].line" v-if="item.input_type==1"></el-input>
          <el-input type="textarea" v-model="form[index].line" v-if="item.input_type==2"></el-input>
          <div ref="editor" class="editor" v-if="item.input_type==3"/>
          <el-checkbox-group v-model="form[index].line" v-if="item.input_type==4">
            <el-checkbox
              :label="checkboxItem.input_name"
              name="type"
              v-for="(checkboxItem,checkboxIndex) in item.children"
              :key="'checkbox'+checkboxIndex"></el-checkbox>
          </el-checkbox-group>
          <el-radio-group v-model="form[index].line" v-if="item.input_type==5">
            <el-radio :label="radioItem.input_name" v-for="(radioItem,radioIndex) in item.children" :key="'radio'+radioIndex"></el-radio>
          </el-radio-group>
          <el-select v-model="form[index].line" v-if="item.input_type==6">
            <el-option :label="selectItem.input_name" :value="selectItem.input_default" v-for="(selectItem,selectIndex) in item.children" :key="'select'+selectIndex"></el-option>
          </el-select>
          <el-col :span="6" v-if="item.input_type==8">
            <el-date-picker type="date" placeholder="选择日期" v-model="form[index].line" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-upload
            v-if="item.input_type==7"
            class="upload-demo"
            accept="image/*"
            :action="actionUpload"
            :file-list="form[index].line"
            :before-remove="selectFileBtn(index)"
            :on-success="SuccessFile"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            list-type="picture">
            <el-button size="small" type="primary" @click="selectFileBtn(index)">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
          <el-switch
            v-model="form[index].line"
            v-if="item.input_type==10"
            active-value="1"
            inactive-value="0"></el-switch>
          <span v-if="item.aux_text" style="color:#909399;">/*{{item.aux_text}}*/</span>
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
  import {formHeader,add_field,columnAddForm,columnEditForm,columnDelForm} from '@/api/column'
  import E from 'wangeditor'
  import Config from '@/config'
  import Verification from '@/mixins/Verification'
  export default {
    name: '',
    props:{
      sup_this: {
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
        if(url && url!='undefined'){
          return url.indexOf(Config.imgUrl)==0?url:(Config.imgUrl+url)
        }
      }
    },
    mixins:[
      Verification
    ],
    data() {
      return {
        delLoading: false,
        loading: true,
        column_id:'',
        content_id:'',
        mainStatus:1,//1:主页，2：详情页
        tableHeader: [],
        tableData: [],
        total:0,//总条数
        per_page:0,//每页显示的条数
        last_page:0,//总页数
        current_page:1,//当前页数,
        dialogFormVisible: false,
        formObj:{},
        form:[],
        formDiv:[],
        formLabelWidth: '120px',
        type:[],
        actionUpload:Config.ajaxRequest+'/index.php/manage/File/upload_big_file',//上传文件接口,
        selectFileIndex:'',//选中上传按钮的下标
      }
    },
    mounted() {
      var that = this;
      that.formList();
    },
    watch:{
      contData:function(newVal,oldVal){
        this.formList()
        this.mainStatus=1;
      },
    },
    methods: {
      filterHandler(value, row, column) {
        const that = this;
        const property = column['property'];
        return row[property] === value;
      },
      //选中的上传图片按钮
      selectFileBtn:function(index){
        this.selectFileIndex=index
      },
      //删除图片列表
      handleRemove:function (file, fileList) {
        const index=this.selectFileIndex;
        const arrayList=[]
        fileList.forEach(function (item,index) {
          arrayList.push({
            name:item.name,
            url:item.url,
            baseUrl:item.url
          })
        })
        this.form[index].line=arrayList
      },
      //图片上传前image格式验证
      beforeAvatarUpload(file) {
//        console.log(file)
//        const isJPG = file.type === 'image/jpeg';
//        const isPNG = file.type === 'image/png';
//        if (!isJPG) {
//          this.$message.error('上传头像图片格式!');
//        }
//        if (!isPNG) {
//          this.$message.error('上传头像图片格式!');
//        }
//        return isJPG && isPNG;
      },
      //图片上传成功
      SuccessFile:function (response, file, fileList) {
        let that=this
        let str=String(response.data).split('/')
        that.form[that.selectFileIndex].line.push({name: str[str.length-1], url: Config.imgUrl+response.data,baseUrl:response.data})
      },
      //新增
      addCont:function(newVal,oldVal){
        this.add_field({
          column_id: this.contData.column_id,
          content_id: '',
        })
      },
      //搜索
      searchFormList(){
        var that=this
        formHeader({
          column_id: that.contData.column_id,
          title: that.sup_this.query.value,
        }).then(res => {
          that.tableHeader = res.data.input_list
          const tableData = res.data.table_info.data
          that.tableData = tableData
          that.total=res.data.table_info.totalRows
          that.per_page=res.data.table_info.listRows
          that.loading=false
        })
      },
      //获取分页数据
      formList(){
        var that=this
        formHeader({
          column_id: that.contData.column_id,
          page: that.current_page
        }).then(res => {
          that.tableHeader = res.data.input_list
          const tableData = res.data.table_info.data
          that.tableData = tableData
          that.total=res.data.table_info.totalRows
          that.per_page=res.data.table_info.listRows
          that.loading=false
        })
      },
      //根据不同按钮类型调用具体方法
      selectBtnType(data){
        var that=this
        that.add_field(data)
      },
      //获取详情
      add_field(data){
        var that=this;
        that.content_id=data.content_id
        add_field({
          column_id:data.column_id,
          content_id:data.content_id,
        }).then(res=>{
          var list=res.data.inputs;
          var input_type=1;
          that.formDiv=list;
          list.forEach(function(item,index){
            if(item.input_type==4){
              that.form.push({line:item.input_default?item.input_default:[],field_name:item.field_name,input_default:item.input_default,input_type:item.input_type});
            }else if(item.input_type==10) {
              if(item.input_default && item.input_default==1) {
                that.form.push({line: '1',field_name:item.field_name,input_default:item.input_default,input_type:item.input_type});
              }else{
                that.form.push({line: '0',field_name:item.field_name,input_default:item.input_default,input_type:item.input_type});
              }
            }else if(item.input_type==7){
              if(item.input_default){
                const str=String(item.input_default).split(',')
                const line=[]
                str.forEach(function(item,index){
                  if(item!=''){
                    const name=String(item).split('/')
                    line.push({
                      name:name[name.length-1],
                      url:Config.imgUrl+item,
                      baseUrl:item,
                    })
                  }
                })
                that.form.push({line:line,field_name:item.field_name,input_default:item.input_default,input_type:item.input_type});
              }else{
                that.form.push({line:[],field_name:item.field_name,input_default:item.input_default,input_type:item.input_type});
              }
            }else if(item.input_type==3){
              that.form.push({line:item.input_default,field_name:item.field_name,input_default:item.input_default,input_type:item.input_type});
              setTimeout(function(){
                that.creatEditor(item.input_default,index)
              },1000)
            }else{
              that.form.push({line:item.input_default,field_name:item.field_name,input_default:item.input_default,input_type:item.input_type});
            }
          })
//          if(input_type==3){
//            setTimeout(function(){
//              that.creatEditor()
//            },1000)
//          }
          that.form.map(function(e,item) {
            that.formObj[item] = e;
          })
          that.mainStatus=2;
          that.lay_verify=res.data.lay_verify;//验证信息组
        })
      },
      //创建富文本
      creatEditor(htmlTxt,index){
        const that=this
        var editor = new E(this.$refs.editor)
//        editor.customConfig.uploadImgShowBase64 = false // 使用 base64 保存图片
        // 不可修改
//        editor.customConfig.uploadImgHeaders = this.headers
        // 自定义文件名，不可修改，修改后会上传失败
        editor.customConfig.uploadFileName = 'file'
        // 上传到哪儿，按需选择
        editor.customConfig.uploadImgServer = this.actionUpload // 上传图片到服务器
        editor.customConfig.uploadImgHooks = {
          customInsert: function (insertImg, result, editor) {
//            console.log(result)
            var url = Config.ajaxRequest+result.data
            insertImg(url)
          }
        }
        editor.customConfig.onchange = (html) => {
          this.form[index].line = html
        }
        editor.create();
        if(htmlTxt) editor.txt.html(htmlTxt)
      },
      //删除
      subDelete(id,content_id,closeId) {
        var that=this
        columnDelForm({
          type_id:id,
          content_id:content_id
        }).then(res=>{
          that.doClose(closeId)
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
          that.formList()
        })
      },
      //取消
      cancel(){
        var that=this
        that.$refs.form.resetFields()
        that.form=[]
        that.mainStatus=1;
      },
      //确定
      confirm(){
        let that=this
        let form=that.form
        var data={}
        if(that.content_id==''){
          data['column_id']=this.contData.column_id
          form.forEach(function(item,index){
            if(item.input_type==7){
              if(that.form[index].line.length>0){
                let str=''
                that.form[index].line.forEach(function(item,index){
                  str=str==''?item.baseUrl:''+str+','+item.baseUrl+''
                })
                data[''+item.field_name+'']=str
              }
            }else {
              data['' + item.field_name + ''] = item.line
            }
          })
          that.$refs['form'].validate((valid) => {
            if (valid) {
              columnAddForm(data).then(res=>{
                that.formList();
                that.cancel();
              })
            } else {
              return false;
            }
          });
        }else{
          data['column_id']=this.contData.column_id
          data['content_id']=this.content_id
          form.forEach(function(item,index){
            if(item.input_type==7){
              if(that.form[index].line.length>0){
                let str=''
                that.form[index].line.forEach(function(item,index){
                  str=str==''?item.baseUrl:''+str+','+item.baseUrl+''
                })
                data[''+item.field_name+'']=str
              }
            }else {
              data['' + item.field_name + ''] = item.line
            }
          })
          columnEditForm(data).then(res=>{
            that.formList();
            that.cancel();
          })
        }
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
