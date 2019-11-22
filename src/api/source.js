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

export function getAreaGps(pid) {
  return request({
    url: `app/user/suoyuan/getProductAreaGPS/${pid}`,
    method: 'post'
  })
}
export function getTownInfo(pid) {
  return request({
    url: `app/user/suoyuan/getproductTownshipInfo/${pid}`,
    method: 'post'
  })
}
export function submitTownInfo(data) {
  return request({
    url: `app/user/suoyuan/productTownshipInfo`,
    method: 'post',
    data
  })
}

export function subtmitDeepSource(data) {
  return request({
    url: `app/user/suoyuan/productDeepTraceabilityInfo`,
    method: 'post',
    data
  })
}

export function getDeepSource(pid) {
  return request({
    url: `app/user/suoyuan/productDeepTraceabilityInfo/${pid}`,
    method: 'post'
  })
}

export function getSuyuanList({ pageNum, pageSize }) {
  return request({
    url: `app/user/suoyuan/selectSuoYuanList/${pageNum}/${pageSize}`,
    method: 'post'
  })
}
