import request from 'umi-request';

export async function queryCoupon(params) {
  return request('/api/coupon/queryCoupon', {
    method: 'POST',
    data: params,
  });
}

export async function queryDetail(params) {
  return request('/api/coupon/queryDetail', {
    method: 'POST',
    data: params,
  });
}

export async function cancelTick(params) {
  return request('/api/coupon/cancelTick', {
    method: 'POST',
    data: params,
  });
}
