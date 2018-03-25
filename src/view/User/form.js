import React from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
      };
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="确定"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem {...formItemLayout} label="旧密码">
              {getFieldDecorator('oldPass', {
                rules: [{ required: true, message: '旧密码不能为空!' }],
              })(
                <Input type="password" placeholder="oldPass"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="新密码">
              {getFieldDecorator('newPass', {
                rules: [{ required: true, message: '新密码不能为空!' }],
              })(
                <Input type="password" placeholder="newPass"/>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default CollectionCreateForm
