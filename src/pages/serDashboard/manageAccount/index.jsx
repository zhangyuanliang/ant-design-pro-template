import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Select, Input, Table, Card, Upload, message, Button, Icon, Modal } from 'antd';
import RegisterModal from './components/RegisterModal';
import styles from './index.less';
import { getAuthority } from '@/utils/authority';

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

@connect(({ accounts, loading }) => ({
  dataSource: accounts.dataSource,
  roles: accounts.roles,
  tableLoading: loading.effects['accounts/fetchAccounts'],
}))
class ManageAccount extends Component {
  columns = [
    {
      title: '账户名',
      dataIndex: 'name',
      id: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      id: 'phone',
    },
    {
      title: '账户角色',
      dataIndex: 'role',
      id: 'role',
      render: text => {
        const currentRole = this.props.roles.find(role => {
          return role.id === text;
        });
        return <div>{currentRole.name}</div>;
      },
    },
    {
      title: '承保分公司',
      dataIndex: 'branch',
      id: 'branch',
    },
    {
      title: '操作',
      width: '16%',
      render: record => {
        return (
          <div>
            <a onClick={() => this.deleteConfirm(record)}>删除</a>
          </div>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      searchField: undefined,
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
      },
      isShowModal: false,
    };
  }

  componentDidMount() {
    this.getRoles();
    this.getList();
  }

  getList = () => {
    const { dispatch } = this.props;
    const {
      searchField,
      pagination,
      pagination: { pageSize, current },
    } = this.state;
    const param = {
      searchField: searchField ? searchField.trim() : null,
      pageSize,
      pageIndex: current,
    };
    dispatch({
      type: 'accounts/fetchAccounts',
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

  // 获取角色
  getRoles = () => {
    const { dispatch } = this.props;
    const currentRole = getAuthority();
    const param = {
      currentRole: currentRole[0],
    };
    dispatch({
      type: 'accounts/fetchRoles',
      payload: param,
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

  handleSearchChange = e => {
    e.persist();
    this.setState({
      searchField: e.currentTarget.value,
    });
  };

  onSearch = val => {
    const { pagination } = this.state;
    this.setState(
      {
        searchField: val,
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

  deleteConfirm = record => {
    var _this = this;
    confirm({
      title: '温馨提示',
      centered: true,
      content: `确定要删除账号${record.name}吗?`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        _this.delete(record);
      },
      onCancel() {},
    });
  };

  delete = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'accounts/deleteAccount',
      payload: { id: record.id },
    }).then(res => {
      if (res.code === 'A00000') {
        this.getList();
      }
    });
  };

  showModal = () => {
    this.setState({
      isShowModal: true,
    });
  };

  hideModal = isRefresh => {
    this.setState(
      {
        isShowModal: false,
      },
      () => {
        if (isRefresh) {
          this.getList();
        }
      },
    );
  };

  getSearchPanel = () => {
    const { searchField } = this.state;

    return (
      <Form className={styles.couponForm}>
        <div className={styles.inputWidth}>
          <Search
            onSearch={this.onSearch}
            onPressEnter={this.onSearch}
            // onChange={this.handleSearchChange}
            // value={searchField}
            allowClear
            placeholder="账户名／手机号"
            enterButton
          />
        </div>
        <Button type="primary" icon="plus" onClick={() => this.showModal()}>
          注册用户
        </Button>
      </Form>
    );
  };

  render() {
    const { pagination, isShowModal } = this.state;
    const { dataSource, tableLoading } = this.props;

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
          loading={tableLoading}
          size="middle"
        />
        <RegisterModal visible={isShowModal} hide={this.hideModal}></RegisterModal>
      </Card>
    );
  }
}

export default ManageAccount;
