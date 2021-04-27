import React, { useState } from 'react'
import { Table, Button, Form, Input, Modal, Switch } from 'antd'
import { EditOutlined, CheckOutlined } from '@ant-design/icons'
import { makeExternalUrl } from '../../utils/links'
import Avatar from '../Avatar'
import { getEmployeeLink } from '../../paths'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  GetDevrelsDocument,
  useGetDevrelsQuery,
  useCreateDevrelMutation,
  useUpdateDevrelMutation,
} from '../../queries/devrel'
import message from '../../message'
import { useEmployee } from '../../utils/withEmployee'

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }
`

export default function ArticlesTab({
  isModalVisible,
  handleModalClose,
  handleModalOpen,
  writeAccess,
}: {
  isModalVisible: boolean
  writeAccess: boolean
  handleModalClose: () => void
  handleModalOpen: () => void
}) {
  const user = useEmployee()
  const [form] = Form.useForm()
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedId, setEditedId] = useState('')
  const { data, loading } = useGetDevrelsQuery({ variables: { type: 'ARTICLE' } })
  const [proposeArticle, { loading: createLoading }] = useCreateDevrelMutation({
    onCompleted: () => {
      message.success('Your request has been successfully sent')
      form.resetFields()
      handleModalClose()
    },
    refetchQueries: [{ query: GetDevrelsDocument, variables: { type: 'ARTICLE' } }],
    awaitRefetchQueries: true,
    onError: message.error,
  })
  const [updateArticle, { loading: updateLoading }] = useUpdateDevrelMutation({
    onCompleted: () => {
      message.success('Article has been successfully updated')
      form.resetFields()
      handleModalClose()
    },
    refetchQueries: [{ query: GetDevrelsDocument, variables: { type: 'ARTICLE' } }],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  const articles = data?.devrels.sort((a, b) => (a?.isCompleted ? 1 : -1)) || []

  const columns = [
    {
      title: '',
      key: 'avatar',
      dataIndex: 'employee',
      width: '5%',
      render: (employee: any) => <Avatar employee={employee} />,
    },
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      render: (employee: any) => (
        <Link to={getEmployeeLink(employee?.email)}>{employee?.name}</Link>
      ),
      sorter: (a: any, b: any) => a.employee?.name?.localeCompare(b.employee?.name),
    },
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource',
      sorter: (a: any, b: any) => {
        if (!a.resource && b.resource) return -1
        if (a.resource && !b.resource) return 1
        return a.resource?.localeCompare(b.resource)
      },
    },
    {
      title: 'Theme',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: any, b: any) => {
        if (!a.title && b.title) return -1
        if (a.title && !b.title) return 1
        return a.title?.localeCompare(b.title) || -1
      },
    },
    {
      title: 'Status',
      key: 'isCompleted',
      dataIndex: 'isCompleted',
      render: (isCompleted: boolean, record: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              checkedChildren={<CheckOutlined />}
              checked={isCompleted}
              disabled={(record.employee.id !== user.employee.id && !writeAccess) || updateLoading}
              onChange={value => {
                const article = articles.find(e => e?.id === record.id)
                if (!article?.link) {
                  message.error('Link can not be empty')
                  return
                }
                //@ts-ignore
                article.isCompleted = value
                updateArticle({ variables: { input: { id: record.id, isCompleted: value } } })
              }}
            />
            <span style={{ paddingLeft: '8px', fontStyle: 'italic', color: 'lightgray' }}>
              {!isCompleted ? 'In progress' : 'Completed'}
            </span>
          </div>
        )
      },
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => {
        return link ? <a href={makeExternalUrl(link)}>{link}</a> : ''
      },
    },
    {
      title: '',
      key: 'edit',
      width: '5%',
      render: (_: any, record: any) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          disabled={(record.employee.id !== user.employee.id && !writeAccess) || updateLoading}
          onClick={() => {
            form.setFieldsValue(record)
            setIsEditMode(true)
            setEditedId(record.id)
            handleModalOpen()
          }}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        loading={loading}
        size="small"
        tableLayout="fixed"
        //@ts-ignore
        dataSource={articles}
        pagination={false}
        columns={columns}
        rowKey="id"
      />
      <Modal
        centered
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        width={545}
        title="Article"
        visible={isModalVisible}
        onCancel={() => {
          handleModalClose()
          form.resetFields()
          setIsEditMode(false)
        }}
        destroyOnClose={true}
        footer={null}
      >
        <StyledForm
          form={form}
          layout="vertical"
          onFinish={(values: any) => {
            if (Object.values(form.getFieldsValue()).some(e => !!e)) {
              if (!isEditMode) {
                proposeArticle({
                  variables: {
                    input: {
                      type: 'ARTICLE',
                      ...values,
                    },
                  },
                })
              }
              if (isEditMode) {
                if (!form.isFieldsTouched()) return
                updateArticle({ variables: { input: { id: editedId, ...values } } })
              }
            }
          }}
        >
          <Form.Item label="Resource" name="resource">
            <Input />
          </Form.Item>
          <Form.Item label="Theme" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Link" name="link">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              data-cy="submit"
              type="primary"
              htmlType="submit"
              loading={isEditMode ? updateLoading : createLoading}
              style={{ marginTop: '8px' }}
            >
              {isEditMode ? 'Save' : 'Propose article'}
            </Button>
          </Form.Item>
        </StyledForm>
      </Modal>
    </>
  )
}
