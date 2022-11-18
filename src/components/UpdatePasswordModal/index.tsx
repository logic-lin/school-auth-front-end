import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message } from '@arco-design/web-react';
import { updatePassword } from '@/api/user';
import { IconLock } from '@arco-design/web-react/icon';
const FormItem = Form.Item;

function UpdatePasswordModal({ visible, isAdmin = false, onFinish, onClose }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then(values => {
      console.log(values)
      setConfirmLoading(true);
      updatePassword(values).then(() => {
        Message.success('更改成功')
        onFinish()
      }).finally(() => {
        setConfirmLoading(false);
      })
    })
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <div>
      <Modal
        title='Add User'
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => onClose()}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' },
          }}
        >
          <Form.Item
            field="old_password"
            label="旧密码"
            rules={[{ required: true, message: "旧密码不可以为空" }]}
          >
            <Input.Password
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            field="password"
            label="新密码"
            rules={[{ required: true, message: "新密码不可以为空" }]}
          >
            <Input.Password
              placeholder="请输入新密码"
            />
          </Form.Item>
          <Form.Item
            field="password_confirm"
            label="确认密码"
            rules={[{
              required: true, message: "确认密码不可以为空"}, 
              {
                validator(value, callback) {
                if (value !== form.getFieldValue('password')) callback('确认密码与新密码不一致');
              }
            }]}
          >
            <Input.Password
              placeholder="请输入确认密码"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdatePasswordModal;