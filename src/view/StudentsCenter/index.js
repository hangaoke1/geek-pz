import React from 'react';
import API from '@service/api';
import { Table, Button, Divider, Modal, message } from 'antd';
import { connect } from 'react-redux';
import StudentModal from './createFrom';
import './index.less';
import config from '../../config.js'

const confirm = Modal.confirm;

class StudentsCenter extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'ID',
      dataIndex: 'stuId',
      key: 'stuId',
      width: 80
    }, {
      title: '姓名',
      dataIndex: 'stuName',
      key: 'stuName',
      width: 100
    }, {
      title: '班级',
      dataIndex: 'classes',
      key: 'classes',
      width: 80
    }, {
      title: '性别',
      dataIndex: 'stuSex',
      key: 'stuSex',
      width: 80,
      render: (value, row, index) => {
        if (value === 0) {
          return <span>男</span>;
        } else if (value === 1) {
          return <span>女</span>;
        } else {
          return <span>不详</span>;
        }
      }
    }, {
      title: '年龄',
      dataIndex: 'stuAge',
      key: 'stuAge',
      width: 80
    }, {
      title: '专业',
      dataIndex: 'specialty',
      key: 'specialty',
      width: 150
    }, {
      title: '父亲',
      dataIndex: 'fatherName',
      key: 'fatherName',
      width: 100
    }, {
      title: '母亲',
      dataIndex: 'motherName',
      key: 'motherName',
      width: 100
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      render: (value, row, index) => {
        const { provice, city, district, address } = row;
        return <span>{provice} {city} {district} {address}</span>;
      }
    }, {
      title: '联系电话',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 300
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 180,
      render: (value, row, index) => <div><a onClick={(e) => this.goStudent(row, e)}>成绩管理</a><Divider type="vertical" /><a onClick={(e) => this.showUpdateModal(row, e)}>修改</a><Divider type="vertical" /><a onClick={(e) => this.removeStudent(row.stuId, e)}>删除</a></div>,
    }];
    this.student = {};
    this.state = {
      formRef: null,
      updateFormRef: null,
      visible: false,
      upDateVisible: false,
      confirmLoading: false,
      loading: false,
      total: 0,
      current: 1,
      pageSize: 10,
      list: []
    };
  }
  componentWillMount() {
    this._isMounted = true;
  }
  componentDidMount() {
    this.getStudents();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  goStudent = (student, e) => {
    let stuId = student.stuId;
    this.props.router.push(`/studentDetail/${stuId}`);
  }
  getStudents = (pageNo, pageSize) => {
    pageNo = pageNo ? pageNo : this.state.current;
    pageSize = pageSize ? pageSize : this.state.pageSize;
    this.setState({
      loading: true
    });
    API.post('/queryStudent', {
      pageNo, pageSize
    }).then(responese => {
      const res = responese.data;
      if (res.code === 0 && this._isMounted) {
        this.setState({
          list: res.data.studentInfos || [],
          loading: false
        });
      }
    }).catch(err => {
      console.log(err);
      this.setState({
        loading: false,
        list: []
      });
    });
  }
  removeStudent = (stuId) => {
    const vm = this;
    confirm({
      title: '删除学生?',
      content: '该操作将删除学生',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        API.post('/removeStudent', { stuId }).then(responese => {
          const res = responese.data;
          if (res.code === 0) {
            message.success('删除成功');
            vm.getStudents();
          }
        }).catch(err => {
          console.log(err);
          message.error('删除失败');
        });
      },
      onCancel() {
        console.log('Cancel');
      },
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
  showUpdateModal = (student) => {
    this.student = student;
    this.setState({
      upDateVisible: true,
    });
  }
  exportExcel = () => {
    window.open(`${config.JavaService}/api/exportExcel`)
  }
  handleUpdateCreate = (student) => {
    const form = this.updateFormRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.dealStudent(1, values, student.stuId);
    });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.dealStudent(0, values);
    });
  }
  dealStudent = (type, values, stuId) => {
    let form;
    let url;
    if (type === 0) {
      form = this.formRef.props.form;
      url = '/createStudent';
    } else {
      form = this.updateFormRef.props.form;
      url = '/updateStudent';
    }
    this.setState({ confirmLoading: true });
    let { residence, ...data } = values;
    data.provice = residence[0];
    data.city = residence[1];
    data.district = residence[2];
    stuId && (data.stuId = stuId);
    API.post(url, data).then(({ data:res }) => {
      if (res.code === 0) {
        form.resetFields();
        if (type === 0) {
          this.setState({ visible: false, confirmLoading: false });
        } else {
          this.setState({ upDateVisible: false, confirmLoading: false });
        }
        this.getStudents();
      } else {
        message.error('操作失败');
        this.setState({ confirmLoading: false });
      }
    }).catch(err => {
      console.log(err);
      this.setState({ confirmLoading: false });
    });
  }
  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({
      visible: false,
    });
  }
  handleUpdateCancel = () => {
    const form = this.updateFormRef.props.form;
    form.resetFields();
    this.setState({
      upDateVisible: false,
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  saveUpdateFormRef = (formRef) => {
    this.updateFormRef = formRef;
  }
  render() {
    const { total, current, pageSize, loading, list, visible, confirmLoading, upDateVisible } = this.state;
    const columns = this.columns;
    const student = this.student;
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
        <p className="btn-wrap">
          <Button type="primary" onClick={this.showModal}>添加学生</Button>
          <Button type="danger" onClick={this.exportExcel}>导出excel</Button>
        </p>
        <Table
          rowKey="stuId"
          loading={loading}
          dataSource={list}
          columns={columns}
          pagination={pagination}
          scroll={{ x: 1500 }}
        />
        <StudentModal
          student={{}}
          title="添加学生"
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <StudentModal
          student={student}
          title="更新学生信息"
          wrappedComponentRef={this.saveUpdateFormRef}
          visible={upDateVisible}
          confirmLoading={confirmLoading}
          onCancel={this.handleUpdateCancel}
          onCreate={(e) => { this.handleUpdateCreate(student); }}
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
