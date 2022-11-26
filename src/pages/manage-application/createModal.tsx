import React, { useState } from 'react';
import { Modal, Button, Form, Input, Message } from '@arco-design/web-react';
import { createApplication } from '@/api/application';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
function CreateModal({ onFinish }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      console.log(res);
      createApplication(res).then(() => {
        Message.success('创建成功');
        setVisible(false);
        setConfirmLoading(false);
        onFinish();
      })
    });
  }

  return (
    <div>
      <Button onClick={() => setVisible(true)} type='primary' style={{ marginBottom: 15 }}>
        创建应用
      </Button>
      <Modal
        title='创建应用'
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          validateTrigger="onBlur"
          form={form}
          labelCol={{
            style: { flexBasis: 120 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 120px)' },
          }}
        >
          <FormItem label='应用名称' field='name' rules={[{ required: true, message: "名称不可以为空" }]}>
            <Input placeholder='请输入应用名称' />
          </FormItem>
          <FormItem label='回调链接' field='callback_url'
            rules={[{ required: true, message: "回调链接不可以为空" },
            {
              match: /^https?:\/\/(localhost:[0-9]+|[\w\-:]+(\.[\w\-]+)+)([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
              message: '链接格式不正确，仅支持http/https协议,支持ip和localhost'
            }]}>
            <Input placeholder='请输入回调链接' />
          </FormItem>
          <FormItem label='描述' field='description'>
            <TextArea placeholder='请输入应用描述' />
          </FormItem>
        </Form>
      </Modal>
    </div >
  );
}

export default CreateModal;