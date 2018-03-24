import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
class Dashboard extends Component {
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
        { user }
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
