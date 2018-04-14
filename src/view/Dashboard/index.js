import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import imgLogo from '../../asset/login/bg.jpg';
class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <img src={ imgLogo } alt=""/>
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
