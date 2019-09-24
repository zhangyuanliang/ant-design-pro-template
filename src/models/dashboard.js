import { queryDashboard } from '@/services/dashboard';

const DashboardModel = {
  namespace: 'dashboard',
  state: {
    dataSource: [],
  },
  effects: {
    *fetchDashboard({ payload }, { call, put }) {
      const res = yield call(queryDashboard, payload);
      yield put({
        type: 'saveDashboard',
        payload: res.data,
      });
      return res;
    },
  },
  reducers: {
    saveDashboard(state, { payload }) {
      return {
        ...state,
        dataSource: payload.dashboardVo || [],
      };
    },
  },
};
export default DashboardModel;
