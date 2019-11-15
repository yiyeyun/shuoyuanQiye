import request from '@/utils/request'
export function getTemplateList() {
  return request({
    url: `manager/template/list`,
    method: 'post'
  })
}
export function templateDisable(id) {
  return request({
    url: `manager/template/disable/${id}`,
    method: 'post'
  })
}
export function templateCreate(data) {
  return request({
    url: `manager/template/create`,
    method: 'post',
    data
  })
}
