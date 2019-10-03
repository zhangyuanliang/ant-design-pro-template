import request from 'umi-request';

export async function queryCoupon(params) {
  return request('/api/insuranceCoupon/getBranchList', {
    method: 'POST',
    data: params,
  });
}

export async function newBranch(params) {
  return request('/api/insuranceCoupon/newBranch', {
    method: 'POST',
    data: params,
  });
}

export async function queryDetail(params) {
  return request('/api/insuranceCoupon/queryDetail', {
    method: 'POST',
    data: params,
  });
}

export async function cancelTick(params) {
  return request('/api/insuranceCoupon/cancelTick', {
    method: 'POST',
    data: params,
  });
}

export async function exportExcel(params) {
  return request('/api/insuranceCoupon/exportExcel', {
    method: 'POST',
    data: params,
  });
}
