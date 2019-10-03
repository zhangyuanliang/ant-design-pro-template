import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  Form,
  Select,
  Table,
  Card,
  Upload,
  message,
  Button,
  Icon,
  Modal,
  Input,
  Divider,
} from 'antd';
import NewModal from './components/NewModal';
import DetailModal from './components/DetailModal';
import styles from './index.less';

const { Option } = Select;
const { confirm } = Modal;

@connect(({ coupon }) => ({
  dataSource: coupon.dataSource,
}))
@Form.create()
class ManageCoupon extends Component {
  columns = [
    {
      title: '承保分公司',
      dataIndex: 'name',
      id: 'name',
    },
    {
      title: '机构',
      dataIndex: 'age',
      id: 'age',
    },
    {
      title: '当前券码量',
      dataIndex: 'address',
      id: 'address',
    },
    {
      title: '累计核券量',
      dataIndex: 'status',
      id: 'status',
    },
    {
      title: '操作',
      width: 120,
      render: record => {
        return (
          <div className={styles.operation}>
            <a onClick={() => this.showDetailModal(record)}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => this.showTicketModal(record)}>核券</a>
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
      selectedRowKeys: [],
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 20,
        current: 1,
      },
      isShowNewModal: false,
      isShowDetailModal: false,
      detailRecord: null,
      isShowTicketModal: false,
      ticketRecord: null,
      ticketNum: undefined,
      isShowEmailModal: false,
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
      pagination,
      pagination: { pageSize, current },
    } = this.state;
    const param = {
      selectedType: selectedBranch || null,
      searchField: selectedOrganization || null,
      pageSize,
      pageIndex: current,
    };
    dispatch({
      type: 'coupon/fetchCoupon',
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
          pageSize: 20,
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
          pageSize: 20,
          current: 1,
        },
      },
      () => {
        this.getList();
      },
    );
  };

  showNewModal = () => {
    this.setState({
      isShowNewModal: true,
    });
  };

  hideNewModal = isRefresh => {
    if (isRefresh) {
      this.getList();
    }
    this.setState({
      isShowNewModal: false,
    });
  };

  showDetailModal = record => {
    const { dispatch } = this.props;
    const param = {
      ...record,
      searchField: null,
      pageSize: 10,
      pageIndex: 1,
    };
    dispatch({
      type: 'coupon/fetchDetail',
      payload: param,
    }).then(res => {
      if (res.code === 'A00000') {
        this.setState({
          isShowDetailModal: true,
          detailRecord: record,
        });
      }
    });
  };

  hideDetailModal = isRefresh => {
    if (isRefresh) {
      this.getList();
    }
    this.setState({
      isShowDetailModal: false,
    });
  };

  showTicketModal = record => {
    this.setState({
      isShowTicketModal: true,
      ticketRecord: record,
    });
  };

  ticketOk = () => {
    const { dispatch, form } = this.props;
    const { ticketNum, ticketRecord } = this.state;
    form.validateFields(['price'], (err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'coupon/toCancelTick',
        payload: {
          ...ticketRecord,
          needCouponTotal: ticketNum,
        },
      }).then(res => {
        if (res.code === 'A00000') {
          this.setState({
            isShowTicketModal: false,
          });
        }
      });
    });
  };

  ticketCancel = () => {
    this.setState({
      isShowTicketModal: false,
    });
    this.props.form.resetFields();
  };

  changeTicketNum = e => {
    // this.checkNum()
    this.setState({
      ticketNum: e.currentTarget.value,
    });
  };

  checkNum = (rule, value, callback) => {
    const number = parseInt(value, 10);
    if (isNaN(number)) {
      callback('请输入数字！');
      return;
    }
    if (number > 0) {
      callback();
      return;
    }
    callback('请输入核券数量!');
  };

  exportConfirm() {
    var _this = this;
    confirm({
      title: '导出报表',
      centered: true,
      content: `确定要导出所选订单的报表吗?`,
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
      type: 'coupon/toExportExcel',
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
    this.props.form.validateFields(['emailAdress'], (err, values) => {
      if (err) {
        return;
      }
      const param = {
        selectedType: selectedBranch || null,
        searchField: selectedOrganization || null,
        ...values,
      };
      dispatch({
        type: 'coupon/toExportExcel',
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
    const { selectedBranch, selectedOrganization } = this.state;
    const url = `/api/insuranceCoupon/import`;
    const importProps = {
      name: 'file',
      action: url,
      showUploadList: false,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 导入成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败`);
        }
      },
    };

    return (
      <Form className={styles.couponForm}>
        <Select
          allowClear
          onChange={this.changeBranch}
          value={selectedBranch}
          placeholder="承保分公司"
          className={styles.selectWidth}
        >
          <Option value="1" key="1">
            test1
          </Option>
          <Option value="2" key="2">
            test2
          </Option>
        </Select>
        <Select
          allowClear
          onChange={this.changeOrganization}
          value={selectedOrganization}
          placeholder="机构"
          className={styles.selectWidth}
        >
          <Option value="1" key="1">
            test1
          </Option>
          <Option value="2" key="2">
            test2
          </Option>
        </Select>
        <Upload {...importProps}>
          <Button>
            <Icon type="upload" /> 导入
          </Button>
        </Upload>
        <Button onClick={() => this.exportConfirm()} icon="download">
          导出
        </Button>
        <Button onClick={() => this.showNewModal()} type="primary" icon="plus">
          新增
        </Button>
      </Form>
    );
  };

  render() {
    const {
      selectedRowKeys,
      pagination,
      isShowDetailModal,
      isShowTicketModal,
      ticketNum,
      isShowNewModal,
      detailRecord,
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
          columns={this.columns}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          pagination={pagination}
          onChange={this.handleTableChange}
          onShowSizeChange={this.handleTableChange}
          size="middle"
        />
        <NewModal visible={isShowNewModal} hide={this.hideNewModal}></NewModal>
        <DetailModal
          visible={isShowDetailModal}
          hide={this.hideDetailModal}
          detailRecord={detailRecord}
        ></DetailModal>
        <Modal
          title="核券"
          visible={isShowTicketModal}
          onOk={this.ticketOk}
          onCancel={this.ticketCancel}
          centered={true}
          width={460}
        >
          <Form layout="inline" style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item label="请输入核券数量" style={{ marginBottom: 0, height: 40 }}>
              {getFieldDecorator('price', {
                initialValue: ticketNum,
                rules: [{ validator: this.checkNum }],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
          </Form>
        </Modal>
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

export default ManageCoupon;
