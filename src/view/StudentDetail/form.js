import React from 'react';
import {  Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

const StudentCreate = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, confirmLoading, title, score } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      return (
        <Modal
          confirmLoading={confirmLoading}
          visible={visible}
          title={title}
          okText="确认"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem {...formItemLayout} label="学期">
              {getFieldDecorator('term', {
                initialValue: score.term,
                rules: [{ required: true, message: '学期不能为空!' }],
              })(
                <InputNumber />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="学科">
              {getFieldDecorator('subject', {
                initialValue: score.subject,
                rules: [{ required: true, message: '学科不能为空!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="成绩">
              {getFieldDecorator('mark', {
                initialValue: score.mark,
                rules: [{ required: true, message: '成绩不能为空!' }],
              })(
                <InputNumber />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default StudentCreate;

