import { queryCoupon, queryDetail, cancelTick, newBranch, exportExcel } from '@/services/coupon';
import { message } from 'antd';

const CouponModel = {
  namespace: 'coupon',
  state: {
    dataSource: [],
    detailDataSource: [],
  },
  effects: {
    *fetchCoupon({ payload }, { call, put }) {
      const res = yield call(queryCoupon, payload);
      yield put({
        type: 'saveCoupon',
        payload: res.data,
      });
      return res;
    },
    *fetchDetail({ payload }, { call, put }) {
      const res = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: res.data,
      });
      return res;
    },
    *toCancelTick({ payload }, { call }) {
      const res = yield call(cancelTick, payload);
      if (res.code === 'A00000') {
        message.success(res.msg);
      }
      return res;
    },
    *toNewbranch({ payload }, { call }) {
      const res = yield call(newBranch, payload);
      if (res.code === 'A00000') {
        message.success(res.msg);
      }
      return res;
    },
    *toExportExcel({ payload }, { call }) {
      const res = yield call(exportExcel, payload);
      // if (res.code === 'A00000') {
      //   message.success(res.msg)
      // }
      return res;
    },
  },
  reducers: {
    saveCoupon(state, { payload }) {
      return {
        ...state,
        dataSource: payload.dashboardVo || [],
      };
    },
    saveDetail(state, { payload }) {
      return {
        ...state,
        detailDataSource: payload.dashboardVo || [],
      };
    },
  },
};
export default CouponModel;
