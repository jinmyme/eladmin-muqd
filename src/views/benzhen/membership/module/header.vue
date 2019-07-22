<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.nickname" clearable placeholder="输入关键词搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.industry_id" clearable placeholder="从事行业" class="filter-item" style="width: 130px" @change="toQuery">
      <el-option v-for="(item,index) in query.industryList" :key="item.industry_type_id" :label="item.industry_name" :value="item.industry_type_id"/>
    </el-select>
    <el-select v-model="query.admin_id" clearable placeholder="归属" class="filter-item" style="width: 130px" @change="toQuery">
      <el-option v-for="(item,index) in query.adminList" :key="item.admin_id" :label="item.username" :value="item.admin_id"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-refresh-left" @click="resetQuery">重置</el-button>
    <!-- 新增 -->
    <!--<div style="display: inline-block;margin: 0px 2px;">-->
      <!--<el-button-->
        <!--class="filter-item"-->
        <!--size="mini"-->
        <!--type="primary"-->
        <!--icon="el-icon-plus"-->
        <!--@click="add">新增</el-button>-->
      <!--<eForm ref="form" :is-add="true" :sup_this="sup_this"/>-->
    <!--</div>-->
    <!-- 导出 -->
    <el-button
    :loading="downloadLoading"
    size="mini"
    class="filter-item"
    type="primary"
    icon="el-icon-download"
    @click="download">导出</el-button>
  </div>
</template>

<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      downloadLoading: false,
    }
  },
  methods: {
    toQuery() {
      this.sup_this.memberList('search')
    },
    resetQuery() {
      const that=this
      that.query.nickname=''
      that.query.industry_id=''
      that.query.admin_id=''
      that.sup_this.current_page=1
      that.sup_this.memberList()
    },
    add() {
      this.$refs.form.dialog = true
    },
    // 导出
    download() {
      const that=this
      window.open(that.sup_this.downloadExcel)
//      this.downloadLoading = true
//      import('@/vendor/Export2Excel').then(excel => {
//        const tHeader = ['会员id', '昵称','头像', '电话号码', '姓名', '性别', '从事行业', '公司','注册时间','积分','归属']
//        const filterVal = ['user_id', 'nickname','headpic', 'mobile', 'name', 'genderTxt', 'industry', 'company_name','register_time','score','admin']
//        const data = this.formatJson(filterVal, this.sup_this.data)
//        excel.export_json_to_excel({
//          header: tHeader,
//          data,
//          filename: '会员管理'
//        })
//        this.downloadLoading = false
//      })
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime' || j === 'lastPasswordResetTime') {
          return parseTime(v[j])
        } else if (j === 'enabled') {
          return parseTime(v[j]) ? '启用' : '禁用'
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
