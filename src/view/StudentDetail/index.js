import React from 'react';
import { Table, Button, Divider, Modal, message } from 'antd';
import ScoreForm from './form';
import './index.less';
import { connect } from 'react-redux';
import API from '@service/api';

const confirm = Modal.confirm;

class StudentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '学期',
      dataIndex: 'term',
      key: 'term',
      width: 150
    }, {
      title: '学科',
      dataIndex: 'subject',
      key: 'subject',
      width: 150
    }, {
      title: '分数',
      dataIndex: 'mark',
      key: 'mark'
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 130,
      render: (value, row, index) =>
        <div>
          <a onClick={(e) => this.showUpdateModal(row, e)}>修改</a>
          <Divider type="vertical" />
          <a onClick={(e) => this.removeScore(row.scoreId, e)}>删除</a>
        </div>,
    }];
    this.stuId = +this.props.params.id;
    this.score = {};
    this.state = {
      formRef: null,
      updateFormRef: null,
      visible: false,
      upDateVisible: false,
      confirmLoading: false,
      loading: false,
      total: 0,
      current: 1,
      pageSize: 100,
      list: []
    };
  }
  componentWillMount() {
    this._isMounted = true;
  }
  componentDidMount() {
    this.getStudentScore();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  removeScore = (scoreId) => {
    const vm = this;
    confirm({
      title: '删除成绩?',
      content: '该操作将删除成绩',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        API.post('/deleteScoreById', { scoreId }).then(responese => {
          const res = responese.data;
          if (res.code === 0) {
            message.success('删除成功');
            vm.getStudentScore();
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
  getStudentScore = () => {
    API.post('/queryScoreById', {stuId: this.stuId}).then(({data: res}) => {
      if (res.code === 0 && this._isMounted) {
        this.setState({
          list: res.data.studentScore || [],
          // list: [{"scoreId":1,"stuId":2,"term":1,"subject":"数学","mark":100,"createTime":1521982875000},
          // {"scoreId":2,"stuId":2,"term":1,"subject":"语文","mark":89,"createTime":1521982875000},
          // {"scoreId":3,"stuId":2,"term":1,"subject":"英语","mark":78,"createTime":1521982875000}],
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
  onChange = (current, pageSize) => {
    this.getStudentScore(current, pageSize);
    this.setState({
      current,
      pageSize
    });
  }
  onShowSizeChange = (current, pageSize) => {
    this.getStudentScore(current, pageSize);
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
  showUpdateModal = (score) => {
    this.score = score;
    this.setState({
      upDateVisible: true,
    });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // type 0是新增 1是更新
      this.dealScore(0, values);
    });
  }
  handleUpdateCreate = (score) => {
    const form = this.updateFormRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.dealScore(1, values, score.scoreId);
    });
  }
  dealScore = (type, values, scoreId) => {
    let form;
    let url;
    if (type === 0) {
      form = this.formRef.props.form;
      url = '/insertScore';
    } else {
      form = this.updateFormRef.props.form;
      url = '/updateScore';
    }
    this.setState({ confirmLoading: true });
    let { ...data } = values;
    data.stuId = this.stuId;
    scoreId && (data.scoreId = scoreId);
    API.post(url, data).then(({ data:res }) => {
      if (res.code === 0) {
        form.resetFields();
        if (type === 0) {
          this.setState({ visible: false, confirmLoading: false });
        } else {
          this.setState({ upDateVisible: false, confirmLoading: false });
        }
        this.getStudentScore();
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
    const score = this.score;
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
      <div className="studentDetail">
        <p><Button type="primary" onClick={this.showModal}>添加成绩</Button></p>
        <Table
          rowKey="scoreId"
          loading={loading}
          dataSource={list}
          columns={columns}
          pagination={pagination}
          scroll={{ x: 1500 }}
        />
        <ScoreForm
          score={{}}
          title="添加成绩"
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <ScoreForm
          score={score}
          title="更新成绩信息"
          wrappedComponentRef={this.saveUpdateFormRef}
          visible={upDateVisible}
          confirmLoading={confirmLoading}
          onCancel={this.handleUpdateCancel}
          onCreate={(e) => { this.handleUpdateCreate(score); }}
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
export default connect(mapStateToProps)(StudentDetail);
