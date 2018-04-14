import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, message } from 'antd';
import API from '@service/api';
import UserModal from './form';
import './index.less';
class Dashboard extends Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      API.post('/editLoginpass', values).then(({data: res}) => {
        if (res.code === 0) {
          message.success('修改成功！')
          form.resetFields();
          this.setState({ visible: false });
        } else {
          message.error('密码错误！')
        }
      }).catch(err => {
        message.error('服务器错误！')
      })
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    let user = null;
    const userInfo = this.props.user.userInfo;
    if (this.props.user.requestingInfo) {
      user = <Spin tip="Loading..."></Spin>;
    } else {
      user = <div>姓名:{userInfo.loginName}</div>;
    }
    return (
      <div className="User">
        <h2 class="title">个人信息</h2>
        { user }
        <br />
        <Button onClick={this.showModal} type="primary">密码修改</Button>
        <UserModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
const mapStateToProps = function (state) {
  const { user } = state;
  return {
    user
  };
};
export default connect(mapStateToProps)(Dashboard);
