import request from '@/utils/request'
export function getOrderList({ pageNum, pageSize, orderBy, status }) {
  if (!status) {
    status = 0
  }
  return request({
    url: `manager/order/list/${pageNum}/${pageSize}`,
    method: 'post',
    data: {
      orderBy, status
    }
  })
}

export function orderExport(pici) {
  return request({
    url: `manager/order/exportExcel/${pici}`,
    method: 'post'
  })
}

export function orderInfo(id) {
  return request({
    url: `manager/order/info/${id}`
  })
}

export function printSuccess(id) {
  return request({
    url: `manager/order/print/success/${id}`
  })
}

export function orderPrint(id) {
  return request({
    url: `manager/order/print/${id}`
  })
}

export function orderLogistics(data) {
  return request({
    url: `manager/order/logistics`,
    data
  })
}
