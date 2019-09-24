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
  },

  // app
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
