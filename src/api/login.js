import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'index.php/manage/Admin/login',
    method: 'post',
    data: {
      'username':username,
      'password':password
    }
  })
}

export function getInfo() {
  return request({
    url: 'index.php/manage/User/info',
    method: 'post'
  })
}
