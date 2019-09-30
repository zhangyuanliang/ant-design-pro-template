import { queryServiceBills, tagServiceBill } from '@/services/serviceBills';
import { message } from 'antd';

const ServiceBillsModel = {
  namespace: 'serviceBills',
  state: {
    dataSource: [],
  },
  effects: {
    *fetchServiceBills({ payload }, { call, put }) {
      const res = yield call(queryServiceBills, payload);
      yield put({
        type: 'saveServiceBills',
        payload: res.data,
      });
      return res;
    },
    *tagBills({ payload }, { call }) {
      const res = yield call(tagServiceBill, payload);
      if (res.code === 'A00000') {
        message.success(res.msg);
      }
      return res;
    },
  },
  reducers: {
    saveServiceBills(state, { payload }) {
      return {
        ...state,
        dataSource: payload.dashboardVo || [],
      };
    },
  },
};
export default ServiceBillsModel;
