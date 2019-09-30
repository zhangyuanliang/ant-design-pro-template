import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

@Form.create()
class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountRoles: [
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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const {
      visible,
      form: { getFieldDecorator },
    } = this.props;
    const { accountRoles } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="注册账户"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        centered={true}
      >
        <Form {...formItemLayout}>
          <Form.Item label="账户名">
            {getFieldDecorator('account', {
              rules: [
                {
                  required: true,
                  message: '请输入账户名！',
                },
                {
                  max: 20,
                  message: '不能超过20个字符！',
                },
              ],
            })(<Input placeholder="请输入" allowClear />)}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  max: 20,
                  message: '不能超过20个字符！',
                },
              ],
            })(<Input placeholder="请输入" allowClear />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码!',
                },
                {
                  min: 6,
                  max: 20,
                  message: '请输入6～20个字符！',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请输入密码!',
                },
                {
                  min: 6,
                  max: 20,
                  message: '请输入6～20个字符！',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label="账户角色">
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true,
                  message: '请输入手机号！',
                },
              ],
            })(
              <Select allowClear placeholder="请选择" style={{ width: 180 }}>
                {accountRoles.map(it => {
                  return (
                    <Option value={it.paramKey} key={it.paramKey}>
                      {it.paramValue}
                    </Option>
                  );
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="承保分公司">
            {getFieldDecorator('branch', {
              rules: [
                {
                  required: true,
                  message: '请输入承保分公司！',
                },
              ],
            })(<Input placeholder="请输入" allowClear />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default RegisterModal;
