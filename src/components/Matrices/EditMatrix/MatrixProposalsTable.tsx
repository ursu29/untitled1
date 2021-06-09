import React from 'react'
import { Table, Button, Tooltip, Popconfirm } from 'antd'
import Avatar from '../../Avatar'
import { getEmployeeLink } from '../../../paths'
import { Link } from 'react-router-dom'
import { CheckOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  useResolveMatrixProposalMutation,
  useDeleteMatrixProposalMutation,
  GetMatrixProposalsDocument,
  GetMatrixProposalsQuery,
} from '../../../queries/matrixProposals'
import message from '../../../message'

export default function MatrixProposalsTable({
  proposals,
  matrixId,
  ...props
}: { proposals: GetMatrixProposalsQuery['matrixProposals']; matrixId: string } & Partial<
  React.ComponentProps<typeof Table>
>) {
  const [resolveProposal] = useResolveMatrixProposalMutation({
    refetchQueries: [{ query: GetMatrixProposalsDocument, variables: { matrix: matrixId } }],
    onCompleted: () => message.success('Proposal was resolved'),
    onError: message.error,
  })
  const [deleteProposal] = useDeleteMatrixProposalMutation({
    refetchQueries: [{ query: GetMatrixProposalsDocument, variables: { matrix: matrixId } }],
    onCompleted: () => message.success('Proposal was deleted'),
    onError: message.error,
  })

  type Record = GetMatrixProposalsQuery['matrixProposals'][0]

  const columns = [
    {
      title: 'Author',
      key: 'author',
      width: '15%',
      render: (record: Record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ minWidth: '25px', marginRight: '4px' }}>
            <Avatar employee={record.author} />
          </div>
          <Link to={getEmployeeLink(record.author?.email)} style={{ marginLeft: '8px' }}>
            {record.author?.name}
          </Link>
        </div>
      ),
      sorter: (a: Record, b: Record) => a.author?.name?.localeCompare(b.author?.name),
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      width: '10%',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      width: '10%',
    },
    {
      title: 'Skill',
      dataIndex: 'skill',
      key: 'skill',
      width: '10%',
    },
    {
      title: 'Proposal',
      dataIndex: 'proposal',
      key: 'proposal',
    },
    {
      title: 'Status',
      dataIndex: 'isResolved',
      key: 'isResolved',
      align: 'center',
      width: '95px',
      render: (item: Pick<Record, 'isResolved'>) => (
        <Tooltip placement="right" title={item ? 'Resolved' : 'Open'}>
          {item ? (
            <CheckOutlined style={{ color: 'green', cursor: 'pointer' }} />
          ) : (
            <ExclamationCircleOutlined style={{ color: '#ff6104', cursor: 'pointer' }} />
          )}
        </Tooltip>
      ),
      sorter: (a: Record, b: Record) => (a.isResolved ? 1 : -1),
      filters: [
        { text: 'Open', value: 'open' },
        { text: 'Resolved', value: 'resolved' },
      ],
      onFilter: (value: any, record: any) =>
        value === 'resolved' ? record.isResolved : !record.isResolved,
    },
    {
      title: '',
      align: 'center',
      width: '105px',
      render: (record: Record) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ minWidth: '10px' }}>
            {!record.isResolved && (
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => {
                  resolveProposal({ variables: { id: record.id } })
                }}
              >
                <Button size="small" style={{ marginRight: '16px' }}>
                  Resolve
                </Button>
              </Popconfirm>
            )}
          </div>
          <Tooltip placement="right" title="Delete proposal">
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                deleteProposal({ variables: { id: record.id } })
              }}
            >
              <DeleteOutlined style={{ color: 'gray', cursor: 'pointer' }} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ]

  return (
    <Table
      size="small"
      tableLayout="fixed"
      //@ts-ignore
      dataSource={proposals}
      //@ts-ignore
      columns={columns}
      pagination={{ defaultPageSize: 10 }}
      rowKey="id"
      style={{ marginTop: '48px' }}
      {...props}
    />
  )
}
