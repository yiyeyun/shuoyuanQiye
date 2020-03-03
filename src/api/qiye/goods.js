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

export function bindSubCodeByItemId(data) {
  return request({
    url: `product/bindSubCodeByItemId`,
    method: 'post',
    data
  })
}

export function bindAreaCodeByItemId(data) {
  return request({
    url: `product/bindAreaCodeByItemId`,
    method: 'post',
    data
  })
}
export function selectProductSuyuan(id) {
  return request({
    url: `product/selectProductSuyuan/${id}`,
    method: 'post'
  })
}

export function createdOrUpdatedProductSuyuan(data) {
  return request({
    url: `product/createdOrUpdatedProductSuyuan`,
    method: 'post',
    data
  })
}
