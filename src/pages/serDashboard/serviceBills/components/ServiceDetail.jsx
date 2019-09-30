import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import styles from '../index.less';
import reportImg from '@/assets/favicon.png';

const { Option } = Select;

class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOk = e => {
    const { hide } = this.props;
    hide(true);
  };

  handleCancel = e => {
    const { hide } = this.props;
    hide();
  };

  render() {
    const { visible, record } = this.props;

    return (
      <Modal
        title="服务详情"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        centered={true}
        width={800}
      >
        <div>
          <h3>服务信息</h3>
          <div>
            <span>承保分公司：{record.name}</span>
            <span>机构：{record.age}</span>
            <span>大保单号：{record.address}</span>
          </div>
          <div className={styles.detailRow}>
            <span>小保单号：132442414</span>
            <span>车架号：132131232</span>
            <span>车牌号：浙A23321</span>
          </div>
          <div className={styles.detailRow}>
            <span>被保险人：小溪</span>
            <span>业务员：小菜</span>
            <span>业务员手机号：165656527253</span>
          </div>
          <div className={styles.detailRow}>
            <span>被保险人：小溪</span>
            <span>业务员：小菜</span>
            <span>业务员手机号：165656527253</span>
          </div>
          <div className={styles.detailRow}>
            <span>券码：12345678</span>
            <span>发券时间：2019.10.01</span>
            <span>领取时间：2019.10.02</span>
          </div>
          <div className={styles.detailRow}>
            <span>核销时间：2019.10.05</span>
            <span>服务标记：已标记</span>
          </div>
        </div>
        <div className={styles.marginTop}>
          <h3>短信息</h3>
          <div className={styles.detailRow}>
            尊敬的客户：您好！安全检测服务券码为：15231783，请及时核销，谢谢！
          </div>
        </div>
        <div className={styles.marginTop}>
          <h3>安全检测报告</h3>
          <div className={styles.detailRow}>
            <img src={reportImg} alt="安全检测报告" width="32" />
          </div>
        </div>
      </Modal>
    );
  }
}

export default DetailModal;
