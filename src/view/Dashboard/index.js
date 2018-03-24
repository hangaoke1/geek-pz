import React, { Component } from 'react';
import { connect } from 'react-redux';
class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        主页
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
