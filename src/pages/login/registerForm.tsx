import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
  InputNumber,
  Message,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconEmail, IconLock, IconPhone, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import styles from './style/index.module.less';
import { registerUser } from '@/api/user';
import { setToken } from '@/utils/token';
import { useStore } from 'react-redux';

export default function RegisterForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const store = useStore()
  function register(params) {
    setLoading(true);
    registerUser(params)
      .then((res: any) => {
        Message.success('注册成功');
        setToken(res?.token);
        store.dispatch({
          type: 'update-userInfo',
          payload: { userInfo: res.data },
        });
        history.push('/')
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {
    form.validate().then((values) => {
      delete values.password_confirm;
      register(values);
    });
  }

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>欢迎使用统一认证系统</div>
      <div className={styles['login-form-sub-title']}>
        -注册-
      </div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        form={form}
        initialValues={{ email: '1234@qq.com', password: '1234567890', password_confirm: '1234567890', phone: '13823608777', }}
      >
        <Form.Item
          field="phone"
          label="手机号"
          rules={[{ required: true, message: "手机号不可以为空" }]}
        >
          <Input
            prefix={<IconPhone />}
            placeholder="请输入手机号码"
          />
        </Form.Item>
        <Form.Item
          field="email"
          label="邮箱"
          rules={[{ required: true, message: "邮箱不可以为空" }]}
        >
          <Input
            prefix={<IconEmail />}
            placeholder="请输入邮箱"
          />
        </Form.Item>

        <Form.Item
          field="password"
          label="密码"
          rules={[{ required: true, message: "密码不可以为空" }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item
          field="password_confirm"
          label="密码确认"
          rules={[{ required: true, message: "密码确认不可以为空" }, {
            validator(value, callback) {
              if (value !== form.getFieldValue('password')) callback('确认密码与新密码不一致');
            }
          }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder="请输入密码确认"
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            注册
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
            onClick={() => history.push('/login')}
          >
            返回登录
          </Button>
        </Space>
      </Form>
    </div>
  );
}
