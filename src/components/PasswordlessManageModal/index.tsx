import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, Input, Message, Tag, Button, Switch } from '@arco-design/web-react';
import { verifyOptSecret, getOptUrl, disablePasswordless } from '@/api/user';
import QRCode from 'qrcode.react';
import { useSelector, useStore } from 'react-redux';
import { GlobalState } from '@/store';

function UpdatePasswordModal({ visible, onFinish, onClose }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [url, setUrl] = useState();
  const store = useStore()
  const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const enable_passwordless = userInfo.enable_passwordless
  function onOk() {
    form.validate().then(values => {
      setConfirmLoading(true);
      verifyOptSecret(values?.code).then(() => {
        Message.success('验证成功')
        store.dispatch({
          type: 'update-userInfo',
          payload: { userInfo: { ...userInfo, enable_passwordless: true } },
        });
        onFinish()
      }).finally(() => {
        setConfirmLoading(false)
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

  useEffect(() => {
    getOptUrl().then(res => {
      console.log(res);
      setUrl(res.data)
    })
  }, [])

  useEffect(() => {
    if (visible) return;
    form.resetFields()
  }, [visible])

  function handleDisable() {
    disablePasswordless().then(() => {
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: { ...userInfo, enable_passwordless: false } },
      });
      Message.success('关闭成功')
    })
  }
  return (
    <Modal
      title='无密码认证管理'
      visible={visible}
      onOk={onOk}
      maskClosable={false}
      unmountOnExit={true}
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
          label="状态"
        >
          <Switch checkedText='已启用' uncheckedText='未启用' checked={enable_passwordless}
            disabled={!enable_passwordless}
            onChange={handleDisable} />
        </Form.Item>
        <Form.Item
          label="二维码"
        >
          <QRCode
            value={url} //value参数为字符串类型
            size={200} //二维码的宽高尺寸
            fgColor="#000000"  //二维码的颜色
          />
        </Form.Item>
        <Form.Item
          field="code"
          label="验证口令"
          rules={[{
            required: true, message: "验证口令不可以为空"
          }]}
        >
          <Input
            placeholder="请输入验证口令"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdatePasswordModal;