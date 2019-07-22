import request from '@/utils/request'

//管理员列表
export function userList(data) {
  return request({
    url: '/index.php/manage/User/user_list',
    method: 'post',
    data
  })
}
//管理员添加
export function add(data) {
  return request({
    url: '/index.php/manage/User/user_add',
    method: 'post',
    data
  })
}
//删除管理员
export function del(data) {
  return request({
    url: 'index.php/manage/user/user_del',
    method: 'post',
    data
  })
}
//查看、编辑管理员信息
export function edit(data) {
  return request({
    url: '/index.php/manage/User/user_edit',
    method: 'post',
    data
  })
}
//添加、编辑管理员的角色列表
export function roleList(data) {
  return request({
    url: '/index.php/manage/user/role_list',
    method: 'post',
    data
  })
}
export function validPass(pass) {
  return request({
    url: 'api/users/validPass/' + pass,
    method: 'get'
  })
}
export function updatePass(pass) {
  return request({
    url: 'api/users/updatePass/' + pass,
    method: 'get'
  })
}

export function updateEmail(code, data) {
  return request({
    url: 'api/users/updateEmail/' + code,
    method: 'post',
    data
  })
}

