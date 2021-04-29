import React, { useState, useRef, useContext, useEffect } from 'react'
import { DevelopmentGoal } from '../../types'
import { DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Form, Popconfirm, Input, Switch } from 'antd'
import styled from 'styled-components'
import { FormInstance } from 'antd/lib/form'

interface Props {
  value?: Partial<DevelopmentGoal>[]
  onChange?: (items: Partial<DevelopmentGoal>[]) => void
  showAchievedSwitch: boolean
  disabled?: boolean
}

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

type Item = DevelopmentGoal

const EditableCellWrap = styled.div`
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 5px;
  min-height: 30px;
  cursor: pointer;
  &:hover {
    border-color: lightgray;
  }
`
interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<Input>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.error('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <EditableCellWrap
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </EditableCellWrap>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
}

function DevelopmentGoals({ onChange, disabled, ...props }: Props, ref: any) {
  const value = (props.value || []).map(({ __typename, ...i }: any) => i)

  const handleSave = ({ key, ...item }: any) => {
    if (onChange) {
      onChange(
        value.map((i, index) => {
          if ((i.id && i.id === item.id) || index === key) {
            return {
              ...item,
            }
          }
          return i
        }),
      )
    }
  }

  let columns: any = [
    {
      title: 'Goal',
      dataIndex: 'description',
      width: '30%',
      editable: !disabled,
    },
    {
      title: 'Success Criteria',
      dataIndex: 'successCriteria',
      editable: !disabled,
    },
  ]

  if (props.showAchievedSwitch) {
    columns.push({
      title: 'Achieved?',
      width: '100px',
      align: 'center',
      dataIndex: 'isAchieved',
      render: (text: any, record: any) => (
        <Switch
          disabled={disabled}
          checked={record.isAchieved}
          onChange={() => {
            if (onChange) {
              const { key, ...item } = record
              onChange(
                value.map((i, index) => {
                  if ((i.id && i.id === record.id) || index === key) {
                    return {
                      ...item,
                      isAchieved: !record.isAchieved,
                    }
                  }
                  return i
                }),
              )
            }
          }}
        />
      ),
    })
  }

  columns = columns.concat([
    {
      title: 'Comment',
      dataIndex: 'comment',
      editable: !disabled,
    },
    {
      width: '50px',
      dataIndex: 'operation',
      render: (text: any, { key, ...record }: any) => (
        <Popconfirm
          disabled={disabled}
          title="Sure to delete?"
          onConfirm={() => {
            if (onChange) {
              onChange(value.filter((i, index) => (i.id ? i.id !== record.id : index !== key)))
            }
          }}
        >
          <Button type="link" disabled={disabled} icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ])

  return (
    <div>
      <Table
        dataSource={value.map((i, index) => ({
          key: i.id || index,
          ...i,
        }))}
        components={components}
        pagination={false}
        bordered
        /* 
        //@ts-ignore */
        columns={columns.map(col => {
          if (!col.editable) {
            return col
          }
          return {
            ...col,
            onCell: (record: any) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: handleSave,
            }),
          }
        })}
      />
      <Button
        style={{ marginTop: 8 }}
        onClick={() => {
          if (onChange) {
            onChange(value.concat({ description: '' }))
          }
        }}
        disabled={disabled}
      >
        Add new goal
      </Button>
    </div>
  )
}
export default React.forwardRef(DevelopmentGoals)
