import React from 'react';
import API from '@service/api';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import CreateStudent from './createFrom'
import './index.less';

const columns = [{
  title: '姓名',
  dataIndex: 'stuName',
  key: 'stuName',
}, {
  title: '性别',
  dataIndex: 'stuSex',
  key: 'stuSex',
  render: (value, row, index) => {
    if (value === 0) {
      return <span>男</span>
    } else if (value === 1) {
      return <span>女</span>
    } else {
      return <span>不详</span>
    }
  }
}, {
  title: '年龄',
  dataIndex: 'stuAge',
  key: 'stuAge',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
  render: (value, row, index) => {
    const { provice, city, district, address } = row;
    return <span>{provice} {city} {district} {address}</span>;
  }
}, {
  title: '班级',
  dataIndex: 'classes',
  key: 'classes',
}, {
  title: '学生ID',
  dataIndex: 'stuId',
  key: 'stuId',
}, {
  title: '联系电话',
  dataIndex: 'mobile',
  key: 'mobile',
}];

class StudentsCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formRef: null,
      visible: false,
      confirmLoading: false,
      loading: false,
      total: 0,
      current: 1,
      pageSize: 10,
      list: []
    };
  }
  componentDidMount() {
    this.getStudents()
  }
  getStudents = (pageNo, pageSize) => {
    pageNo = pageNo ? pageNo : this.state.current
    pageSize = pageSize ? pageSize : this.state.pageSize
    this.setState({
      loading: true
    })
    API.post('/queryStudent', {
      pageNo, pageSize
    }).then(responese => {
      const res = responese.data
      if (res.code === 0) {
        this.setState({
          list: res.data.studentInfos || [],
          loading: false
        })
      }
    }).catch(err => {
      console.log(err)
      this.setState({
        loading: false,
        list: []
      });
    });
  }
  onChange = (current, pageSize) => {
    this.getStudents(current, pageSize);
    this.setState({
      current,
      pageSize
    });
  }
  onShowSizeChange = (current, pageSize) => {
    this.getStudents(current, pageSize);
    this.setState({
      current,
      pageSize
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCreate = () => {
    this.setState({
      confirmLoading: true,
    });
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      API.post('/createStudent', values).then(({ data:res }) => {
        console.log(res)
        if (res.code === 0) {
          form.resetFields();
          this.setState({ visible: false, confirmLoading: false });
          this.getStudents()
        }
      }).catch(err => {
        console.log(err)
        this.setState({ confirmLoading: false });
      })
    });
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    const { total, current, pageSize, loading, list, visible, confirmLoading } = this.state;
    const pagination =  {
      position: 'bottom',
      showQuickJumper: true,
      showSizeChanger: true,
      total,
      current,
      pageSize,
      onChange: this.onChange,
      onShowSizeChange: this.onShowSizeChange
    };
    return (
      <div className="studentsCenter">
        <p><Button type="primary" onClick={this.showModal}>添加学生</Button></p>
        <Table
          rowKey="stuId"
          loading={loading}
          dataSource={list}
          columns={columns}
          pagination={pagination}
        />
        <CreateStudent
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          confirmLoading={confirmLoading}
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
export default connect(mapStateToProps)(StudentsCenter);
