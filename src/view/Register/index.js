import React from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import './index.less';
import { userAction } from '@model/user';
import imgLogo from '../../asset/login/bg.jpg';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        userAction.register(values).then(res => {
          res = res.data;
          if (res.code === 0) {
            message.success(res.message);
            this.setState({registered: true});
          } else {
            message.error(res.message);
          }
        }).catch(err => {
          message.error(err.message);
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let render = null;
    if (!this.state.registered) {
      render = (<Form onSubmit={this.handleSubmit} className="login-form">
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
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
              立即注册
          </Button>
        </FormItem>
      </Form>);
    } else {
      render = (<Button>立即登陆</Button>);
    }
    return (
      <div className="register">
        {render}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
