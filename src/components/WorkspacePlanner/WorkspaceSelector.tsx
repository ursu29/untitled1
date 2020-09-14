//@ts-nocheck
import React, { useState, useEffect } from 'react'
import { Select, Button, Modal, Form, Input, Popconfirm, Upload, message } from 'antd'
import { WorkspacePoolType, WorkspaceType } from '../../types'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { GATEWAY } from '../../config'

const Wrapper = styled.div`
  margin-right: 15px;
`

interface Props {
  isDesignMode: boolean
  pool: WorkspacePoolType | undefined
  selectedWorkspace: string
  workspace: WorkspaceType | undefined
  disabled: boolean
  onSelect: any
  onCreate: any
  onDelete: any
  onEdit: any
  refetchGetWorkspace: any
}

export default function WorkspaceSelector({
  isDesignMode,
  pool,
  selectedWorkspace,
  workspace,
  disabled,
  onSelect,
  onCreate,
  onDelete,
  onEdit,
  refetchGetWorkspace,
}: Props) {
  const [form] = Form.useForm()
  const defaultModalProps = {
    mode: '',
    visible: false,
  }
  const [modalProps, setModalProps] = useState({ ...defaultModalProps, workspaceId: '' })
  const [fileList, setFileList] = useState([
    {
      uid: '0',
      name: 'template',
      status: 'done',
      url: workspace?.drawing,
      thumbUrl: workspace?.drawing,
    },
  ])
  const workspaceMeta = pool?.workspaces.find(workspace => selectedWorkspace === workspace.id)
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  useEffect(() => {
    onSelect(pool?.workspaces[0]?.id || '')
    // eslint-disable-next-line
  }, [pool])

  useEffect(() => {
    setModalProps({ ...modalProps, workspaceId: selectedWorkspace })
    // eslint-disable-next-line
  }, [selectedWorkspace])

  // File upload props
  const uploadProps = {
    fileList,
    beforeUpload: (file: any) => {
      console.log(file.type)
      const acceptableTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg', 'image/svg+xml']
      if (!acceptableTypes.includes(file.type)) {
        message.error(`Only next formats allowed: png/jpg/jpeg/svg`)
        return false
      }
      return true
    },
    onChange: (info: any) => {
      if (!info.fileList.length) {
        setFileList([])
        return
      }
      const list = info.fileList.filter((file: any) => !!file.status)
      setFileList([list[list.length - 1]])
    },
  }

  // Files upload normalize
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  // Temporary client only file upload
  const uploadRequest = ({ file, onSuccess }: { file: File; onSuccess: any }) => {
    setTimeout(() => {
      onSuccess()
    }, 0)
  }

  useEffect(() => {
    modalProps.mode === 'edit' && workspace?.drawing
      ? setFileList([
          {
            uid: '0',
            name: `${workspaceMeta?.name} template`,
            status: 'done',
            url: workspace?.drawing,
            thumbUrl: workspace?.drawing,
          },
        ])
      : setFileList([])
  }, [workspace, workspaceMeta, modalProps])

  form.setFieldsValue({
    drawing: fileList,
  })

  return (
    <>
      <Wrapper>
        <Select
          disabled={disabled}
          style={{ width: 150 }}
          onChange={(id: string) => onSelect(id)}
          placeholder="Select workspace"
          value={selectedWorkspace}
        >
          {pool?.workspaces.map(workspace => (
            <Select.Option key={workspace.id} value={workspace.id}>
              {workspace.name || 'untitled'}
            </Select.Option>
          ))}
        </Select>
        {isDesignMode && (
          <>
            {workspace && (
              <Button
                onClick={() => setModalProps({ ...modalProps, mode: 'edit', visible: true })}
                style={{ marginLeft: '10px' }}
              >
                Edit
              </Button>
            )}

            <Button
              onClick={() => setModalProps({ ...modalProps, mode: 'create', visible: true })}
              style={{ marginLeft: '10px' }}
            >
              Add New
            </Button>
          </>
        )}
      </Wrapper>

      <Modal
        title={modalProps.mode === 'edit' ? 'Edit workspace' : 'Create new workspace'}
        visible={modalProps.visible}
        onCancel={() => setModalProps({ ...modalProps, ...defaultModalProps })}
        destroyOnClose={true}
        footer={[
          <Popconfirm
            placement="top"
            title={() => (
              <p>
                Are you sure you want to delete this workspace
                <br />
                with ALL workplaces and booking records for them?
              </p>
            )}
            onConfirm={() => {
              onDelete(selectedWorkspace)
              setModalProps({ ...modalProps, ...defaultModalProps, workspaceId: selectedWorkspace })
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              key="delete"
              type="primary"
              danger
              style={{
                position: 'absolute',
                left: '16px',
                display: modalProps.mode === 'edit' ? 'block' : 'none',
              }}
            >
              Delete
            </Button>
          </Popconfirm>,
          <Button
            key="cancel"
            onClick={() => setModalProps({ ...modalProps, ...defaultModalProps })}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={async () => {
              const value = form.getFieldsValue()

              // Save workspace changes and await the result
              let responseWorkSpaceId
              if (modalProps.mode === 'edit') {
                responseWorkSpaceId = (
                  await onEdit({ name: value.name, drawing: !fileList[0] ? 'deleted' : '' })
                ).data.updateWorkspace.id
              } else {
                responseWorkSpaceId = (await onCreate({ name: value.name })).data.createWorkspace.id
              }

              setModalProps({ ...modalProps, ...defaultModalProps })

              // If drawing template has been deleted - save and return
              if (!fileList[0]) {
                refetchGetWorkspace()
                return
              }

              // Save new drawing template
              //@ts-ignore
              const fileObject = fileList[0].originFileObj
              const formData = new FormData()
              formData.append('files', fileObject)
              formData.append('ref', 'workspace')
              formData.append('refId', responseWorkSpaceId)
              formData.append('field', 'drawing')

              fetch(GATEWAY + '/upload', {
                method: 'POST',
                body: formData,
              }).then(res => {
                refetchGetWorkspace()
              })
            }}
          >
            {modalProps.mode === 'edit' ? 'Save' : 'Create'}
          </Button>,
        ]}
      >
        <Form {...layout} form={form} name="basic" preserve={false}>
          <Form.Item label="Name" name="name" rules={[{ message: 'Please input workspace name!' }]}>
            <Input defaultValue={modalProps.mode === 'edit' ? workspaceMeta?.name || '' : ''} />
          </Form.Item>

          <Form.Item
            name="drawing"
            label="Template"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="only formats: png, jpg, jpeg, svg"
          >
            <Upload
              name="drawing"
              customRequest={uploadRequest}
              listType="picture"
              {...uploadProps}
            >
              <Button>
                <UploadOutlined /> Click to upload
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
