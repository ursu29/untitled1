import React from 'react'
import { Form, Button, Checkbox, Drawer } from 'antd'

export default function DrawerColumns({
  columns,
  visible,
  selectedColumns,
  setSelectedColumns,
  handleOk,
  handleClose,
}: {
  columns: { title: string; key: string; dataIndex: string }[]
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
        {columns.map(e => (
          <Form.Item
            key={e.key}
            name={e.key}
            valuePropName="checked"
            style={{ marginBottom: '8px' }}
          >
            <Checkbox style={{ fontSize: '16px' }} disabled={e.key === 'displayName'}>
              {e.title}
            </Checkbox>
          </Form.Item>
        ))}
      </Form>
    </Drawer>
  )
}
