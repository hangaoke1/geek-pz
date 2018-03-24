import React from 'react';
import { Button } from 'antd';
import './index.less';
import { connect } from 'react-redux';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = (e) => {}
  render() {
    return (
      <div className="temlate">
        <Button>hello</Button>
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
export default connect(mapStateToProps)(Template);
