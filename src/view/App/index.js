import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, BackTop, Dropdown, Spin } from 'antd';
import { Link } from 'react-router';
import { userAction } from '@model/user';
import { connect } from 'react-redux';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;

const menu = function (onClick){
  return (
    <Menu onClick={onClick}>
      <Menu.Item key="user">
        <Link to="/user"><span>个人中心</span></Link>
      </Menu.Item>
      <Menu.Item key="dashboard">
        <Link to="/dashboard"><span>主页</span></Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出登陆</Menu.Item>
    </Menu>
  );
};

class Navigation extends React.Component {
  render(){
    const meta = this.props.title.props.route.meta;
    const subCrumb = meta ? (<Breadcrumb.Item>{meta.title}</Breadcrumb.Item>) : '';

    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item href="/"><Icon type="home" /></Breadcrumb.Item>
        {subCrumb}
      </Breadcrumb>
    );
  }
}

class App extends React.Component {
  state = {
    collapsed: false,
    current: ''
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  onRightClick = ({ key }) => {
    switch(key) {
    case 'user':
      this.setState({ current: '/user' });
      break;
    case 'dashboard':
      this.setState({ current: '/dashboard' });
      break;
    case 'logout':
      this.props.dispatch(userAction.logout());
      break;
    default:
      console.log('hello world');
    }
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  componentDidMount() {
    this.setState({ current: this.props.location.pathname });
    this.props.dispatch(userAction.getUserInfo());
  }
  render() {
    return (
      <div className="app">
        <Layout style={{ minHeight: '100vh' }}>
          <BackTop>
            <div className="ant-back-top-inner">UP</div>
          </BackTop>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu onClick={this.handleClick} theme="dark" mode="inline" selectedKeys={[this.state.current]}>
              <Menu.Item key="/dashboard">
                <Link to="/dashboard">
                  <Icon type="dashboard" />
                  <span>主页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/studentsCenter">
                <Link to="/studentsCenter">
                  <Icon type="usergroup-add" />
                  <span>学生管理中心</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/user">
                <Link to="/user">
                  <Icon type="user" />
                  <span>个人中心</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div className="header-right">
                <Dropdown overlay={menu(this.onRightClick)} trigger={['click']} className="action" placement="bottomCenter">
                  <a className="ant-dropdown-link" href="eval(javascript:;)">
                    <span className="user-img"><img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" /></span>
                    <span>{this.props.user.requestingInfo ? <Spin /> : this.props.user.userInfo.loginName}</span><Icon type="down" />
                  </a>
                </Dropdown>
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Navigation title={this.props.children}></Navigation>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              学工管理系统 ©2018 Created by yang
            </Footer>
          </Layout>
        </Layout>
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
export default connect(mapStateToProps)(App);
