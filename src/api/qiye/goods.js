import request from '@/utils/request'

export function getGoodsList(data) {
  return request({
    url: `product/selectProductList`,
    method: 'post',
    data
  })
}
export function createdOrUpdatedProduct(data) {
  return request({
    url: `product/createdOrUpdatedProduct`,
    method: 'post',
    data
  })
}
export function openTraceability(data) {
  return request({
    url: `product/openTraceability`,
    method: 'post',
    data
  })
}
