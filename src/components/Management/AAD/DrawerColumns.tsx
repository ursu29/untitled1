import React from 'react'
import { Form, Button, Checkbox, Drawer } from 'antd'

export const allColumns = [
  {
    title: 'Name',
    key: 'displayName',
    dataIndex: 'displayName',
  },
  {
    title: 'Principal Name',
    key: 'userPrincipalName',
    dataIndex: 'userPrincipalName',
  },
  {
    title: 'Object ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Phone',
    key: 'mobilePhone',
    dataIndex: 'mobilePhone',
  },
  {
    title: 'First Name',
    key: 'givenName',
    dataIndex: 'givenName',
  },
  {
    title: 'Last Name',
    key: 'surname',
    dataIndex: 'surname',
  },
  {
    title: 'Mail',
    key: 'mail',
    dataIndex: 'mail',
  },
  {
    title: 'Swiss Re Mail',
    key: 'officeLocation',
    dataIndex: 'officeLocation',
  },
  {
    title: 'Position',
    key: 'jobTitle',
    dataIndex: 'jobTitle',
  },
  {
    title: 'Birthday',
    key: 'state',
    dataIndex: 'state',
  },
  {
    title: 'Contract Start',
    key: 'postalCode',
    dataIndex: 'postalCode',
  },
  {
    title: 'Country',
    key: 'country',
    dataIndex: 'country',
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
  },
  {
    title: 'Department',
    key: 'department',
    dataIndex: 'department',
  },
  {
    title: 'Company Name',
    key: 'companyName',
    dataIndex: 'companyName',
  },
  {
    title: 'Street Address',
    key: 'streetAddress',
    dataIndex: 'streetAddress',
  },
  {
    title: 'Mail Nickname',
    key: 'mailNickname',
    dataIndex: 'mailNickname',
  },
  {
    title: 'Other Mails',
    key: 'otherMails',
    dataIndex: 'otherMails',
  },
  {
    title: 'Language',
    key: 'preferredLanguage',
    dataIndex: 'preferredLanguage',
  },
  {
    title: 'Usage Location',
    key: 'usageLocation',
    dataIndex: 'usageLocation',
  },
]

export default function DrawerColumns({
  visible,
  selectedColumns,
  setSelectedColumns,
  handleOk,
  handleClose,
}: {
  visible?: boolean
  selectedColumns: string[]
  setSelectedColumns: (args: string[]) => void
  handleOk: () => void
  handleClose: () => void
}) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const [form] = Form.useForm()

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        handleClose()
        form.resetFields()
      }}
      title="Columns"
      width={350}
      footer={
        <Button
          onClick={() => {
            handleOk()
            handleClose()
          }}
          type="primary"
          style={{ minWidth: '100px' }}
        >
          Ok
        </Button>
      }
    >
      <Form
        {...layout}
        name="columns"
        form={form}
        initialValues={selectedColumns?.reduce((acc: { [key: string]: boolean }, e) => {
          acc[e] = true
          return acc
        }, {})}
        onChange={() => {
          const values = form.getFieldsValue()
          setSelectedColumns(Object.keys(values).filter(e => !!values[e]))
        }}
      >
        {allColumns.map(e => (
          <Form.Item name={e.key} valuePropName="checked" style={{ marginBottom: '8px' }}>
            <Checkbox style={{ fontSize: '16px' }} disabled={e.key === 'displayName'}>
              {e.title}
            </Checkbox>
          </Form.Item>
        ))}
      </Form>
    </Drawer>
  )
}
