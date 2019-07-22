import router from '@/router'
import {Notification, MessageBox} from 'element-ui'
import {getToken} from '@/utils/auth'
import Config from '@/config'
import $ from 'jquery'
// 创建ajaxPost请求
const ajaxPost=function(options) {
  console.log(options)
  return new Promise((resolve, reject) => {
      var def={
        type:'post',
        url: '',
        data:{},
      }
      var opt = $.extend({}, def, options)
      $.ajax({
        type: opt.type,
        url: Config.ajaxRequest + opt.url,
        headers: {"token": ""+getToken()+""},
        data: opt.data,
        dataType: 'json',
        success: function (res) {
          console.log(res)
          if (res.status == 200) {
            resolve(res)
          } else if (res.status == 100) {
            //数据状态为100,表示重新登录
            MessageBox.confirm(
              '登录状态已过期，您可以继续留在该页面，或者重新登录',
              '系统提示',
              {
                confirmButtonText: '重新登录',
                // cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            })
          } else {
            Notification.error({
              title: res.msg,
              duration: 2500
            });
            reject(res)
          }
        }
      })
  })
}
export default ajaxPost
