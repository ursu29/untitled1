import React from 'react'
import { QueryType } from '../../queries/getVacancies'
import { Table, Button, Divider } from 'antd'
import Rotate from './Rotate'

interface Props {
  items?: QueryType['vacancies']
}

function ProcessList({ items }: Props) {
  return (
    <Table<QueryType['vacancies'][0]>
      rowKey="id"
      columns={[
        { key: 'position', dataIndex: 'position', title: 'Position' },
        { key: 'client', dataIndex: 'customer', title: 'Client' },
        { key: 'team', dataIndex: 'project.name', title: 'Team' },
        {
          key: 'location',
          dataIndex: '.location.name',
          title: 'Location',
          render: (_, i) => {
            return <span>{i.locations?.map(i => i.name).join(' ,') ?? '-'}</span>
          },
        },
        {
          key: 'actions',
          align: 'right',
          render: (_, vacancy) => {
            return (
              <>
                <Rotate vacancy={vacancy} />
                <Divider type="vertical" />
                <Button icon="form">Send CV</Button>
              </>
            )
          },
        },
      ]}
      dataSource={items}
      pagination={false}
    />
  )
}

export default ProcessList
