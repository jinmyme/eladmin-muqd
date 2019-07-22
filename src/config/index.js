/**
 * @description 系统全局配置
 */
export default {
  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,
  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
   */
  passCookieExpires: 1,
  /**
   * @description 此处修改网站名称
   */
  webName: '黑蜂科技',
  /**
   * @description token key
   */
  TokenKey: 'EL-ADMIN-TOEKN',
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,
  /**
   * @description 默认请求域名
   */
  ajaxRequest:'http://enjoy.heifeng.xin',
  /**
   * @description 默认图片域名
   */
  imgUrl:'http://enjoy.heifeng.xin',
  /**
   * @description 默认上传文件
   */
  UploadFile:'http://enjoy.heifeng.xin/index.php/manage/File/upload_big_file',//上传文件接口
}
