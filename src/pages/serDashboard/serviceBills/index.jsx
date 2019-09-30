import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Select, Input, Table, Card, Upload, message, Button, Icon } from 'antd';
import ServiceDetailModal from './components/ServiceDetail';
import styles from './index.less';

const { Search } = Input;
const { Option } = Select;

@connect(({ serviceBills }) => ({
  dataSource: serviceBills.dataSource,
}))
class ServiceBills extends Component {
  // 承保分公司、机构、大保单号、小保单号、车架号、车牌号、被保险人、业务员、业务员手机号、券码、发券时间、领取时间、核销时间、服务标记、操作
  columns = [
    {
      title: '承保分公司',
      dataIndex: 'name',
      id: 'name',
      width: 130,
      fixed: 'left',
    },
    {
      title: '机构',
      dataIndex: 'age',
      id: 'age',
    },
    {
      title: '大保单号',
      dataIndex: 'address',
      id: 'address',
    },
    {
      title: '小保单号',
      dataIndex: 'status',
      id: 'status',
    },
    {
      title: '车架号',
      dataIndex: '',
      id: '',
    },
    {
      title: '被保险人',
      dataIndex: '',
      id: '',
    },
    {
      title: '业务员',
      dataIndex: '',
      id: '',
    },
    {
      title: '业务员手机号',
      dataIndex: '',
      id: '',
    },
    {
      title: '券码',
      dataIndex: '',
      id: '',
    },
    {
      title: '发券时间',
      dataIndex: 'time',
      id: 'time',
      render: record => moment(record).format('YYYY-MM-DD'),
    },
    {
      title: '领取时间',
      dataIndex: '',
      id: '',
      render: record => moment(record).format('YYYY-MM-DD'),
    },
    {
      title: '核销时间',
      dataIndex: '',
      id: '',
      render: record => moment(record).format('YYYY-MM-DD'),
    },
    {
      title: '服务标记',
      dataIndex: '',
      id: '',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 120,
      render: record => {
        return (
          <div className={styles.operation}>
            <a onClick={() => this.showDetail(record)}>详情</a>
            <a onClick={() => this.tag(record)}>标记</a>
          </div>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      selectedBranch: undefined,
      selectedOrganization: undefined,
      searchField: undefined,
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
      },
      isShowDetailModal: false,
      currRecord: {},
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { dispatch } = this.props;
    const {
      selectedBranch,
      selectedOrganization,
      searchField,
      pagination,
      pagination: { pageSize, current },
    } = this.state;
    const param = {
      selectedType: selectedBranch || null,
      selectedOrganization: selectedOrganization || null,
      searchField: searchField ? searchField.trim() : null,
      pageSize,
      pageIndex: current,
    };
    dispatch({
      type: 'serviceBills/fetchServiceBills',
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

  changeBranch = val => {
    const { pagination } = this.state;
    this.setState(
      {
        selectedBranch: val,
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

  changeOrganization = val => {
    const { pagination } = this.state;
    this.setState(
      {
        selectedOrganization: val,
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

  showDetail = record => {
    this.setState({
      isShowDetailModal: true,
      currRecord: record,
    });
  };

  tag = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceBills/tagBills',
      payload: { id: record.id },
    }).then(res => {
      this.getList();
    });
  };

  hideModal = isRefresh => {
    this.setState(
      {
        isShowDetailModal: false,
      },
      () => {
        if (isRefresh) {
          this.getList();
        }
      },
    );
  };

  getSearchPanel = () => {
    const { selectedBranch, selectedOrganization, searchField } = this.state;

    return (
      <Form className={styles.couponForm}>
        <Select
          value={selectedBranch}
          onChange={this.changeBranch}
          placeholder="承保分公司"
          className={styles.selectWidth}
          allowClear
        >
          <Option value="1" key="1">
            test1
          </Option>
          <Option value="2" key="2">
            test2
          </Option>
        </Select>
        <Select
          value={selectedOrganization}
          onChange={this.changeOrganization}
          placeholder="机构"
          className={styles.selectWidth}
          allowClear
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
            value={searchField}
            onSearch={this.onSearch}
            onPressEnter={this.onSearch}
            onChange={this.handleSearchChange}
            placeholder="大保单号／小保单号"
            enterButton
            allowClear
          />
        </div>
        <Button icon="download">导出</Button>
      </Form>
    );
  };

  render() {
    const { pagination, isShowDetailModal, currRecord } = this.state;
    const { dataSource } = this.props;

    return (
      <Card>
        <div>{this.getSearchPanel()}</div>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          rowKey={record => record.id}
          pagination={pagination}
          onChange={this.handleTableChange}
          onShowSizeChange={this.handleTableChange}
          size="middle"
          scroll={{ x: '160%' }}
        />
        <ServiceDetailModal
          visible={isShowDetailModal}
          hide={this.hideModal}
          record={currRecord}
        ></ServiceDetailModal>
      </Card>
    );
  }
}

export default ServiceBills;
