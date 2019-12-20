import request from '@/utils/request'

export function getSelectGroupList() {
  return request({
    url: `groupManager/selectGroupList`,
    method: 'post'
  })
}
export function getPackageSubList(data) {
  return request({
    url: `packageSubList`,
    method: 'post',
    data
  })
}

export function getPackageDetail(id) {
  return request({
    url: `packageInfo/${id}`,
    method: 'post'
  })
}
export function getPackageList(data) {
  return request({
    url: `bigGroup/selectGroupCodePackageList`,
    method: 'post',
    data
  })
}

export function getSubCodeInfo(code) {
  return request({
    url: `/qrCodeInfo/selectPackageInfoBySubCode/${code}`,
    method: 'post'
  })
}
export function areaDistribution(data) {
  return request({
    url: `/bigGroup/areaDistribution`,
    method: 'post',
    data
  })
}
export function issuedAccount(data) {
  return request({
    url: `/bigGroup/IssuedAccount`,
    method: 'post',
    data
  })
}
