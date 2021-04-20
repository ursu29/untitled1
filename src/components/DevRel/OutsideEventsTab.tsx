import React from 'react'
import { Table, Button, Popconfirm, Form, Input, Modal, DatePicker } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { makeExternalUrl } from '../../utils/links'
import styled from 'styled-components'
import {
  GetDevrelsDocument,
  useGetDevrelsQuery,
  useCreateDevrelMutation,
  useDeleteDevrelMutation,
  useProposeDevrelEventMutation,
  useParticipateDevrelEventMutation,
} from '../../queries/devrel'
import message from '../../message'

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }
`
const rules = [{ required: true, message: 'This is required field!' }]

export default function OutsideEventsTab({
  isModalVisible,
  modalMode,
  writeAccess,
  handleModalClose,
}: {
  modalMode?: 'propose' | 'create'
  isModalVisible: boolean
  writeAccess: boolean
  handleModalClose: () => void
}) {
  const [form] = Form.useForm()
  const { data, loading } = useGetDevrelsQuery({ variables: { type: 'EVENT' } })
  const [createDevrelEvent, { loading: createDevrelEventLoading }] = useCreateDevrelMutation({
    onCompleted: () => {
      message.success('Event has been successfully created')
      form.resetFields()
      handleModalClose()
    },
    refetchQueries: [{ query: GetDevrelsDocument, variables: { type: 'EVENT' } }],
    awaitRefetchQueries: true,
    onError: message.error,
  })
  const [deleteDevrelEvent] = useDeleteDevrelMutation({
    onCompleted: () => {
      message.success('Event has been removed')
    },
    refetchQueries: [{ query: GetDevrelsDocument, variables: { type: 'EVENT' } }],
    awaitRefetchQueries: true,
    onError: message.error,
  })
  const [proposeDevrelEvent] = useProposeDevrelEventMutation({
    onCompleted: () => {
      message.success('Your propose has been successfully sent')
      form.resetFields()
      handleModalClose()
    },
    onError: message.error,
  })
  const [participateDevrelEvent] = useParticipateDevrelEventMutation({
    onCompleted: () => {
      message.success('Your request has been successfully sent')
    },
    onError: message.error,
  })

  const events =
    //@ts-ignore
    data?.devrels.map(({ dateStart, dateEnd, ...e }) => ({
      ...e,
      date: dateStart === dateEnd ? dateStart : dateStart + ' — ' + dateEnd,
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
      sorter: (a: any, b: any) => a.link.localeCompare(b.link),
    },
    {
      title: 'Date of event',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: any, b: any) => a.date.localeCompare(b.date),
    },
    {
      title: 'Participate',
      key: 'participate',
      render: (_: any, record: any) => {
        return (
          <Button
            type="primary"
            size="small"
            onClick={() => participateDevrelEvent({ variables: { id: record.id } })}
          >
            Participate as a Speaker
          </Button>
        )
      },
    },
    {
      title: '',
      key: 'remove',
      width: writeAccess ? '5%' : 0,
      render: (_: any, record: any) =>
        writeAccess ? (
          <Button
            type="text"
            icon={
              <Popconfirm
                placement="left"
                title={'Are you sure you want to delete the event?'}
                onConfirm={() => deleteDevrelEvent({ variables: { id: record.id } })}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>
            }
          />
        ) : null,
    },
  ]

  return (
    <>
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

      <Modal
        centered
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        width={545}
        title="Outside event"
        visible={isModalVisible}
        onCancel={() => {
          handleModalClose()
          form.resetFields()
        }}
        destroyOnClose={true}
        footer={null}
      >
        <StyledForm
          form={form}
          layout="vertical"
          onFinish={({ date, ...values }: any) =>
            modalMode === 'create'
              ? createDevrelEvent({
                  variables: {
                    input: {
                      type: 'EVENT',
                      ...values,
                      dateStart: date?.[0],
                      dateEnd: date?.[1],
                    },
                  },
                })
              : proposeDevrelEvent({
                  variables: {
                    input: {
                      ...values,
                      dateStart: date?.[0],
                      dateEnd: date?.[1],
                    },
                  },
                })
          }
        >
          <Form.Item label="Conference name" name="title" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={rules}>
            <DatePicker.RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Link" name="link">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createDevrelEventLoading}
              style={{ marginTop: '8px' }}
            >
              {modalMode === 'propose' ? 'Propose Event +' : 'Add New'}
            </Button>
          </Form.Item>
        </StyledForm>
      </Modal>
    </>
  )
}
