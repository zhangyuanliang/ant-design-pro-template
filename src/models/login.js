import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { reloadAuthorized } from '@/utils/Authorized';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: null,
    token: null,
    account: null,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      const {
        code,
        data: { token, auth },
      } = response;
      yield put({
        type: 'changeLoginStatus',
        payload: {
          token: token || null,
          account: payload.account || null,
          currentAuthority: auth || null,
          status: code === 'A00000' ? 'ok' : 'error',
        },
      });

      if (code === 'A00000') {
        localStorage.setItem('account', payload.account);
        localStorage.setItem('access-token', token);
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.currentAuthority) {
        setAuthority(payload.currentAuthority);
      }
      if (!payload.token) {
        localStorage.setItem('access-token', '');
        localStorage.setItem('account', '');
      }
      return {
        ...state,
        status: payload.status,
        token: payload.token,
        account: payload.account,
      };
    },
  },
};
export default Model;
