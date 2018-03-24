import React from 'react';
import {  Modal, Form, Input, Radio, InputNumber } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const StudentCreate = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      return (
        <Modal
          confirmLoading={confirmLoading}
          visible={visible}
          title="添加学生"
          okText="确认"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('stuName', {
                rules: [{ required: true, message: '姓名不能为空!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator('stuAge', {
                rules: [{ required: true, message: '年龄不能为空!' }],
              })(
                <InputNumber />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {getFieldDecorator('stuSex')(
                <RadioGroup>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="班级">
              {getFieldDecorator('stuClass', {
                rules: [{ required: true, message: '班级不能为空!' }],
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

export default StudentCreate

