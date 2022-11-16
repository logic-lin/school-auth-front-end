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
// import './mock';


const { Row, Col } = Grid;

const gutter = 16;



function Workplace() {
  return (
    <Space size={16} align="start">
      <Button onClick={testAdmin}>test</Button>
    </Space>
  );
}

export default Workplace;
