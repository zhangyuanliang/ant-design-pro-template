import request from 'umi-request';

export async function queryDashboard(params) {
  return request('/api/dashboard/queryDashboard', {
    method: 'POST',
    data: params,
  });
}
