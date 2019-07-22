import request from '@/utils/request'

export function systemLook() {
  return request({
    url: '/index.php/manage/index/system',
    method: 'post'
  })
}
