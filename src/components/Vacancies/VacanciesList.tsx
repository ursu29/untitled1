import React from 'react'
import { QueryType } from '../../queries/getVacancies'
import { Table } from 'antd'

interface Props {
  items?: QueryType['vacancies']
}

function ProcessList({ items }: Props) {
  console.log('items', items)
  return (
    <Table<QueryType['vacancies'][0]>
      rowKey="id"
      columns={[
        { key: 'position', dataIndex: 'position', title: 'Position' },
        { key: 'client', title: 'Client' },
        { key: 'team', dataIndex: 'project.title', title: 'Team' },
        {
          key: 'location',
          dataIndex: '.location.name',
          title: 'Location',
          render: (_, i) => {
            return <span>{i.locations?.map(i => i.name).join(' ,') ?? '-'}</span>
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
