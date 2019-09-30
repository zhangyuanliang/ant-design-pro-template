import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Select, Table, Card, Upload, message, Button, Icon, Modal, Input } from 'antd';
import NewModal from './components/NewModal';
import DetailModal from './components/DetailModal';
import styles from './index.less';

const { Option } = Select;

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
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
      },
      isShowNewModal: true,
      isShowDetailModal: false,
      detailRecord: null,
      isShowTicketModal: false,
      ticketRecord: null,
      ticketNum: undefined,
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

  showNewModal = () => {
    this.setState({
      isShowNewModal: true,
    });
  };

  hideNewModal = () => {
    this.setState({
      isShowNewModal: false,
    });
  };

  showDetailModal = record => {
    const { dispatch } = this.props;
    const param = {
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
        });
      }
    });
  };

  hideDetailModal = () => {
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
    form.validateFields((err, values) => {
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

  getSearchPanel = () => {
    const { selectedBranch, selectedOrganization } = this.state;

    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 导入
          </Button>
        </Upload>
        <Button icon="download">导出</Button>
        <Button onClick={() => this.showNewModal()} type="primary" icon="plus">
          新增
        </Button>
      </Form>
    );
  };

  render() {
    const {
      pagination,
      isShowDetailModal,
      isShowTicketModal,
      ticketNum,
      isShowNewModal,
    } = this.state;
    const {
      dataSource,
      form: { getFieldDecorator },
    } = this.props;

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
        />
        <NewModal visible={isShowNewModal} hide={this.hideNewModal}></NewModal>
        <DetailModal visible={isShowDetailModal} hide={this.hideDetailModal}></DetailModal>
        <Modal
          title="核券"
          visible={isShowTicketModal}
          onOk={this.ticketOk}
          onCancel={this.ticketCancel}
          centered={true}
          width={460}
        >
          <Form layout="inline" style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item label="请输入核券数量">
              {getFieldDecorator('price', {
                initialValue: ticketNum,
                rules: [{ validator: this.checkNum }],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}

export default ManageCoupon;
