import { Form, Input, Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import Button from '../UI/Button'
import { Book } from './useLibraryApi'
import { useLibraryApi } from './useLibraryApi'

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 15px;
  }
`

interface Props {
  visible: boolean
  onClose: () => void
  initialState?: Partial<Book> | null
}

export const BookModal: React.FC<Props> = props => {
  const { visible, onClose, initialState } = props
  const [form] = Form.useForm()

  const { dataUpdating } = useLibraryApi()

  // TODO: implement
  const handleSubmit = () => {
    console.log('SUBMIT!!!')
    form.validateFields().then(values => {
      console.log(values)
    })
  }

  const rules = [{ required: true, message: 'This is required field!' }]

  const title = initialState ? 'Edit Book' : 'Add New Book'

  // FORM STATE
  console.log(form)

  return (
    <Modal
      centered
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      width={545}
      title={title}
      visible={visible}
      onCancel={() => {
        onClose()
        form.resetFields()
      }}
      destroyOnClose={true}
      footer={null}
    >
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ isExternal: false, isOnline: false, isImportant: false }}
      >
        <Form.Item label="Name" name="title" rules={rules} initialValue={initialState?.title}>
          <Input />
        </Form.Item>
        <Form.Item label="Author" name="author" rules={rules} initialValue={initialState?.author}>
          <Input />
        </Form.Item>
        <Form.Item label="Tags" name="tags" initialValue={initialState?.tags}>
          <SkillTreeSelect searchPlaceholder="" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            type="default"
            style={{ marginRight: 6 }}
            onClick={onClose}
            loading={dataUpdating}
            data-cy="addBookModal"
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={dataUpdating} data-cy="addBookModal">
            Add
          </Button>
        </Form.Item>
      </StyledForm>
    </Modal>
  )
}
