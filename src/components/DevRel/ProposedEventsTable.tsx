import React from 'react'
import { Table, Button, Popconfirm } from 'antd'
import { makeExternalUrl } from '../../utils/links'
import parseStrapiDateFormat from '../../utils/parseStrapiDateFormat'
import {
  GetDevrelsDocument,
  useGetDevrelsQuery,
  useAcceptDevrelMutation,
  useDeleteDevrelMutation,
} from '../../queries/devrel'
import message from '../../message'

export default function ProposedEventsTable() {
  const { data, loading } = useGetDevrelsQuery({ variables: { type: 'EVENT' } })
  const [acceptDevrelEvent] = useAcceptDevrelMutation({
    onCompleted: () => {
      message.success('Event has been accepted')
    },
    refetchQueries: [{ query: GetDevrelsDocument, variables: { type: 'EVENT' } }],
    awaitRefetchQueries: true,
    onError: message.error,
  })
  const [deleteDevrelEvent] = useDeleteDevrelMutation({
    onCompleted: () => {
      message.success('Event has been declined')
    },
    refetchQueries: [{ query: GetDevrelsDocument, variables: { type: 'EVENT' } }],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  const events =
    data?.devrels
      .filter(e => e.isDraft)
      .map(({ dateStart, dateEnd, ...e }) => ({
        ...e,
        date:
          dateStart === dateEnd
            ? parseStrapiDateFormat(dateStart)
            : parseStrapiDateFormat(dateStart) + ' — ' + parseStrapiDateFormat(dateEnd),
      })) || []

  const columns = [
    {
      title: '',
      key: 'whitespace',
      width: '5%',
    },
    {
      title: 'Conference name',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => {
        return link ? <a href={makeExternalUrl(link)}>{link}</a> : ''
      },
      sorter: (a: any, b: any) => {
        if (!a.link && b.link) return -1
        if (a.link && !b.link) return 1
        return a.link.localeCompare(b.link)
      },
    },
    {
      title: 'Date of event',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: any, b: any) => a.date.localeCompare(b.date),
    },
    {
      title: '',
      key: 'accept/decline',
      render: (_: any, record: any) => {
        return (
          <div>
            <Popconfirm
              placement="top"
              title={'Are you sure?'}
              onConfirm={() => acceptDevrelEvent({ variables: { id: record.id } })}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" style={{ marginRight: '16px' }}>
                Accept
              </Button>
            </Popconfirm>
            <Popconfirm
              placement="top"
              title={'Are you sure?'}
              onConfirm={() => deleteDevrelEvent({ variables: { id: record.id } })}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small">
                Decline
              </Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  return (
    <Table
      loading={loading}
      size="small"
      tableLayout="fixed"
      //@ts-ignore
      dataSource={events}
      pagination={false}
      columns={columns}
      rowKey="id"
    />
  )
}
