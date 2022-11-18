import { getAccountList, verifyAccount } from '@/api/admin';
import VerifyTag from '@/components/VerifyTag';
import { VerifyStatus } from '@/constrant/enum';
import { GenderMap } from '@/constrant/options';
import { IUserInfo } from '@/store';
import { Descriptions, Table, Button, Image, Message } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import React, { useEffect, useState } from 'react';
type UserInfoType = IUserInfo & {
  id: string;
}

const columns: ColumnProps<UserInfoType>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '审核状态',
    dataIndex: 'verify_status',
    width: 100,
    render(col) {
      console.log(col)
      return <VerifyTag verify_status={col} />
    }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: 140,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 180,
  },
  {
    title: '学号',
    dataIndex: 'student_card',
    width: 120,
  },
  {
    title: '身份证',
    dataIndex: 'id_card',
    width: 160,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
    render(col) {
      return GenderMap[col] || '-'
    }
  },
];
function getDescription(record: UserInfoType) {
  return [
    {
      label: 'id',
      value: record.id || '-',
    },
    {
      label: '姓名',
      value: record.name || '-',
    },
    {
      label: '审核状态',
      value: <VerifyTag verify_status={record.verify_status} />,
    },
    {
      label: '电话',
      value: record.phone || '-',
    },
    {
      label: '邮箱',
      value: record.email || '-',
    },
    {
      label: '学号',
      value: record.student_card || '-',
    },
    {
      label: '身份证',
      value: record.id_card || '-',
    },
    {
      label: '性别',
      value: GenderMap[record.gender] || '-',
    },
    {
      label: '认证资料',
      value: record.certificate ? <Image
        width={200}
        previewProps={{
          // getPopupContainer: () => ref.current,
          closable: true,
        }}
        src={record.certificate}
        alt='认证资料图片'
      /> : '-',
    },
  ]
}
const App = () => {
  const [data, setData] = useState<UserInfoType[]>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 20
  function fetchList(page = 1) {
    setLoading(true)
    getAccountList(page, pageSize).then(({ data }) => {
      console.log(data)
      setCurrent(data.page);
      setTotal(data.total);
      setData(data.data);
    }).finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchList()
  }, [])
  function handlePageChange({ current }) {
    fetchList(current)
  }
  function onVerify(id: string, verify_status: VerifyStatus) {
    verifyAccount(id, verify_status).then(() => {
      Message.success('提交成功');
      fetchList(current);
    })
  }
  function ExpendDescription({ record }) {
    const descData = getDescription(record);
    const disabled = record.verify_status === null
    return (<div>
      <Descriptions
        title='详细信息'
        data={descData}
        column={1}
        layout='inline-vertical'
      />
      <Button status='success' onClick={() => onVerify(record.id, VerifyStatus.Allow)} style={{ marginRight: '20px' }} disabled={disabled}>通过</Button>
      <Button status='danger' onClick={() => onVerify(record.id, VerifyStatus.Refuse)} disabled={disabled}>拒绝</Button>
    </div>)
  }
  return (
    <Table
      columns={columns}
      loading={loading}
      data={data}
      expandedRowRender={(record) => <ExpendDescription record={record} />}
      scroll={{ x: 1200 }}
      rowKey="id"
      pagination={{
        current,
        pageSize,
        total
      }}
      onChange={handlePageChange}
      expandProps={{
        expandRowByClick: true,
      }}
    />
  );
};

export default App;