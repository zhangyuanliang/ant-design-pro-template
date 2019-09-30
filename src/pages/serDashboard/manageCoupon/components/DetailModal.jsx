import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Button, Input, Table } from 'antd';
import styles from '../index.less';
import reportImg from '@/assets/favicon.png';

const { Search } = Input;

@connect(({ coupon }) => ({
  dataSource: coupon.detailDataSource,
}))
class DetailModal extends Component {
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
    };
  }

  getList = () => {};

  handleOk = e => {
    const { hide } = this.props;
    hide(true);
  };

  handleCancel = e => {
    const { hide } = this.props;
    hide();
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

  render() {
    const { visible, dataSource } = this.props;
    const { searchField, pagination } = this.state;

    return (
      <Modal
        title="保单详情"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        centered={true}
        width={800}
      >
        <div className={styles.detailPanel}>
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
        <Table
          dataSource={dataSource}
          columns={this.columns}
          rowKey={record => record.id}
          pagination={pagination}
          onChange={this.handleTableChange}
          onShowSizeChange={this.handleTableChange}
          size="middle"
        />
      </Modal>
    );
  }
}

export default DetailModal;
