import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import SkillTreeSelect from '../../Skills/SkillTreeSelect'
import { Book } from '../useLibraryApi'
import { useLibraryApi } from '../useLibraryApi'
import EmployeeSelect from '../../Employees/EmployeeSelect'

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 15px;
  }
`

export type SubmitBook = Partial<Book>

const rules = [{ required: true, message: 'This is required field!' }]

export interface BookModalProps {
  visible: boolean
  onClose: () => void
  onSubmit?: (book: Partial<Book> & { holder: string }) => void
  initialState?: Partial<Book> | null
}

export const BookModal: React.FC<BookModalProps> = props => {
  const { visible, onClose, onSubmit, initialState } = props
  const [form] = Form.useForm()
  const { dataUpdating } = useLibraryApi()

  const handleFinish = () => {
    form.validateFields().then(values => {
      if (!onSubmit) {
        throw new Error('No "onSubmit" prop for BookModal component!')
      }
      onSubmit(values)
      form.resetFields()
    })
  }

  useEffect(() => {
    visible && form.setFieldsValue({ ...initialState, holder: initialState?.holder?.id })
  }, [form, visible, initialState])

  return (
    <Modal
      centered
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      width={545}
      title={initialState ? 'Edit Book' : 'Add New Book'}
      visible={visible}
      onCancel={() => {
        onClose()
        form.resetFields()
      }}
      destroyOnClose={true}
      footer={null}
      maskClosable={false}
    >
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ ...initialState }}
      >
        <Form.Item label="Name" name="title" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Author" name="author" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <SkillTreeSelect searchPlaceholder="" />
        </Form.Item>
        <Form.Item label="Taken By" name="holder">
          <EmployeeSelect defaultOpen autoFocus style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right', paddingTop: '8px' }}>
          <Button
            type="default"
            style={{ marginRight: 6 }}
            onClick={onClose}
            loading={dataUpdating}
            data-cy="closeBookModal"
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={dataUpdating} data-cy="submitBookModal">
            {initialState ? 'Edit' : 'Add'}
          </Button>
        </Form.Item>
      </StyledForm>
    </Modal>
  )
}
