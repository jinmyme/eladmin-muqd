import request from '@/utils/request'

//栏目列表
export function columnList(data) {
  return request({
    url: '/index.php/manage/column/index',
    method: 'post',
    data
  })
}
//添加、编辑栏目页面内容
export function columnLook(data) {
  return request({
    url:'/index.php/manage/column/look',
    method:'post',
    data
  })
}
//添加、编辑栏目
export function columnEdit(data) {
  return request({
    url:'/index.php/manage/column/add_edit',
    method:'post',
    data
  })
}
//删除栏目
export function columnDel(data) {
  return request({
    url:'index.php/manage/column/delete',
    method:'post',
    data
  })
}
//栏目列表接口>表头
export function formHeader(data) {
  return request({
    url:'/index.php/manage/Content/index',
    method:'post',
    data:data
  })
}

//添加、编辑内容页面的内容
export function add_field(data) {
  return request({
    url:'/index.php/manage/Content/add_field',
    method:'post',
    data:data
  })
}
//添加栏目表单内容
export function columnAddForm(data) {
  return request({
    url:'/index.php/manage/Content/add',
    method:'post',
    data
  })
}
//修改栏目表单内容
export function columnEditForm(data) {
  return request({
    url:'/index.php/manage/Content/edit',
    method:'post',
    data
  })
}
//删除栏目表单内容
export function columnDelForm(data) {
  return request({
    url:'/index.php/manage/Content/delete',
    method:'post',
    data
  })
}
