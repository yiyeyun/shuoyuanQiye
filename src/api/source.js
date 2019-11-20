import request from '@/utils/request'
export function productVideoUpload(data) {
  return request({
    url: `app/user/suoyuan/productVideoInfo`,
    method: 'post',
    data
  })
}

export function submitDescript(data) {
  return request({
    url: `app/user/suoyuan/productDescription`,
    method: 'post',
    data
  })
}

export function getProductDescript(pid) {
  return request({
    url: `app/user/suoyuan/getProductDescription/${pid}`,
    method: 'post'
  })
}

export function getProductHonor(pid) {
  return request({
    url: `app/user/suoyuan/getproductHonor/${pid}`,
    method: 'post'
  })
}

export function submitAresInfo(data) {
  return request({
    url: `app/user/suoyuan/productAreaInfoInfo`,
    method: 'post',
    data
  })
}

export function submitHonor(data) {
  return request({
    url: `app/user/suoyuan/productHonor`,
    method: 'post',
    data
  })
}
