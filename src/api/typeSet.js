import request from '@/utils/request'

//类型列表
export function typeList() {
  return request({
    url:'/index.php/manage/Type/index',
    method:'post',
  })
}
//添加选项
export function add_child(data) {
  return request({
    url:'/index.php/manage/input/add_child',
    method:'post',
    data
  })
}
//添加类型显示内容
export function look(data) {
  return request({
    url:'/index.php/manage/Type/look',
    method:'post',
    data
  })
}
//添加类型编辑
export function lookEdit(data) {
  return request({
    url:'index.php/manage/Type/add',
    method:'post',
    data
  })
}
//删除类型
export function delType(data) {
  return request({
    url:'/index.php/manage/Type/delete',
    method:'post',
    data
  })
}
//设置表单列表
export function lookFormSet(data) {
  return request({
    url:'/index.php/manage/input/index',
    method:'post',
    data
  })
}
//添加与编辑页面的表单信息
export function lookForm(data) {
  return request({
    url:'/index.php/manage/input/look',
    method:'post',
    data
  })
}
//添加与编辑表单信息
export function lookFormEdit(data) {
  return request({
    url:'/index.php/manage/input/add_exit',
    method:'post',
    data
  })
}
//删除表单
export function delForm(data) {
  return request({
    url:'/index.php/manage/input/delete',
    method:'post',
    data
  })
}
//查询对应表的字段
export function connect_field_list(data) {
  return request({
    url:'/index.php/manage/input/connect_field_list',
    method:'post',
    data
  })
}
