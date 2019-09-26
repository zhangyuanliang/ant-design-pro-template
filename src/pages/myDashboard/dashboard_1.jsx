import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Select, Input, Table, Card } from 'antd';
import styles from './dashboard_1.less';

const { Search } = Input;
const { Option } = Select;

@connect(({ dashboard }) => ({
  dataSource: dashboard.dataSource,
}))
class DashboardOne extends Component {
  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      id: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      id: 'age',
    },
    {
      title: '时间',
      dataIndex: 'time',
      id: 'time',
      render: record => moment(record).format('YYYY-MM-DD'),
    },
    {
      title: '住址',
      dataIndex: 'address',
      id: 'address',
    },
    {
      title: '状态',
      dataIndex: 'status',
      id: 'status',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '16%',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      selectedType: undefined,
      searchField: undefined,
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
      },
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { dispatch } = this.props;
    const {
      selectedType,
      searchField,
      pagination,
      pagination: { pageSize, current },
    } = this.state;
    const param = {
      selectedType: selectedType || null,
      searchField: searchField ? searchField.trim() : null,
      pageSize,
      pageIndex: current,
    };
    dispatch({
      type: 'dashboard/fetchDashboard',
      payload: param,
    }).then(res => {
      this.setState({
        pagination: {
          ...pagination,
          total: res.data.totalCount,
        },
      });
    });
  };

  handleTableChange = pagination => {
    this.setState(
      {
        pagination,
      },
      () => {
        this.getList();
      },
    );
  };

  handleTypesChange = val => {
    const { pagination } = this.state;
    this.setState(
      {
        selectedType: val,
        pagination: {
          ...pagination,
          pageSize: 10,
          current: 1,
        },
      },
      () => {
        this.getList();
      },
    );
  };

  handleSearchChange = e => {
    e.persist();
    this.setState({
      searchField: e.currentTarget.value,
    });
  };

  onSearch = () => {
    const { pagination } = this.state;
    this.setState(
      {
        pagination: {
          ...pagination,
          pageSize: 10,
          current: 1,
        },
      },
      () => {
        this.getList();
      },
    );
  };

  getFormSearch = () => {
    const { searchField, selectedType } = this.state;

    return (
      <Form style={{ display: 'flex', marginBottom: 20 }}>
        <Select
          allowClear
          onChange={this.handleTypesChange}
          value={selectedType}
          placeholder="客户类型"
          className={styles.selectWidth}
        >
          <Option value="1" key="1">
            test1
          </Option>
          <Option value="2" key="2">
            test2
          </Option>
        </Select>
        <div className={styles.inputWidth}>
          <Search
            onSearch={this.onSearch}
            onPressEnter={this.onSearch}
            onChange={this.handleSearchChange}
            value={searchField}
            allowClear
            placeholder="搜索"
            enterButton
          />
        </div>
      </Form>
    );
  };

  render() {
    const { pagination } = this.state;
    const { dataSource } = this.props;

    return (
      <Card>
        <div>{this.getFormSearch()}</div>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          rowKey={record => record.id}
          pagination={pagination}
          onChange={this.handleTableChange}
          onShowSizeChange={this.handleTableChange}
          size="middle"
        />
      </Card>
    );
  }
}

export default DashboardOne;
