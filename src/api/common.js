import request from '@/utils/request'
export function getQiniuToken() {
  return request({
    url: `app/pic/token`
  })
}
