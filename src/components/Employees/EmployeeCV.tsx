import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useMediaQuery } from 'react-responsive'
import gql from 'graphql-tag'
import moment from 'moment'
import { debounce } from 'throttle-debounce'
import { DeleteOutlined } from '@ant-design/icons'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Table, Button, Popconfirm, Input, DatePicker, Checkbox, Select, Tooltip } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import styled from 'styled-components'

import { CurriculumVitae, Employee } from '../../types'
import queryProjects, { QueryType as ProjectsQueryType } from '../../queries/getProjects'
import Skeleton from '../UI/Skeleton'
import message from '../../message'
import './styles.css'

/**
 * Queries definition
 */
const query = gql`
  query getEmployeeCV($email: String!) {
    employeeByEmail(email: $email) {
      id
      curriculumVitae {
        id
        vitaes {
          id
          company
          dateStart
          dateEnd
          project
          position
          responsibilities
          level
        }
      }
    }
  }
`
const mutation = gql`
  mutation updateCurriculumVitae($input: UpdateCurriculumVitaeInput) {
    updateCurriculumVitae(input: $input) {
      id
    }
  }
`

/**
 * Types definition
 */
type PropsTableType = {
  curriculumVitae: Pick<
    CurriculumVitae,
    | 'id'
    | 'company'
    | 'dateStart'
    | 'dateEnd'
    | 'project'
    | 'position'
    | 'responsibilities'
    | 'level'
  >[]
}

type QueryType = {
  employeeByEmail: {
    id: Employee['id']
    curriculumVitae: {
      id: Pick<CurriculumVitae, 'id'>
      vitaes: Pick<
        CurriculumVitae,
        | 'id'
        | 'company'
        | 'dateStart'
        | 'dateEnd'
        | 'project'
        | 'position'
        | 'responsibilities'
        | 'level'
      >[]
    }
  }
}

interface PropsGeneral extends FormComponentProps {
  editable: boolean
  employee: Pick<Employee, 'id' | 'email'>
}

interface PropsTable {
  data?: PropsTableType['curriculumVitae'] | []
  loading?: boolean
  onChange?: (items: Partial<CurriculumVitae>[]) => void
  editable: boolean
}

/**
 * Service functions
 */

// Condition checking the transmitted word - company field - allowed to change for future purposes
const isWordSyncretis = (word: string) =>
  word.toLowerCase() === 'syncretis' || word.toLowerCase() === 'sidenis'

/**
 *
 * Wrapper form
 *
 */
function EmployeeCV({ employee, editable, form }: PropsGeneral) {
  const { email } = employee

  const variables = { email } // variables for queries
  // Curriculum vitaes query
  const { data, loading } = useQuery<QueryType>(query, {
    variables,
  })

  const vitaes = data?.employeeByEmail?.curriculumVitae?.vitaes || [] // full user's vitaes list
  const curriculumVitaeID = data?.employeeByEmail?.curriculumVitae?.id || '' // list id

  const { getFieldDecorator } = form

  // Curriculum vitaes mutation
  const [update, { loading: mutateLoading }] = useMutation(mutation, {
    onCompleted: () => message.success('Curriculum vitae has been updated'),
    awaitRefetchQueries: true,
    refetchQueries: [{ query, variables }],
    onError: message.error,
  })

  const debounced = React.useCallback(debounce(500, update), [update])

  const onChange = (value: any) => {
    debounced({ variables: { input: value } })
  }

  React.useEffect(() => {
    if (mutateLoading) {
      message.loading('Updating curriculum vitae')
    }
  })

  // Call mutation
  const handleSubmit = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const dateToISO = (date: any) => {
          const dateObj = new Date(date)

          return dateObj.toISOString()
        }

        onChange({
          id: curriculumVitaeID,
          employeeEmail: employee.email,
          vitaes: values.cvForm.map((vitae: any) => ({
            id: vitae.id,
            position: vitae.position,
            company: vitae.company.charAt(0).toUpperCase() + vitae.company.slice(1).trim(),
            dateStart: vitae.dateStart ? dateToISO(vitae.dateStart) : '',
            dateEnd: vitae.dateEnd ? dateToISO(vitae.dateEnd) : '',
            project: isWordSyncretis(vitae.company) ? vitae.project : '',
            responsibilities: vitae.responsibilities,
            level: vitae.level,
          })),
        })
      }
    })
  }

  return (
    <Skeleton loading={loading} active withOffset>
      {getFieldDecorator('cvForm')(
        <Form layout="vertical">
          <CurriculumVitaeTable
            data={vitaes}
            loading={mutateLoading}
            onChange={values => {
              form.setFieldsValue({
                cvForm: values,
              })
              handleSubmit()
            }}
            editable={editable}
          />
        </Form>,
      )}
    </Skeleton>
  )
}

/**
 *
 * Table component
 *
 */
function CurriculumVitaeTable({ onChange, editable, loading, ...props }: PropsTable) {
  const [isNoTimeEndList, setIsNoTimeEndList] = useState(['']) // list with rows ids without any date end

  const [showFullResponsibilities, setShowFullResponsibilities] = useState(['']) // "collapsible" cell in the table
  const [isResponsibilitiesUnderModifying, setIsResponsibilitiesUnderModifying] = useState(['']) // cell is currently modifying

  const showFullResponsibilitiesRef = useRef(showFullResponsibilities) // ref for inserting to setTimeout for closing full height cell
  showFullResponsibilitiesRef.current = showFullResponsibilities

  const isRespUnderModifyingRef = useRef(isResponsibilitiesUnderModifying) // ref for inserting to setTimeout for list of under modifying cells
  isRespUnderModifyingRef.current = isResponsibilitiesUnderModifying

  const isDatePickersToColumn = useMediaQuery({ maxWidth: 1000 }) // date pickers to column direction

  // Projects list query
  const { data } = useQuery<ProjectsQueryType>(queryProjects)
  const allProjectsList = data?.projects || []

  // Curriculum vitaes list for table
  const value = (props.data || []).map(({ __typename, ...i }: any) => i)

  // Fill state-list with rows ids without any date end - for check on 'for the present' checkboxes
  React.useEffect(() => {
    const projectsWithoutDateEndList: string[] = []

    props.data?.forEach(e => {
      if (!e.dateEnd) projectsWithoutDateEndList.push(e.id)
    })

    setIsNoTimeEndList(projectsWithoutDateEndList)
  }, [props.data])

  const { Option } = Select // option component for antd selector

  // Save table changing
  const handleSave = ({ key, ...item }: any) => {
    setShowFullResponsibilities([])
    setIsResponsibilitiesUnderModifying([])

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

  // Create new value-object clone for sending to onChange method
  const immutableValueChange = (id: string, fieldName: string, fieldValue: any) =>
    value.map(vitae =>
      vitae.id === id
        ? {
            ...vitae,
            [fieldName]: fieldValue,
          }
        : vitae,
    )

  // Set null value to date picker in case of active checkbox 'for the present'
  const getDateEndValue = (id: string) => {
    const dateEndEmptyValue = {}
    if (isNoTimeEndList.includes(id)) {
      //@ts-ignore
      dateEndEmptyValue.value = null
    }
    return dateEndEmptyValue
  }

  // Disable all dates for start - after end date; for end - before start date inclusive
  const disabledDate = (currentDate: any, limitDate: any, isStart: boolean) => {
    return isStart
      ? currentDate && currentDate > moment(limitDate).subtract(1, 'days')
      : currentDate && currentDate < moment(limitDate).add(1, 'days')
  }

  // Visual date format in picker
  const dateFormatList = ['DD.MM.YYYY']

  // Table columns
  let columns: any = [
    {
      title: 'Company',
      dataIndex: 'company',
      width: editable ? '15%' : '10%',
      editable,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      width: '10%',
      render: (text: any, record: any) => (
        <div
          style={{
            display: 'flex',
            flexDirection: isDatePickersToColumn ? 'column' : 'row',
            width: editable ? (isDatePickersToColumn ? '110px' : '260px') : '190px',
            justifyContent: editable ? 'space-between' : 'start',
            alignItems: 'center',
          }}
        >
          {editable ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <DatePicker
                  defaultValue={
                    record.dateStart ? moment(moment(record.dateStart), dateFormatList) : undefined
                  }
                  disabledDate={current => disabledDate(current, record.dateEnd, true)}
                  format={dateFormatList}
                  onChange={date =>
                    onChange && onChange(immutableValueChange(record.id, 'dateStart', date))
                  }
                  disabled={!editable}
                  style={{
                    width: '125px',
                  }}
                />
              </div>
              <div
                style={{
                  height: isDatePickersToColumn ? '5px' : '25px',
                }}
              ></div>
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
              {record.dateStart ? moment(record.dateStart).format(dateFormatList[0]) : null}
              <div style={{ marginLeft: '10px', marginRight: '10px' }}>-</div>
            </div>
          )}
          {editable ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <DatePicker
                  defaultValue={
                    record.dateEnd ? moment(moment(record.dateEnd), dateFormatList) : undefined
                  }
                  disabledDate={current => disabledDate(current, record.dateStart, false)}
                  format={dateFormatList}
                  onChange={date =>
                    onChange && onChange(immutableValueChange(record.id, 'dateEnd', date))
                  }
                  disabled={isNoTimeEndList.includes(record.key) || !editable}
                  {...getDateEndValue(record.id)}
                  style={{
                    width: '125px',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'right',
                  height: '25px',
                  whiteSpace: 'nowrap',
                }}
              >
                <Checkbox
                  checked={isNoTimeEndList.includes(record.key)}
                  disabled={!editable}
                  onChange={e => {
                    isNoTimeEndList.includes(record.key)
                      ? setIsNoTimeEndList(isNoTimeEndList.filter(key => key !== record.key))
                      : setIsNoTimeEndList([...isNoTimeEndList, record.key])

                    onChange &&
                      e.target.checked &&
                      onChange(immutableValueChange(record.id, 'dateEnd', null))
                  }}
                >
                  for the present
                </Checkbox>
              </div>
            </div>
          ) : (
            <div>
              {record.dateEnd
                ? moment(record.dateEnd).format(dateFormatList[0])
                : 'for the present'}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Project',
      dataIndex: 'project',
      width: '10%',
      render: (text: any, record: any) =>
        isWordSyncretis(record.company) ? (
          editable ? (
            <Select
              showSearch
              placeholder="Select a project"
              optionFilterProp="children"
              disabled={!editable}
              style={{ width: isDatePickersToColumn ? 80 : 150 }}
              value={
                allProjectsList
                  ? allProjectsList.filter(project => project.id === record.project)[0]?.name
                  : ''
              }
              filterOption={(input: any, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(projectId: any) => {
                onChange && onChange(immutableValueChange(record.id, 'project', projectId))
              }}
            >
              {allProjectsList
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map(project => (
                  <Option key={project.id} value={project.id} style={{ overflow: 'visible' }}>
                    {project.name}
                  </Option>
                ))}
            </Select>
          ) : (
            <div>
              {allProjectsList
                ? allProjectsList.filter(project => project.id === record.project)[0]?.name
                : ''}
            </div>
          )
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: editable ? 'center' : 'flex-start',
              width: isDatePickersToColumn ? 80 : 150,
            }}
          >
            &#8212;
          </div>
        ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      editable,
      width: '12%',
    },
    {
      title: 'Responsibilities',
      dataIndex: 'responsibilities',
      width: '20%',
      editable,
      render: (text: any, record: any) =>
        text.length > 55 ? (
          showFullResponsibilities.includes(record.id) ? (
            <div
              onClick={() =>
                setIsResponsibilitiesUnderModifying([
                  ...isResponsibilitiesUnderModifying,
                  record.id,
                ])
              }
            >
              {text}
            </div>
          ) : (
            <Tooltip title={text} mouseEnterDelay={1}>
              <div
                onClick={e => {
                  e.stopPropagation()
                  setShowFullResponsibilities([...showFullResponsibilities, record.id])
                  setTimeout(() => {
                    if (!isRespUnderModifyingRef.current.includes(record.id))
                      setShowFullResponsibilities(
                        showFullResponsibilitiesRef.current.filter(id => id !== record.id),
                      )
                  }, 5000)
                }}
                style={{ cursor: 'pointer' }}
              >
                {text.slice(0, 50) + '...'}
              </div>
            </Tooltip>
          )
        ) : (
          text
        ),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      editable,
      width: '10%',
    },
    {
      dataIndex: 'operation',
      width: '1%',
      render: (text: any, record: any) =>
        editable ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              if (onChange) {
                onChange(
                  value.filter((i, index) => (i.id ? i.id !== record.id : index !== record.key)),
                )
              }
            }}
          >
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        ) : (
          ''
        ),
    },
  ]

  return (
    <div className="cv" data-cy="cv-form">
      <Table
        dataSource={value.map((i, index) => ({
          key: i.id || index,
          ...i,
        }))}
        loading={loading}
        components={components}
        pagination={false}
        rowClassName={() => 'tableRowTopAlign'}
        //@ts-ignore
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
      {editable && (
        <Button
          data-cy="addJob"
          style={{ margin: '15px 0 20px 10px' }}
          onClick={() => {
            if (onChange) {
              onChange(
                value.concat({
                  company: '',
                  dateStart: '',
                  dateEnd: '',
                  position: '',
                  responsibilities: '',
                  level: '',
                }),
              )
            }
          }}
        >
          Add new job
        </Button>
      )}
    </div>
  )
}

/**
 *
 * Editable cell in the table
 *
 */
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
    const { children, dataIndex, record } = this.props
    const { editing } = this.state

    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          initialValue: record[dataIndex],
        })(
          dataIndex === 'responsibilities' ? (
            <Input.TextArea
              ref={node => (this.input = node)}
              onPressEnter={this.save}
              onBlur={this.save}
              autoSize
            />
          ) : (
            <Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />
          ),
        )}
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

export default Form.create<PropsGeneral>({ name: 'cvForm' })(EmployeeCV)
