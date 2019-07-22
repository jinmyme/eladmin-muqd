<template>
  <el-row class="row-bg" type="flex" justify="center">
    <el-row class="w-75" style="padding: 30px">
      <fieldset class="layui-elem-field">
        <legend>系统信息</legend>
        <div class="layui-field-box">
          <table class="layui-table">
            <tbody>
            <tr>
              <th>服务器地址</th>
              <td>{{data.ip}}</td></tr>
            <tr>
              <th>服务器环境</th>
              <td>{{data.web_server}}</td></tr>
            <tr>
              <th>服务器域名</th>
              <td>{{data.domain}}</td></tr>
            <tr>
              <th>操作系统</th>
              <td>{{data.os}}</td></tr>
            <tr>
              <th>Zlib支持</th>
              <td>{{data.zlib}}</td></tr>
            <tr>
              <th>PHP版本</th>
              <td>{{data.phpv}}</td></tr>
            <tr>
              <th>安全模式</th>
              <td>{{data.safe_mode}}</td></tr>
            <tr>
              <th>MYSQL版本</th>
              <td>{{data.mysql_version}}</td></tr>
            <tr>
              <th>GD 版本</th>
              <td>{{data.gdinfo}}</td></tr>
            <tr>
              <th>Curl支持</th>
              <td>{{data.curl}}</td></tr>
            <tr>
              <th>上传附件限制</th>
              <td>{{data.fileupload}}</td></tr>
            <tr>
              <th>执行时间限制</th>
              <td>{{data.max_ex_time}}</td></tr>
            <tr>
              <th>最大占用内存</th>
              <td>{{data.memory_limit}}</td></tr>
            <tr>
              <th>已使用信息条数</th>
              <td>{{data.used_sms}}</td></tr>
            <tr>
              <th>剩余信息</th>
              <td>{{data.sms}}</td></tr>
            </tbody>
          </table>
        </div>
      </fieldset>
    </el-row>
  </el-row>
</template>

<script>
  import { systemLook } from '@/api/visits'
export default {
  name: 'DashboardAdmin',
  components: {},
  data(){
    return {
      data:{},
    }
  },
  mounted(){
    systemLook().then(res => {
      this.data=res.data
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .layui-elem-field {
    margin-bottom: 10px;
    padding: 0;
    border-width: 1px;
    border-style: solid;
  }
  .layui-field-box {
    padding: 10px 15px;
  }
  .layui-elem-field legend {
    margin-left: 20px;
    padding: 0 10px;
    font-size: 20px;
    font-weight: 300;
  }
  .layui-table {
    width: 100%;
    background-color: #fff;
    color: #666
  }

  .layui-table tr {
    transition: all .3s;
    -webkit-transition: all .3s
  }

  .layui-table th {
    text-align: left;
    font-weight: 400
  }

  .layui-table tbody tr:hover,.layui-table thead tr,.layui-table-click,.layui-table-header,.layui-table-hover,.layui-table-mend,.layui-table-patch,.layui-table-tool,.layui-table[lay-even] tr:nth-child(even) {
    background-color: #f2f2f2
  }

  .layui-table td,.layui-table th,.layui-table-fixed-r,.layui-table-header,.layui-table-page,.layui-table-tips-main,.layui-table-tool,.layui-table-view,.layui-table[lay-skin=line],.layui-table[lay-skin=row] {
    border-width: 1px;
    border-style: solid;
    border-color: #e6e6e6
  }

  .layui-table td,.layui-table th {
    position: relative;
    padding: 9px 15px;
    min-height: 20px;
    line-height: 20px;
    font-size: 14px
  }

  .layui-table[lay-skin=line] td,.layui-table[lay-skin=line] th {
    border-width: 0 0 1px
  }

  .layui-table[lay-skin=row] td,.layui-table[lay-skin=row] th {
    border-width: 0 1px 0 0
  }

  .layui-table[lay-skin=nob] td,.layui-table[lay-skin=nob] th {
    border: none
  }

  .layui-table img {
    max-width: 100px
  }

  .layui-table[lay-size=lg] td,.layui-table[lay-size=lg] th {
    padding: 15px 30px
  }

  .layui-table-view .layui-table[lay-size=lg] .layui-table-cell {
    height: 40px;
    line-height: 40px
  }

  .layui-table[lay-size=sm] td,.layui-table[lay-size=sm] th {
    font-size: 12px;
    padding: 5px 10px
  }

  .layui-table-view .layui-table[lay-size=sm] .layui-table-cell {
    height: 20px;
    line-height: 20px
  }

  .layui-table[lay-data] {
    display: none
  }

  .layui-table-box,.layui-table-view {
    position: relative;
    overflow: hidden
  }

  .layui-table-view .layui-table {
    position: relative;
    width: auto;
    margin: 0
  }

  .layui-table-body,.layui-table-header .layui-table,.layui-table-page {
    margin-bottom: -1px
  }

  .layui-table-view .layui-table[lay-skin=line] {
    border-width: 0 1px 0 0
  }

  .layui-table-view .layui-table[lay-skin=row] {
    border-width: 0 0 1px
  }

  .layui-table-view .layui-table td,.layui-table-view .layui-table th {
    padding: 5px 0;
    border-top: none;
    border-left: none
  }

  .layui-table-view .layui-table td {
    cursor: default
  }

  .layui-table-view .layui-form-checkbox[lay-skin=primary] i {
    width: 18px;
    height: 18px
  }

  .layui-table-header {
    border-width: 0 0 1px;
    overflow: hidden
  }

  .layui-table-sort {
    width: 10px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer!important
  }

  .layui-table-sort .layui-edge {
    position: absolute;
    left: 5px;
    border-width: 5px
  }

  .layui-table-sort .layui-table-sort-asc {
    top: 4px;
    border-top: none;
    border-bottom-style: solid;
    border-bottom-color: #b2b2b2
  }

  .layui-table-sort .layui-table-sort-asc:hover {
    border-bottom-color: #666
  }

  .layui-table-sort .layui-table-sort-desc {
    bottom: 4px;
    border-bottom: none;
    border-top-style: solid;
    border-top-color: #b2b2b2
  }

  .layui-table-sort .layui-table-sort-desc:hover {
    border-top-color: #666
  }

  .layui-table-sort[lay-sort=asc] .layui-table-sort-asc {
    border-bottom-color: #000
  }

  .layui-table-sort[lay-sort=desc] .layui-table-sort-desc {
    border-top-color: #000
  }

  .layui-table-cell {
    height: 28px;
    line-height: 28px;
    padding: 0 15px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box
  }

  .layui-table-cell .layui-form-checkbox[lay-skin=primary] {
    top: -1px;
    vertical-align: middle
  }

  .layui-table-cell .layui-table-link {
    color: #01AAED
  }

  .laytable-cell-checkbox,.laytable-cell-numbers,.laytable-cell-space {
    padding: 0;
    text-align: center
  }

  .layui-table-body {
    position: relative;
    overflow: auto;
    margin-right: -1px
  }

  .layui-table-body .layui-none {
    line-height: 40px;
    text-align: center;
    color: #999
  }

  .layui-table-fixed {
    position: absolute;
    left: 0;
    top: 0
  }

  .layui-table-fixed .layui-table-body {
    overflow: hidden
  }

  .layui-table-fixed-l {
    box-shadow: 0 -1px 8px rgba(0,0,0,.08)
  }

  .layui-table-fixed-r {
    left: auto;
    right: -1px;
    border-width: 0 0 0 1px;
    box-shadow: -1px 0 8px rgba(0,0,0,.08)
  }

  .layui-table-fixed-r .layui-table-header {
    position: relative;
    overflow: visible
  }

  .layui-table-mend {
    position: absolute;
    right: -49px;
    top: 0;
    height: 100%;
    width: 50px
  }

  .layui-table-tool {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 30px;
    padding: 10px 15px;
    border-width: 0 0 1px
  }

  .layui-table-page {
    position: relative;
    width: 100%;
    padding: 7px 7px 0;
    border-width: 1px 0 0;
    height: 41px;
    font-size: 12px
  }

  .layui-table-page>div {
    height: 26px
  }

  .layui-table-page .layui-laypage {
    margin: 0
  }

  .layui-table-page .layui-laypage a,.layui-table-page .layui-laypage span {
    height: 26px;
    line-height: 26px;
    margin-bottom: 10px;
    border: none;
    background: 0 0
  }

  .layui-table-page .layui-laypage a,.layui-table-page .layui-laypage span.layui-laypage-curr {
    padding: 0 12px
  }

  .layui-table-page .layui-laypage span {
    margin-left: 0;
    padding: 0
  }

  .layui-table-page .layui-laypage .layui-laypage-prev {
    margin-left: -7px!important
  }

  .layui-table-page .layui-laypage .layui-laypage-curr .layui-laypage-em {
    left: 0;
    top: 0;
    padding: 0
  }

  .layui-table-page .layui-laypage button,.layui-table-page .layui-laypage input {
    height: 26px;
    line-height: 26px
  }

  .layui-table-page .layui-laypage input {
    width: 40px
  }

  .layui-table-page .layui-laypage button {
    padding: 0 10px
  }

  .layui-table-page select {
    height: 18px
  }

  .layui-table-view select[lay-ignore] {
    display: inline-block
  }

  .layui-table-patch .layui-table-cell {
    padding: 0;
    width: 30px
  }

  .layui-table-edit {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 14px 1px;
    border-radius: 0;
    box-shadow: 1px 1px 20px rgba(0,0,0,.15)
  }

  .layui-table-edit:focus {
    border-color: #5FB878!important
  }

  select.layui-table-edit {
    padding: 0 0 0 10px;
    border-color: #C9C9C9
  }

  .layui-table-view .layui-form-checkbox,.layui-table-view .layui-form-radio,.layui-table-view .layui-form-switch {
    top: 0;
    margin: 0;
    box-sizing: content-box
  }

  .layui-table-view .layui-form-checkbox {
    top: -1px;
    height: 26px;
    line-height: 26px
  }

</style>
