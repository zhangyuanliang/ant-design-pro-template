import {
  queryCoupon,
  queryDetail,
  cancelTick,
  newBranch,
  exportExcel,
  queryBranches,
  queryOrganizations,
} from '@/services/coupon';
import { message } from 'antd';

const CouponModel = {
  namespace: 'coupon',
  state: {
    dataSource: [],
    detailDataSource: [],
    branches: [],
    organizations: [],
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
    *fetchBranches({ payload }, { call, put }) {
      const res = yield call(queryBranches, payload);
      yield put({
        type: 'saveBranches',
        payload: res.data,
      });
      return res;
    },
    *fetchOrganizations({ payload }, { call, put }) {
      const res = yield call(queryOrganizations, payload);
      yield put({
        type: 'saveOrganizations',
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
    saveBranches(state, { payload }) {
      return {
        ...state,
        branches: payload || [],
      };
    },
    saveOrganizations(state, { payload }) {
      return {
        ...state,
        organizations: payload || [],
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
