import request from '@/utils/request'

export function login(data) {
  return request({
    url: `manager/user/login`,
    method: 'post',
    data
  })
}
