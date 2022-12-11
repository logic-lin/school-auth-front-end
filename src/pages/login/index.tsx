import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import LoginForm from './form';
import RegisterForm from './registerForm';
import AuthForm from './authForm';
import PasswordlessForm from './passwordlessForm';
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
  const isPasswordless = history.location.pathname === '/passwordless';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          {isLogin && <LoginForm />}
          {isRegister && <RegisterForm />}
          {isAuth && <AuthForm />}
          {isPasswordless && <PasswordlessForm />}
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
