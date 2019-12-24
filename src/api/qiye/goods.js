import request from '@/utils/request'

export function getGoodsList(data) {
  return request({
    url: `product/selectProductList`,
    method: 'post',
    data
  })
}
