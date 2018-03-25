import React from 'react';
import {  Modal, Form, Input, Radio, InputNumber, Cascader } from 'antd';
import options from '../../lib/cascader-address-options';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const StudentCreate = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, confirmLoading, title, student } = this.props;
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
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('stuName', {
                initialValue: student.stuName,
                rules: [{ required: true, message: '姓名不能为空!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator('stuAge', {
                initialValue: student.stuAge,
                rules: [{ required: true, message: '年龄不能为空!' }],
              })(
                <InputNumber />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {getFieldDecorator('stuSex', {
                initialValue: student.stuSex,
                rules: [{ required: true, message: '性别不能为空!' }],
              })(
                <RadioGroup>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="专业">
              {getFieldDecorator('specialty', {
                initialValue: student.specialty,
                rules: [{ required: true, message: '专业不能为空!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="班级">
              {getFieldDecorator('classes', {
                initialValue: student.classes,
                rules: [{ required: true, message: '班级不能为空!' }],
              })(
                <InputNumber />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="手机号">
              {getFieldDecorator('mobile', {
                initialValue: student.mobile,
                rules: [{ type: 'string', pattern: /^1\d{10}$/ , required: true, message: '请填写正确的手机号!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="父亲">
              {getFieldDecorator('fatherName', {
                initialValue: student.fatherName,
                rules: [],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="母亲">
              {getFieldDecorator('motherName', {
                initialValue: student.motherName,
                rules: [],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="省市区">
              {getFieldDecorator('residence', {
                initialValue: student.provice ? [student.provice, student.city, student.district] : [],
                rules: [{ type: 'array', required: true, message: '省市区不能为空!' }],
              })(
                <Cascader options={options} placeholder="请选择" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="详细地址">
              {getFieldDecorator('address', {
                initialValue: student.address,
                rules: [{ required: true, message: '详细地址不能为空!' }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default StudentCreate;

