import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import LoginForm from './form';
import RegisterForm from './registerForm';
import AuthForm from './authForm';
import styles from './style/index.module.less';
import { Button } from '@arco-design/web-react';
import { useHistory, useParams } from 'react-router';

function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  // const [isRegister, setIsRegister] = useState(true);
  const history = useHistory()
  const isAuth = history.location.pathname === '/auth';
  const isLogin = history.location.pathname === '/login';
  const isRegister = history.location.pathname === '/register';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          {isLogin && <LoginForm />}
          {isRegister && <RegisterForm />}
          {isAuth && <AuthForm />}
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
