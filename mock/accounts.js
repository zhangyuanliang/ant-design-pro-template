export default {
  'POST /api/accounts/queryAccounts': (req, res) => {
    setTimeout(() => {
      res.send({
        msg: '操作成功',
        code: 'A00000',
        data: {
          totalCount: 12,
          dashboardVo: [
            {
              id: '1',
              name: '账户名1',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '2',
              name: '账户名2',
              phone: 16666666666,
              role: 2,
              branch: '北京分公司',
            },
            {
              id: '3',
              name: '账户名3',
              phone: 16666666666,
              role: 3,
              branch: '北京分公司',
            },
            {
              id: '4',
              name: '账户名4',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '5',
              name: '账户名5',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '6',
              name: '账户名6',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '7',
              name: '账户名7',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '8',
              name: '账户名8',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '9',
              name: '账户名9',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '10',
              name: '账户名10',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '11',
              name: '账户名11',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
            {
              id: '12',
              name: '账户名12',
              phone: 16666666666,
              role: 1,
              branch: '北京分公司',
            },
          ],
        },
      });
    }, 1000);
  },
  'POST /api/accounts/deleteAccount': {
    msg: '操作成功',
    code: 'A00000',
    data: null,
  },
  'POST /api/accounts/queryRoles': {
    msg: '操作成功',
    code: 'A00000',
    data: [
      { id: 1, name: '太平总管理员' },
      { id: 2, name: '太平分公司管理员' },
      { id: 3, name: '中恒骏业' },
    ],
  },
};
