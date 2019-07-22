import request from '@/utils/request'

//商品分类管理列表
export function classify_list(data) {
  return request({
    url: '/index.php/manage/classify/classify_list',
    method: 'post',
    data
  })
}
//商品分类新增和编辑内容
export function classify_value(data) {
  return request({
    url: '/index.php/manage/classify/classify_value',
    method: 'post',
    data
  })
}
//商品分类新增和编辑接口
export function classify_change(data) {
  return request({
    url: '/index.php/manage/classify/classify_change',
    method: 'post',
    data
  })
}
//商品分类删除
export function classify_del(data) {
  return request({
    url: '/index.php/manage/classify/classify_del',
    method: 'post',
    data
  })
}
//商品管理列表
export function goods_list(data) {
  return request({
    url: '/index.php/manage/goods/goods_list',
    method: 'post',
    data
  })
}
//添加、编辑商品的页面value
export function goods_value(data) {
  return request({
    url: '/index.php/manage/goods/goods_value',
    method: 'post',
    data
  })
}
//添加、编辑商品
export function goods_change(data) {
  return request({
    url: '/index.php/manage/Goods/goods_change',
    method: 'post',
    data
  })
}
//删除商品
export function goods_del(data) {
  return request({
    url: '/index.php/manage/goods/goods_del',
    method: 'post',
    data
  })
}
//会员管理列表
export function member_list(data) {
  return request({
    url: '/index.php/manage/member/member_list',
    method: 'post',
    data
  })
}
//会员归属
export function member_update(data) {
  return request({
    url: '/index.php/manage/member/member_update',
    method: 'post',
    data
  })
}
//会员状态编辑（冻结/解冻会员）
export function member_freeze(data) {
  return request({
    url: '/index.php/manage/member/member_freeze',
    method: 'post',
    data
  })
}
//审核会员
export function member_verify(data) {
  return request({
    url: '/index.php/manage/member/member_verify',
    method: 'post',
    data
  })
}
//投诉建议列表
export function suggest_list(data) {
  return request({
    url: '/index.php/manage/suggest/suggest_list',
    method: 'post',
    data
  })
}
//删除投诉建议
export function suggest_del(data) {
  return request({
    url: '/index.php/manage/suggest/suggest_del',
    method: 'post',
    data
  })
}
//查看投诉建议
export function suggest_look(data) {
  return request({
    url: '/index.php/manage/suggest/suggest_look',
    method: 'post',
    data
  })
}
//用户浏览记录列表
export function browse_list(data) {
  return request({
    url: '/index.php/manage/browse/browse_list',
    method: 'post',
    data
  })
}
//修改密码
export function ChangeNewPwd(data) {
  return request({
    url: '/index.php/manage/index/ChangeNewPwd',
    method: 'post',
    data
  })
}
//发送验证码
export function send_validate_code_backup(data) {
  return request({
    url: '/index.php/app/user/send_validate_code_backup',
    method: 'post',
    data
  })
}
