import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import styles from '../index.less';

const { Option } = Select;

@Form.create()
class NewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branchCompanies: [
        { paramKey: '1', paramValue: 'test1' },
        { paramKey: '2', paramValue: 'test2' },
      ],
    };
  }

  handleOk = e => {
    const { form, hide } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      hide(true);
    });
  };

  handleCancel = e => {
    const { form, hide } = this.props;
    form.resetFields();
    hide();
  };

  render() {
    const {
      visible,
      form: { getFieldDecorator },
    } = this.props;
    const { branchCompanies } = this.state;

    return (
      <Modal
        title="新增保单"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        centered={true}
        width={740}
      >
        <Form layout="inline">
          <div style={{ display: 'flex' }}>
            <Form.Item label="承保分公司" className={styles.formItem}>
              {getFieldDecorator('role', {
                rules: [
                  {
                    required: true,
                    message: '请输入承保分公司！',
                  },
                ],
              })(
                <Select allowClear placeholder="请选择" style={{ width: 200 }}>
                  {branchCompanies.map(it => {
                    return (
                      <Option value={it.paramKey} key={it.paramKey}>
                        {it.paramValue}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="大保单号" className={styles.formItem}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '请输入大保单号！',
                  },
                  {
                    max: 30,
                    message: '不能超过30个字符！',
                  },
                ],
              })(<Input placeholder="请输入" allowClear style={{ width: 200 }} />)}
            </Form.Item>
          </div>
          <div style={{ display: 'flex' }}>
            <Form.Item label="被保险人" className={styles.formItem}>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '请输入被保险人！',
                  },
                  {
                    max: 30,
                    message: '不能超过30个字符！',
                  },
                ],
              })(<Input placeholder="请输入" allowClear style={{ width: 200 }} />)}
            </Form.Item>
            <Form.Item label="小保单号" className={styles.formItem}>
              {getFieldDecorator('branch', {
                rules: [
                  {
                    required: true,
                    message: '请输入小保单号！',
                  },
                  {
                    max: 30,
                    message: '不能超过30个字符！',
                  },
                ],
              })(<Input placeholder="请输入" allowClear style={{ width: 200 }} />)}
            </Form.Item>
          </div>
          <div style={{ display: 'flex' }}>
            <Form.Item label="车架号" className={styles.formItem}>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '请输入车架号！',
                  },
                  {
                    max: 20,
                    message: '不能超过20个字符！',
                  },
                ],
              })(<Input placeholder="请输入" allowClear style={{ width: 200 }} />)}
            </Form.Item>
            <Form.Item label="车牌号" className={styles.formItem}>
              {getFieldDecorator('branch', {
                rules: [
                  {
                    min: 7,
                    max: 8,
                    message: '请输入7-8个字符！',
                  },
                ],
              })(<Input placeholder="请输入" allowClear style={{ width: 200 }} />)}
            </Form.Item>
          </div>
          <div style={{ display: 'flex' }}>
            <Form.Item label="业务员" className={styles.formItem}>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '请输入业务员！',
                  },
                  {
                    max: 30,
                    message: '不能超过30个字符！',
                  },
                ],
              })(<Input placeholder="请输入" allowClear style={{ width: 200 }} />)}
            </Form.Item>
            <Form.Item label="业务员手机号" className={styles.formItem}>
              {getFieldDecorator('branch', {
                rules: [
                  {
                    required: true,
                    message: '请输入业务员手机号！',
                  },
                  {
                    max: 11,
                    message: '不能超过11个字符！',
                  },
                ],
              })(<Input placeholder="请输入" allowClear style={{ width: 200 }} />)}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default NewModal;
