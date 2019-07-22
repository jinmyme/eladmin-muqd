import request from '@/utils/request'

//菜单栏目列表
export function menu_list(data) {
  return request({
    url:'/index.php/manage/menu/menu_list',
    method:'post',
    data
  })
}
//新增菜单栏目
export function menu_add(data) {
  return request({
    url:'/index.php/manage/menu/menu_add',
    method:'post',
    data
  })
}
//删除菜单栏目
export function menu_del(data) {
  return request({
    url:'/index.php/manage/menu/menu_del',
    method:'post',
    data
  })
}
//编辑菜单栏目
export function menu_edit(data) {
  return request({
    url:'/index.php/manage/menu/menu_edit',
    method:'post',
    data
  })
}
//组件列表
export function component_list(data) {
  return request({
    url:'/index.php/manage/menu/component_list',
    method:'post',
    data
  })
}
//新增组件
export function component_add(data) {
  return request({
    url:'/index.php/manage/menu/component_add',
    method:'post',
    data
  })
}
//查看、编辑组件
export function component_edit(data) {
  return request({
    url:'/index.php/manage/menu/component_edit',
    method:'post',
    data
  })
}
//删除组件
export function component_del(data) {
  return request({
    url:'/index.php/manage/menu/component_del',
    method:'post',
    data
  })
}
