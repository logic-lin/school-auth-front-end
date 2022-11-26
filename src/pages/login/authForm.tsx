import { allowAuth, getApplicationName } from '@/api/application';
import { loginUser } from '@/api/user';
import { getToken, setToken } from '@/utils/token';
import {
  Form,
  Input,
  Button,
  Space,
  Typography,
  Message,
  Divider,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import Paragraph from '@arco-design/web-react/es/Typography/paragraph';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './style/index.module.less';

export default function AuthForm() {
  const [name, setName] = useState('xxx');
  const history = useHistory()
  const appid = history.location.search.match(/appid=([^&]*)/)?.[1] || ""
  const user_token = getToken()

  useEffect(() => {
    getApplicationName(appid).then(res => {
      setName(res.data)
    })
  })

  return (
    <Typography style={{ width: '100%' }}>
      <Typography.Title heading={5}>应用授权确认</Typography.Title>
      <Typography.Paragraph style={{ color: 'gray' }}>是否允许授予用户信息权限给{name}</Typography.Paragraph>
      <Divider />
      <Typography.Paragraph>
        {/* <Form
          layout="vertical"
          action="/api/application/allowAuth"
          method="post"
          initialValues={{ appid: '123' }}
        >
          <Form.Item
            field="appid"
            // style={{ display: 'none' }}
            label="appid"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button long htmlType='submit' type="primary">允许授权</Button>
          </Form.Item>
        </Form> */}
        <form
          action="/api/application/allowAuth"
          method="post"
        >
          <div style={{ display: 'none' }}>
            <input type="text" name="appid" value={appid} />
            <input type="text" name="user_token" value={user_token} />
          </div>
          <Button long htmlType='submit' type="primary">允许授权</Button>
        </form>
      </Typography.Paragraph>
    </Typography>
  );
}
