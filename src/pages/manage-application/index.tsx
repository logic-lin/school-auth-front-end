
import { getApplicationList } from '@/api/application';
import { Descriptions, Table, Button, Image, Message, Modal } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import React, { useEffect, useState } from 'react';
import CreateModal from './createModal';

export interface ApplictionType {
  id: string;
  name: string;
  description: string;
  secret: string;
  user_id: string;
  callback_url: string;
}

function getDescription(record: ApplictionType) {
  return [
    {
      label: '应用id',
      value: record.id || '-',
    },
    {
      label: '密钥',
      value: record.secret || '-',
    },
    {
      label: '名称',
      value: record.name || '-',
    },
    {
      label: '描述',
      value: record.description || '-',
    },
    {
      label: '回调链接',
      value: record.callback_url || '-',
    },
  ]
}
const App = () => {
  const [data, setData] = useState<ApplictionType[]>([]);
  const [loading, setLoading] = useState(false);

  function fetchList() {
    setLoading(true)
    getApplicationList().then(({ data }) => {
      console.log(data)
      setData(data);
    }).finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchList()
  }, [])

  const columns: ColumnProps<ApplictionType>[] = [
    {
      title: '应用名称',
      dataIndex: 'name',
    },
    {
      title: '应用id',
      dataIndex: 'id',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ];

  function ExpendDescription({ record }) {
    const descData = getDescription(record);
    return (<div>
      <Descriptions
        title='详细信息'
        data={descData}
        column={1}
        layout='inline-vertical'
      />
    </div>)
  }
  return (
    <div style={{ textAlign: 'right' }}>
      <CreateModal onFinish={fetchList} />
      <Table
        columns={columns}
        loading={loading}
        data={data}
        expandedRowRender={(record) => <ExpendDescription record={record} />}
        scroll={{ x: 400 }}
        pagination={false}
        rowKey="id"
        expandProps={{
          expandRowByClick: true,
        }}
      />
    </div>
  );
};

export default App;