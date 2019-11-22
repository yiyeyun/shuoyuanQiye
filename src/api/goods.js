import request from '@/utils/request'
export function getGoodsList({ pageNum, pageSize }) {
  return request({
    url: `app/user/product/list/${pageNum}/${pageSize}`,
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
    url: `app/user/product/add`,
    method: 'post',
    data
  })
}
export function goodsDelete(id) {
  return request({
    url: `app/user/product/delete/${id}`
  })
}

export function sourceIsOpen(data) {
  return request({
    url: `app/user/product/openTraceability`,
    method: 'post',
    data
  })
}
