import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, DatePicker, Typography, Button, Table } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { Rule } from 'rc-field-form/lib/interface'
import { ColumnType } from 'antd/lib/table/interface'
import styled from 'styled-components'
import './styles.css'

type Data = Record<string, any>

type ColumnProps = {
  dataIndex?: string
  editable?: boolean
  rules?: Rule[]
  Cell?: React.FC<EditableComponentProps>
}

export type EditableColumnType<RecordType> = ColumnType<RecordType> & ColumnProps

const TableRowFormContext = React.createContext<FormInstance<Data> | null>(null)

export const useTableRowForm = () => {
  const form = useContext(TableRowFormContext)
  if (!form) throw new Error('The useTableRowForm hook must be used within a TableRowForm provider')
  return form
}

export const EditableRow = ({
  record,
  onSubmit,
  ...props
}: {
  record?: Data
  onSubmit?: Function
}) => {
  const [form] = Form.useForm()
  const content = <tr {...props} />
  if (!record) return content
  return (
    <Form
      form={form}
      component={false}
      name={record.id}
      initialValues={record}
      onFinish={values => onSubmit && onSubmit({ id: record.id, ...values })}
    >
      <TableRowFormContext.Provider value={form}>{content}</TableRowFormContext.Provider>
    </Form>
  )
}

const EditableTd = styled.td`
  word-break: break-word;
`

const EditableField = styled.div`
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 4px 11px;
  min-height: 30px;
  cursor: pointer;
  &:hover {
    border-color: lightgray;
  }
`

export type EditableComponentProps = React.PropsWithChildren<{
  onSave: () => void
  onChange?: (value: any) => void
  autoFocus?: boolean
}>

const EditableFieldCell = ({
  children,
  dataIndex,
  rules,
  Cell,
}: React.PropsWithChildren<Omit<ColumnProps, 'editable'>>) => {
  const form = useTableRowForm()
  const FieldComponent = Cell || CellInputWithContent

  return (
    <Form.Item style={{ margin: 0 }} name={dataIndex} rules={rules}>
      <FieldComponent onSave={form.submit}>{children}</FieldComponent>
    </Form.Item>
  )
}

export const EditableCell = ({
  children,
  editable,
  dataIndex,
  rules,
  Cell,
  ...props
}: React.PropsWithChildren<ColumnProps>) => {
  return (
    <EditableTd {...props}>
      {editable ? (
        <EditableFieldCell dataIndex={dataIndex} rules={rules} Cell={Cell}>
          {children}
        </EditableFieldCell>
      ) : (
        children
      )}
    </EditableTd>
  )
}

export const CellInput = ({ onSave, children, ...props }: EditableComponentProps) => {
  return <Input.TextArea {...props} onBlur={onSave} autoSize style={{ resize: 'none' }} />
}

export const CellInputWithContent = ({ onSave, children, ...props }: EditableComponentProps) => {
  const [editing, setEditing] = useState(false)
  const enableEditing = () => {
    setEditing(true)
  }
  const handleSave = () => {
    setEditing(false)
    onSave()
  }
  if (editing) {
    return <CellInput onSave={handleSave} autoFocus {...props} />
  }
  return <EditableField onClick={enableEditing}>{children}</EditableField>
}

export const CellDate = ({ onSave, children, ...props }: EditableComponentProps) => {
  return (
    <DatePicker
      {...props}
      format="DD.MM.YYYY"
      onChange={value => {
        props.onChange?.(value)
        onSave()
      }}
      onBlur={onSave}
    />
  )
}

export const CellDateRangeYear = ({ onSave, children, ...props }: EditableComponentProps) => {
  const [saveTrigger, setSaveTrigger] = useState(false)

  useEffect(() => {
    if (!saveTrigger) return
    const timeout = setTimeout(onSave, 100)
    return () => clearTimeout(timeout)
  }, [onSave, saveTrigger])

  return (
    <DatePicker.RangePicker
      {...props}
      picker="year"
      format="YYYY"
      allowEmpty={[true, true]}
      onChange={value => {
        props.onChange?.(value)
        setSaveTrigger(true)
      }}
      onFocus={() => setSaveTrigger(false)}
      onBlur={() => setSaveTrigger(true)}
    />
  )
}

export const TableTitle = ({
  title,
  editable,
  onCreate,
}: {
  title: string
  editable?: boolean
  onCreate?: () => void
}) => {
  return (
    <div>
      <Typography.Title level={4} style={{ marginBottom: 16 }}>
        {title}
      </Typography.Title>
      {editable && (
        <Button data-cy="addJob" style={{ marginBottom: 8 }} onClick={onCreate}>
          Add new
        </Button>
      )}
    </div>
  )
}

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
}

export type EditableTableProps<RecordType> = {
  dataSource: RecordType[]
  loading?: boolean
  columns: EditableColumnType<RecordType>[]
  onRowSubmit: (record: RecordType) => void
}

export const EditableTable = <RecordType extends {}>({
  dataSource,
  loading,
  columns,
  onRowSubmit,
}: EditableTableProps<RecordType>) => {
  return (
    <Table
      dataSource={dataSource}
      rowKey="id"
      loading={loading}
      pagination={false}
      rowClassName="tableRowTopAlign"
      columns={columns.map(col => {
        if (!col.editable) {
          return col
        }
        return {
          ...col,
          onCell: (record: RecordType) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            rules: col.rules,
            Cell: col.Cell,
          }),
        } as ColumnType<RecordType>
      })}
      components={components}
      // @ts-ignore
      onRow={record => ({
        record,
        onSubmit: onRowSubmit,
      })}
      style={{ marginBottom: 32 }}
    />
  )
}
