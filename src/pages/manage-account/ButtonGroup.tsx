import { getAccountList, updateRole, verifyAccount } from '@/api/admin';
import UpdatePasswordModal from '@/components/UpdatePasswordModal';
import VerifyTag from '@/components/VerifyTag';
import { VerifyStatus } from '@/constrant/enum';
import { GenderMap, RoleMap, RoleOptions } from '@/constrant/options';
import { IUserInfo } from '@/store';
import { Descriptions, Table, Button, Image, Message, Modal, Select } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import React, { useEffect, useState } from 'react';

function ButtonGroup({ userInfo, onRefresh }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [roleVisible, setRoleVisible] = useState(false);
  const [selectRole, setSelectRole] = useState(userInfo.role);
  const [loading, setLoading] = useState(false);
  function onSubmitRole() {
    if (!selectRole) {
      Message.info('请选择角色');
      return;
    }
    setLoading(true);
    updateRole(userInfo.id, selectRole).then(() => {
      Message.success('修改成功')
      setRoleVisible(false)
      onRefresh()
    }).finally(() => setLoading(false))
  }
  return (<div onClick={e => e.stopPropagation()}>
    <UpdatePasswordModal
      visible={passwordVisible}
      id={userInfo.id}
      onClose={() => setPasswordVisible(false)}
      onFinish={() => setPasswordVisible(false)
      } />
    <Modal
      title='修改角色'
      visible={roleVisible}
      maskClosable={false}
      onOk={onSubmitRole}
      confirmLoading={loading}
      onCancel={() => setRoleVisible(false)}
    >
      <Select options={RoleOptions} value={selectRole} onChange={v => {
        setSelectRole(v)
      }}>
      </Select>
    </Modal>
    <div>
      <Button type="text" onClick={() => setPasswordVisible(true)}>重置密码</Button>
      <Button type="text" onClick={() => setRoleVisible(true)}>修改角色</Button>
    </div>
  </div>)
}

export default ButtonGroup;