import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import LoginForm from './form';
import RegisterForm from './registerForm';
import styles from './style/index.module.less';
import { Button } from '@arco-design/web-react';

function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          {isRegister ? <LoginForm /> :
            <RegisterForm />}
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
            onClick={() => setIsRegister((v) => !v)}
          >
            {isRegister ? '没有账号？立即注册' : '返回登录'}
          </Button>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
