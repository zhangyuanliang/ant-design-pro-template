import { queryAccounts, deleteAccount } from '@/services/accounts';
import { message } from 'antd';

const AccountsModel = {
  namespace: 'accounts',
  state: {
    dataSource: [],
    roles: {
      1: '太平总管理员',
    },
  },
  effects: {
    *fetchAccounts({ payload }, { call, put }) {
      const res = yield call(queryAccounts, payload);
      yield put({
        type: 'saveAccounts',
        payload: res.data,
      });
      return res;
    },
    *deleteAccount({ payload }, { call, put }) {
      const res = yield call(deleteAccount, payload);
      if (res.code === 'A00000') {
        message.success(res.msg);
      }
      return res;
    },
  },
  reducers: {
    saveAccounts(state, { payload }) {
      return {
        ...state,
        dataSource: payload.dashboardVo || [],
      };
    },
  },
};
export default AccountsModel;
