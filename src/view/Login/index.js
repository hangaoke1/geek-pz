import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';
import imgLogo from '../../asset/login/bg.jpg';
import { connect } from 'react-redux';
import { userAction } from '@model/user';
import store from 'store';

const FormItem = Form.Item;

class Login extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.user.authed) {
      this.props.router.push('/dashboard');
    }
  }
  componentDidMount() {
    // 判断是否登陆
    const status = store.get('login');
    if (status) {
      this.props.router.push('/dashboard');
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(userAction.login(values));
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <img src={ imgLogo }  alt="" /> 
          </FormItem>
          <FormItem>
            {getFieldDecorator('loginName', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="loginName" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('loginPass', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="loginPass" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            Or <a href="/register">立即注册</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);
const mapStateToProps = function (state) {
  const { user } = state;
  return {
    user
  };
};
export default connect(mapStateToProps)(WrappedLogin);
