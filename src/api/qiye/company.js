import request from '@/utils/request'

export function getCompanyInfo(data) {
  return request({
    url: `selectInfo`,
    method: 'post',
    data
  })
}

export function createdCompanyInfo(data) {
  return request({
    url: `createdInfo`,
    method: 'post',
    data
  })
}
