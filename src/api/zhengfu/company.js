import request from '@/utils/request'

export function getCompanyList(data) {
  return request({
    url: `/groupManager/groupAccountList`,
    method: 'post',
    data
  })
}
export function createCompany(data) {
  return request({
    url: `/groupManager/createdGroup`,
    method: 'post',
    data
  })
}
export function accountEnable(data) {
  return request({
    url: `/groupManager/accountEnable`,
    method: 'post',
    data
  })
}
