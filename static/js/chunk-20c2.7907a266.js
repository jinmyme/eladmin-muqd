(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-20c2"],{OdNR:function(t,e,n){"use strict";var o=n("iPRA");n.n(o).a},TbbF:function(t,e,n){"use strict";n.r(e);var o=n("4d7F"),r=n.n(o),i=n("djJf"),a=n("cCY5"),d=n.n(a),u=(n("VCwm"),{components:{Treeselect:d.a},props:{isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{loading:!1,dialog:!1,depts:[],form:{column_name:"",parent_id:"",column_type:""},parents:[],type_list:[],rules:{column_name:[{required:!0,message:"栏目名称",trigger:"blur"}],parent_id:[{required:!0,message:"请选择父级",trigger:"change"}],column_type:[{required:!0,message:"请选择栏目类型",trigger:"change"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var t=this;this.$refs.form.validate(function(e){e&&(t.loading=!0,t.isAdd?t.doAdd():t.doEdit())})},doAdd:function(){var t=this;Object(i.e)(this.form).then(function(e){t.resetForm(),t.$notify({title:"添加成功",type:"success",duration:2500}),t.loading=!1,t.sup_this.columnList()}).catch(function(e){t.loading=!1})},doEdit:function(){var t=this;Object(i.e)(this.form).then(function(e){t.resetForm(),t.$notify({title:"修改成功",type:"success",duration:2500}),t.loading=!1,t.sup_this.columnList()}).catch(function(e){t.loading=!1})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={column_name:"",parent_id:"",column_type:""}},columnLook:function(t){var e=this;return new r.a(function(n,o){Object(i.h)(t).then(function(t){var o=t.data.parents;e.form.parent_id=o[0].id,e.parents=o,e.type_list=t.data.type_list,n(t)})})}}}),l=(n("OdNR"),n("KHd+")),c=Object(l.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{"append-to-body":!0,visible:t.dialog,title:t.isAdd?"新增栏目":"编辑栏目",width:"500px"},on:{"update:visible":function(e){t.dialog=e}}},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,size:"small","label-width":"80px"}},[n("el-form-item",{attrs:{label:"栏目名称",prop:"column_name"}},[n("el-input",{staticStyle:{width:"370px"},model:{value:t.form.column_name,callback:function(e){t.$set(t.form,"column_name",e)},expression:"form.column_name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"父级",prop:"parent_id"}},[n("treeselect",{staticStyle:{width:"370px"},attrs:{options:t.parents,placeholder:"选择父级"},model:{value:t.form.parent_id,callback:function(e){t.$set(t.form,"parent_id",e)},expression:"form.parent_id"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"栏目类型",prop:"column_type"}},[n("el-select",{staticStyle:{width:"370px"},attrs:{placeholder:"请选择栏目类型"},model:{value:t.form.column_type,callback:function(e){t.$set(t.form,"column_type",e)},expression:"form.column_type"}},t._l(t.type_list,function(t,e){return n("el-option",{key:e,attrs:{label:t.type_name,value:t.type_id}})}))],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"text"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)},[],!1,null,"838a7766",null);c.options.__file="form.vue";e.default=c.exports},djJf:function(t,e,n){"use strict";n.d(e,"g",function(){return r}),n.d(e,"h",function(){return i}),n.d(e,"e",function(){return a}),n.d(e,"c",function(){return d}),n.d(e,"i",function(){return u}),n.d(e,"a",function(){return l}),n.d(e,"b",function(){return c}),n.d(e,"f",function(){return s}),n.d(e,"d",function(){return p});var o=n("t3Un");function r(t){return Object(o.a)({url:"/index.php/manage/column/index",method:"post",data:t})}function i(t){return Object(o.a)({url:"/index.php/manage/column/look",method:"post",data:t})}function a(t){return Object(o.a)({url:"/index.php/manage/column/add_edit",method:"post",data:t})}function d(t){return Object(o.a)({url:"index.php/manage/column/delete",method:"post",data:t})}function u(t){return Object(o.a)({url:"/index.php/manage/Content/index",method:"post",data:t})}function l(t){return Object(o.a)({url:"/index.php/manage/Content/add_field",method:"post",data:t})}function c(t){return Object(o.a)({url:"/index.php/manage/Content/add",method:"post",data:t})}function s(t){return Object(o.a)({url:"/index.php/manage/Content/edit",method:"post",data:t})}function p(t){return Object(o.a)({url:"/index.php/manage/Content/delete",method:"post",data:t})}},iPRA:function(t,e,n){}}]);