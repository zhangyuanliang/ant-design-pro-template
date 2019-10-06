import React, { Component } from 'react';
import { Alert } from 'antd';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    const userName = localStorage.getItem('account');
    this.setState({
      userName,
    });
  }

  render() {
    const { userName } = this.state;
    return (
      <Alert
        message={`欢迎你！${userName}`}
        description="欢迎来到 React 世界，React 用于构建用户界面的 JavaScript 库"
        type="info"
        showIcon
      />
    );
  }
}

export default Welcome;
