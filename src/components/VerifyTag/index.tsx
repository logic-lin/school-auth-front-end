import React from 'react';
import { Tag } from '@arco-design/web-react';
import { VerifyStatus } from '@/constrant/enum';
import { IconCheckCircle, IconClockCircle, IconCloseCircle, IconExclamationCircle } from '@arco-design/web-react/icon';


const mp = {
  [VerifyStatus.Allow]: { color: 'green', title: '已认证', icon: < IconCheckCircle /> },
  [VerifyStatus.Pending]: { color: 'blue', title: '待审核', icon: < IconClockCircle /> },
  [VerifyStatus.Refuse]: { color: 'red', title: '认证失败', icon: <IconCloseCircle /> }
}

function VerifyTag({ verify_status }) {
  const config = mp[verify_status] || {
    color: 'gray', title: '待认证', icon: <IconExclamationCircle />
  }
  return (<Tag color={config.color} icon={config.icon}> {config.title} </Tag>)
}

export default VerifyTag;
