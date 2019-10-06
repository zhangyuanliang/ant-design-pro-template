import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { connect } from 'dva';
import { getAuthority } from '@/utils/authority';

const { Option } = Select;

@Form.create()
@connect(({ accounts }) => ({
  accountRoles: accounts.roles,
}))
class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRole: getAuthority()[0],
      branchRequired: false,
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

  changeRole = val => {
    let branchRequired = false;
    if (val === 2) {
      branchRequired = true;
    } else {
      this.props.form.setFieldsValue({ branch: '' });
    }
    this.setState({
      branchRequired,
    });
  };

  render() {
    const {
      visible,
      accountRoles,
      form: { getFieldDecorator },
    } = this.props;
    const { branchRequired, currentRole } = this.state;
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
              initialValue: currentRole,
              rules: [
                {
                  required: true,
                  message: '请输入账户角色！',
                },
              ],
            })(
              <Select
                disabled={[2, 3].includes(currentRole)}
                onChange={this.changeRole}
                placeholder="请选择"
                style={{ width: 180 }}
              >
                {accountRoles.map(it => {
                  return (
                    <Option value={it.id} key={it.name}>
                      {it.name}
                    </Option>
                  );
                })}
              </Select>,
            )}
          </Form.Item>
          {currentRole === 3 ? (
            ''
          ) : (
            <Form.Item label="承保分公司">
              {getFieldDecorator('branch', {
                rules: [
                  {
                    required: branchRequired,
                    message: '请输入承保分公司！',
                  },
                ],
              })(<Input disabled={currentRole === 2} placeholder="请输入" allowClear />)}
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  }
}

export default RegisterModal;
