import React from 'react';
import { Button, Grid, Space } from '@arco-design/web-react';
import Overview from './overview';
import PopularContents from './popular-contents';
import ContentPercentage from './content-percentage';
import Shortcuts from './shortcuts';
import Announcement from './announcement';
import Carousel from './carousel';
import Docs from './docs';
import styles from './style/index.module.less';
import { testAdmin } from '@/api/admin';
import { Typography } from '@arco-design/web-react';
const { Title, Paragraph, Text } = Typography;
// import './mock';


const { Row, Col } = Grid;

const gutter = 16;



function Workplace() {
  return (
    <Paragraph>
      本系统实现功能
      <ul>
        <li>
          权限控制
          <ul>
            <li>普通用户：拥有用户信息补充，个人账号密码修改，动态口令登录，第三方授权登录（需要认证后的用户），应用申请权限</li>
            <li>管理员：拥有审核用户信息权限</li>
            <li>超级管理：拥有账号管理权限，包含修改账号角色，修改账号密码</li>
          </ul>
        </li>
        <li>账号注册，使用邮箱和手机号做用户唯一标识</li>
        <li>账号+密码方式登录,账号支持学号，手机号，邮箱三种</li>
        <li>用户个人信息补充：补充学号，性别等个人信息，还需要提交审核资料照片，即校卡照片</li>
        <li>用户个人密码修改，需要知道原密码</li>
        <li>
          用户信息审核
          <ul>
            <li>管理员在审核界面审核用户提交的个人信息</li>
            <li>审核通过后用户右上角的tag会显示已认证</li>
            <li>认证后的用户允许使用第三方授权登录</li>
          </ul>
        </li>
        <li>账号管理：超管可以在账号管理界面，修改账号角色，直接重置账号密码，无需知道原密码</li>
        <li>
          动态口令登录
          <ul>
            <li>使用Microsoft Authenticator应用扫描二维码绑定账号，并二次验证动态口令启用该功能</li>
            <li>支持启用后关闭动态口令登录</li>
          </ul>
        </li>
        <li>
          第三方授权登录
          <ul>
            <li>普通用户可以在应用申请界面注册应用，得到应用id和密钥，然后在第三方网站使用本系统提供的openapi获取用户授权信息进行登录</li>
            <li>只有审核通过的用户可以使用第三方授权登录功能</li>
          </ul>
        </li>
      </ul>
    </Paragraph>
  );
}

export default Workplace;
