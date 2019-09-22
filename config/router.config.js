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
            name: 'myDashboard',
            icon: 'icon-dashboard',
            routes: [
              {
                path: '/myDashboard/dashboard_1',
                name: 'dashboard_1',
                component: './myDashboard/dashboard_1',
              },
              {
                path: '/myDashboard/dashboard_2',
                name: 'dashboard_2',
                component: './myDashboard/dashboard_2',
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
