import React, { useContext, useEffect, useState } from 'react';
import {
  Tooltip,
  Input,
  Avatar,
  Select,
  Dropdown,
  Menu,
  Divider,
  Message,
  Button,
  Tag,
} from '@arco-design/web-react';
import {
  IconLanguage,
  IconNotification,
  IconSunFill,
  IconMoonFill,
  IconUser,
  IconSettings,
  IconPoweroff,
  IconExperiment,
  IconDashboard,
  IconInteraction,
  IconTag,
  IconCheckCircle,
  IconClockCircle,
  IconLock
} from '@arco-design/web-react/icon';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '@/store';
import { GlobalContext } from '@/context';
import useLocale from '@/utils/useLocale';
import Logo from '@/assets/logo.svg';
import MessageBox from '@/components/MessageBox';
import IconButton from './IconButton';
import Settings from '../Settings';
import styles from './style/index.module.less';
import defaultLocale from '@/locale';
import useStorage from '@/utils/useStorage';
import { generatePermission } from '@/routes';
import { clearToken } from '@/utils/token';
import VerifyTag from '../VerifyTag';
import UpdatePasswordModal from '../UpdatePasswordModal';

function Navbar({ show }: { show: boolean }) {
  const t = useLocale();
  const userInfo: any = useSelector((state: GlobalState) => state.userInfo);
  const [visible, setVisible] = useState(false);
  const [_, setUserStatus] = useStorage('userStatus');

  function logout() {
    setUserStatus('logout');
    clearToken()
    window.location.href = '/login';
  }

  function onMenuItemClick(key) {
    if (key === 'logout') {
      logout();
    } else if (key === 'reset-password') {
      setVisible(true);
    }
  }
  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.Item key="reset-password">
        <IconLock className={styles['dropdown-icon']} />
        修改密码
      </Menu.Item>
      <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconLock className={styles['dropdown-icon']} />
            {t['message.seeMore']}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles['dropdown-icon']} />
          {t['menu.dashboard.workplace']}
        </Menu.Item>
      </Menu.SubMenu>

      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        注销
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>Union Auth</div>
        </div>
      </div>
      <UpdatePasswordModal 
        visible={visible} 
        onClose={() => setVisible(false)} 
        onFinish={() => setVisible(false)} 
      />
      <ul className={styles.right}>
        <li>
          <VerifyTag verify_status={userInfo?.verify_status} />
        </li>
        <li></li>
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br">
              <Avatar size={32} style={{ cursor: 'pointer' }}>
                {userInfo.name?.[0] || ''}
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
