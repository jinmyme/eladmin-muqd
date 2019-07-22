import request from '@/utils/request'

// 获取所有的Role列表
export function getAllRole() {
  return request({
    url: '/index.php/manage/Role/index',
    method: 'post'
  })
}
//添加角色
export function add(data) {
  return request({
    url: '/index.php/manage/Role/add',
    method: 'post',
    data
  })
}
//角色权限查看
export function authset(data) {
  return request({
    url: '/index.php/manage/Role/authset',
    method: 'post',
    data
  })
}
//角色权限修改
export function updateAuth(data) {
  return request({
    url: '/index.php/manage/Role/updateAuth',
    method: 'post',
    data
  })
}
//删除角色
export function del(data) {
  return request({
    url: '/index.php/manage/Role/delete',
    method: 'post',
    data
  })
}
//查看，编辑角色
export function edit(data) {
  return request({
    url: '/index.php/manage/Role/edit',
    method: 'post',
    data
  })
}
