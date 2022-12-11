import { loginUser, loginUserByCode } from '@/api/user';
import { getToken, setToken } from '@/utils/token';
import {
  Form,
  Input,
  Button,
  Space,
  Message,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconCode, IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './style/index.module.less';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const store = useStore()


  function login(params) {
    setLoading(true);
    loginUserByCode(params.account, params.code).then((res: any) => {
      setToken(res?.token);
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data },
      });
      Message.success('登陆成功')
      const redirectUrl = history.location.search.match(/redirect=([^&]*)/)?.[1] || ""
      console.log(redirectUrl, history.location.search)
      history.push('/' + redirectUrl)
    }).finally(() => {
      setLoading(false)
    })
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>欢迎使用统一认证系统</div>
      <div className={styles['login-form-sub-title']}>
        -请登录-
      </div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ account: 'root@super.com' }}
      >
        <Form.Item
          field="account"
          label="账户"
          rules={[{ required: true, message: "账户不可以为空" }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder="请输入手机号/邮箱/学号"
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="code"
          label="口令"
          rules={[{ required: true, message: "口令不可以为空" }]}
        >
          <Input.Password
            prefix={<IconCode />}
            placeholder="请输入口令"
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={0} direction="vertical">
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            登录
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
            onClick={() => history.push('/login')}
          >
            密码登录
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
            onClick={() => history.push('/register')}
          >
            没有账号？立即注册
          </Button>
        </Space>
      </Form>
    </div>
  );
}
