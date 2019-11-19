import request from '@/utils/request'
export function getGoodsList({ pageNum, pageSize }) {
  return request({
    url: `app/user/list/${pageNum}/${pageSize}`,
    method: 'post'
  })
}
export function getGoodsCategory(id = 0) {
  return request({
    url: `app/cat/list/${id}`,
    method: 'post'
  })
}
export function goodsHandle(data) {
  return request({
    url: `app/user/add`,
    method: 'post',
    data
  })
}
export function goodsDelete(id) {
  return request({
    url: `app/user/delete/${id}`
  })
}
