import request from '@/utils/request'

//数据字典
export function dictionary(data) {
  return request({
    url: '/index.php/manage/Database/dictionary',
    method: 'post',
    data
  })
}
//修复数据表
export function repair(data) {
  return request({
    url: '/index.php/manage/Database/repair',
    method: 'post',
    data
  })
}
//备份数据表
export function backup_export(data) {
  return request({
    url: '/index.php/manage/Database/backup_export',
    method: 'post',
    data
  })
}
//优化数据表
export function optimize(data) {
  return request({
    url: '/index.php/manage/Database/optimize',
    method: 'post',
    data
  })
}
//刷新数据表
export function clear() {
  return request({
    url: '/index.php/manage/Database/clear',
    method: 'post'
  })
}
//数据库还原列表
export function restore() {
  return request({
    url: '/index.php/manage/Database/restore',
    method: 'post'
  })
}
//数据库还原导入
export function restore_import(data) {
  return request({
    url: '/index.php/manage/Database/restore_import',
    method: 'post',
    data
  })
}
//数据库备份文件下载
export function download(data) {
  return request({
    url: '/index.php/manage/Database/download',
    method: 'post',
    data
  })
}
//数据库删除备份文件
export function del_file(data) {
  return request({
    url: '/index.php/manage/Database/del_file',
    method: 'post',
    data
  })
}
