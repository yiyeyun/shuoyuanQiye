import request from '@/utils/request'

export function getIndustry() {
  return request({
    url: `/bigGroupInfo/getIndustry`,
    method: 'post'
  })
}
export function industryHandle(data) {
  return request({
    url: `bigGroupInfo/createdOrUpdatedIndustry`,
    method: 'post',
    data
  })
}

