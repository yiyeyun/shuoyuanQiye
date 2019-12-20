import request from '@/utils/request'

export function getTourism() {
  return request({
    url: `bigGroupInfo/findTourism`,
    method: 'post'
  })
}
export function tourismHandle(data) {
  return request({
    url: `bigGroupInfo/createdOrUpdatedTourism`,
    method: 'post',
    data
  })
}

