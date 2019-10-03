import request from 'umi-request';

export async function queryServiceBills(params) {
  return request('/api/service/queryServiceBills', {
    method: 'POST',
    data: params,
  });
}

export async function tagServiceBill(params) {
  return request('/api/service/tagServiceBill', {
    method: 'POST',
    data: params,
  });
}

export async function exportExcel(params) {
  return request('/api/service/exportExcel', {
    method: 'POST',
    data: params,
  });
}
