import React from 'react'
import { QueryType } from '../../queries/getProcessExecutions'
import { Table } from 'antd'

interface Props {
  items?: QueryType['processExecutions']
}

function ProcessList({ items }: Props) {
  return (
    <Table<QueryType['processExecutions'][0]>
      rowKey="id"
      columns={[
        { key: 'type', dataIndex: 'process.type', title: 'Type' },
        { key: 'title', dataIndex: 'process.title', title: 'Name' },
        { key: 'project', dataIndex: 'vacancy.project.title', title: 'Project' },
        {
          key: 'location',
          dataIndex: 'vacancy.location.name',
          title: 'Location',
          render: (_, data) => {
            return <span>{data.vacancy?.locations?.map(i => i.name).join(' ,') ?? '-'}</span>
          },
        },
        { key: 'actions' },
      ]}
      dataSource={items}
      pagination={false}
    />
  )
}

export default ProcessList
