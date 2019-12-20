import request from '@/utils/request'
export function getQiniuToken() {
  return request({
    url: `pic/token`
  })
}
export function getSmsCode(data) {
  return request({
    url: `app/sms/smsCode`,
    method: 'post',
    data
  })
}
