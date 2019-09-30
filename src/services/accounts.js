import request from 'umi-request';

export async function queryAccounts(params) {
  return request('/api/accounts/queryAccounts', {
    method: 'POST',
    data: params,
  });
}

export async function deleteAccount(params) {
  return request('/api/accounts/deleteAccount', {
    method: 'POST',
    data: params,
  });
}
