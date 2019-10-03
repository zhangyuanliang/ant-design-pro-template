import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  Form,
  Select,
  Input,
  Table,
  Card,
  Upload,
  message,
  Button,
  Icon,
  Modal,
  Divider,
  Tag,
} from 'antd';
import ServiceDetailModal from './components/ServiceDetail';
import styles from './index.less';

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

@connect(({ serviceBills }) => ({
  dataSource: serviceBills.dataSource,
}))
@Form.create()
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
      dataIndex: 'mark',
      id: 'mark',
      render: text => {
        if (!text) return '';
        return text === 1 ? <Tag color="gold">未标记</Tag> : <Tag color="green">已标记</Tag>;
      },
    },
    {
      title: '操作',
      fixed: 'right',
      width: 120,
      // align: 'center',
      render: record => {
        return (
          <div className={styles.operation}>
            <a onClick={() => this.showDetail(record)}>详情</a>
            {record.mark === 1 ? (
              <span>
                <Divider type="vertical" />
                <a onClick={() => this.tag(record)}>标记</a>
              </span>
            ) : (
              ''
            )}
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
      selectedRowKeys: [],
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
      },
      isShowDetailModal: false,
      currRecord: {},
      isShowEmailModal: false,
      emailAdress: null,
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

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
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

  exportConfirm() {
    var _this = this;
    confirm({
      title: '导出报表',
      centered: true,
      content: '确定要导出所选订单的报表吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        _this.handleExportExcel();
      },
      onCancel() {},
    });
  }

  changeEmail = e => {
    this.setState({
      emailAdress: e.target.value,
    });
  };

  handleExportExcel() {
    const {
      selectedRowKeys,
      selectedBranch,
      selectedOrganization,
      searchField,
      emailAdress,
      pagination: { total },
    } = this.state;
    const {
      dispatch,
      form: { getFieldDecorator },
    } = this.props;
    // 导出报表
    if (!selectedRowKeys.length && total >= 1) {
      this.setState({
        isShowEmailModal: true,
      });
    } else if (selectedRowKeys.length) {
      const param = {
        ids: selectedRowKeys,
      };
      this.handleExport(param);
    } else {
      const param = {
        selectedBranch: selectedBranch || null,
        selectedOrganization: selectedOrganization || null,
        searchField: searchField ? searchField.trim() : null,
      };
      this.handleExport(param);
    }
  }

  handleExport(data) {
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceBills/toExportExcel',
      payload: data,
    }).then(blob => {
      if (blob instanceof Blob) {
        const a = document.createElement('a');
        const fileName = `${moment(new Date()).format('YYYY-MM-DD')}`;
        a.href = URL.createObjectURL(blob);
        a.download = `${fileName}.xls`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
  }

  closeEmailModal = () => {
    this.setState({
      isShowEmailModal: false,
    });
    this.props.form.resetFields();
  };

  handleOk = () => {
    const { dispatch } = this.props;
    const { selectedBranch, selectedOrganization, searchField } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const param = {
        selectedBranch: selectedBranch || null,
        selectedOrganization: selectedOrganization || null,
        searchField: searchField ? searchField.trim() : null,
        ...values,
      };
      dispatch({
        type: 'serviceBills/toExportExcel',
        payload: param,
      }).then(res => {
        if (res.code === 'A00000') {
          message.success(res.msg);
          this.closeEmailModal();
        }
      });
    });
  };

  getSearchPanel = () => {
    const { selectedBranch, selectedOrganization, searchField } = this.state;

    return (
      <Form className={styles.serviceForm}>
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
            // value={searchField}
            onSearch={this.onSearch}
            onPressEnter={this.onSearch}
            // onChange={this.handleSearchChange}
            placeholder="大保单号／小保单号"
            enterButton
            allowClear
          />
        </div>
        <Button icon="download" onClick={() => this.exportConfirm()}>
          导出
        </Button>
      </Form>
    );
  };

  render() {
    const {
      pagination,
      isShowDetailModal,
      currRecord,
      selectedRowKeys,
      isShowEmailModal,
    } = this.state;
    const {
      dataSource,
      form: { getFieldDecorator },
    } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Card>
        <div>{this.getSearchPanel()}</div>
        <Table
          dataSource={dataSource}
          rowSelection={rowSelection}
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
        <Modal
          title="提示"
          visible={isShowEmailModal}
          onOk={this.handleOk}
          onCancel={this.closeEmailModal}
          centered={true}
          width={380}
        >
          <p style={{ fontSize: 12 }}>导出单量已达到上限1000条，报表发送至您的邮箱</p>
          <Form layout="inline" style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item label="邮箱：" style={{ marginBottom: 0, height: 40 }}>
              {getFieldDecorator('emailAdress', {
                rules: [
                  {
                    type: 'email',
                    message: '请输入正确的邮箱',
                  },
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                ],
              })(<Input placeholder="请输入邮箱" style={{ width: 230 }} allowClear />)}
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}

export default ServiceBills;
