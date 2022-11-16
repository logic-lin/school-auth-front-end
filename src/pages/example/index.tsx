import React from 'react';
import { Typography, Card, Select, Upload, Modal } from '@arco-design/web-react';
import { loginUser, updateUser } from '@/api/user';
import { getToken, setToken } from '@/utils/token';
import {
  Form,
  Input,
  Button,
  Space,
  Message,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconCode, IconEmail, IconIdcard, IconInfo, IconLock, IconMan, IconPen, IconPhone, IconUser } from '@arco-design/web-react/icon';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GlobalState, IUserInfo } from '@/store';
import { GenderOptions } from '@/constrant/options';

const Option = Select.Option;
type UserInfoUpdate = Omit<IUserInfo, 'certificate'> & {
  certificate?: Array<{ url: string }>;
}

function Example() {
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const store = useStore()
  const userInfo = useSelector((state: GlobalState) => {
    const info: UserInfoUpdate = { ...state.userInfo, certificate: state.userInfo.certificate ? [{ url: state.userInfo.certificate }] : [] }
    delete info.permissions
    return info
  });

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      const imgUrl = values.certificate?.[0]?.url || values.certificate?.[0]?.response?.url
      const info: IUserInfo = { ...values, certificate: imgUrl }
      updateUser(info).then(res => {
        Message.success('提交完成')
        store.dispatch({
          type: 'update-userInfo',
          payload: { userInfo: res.data },
        });
      })
    });
  }

  return (
    <Card style={{ height: '80vh' }}>
      <Form
        labelAlign="left"
        ref={formRef}
        initialValues={userInfo}
      >
        <Form.Item
          field="phone"
          label="电话"
          disabled
          rules={[{ required: true, message: "电话不可以为空" }]}
        >
          <Input
            prefix={<IconPhone />}
            placeholder="请输入电话"
          />
        </Form.Item>
        <Form.Item
          field="email"
          label="邮箱"
          disabled
          rules={[{ required: true, message: "邮箱不可以为空" }]}
        >
          <Input
            prefix={<IconEmail />}
            placeholder="请输入邮箱"
          />
        </Form.Item>
        <Form.Item
          field="name"
          label="姓名"
          rules={[{ required: true, message: "姓名不可以为空" }]}
        >
          <Input
            prefix={<IconPen />}
            placeholder="请输入姓名"
          />
        </Form.Item>
        <Form.Item
          field="student_card"
          label="学号"
          rules={[{ required: true, message: "学号不可以为空" }]}
        >
          <Input
            prefix={<IconInfo />}
            placeholder="请输入学号"
          />
        </Form.Item>
        <Form.Item
          field="id_card"
          label="身份证"
          rules={[{ required: true, message: "身份证不可以为空" }]}
        >
          <Input
            prefix={<IconIdcard />}
            placeholder="请输入身份证"
          />
        </Form.Item>
        <Form.Item
          field="gender"
          label="性别"
          rules={[{ required: true, message: "性别不可以为空" }]}
        >
          <Select prefix={<IconUser />} placeholder='请选择性别'>
            {GenderOptions.map((option, index) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='认证图片'
          field='certificate'
          rules={[{ required: true, message: "认证图片不可以为空" }]}
          triggerPropName='fileList'
        >
          <Upload
            listType='picture-card'
            limit={1}
            name='files'
            action='/api/user/upload'
            onPreview={(file) => {
              Modal.info({
                title: '预览',
                content: (
                  <img
                    src={file.url || URL.createObjectURL(file.originFile)}
                    style={{
                      maxWidth: '100%',
                    }}
                  ></img>
                ),
              });
            }}
          />
        </Form.Item>
        <Space size={16} direction="vertical" align="end">
          <Button type="primary" onClick={onSubmitClick} loading={loading}>
            提交审核
          </Button>
        </Space>
      </Form>
    </Card>
  );
}

export default Example;
