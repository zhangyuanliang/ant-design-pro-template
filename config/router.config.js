export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  }, // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        component: './Welcome',
      },
      {
        path: '/serDashboard',
        name: '服务平台',
        icon: 'desktop',
        routes: [
          {
            path: '/serDashboard/manageCoupon',
            name: '券码管理',
            component: './serDashboard/manageCoupon',
          },
          {
            path: '/serDashboard/serviceBills',
            name: '服务清单',
            component: './serDashboard/serviceBills',
          },
          {
            path: '/serDashboard/manageAccount',
            name: '账号管理',
            component: './serDashboard/manageAccount',
          },
        ],
      },
      // {
      //   path: '/myDashboard',
      //   name: '我的面板',
      //   icon: 'desktop',
      //   routes: [
      //     {
      //       path: '/myDashboard/dashboard_1',
      //       name: '面板_1',
      //       component: './myDashboard/dashboard_1',
      //     },
      //     {
      //       path: '/myDashboard/dashboard_2',
      //       name: '高级面板_2',
      //       component: './myDashboard/dashboard_2',
      //       authority: ['admin'],
      //     },
      //   ],
      // },
      {
        name: 'exception',
        path: '/exception',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './exception/TriggerException',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
