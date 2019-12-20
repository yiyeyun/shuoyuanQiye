import request from '@/utils/request'

export function login(data) {
  return request({
    url: `account/groupLogin`,
    method: 'post',
    data
  })
}

export function userDataHandle(data) {
  return request({
    url: `app/user/infoPerfect`,
    method: 'post',
    data
  })
}
