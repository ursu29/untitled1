import React from 'react'
import { DevelopmentGoal } from '../../types'
import { Table, Button, Popconfirm, Form, Input, Switch } from 'antd'
import styled from 'styled-components'

interface Props {
  value?: Partial<DevelopmentGoal>[]
  onChange?: (items: Partial<DevelopmentGoal>[]) => void
}

const EditableContext = React.createContext(null)

const EditableRow = ({ form, index, ...props }: any) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

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

class EditableCell extends React.Component<any> {
  form: any
  input: any
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  save = (e: any) => {
    const { record, handleSave } = this.props
    this.form.validateFields((error: any, values: any) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  renderCell = (form: any) => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <EditableCellWrap
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </EditableCellWrap>
    )
  }

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

const components = {
  body: {
    row: EditableFormRow,
    cell: EditableCell,
  },
}

function DevelopmentGoals({ onChange, ...props }: Props, ref: any) {
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

  const columns = [
    {
      title: 'Goal',
      dataIndex: 'description',
      width: '30%',
      editable: true,
    },
    {
      title: 'Success Criteria',
      dataIndex: 'successCriteria',
      editable: true,
    },
    {
      title: 'Achieved?',
      dataIndex: 'isAchieved',
      render: (text: any, record: any) => (
        <Switch
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
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      editable: true,
    },
    {
      width: '50px',
      dataIndex: 'operation',
      render: (text: any, { key, ...record }: any) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            if (onChange) {
              onChange(value.filter((i, index) => (i.id && i.id !== record.id) || index !== key))
            }
          }}
        >
          <Button type="link" icon="delete" />
        </Popconfirm>
      ),
    },
  ]
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
            onCell: record => ({
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
      >
        Add new goal
      </Button>
    </div>
  )
}
export default React.forwardRef(DevelopmentGoals)
