import React from 'react'
import { QueryType } from '../../queries/getProcessExecutions'
import { Table } from 'antd'
import { Button, Popconfirm } from 'antd'
import PageContent from '../UI/PageContent'
import AbortProcessExecution from './AbortProcessExecution'
import { getProcessExecutionLink } from '../../paths'
import { Link } from 'react-router-dom'

interface Props {
  items?: QueryType['processExecutions']
}

function ProcessList({ items }: Props) {
  if (!items?.length) {
    return <PageContent>No processes found</PageContent>
  }

  return (
    <Table<QueryType['processExecutions'][0]>
      rowKey="id"
      columns={[
        { key: 'type', dataIndex: 'process.type', title: 'Type' },
        { key: 'title', dataIndex: 'process.title', title: 'Name' },
        { key: 'project', dataIndex: 'vacancy.project.name', title: 'Project' },
        {
          key: 'location',
          dataIndex: 'vacancy.location.name',
          title: 'Location',
          render: (_, process) => {
            return <span>{process.vacancy?.locations?.map(i => i.name).join(' ,') ?? '-'}</span>
          },
        },
        {
          key: 'actions',
          align: 'right',
          render: (_, process) => {
            return (
              <>
                <Link to={getProcessExecutionLink(process.id)}>
                  <Button>Open</Button>
                </Link>{' '}
                <AbortProcessExecution id={process.id}>
                  {(abort: any) => {
                    return (
                      <Popconfirm
                        placement="top"
                        title={'Are you sure?'}
                        onConfirm={abort}
                        okText="Yes"
                        cancelText="No"
                      >
                        <span>
                          <Button type="danger">Abort</Button>
                        </span>
                      </Popconfirm>
                    )
                  }}
                </AbortProcessExecution>
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
