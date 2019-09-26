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
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
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
            path: '/myDashboard',
            name: '我的面板',
            icon: 'desktop',
            routes: [
              {
                path: '/myDashboard/dashboard_1',
                name: '面板_1',
                component: './myDashboard/dashboard_1',
              },
              {
                path: '/myDashboard/dashboard_2',
                name: '高级面板_2',
                component: './myDashboard/dashboard_2',
                authority: ['admin'],
              },
            ],
          },
          {
            name: 'exception',
            path: '/exception',
            hideInMenu: true,
            routes: [
              // exception
              {
                path: '/exception/403',
                name: 'not-permission',
                component: './Exception/403',
              },
              {
                path: '/exception/404',
                name: 'not-find',
                component: './Exception/404',
              },
              {
                path: '/exception/500',
                name: 'server-error',
                component: './Exception/500',
              },
              {
                path: '/exception/trigger',
                name: 'trigger',
                hideInMenu: true,
                component: './Exception/TriggerException',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
