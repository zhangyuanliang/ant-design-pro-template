import { queryAccounts, deleteAccount, queryRoles } from '@/services/accounts';
import { message } from 'antd';

const AccountsModel = {
  namespace: 'accounts',
  state: {
    dataSource: [],
    roles: [],
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
    *fetchRoles({ payload }, { call, put }) {
      const res = yield call(queryRoles, payload);
      yield put({
        type: 'saveRoles',
        payload: res.data,
      });
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
    saveRoles(state, { payload }) {
      return {
        ...state,
        roles: payload || [],
      };
    },
  },
};
export default AccountsModel;
