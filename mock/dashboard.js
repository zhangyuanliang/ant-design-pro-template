export default {
  'POST /api/dashboard/queryDashboard': {
    msg: '操作成功',
    code: 'A00000',
    data: {
      totalCount: 2,
      dashboardVo: [
        {
          id: '1',
          name: 'test1',
          age: 32,
          time: 1569230866842,
          address: '西湖区湖底公园1号',
          status: '待审核',
          operation: '删除',
        },
        {
          id: '2',
          name: 'test2',
          age: 42,
          time: 1569230866842,
          address: '西湖区湖底公园1号',
          status: '已审核',
          operation: '删除',
        },
        {
          id: '3',
          name: 'test3',
          age: 22,
          time: 1569230866842,
          address: '西湖区湖底公园1号',
          status: '已审核',
          operation: '删除',
        },
      ],
    },
  },
};
