(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f851","chunk-dab0"],{"2MB7":function(e,t,n){"use strict";n.d(t,"h",function(){return i}),n.d(t,"e",function(){return r}),n.d(t,"f",function(){return a}),n.d(t,"g",function(){return c}),n.d(t,"d",function(){return l}),n.d(t,"a",function(){return s}),n.d(t,"c",function(){return u}),n.d(t,"b",function(){return d});var o=n("t3Un");function i(e){return Object(o.a)({url:"/index.php/manage/menu/menu_list",method:"post",data:e})}function r(e){return Object(o.a)({url:"/index.php/manage/menu/menu_add",method:"post",data:e})}function a(e){return Object(o.a)({url:"/index.php/manage/menu/menu_del",method:"post",data:e})}function c(e){return Object(o.a)({url:"/index.php/manage/menu/menu_edit",method:"post",data:e})}function l(e){return Object(o.a)({url:"/index.php/manage/menu/component_list",method:"post",data:e})}function s(e){return Object(o.a)({url:"/index.php/manage/menu/component_add",method:"post",data:e})}function u(e){return Object(o.a)({url:"/index.php/manage/menu/component_edit",method:"post",data:e})}function d(e){return Object(o.a)({url:"/index.php/manage/menu/component_del",method:"post",data:e})}},"41Be":function(e,t,n){"use strict";n.d(t,"a",function(){return i});var o=n("Q2AE");function i(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(o.a.getters&&o.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},Rg1o:function(e,t,n){},hdn3:function(e,t,n){"use strict";n.r(t);var o=n("41Be"),i={components:{eForm:n("vllV").default},props:{sup_this:{type:Object,required:!0},query:{type:Object,required:!0}},data:function(){return{}},methods:{checkPermission:o.a,toQuery:function(){this.$parent.init()},add:function(){this.$refs.form.dialog=!0,this.$refs.form.componentList(),this.$refs.form.parentList()}}},r=n("KHd+"),a=Object(r.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"head-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入部门名称搜索"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.toQuery(t):null}},model:{value:e.query.value,callback:function(t){e.$set(e.query,"value",t)},expression:"query.value"}}),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:e.toQuery}},[e._v("搜索")]),e._v(" "),n("div",{staticStyle:{display:"inline-block",margin:"0px 2px"}},[n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增")]),e._v(" "),n("eForm",{ref:"form",attrs:{sup_this:e.sup_this,"is-add":!0}})],1)],1)},[],!1,null,null,null);a.options.__file="header.vue";t.default=a.exports},u4wE:function(e,t,n){"use strict";var o=n("Rg1o");n.n(o).a},vllV:function(e,t,n){"use strict";n.r(t);var o=n("2MB7"),i=n("cCY5"),r=n.n(i),a=(n("VCwm"),{components:{Treeselect:r.a},props:{isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{loading:!1,dialog:!1,depts:[],form:{name:"",parent_id:"",icon:"",path:"",component:""},parents:[],component_list:[],icon_list:[{icon:"el-icon-setting"},{icon:"el-icon-user-solid"},{icon:"el-icon-user"},{icon:"el-icon-copy-document"},{icon:"el-icon-chat-dot-round"},{icon:"el-icon-bank-card"},{icon:"el-icon-folder-add "},{icon:"el-icon-set-up"},{icon:"el-icon-map-location"},{icon:"el-icon-folder-opened"},{icon:"el-icon-more-outline"},{icon:"el-icon-delete"},{icon:"el-icon-guide"},{icon:"el-icon-wallet"},{icon:"el-icon-shopping-cart-full"},{icon:"el-icon-picture-outline"}],rules:{parent_id:[{required:!0,message:"请选择父级",trigger:"change"}],name:[{required:!0,message:"菜单名称",trigger:"blur"}],icon:[{required:!0,message:"请选择图标名称",trigger:"change"}],path:[{required:!0,message:"请输入URL",trigger:"blur"}],component:[{required:!0,message:"请选择组件",trigger:"change"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){t&&(e.loading=!0,e.isAdd?e.doAdd():e.doEdit())})},doAdd:function(){var e=this;Object(o.e)(this.form).then(function(t){e.resetForm(),e.$notify({title:"添加成功",type:"success",duration:2500}),e.loading=!1,e.sup_this.menuList()}).catch(function(t){e.loading=!1})},doEdit:function(){var e=this;Object(o.g)(this.form).then(function(t){e.resetForm(),e.$notify({title:"修改成功",type:"success",duration:2500}),e.loading=!1,e.sup_this.menuList()}).catch(function(t){e.loading=!1})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={name:"",parent_id:"",icon:"",path:"",component:""}},parentList:function(e){var t=this;Object(o.h)().then(function(n){t.form.parent_id=e?e.id:n.data[0].id,t.parents=n.data})},componentList:function(e){var t=this;Object(o.d)(e).then(function(e){t.component_list=e.data})}}}),c=(n("u4wE"),n("KHd+")),l=Object(c.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{"append-to-body":!0,visible:e.dialog,title:e.isAdd?"新增菜单":"编辑菜单",width:"500px"},on:{"update:visible":function(t){e.dialog=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"80px"}},[n("el-form-item",{attrs:{label:"父级",prop:"parent_id"}},[n("treeselect",{staticStyle:{width:"370px"},attrs:{options:e.parents,placeholder:"选择父级"},model:{value:e.form.parent_id,callback:function(t){e.$set(e.form,"parent_id",t)},expression:"form.parent_id"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"菜单名称",prop:"name"}},[n("el-input",{staticStyle:{width:"370px"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"图标名称",prop:"icon"}},[n("el-select",{staticStyle:{width:"370px"},attrs:{placeholder:"请选择图标名称"},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}},e._l(e.icon_list,function(t,o){return n("el-option",{key:o,attrs:{label:t.icon,value:t.icon}},[n("i",{class:t.icon}),e._v(" "),n("span",[e._v(e._s(t.icon))])])}))],1),e._v(" "),n("el-form-item",{attrs:{label:"URL",prop:"path"}},[n("el-input",{staticStyle:{width:"370px"},model:{value:e.form.path,callback:function(t){e.$set(e.form,"path",t)},expression:"form.path"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"组件",prop:"component"}},[n("el-select",{staticStyle:{width:"370px"},attrs:{placeholder:"请选择组件"},model:{value:e.form.component,callback:function(t){e.$set(e.form,"component",t)},expression:"form.component"}},e._l(e.component_list,function(e,t){return n("el-option",{key:t,attrs:{label:e.component,value:e.id}})}))],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"28e10c21",null);l.options.__file="form.vue";t.default=l.exports}}]);