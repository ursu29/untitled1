import { DeleteOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/react-hooks'
import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
  Table,
  Tooltip,
  Typography,
} from 'antd'
import { FormInstance } from 'antd/lib/form'
import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { debounce } from 'throttle-debounce'
import message from '../../message'
import { useUpdateCvMutation } from '../../queries/cv'
import queryProjects, { QueryType as ProjectsQueryType } from '../../queries/getProjects'
import { CurriculumVitae, Employee, Scalars, Vitae } from '../../types/graphql'
import './styles.css'

const { Title } = Typography

interface PropsGeneral {
  editable: boolean
  vitaes: Vitae[]
  curriculumVitaeID: Scalars['ID']
  employee: Pick<Employee, 'id' | 'email'>
}

interface PropsTable {
  data?: Vitae[]
  loading?: boolean
  onChange?: (items: Partial<CurriculumVitae>[]) => void
  editable: boolean
}

/**
 * Service functions
 */

// Condition checking the transmitted word - company field - allowed to change for future purposes
const syncretisNames = ['Sidenis', 'Syncretis (ex Sidenis)', 'Syncretis']
const isWordSyncretis = (word: string) =>
  syncretisNames.map(e => e.toLowerCase()).includes(word.toLowerCase())

/**
 *
 * Wrapper form
 *
 */
function EmployeeCVExperience({ employee, vitaes, curriculumVitaeID, editable }: PropsGeneral) {
  // Curriculum vitaes mutation
  const [update, { loading: mutateLoading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Work experience has been updated'),
    onError: message.error,
  })

  const debounced = React.useCallback(debounce(500, update), [update])

  const onChange = (value: any) => {
    debounced({ variables: { input: value } })
  }

  React.useEffect(() => {
    if (mutateLoading) {
      message.loading('Updating work experience')
    }
  })

  // Call mutation
  const handleSubmit = (values: any) => {
    const dateToISO = (date: any) => {
      const dateObj = new Date(date)

      return dateObj.toISOString()
    }

    onChange({
      id: curriculumVitaeID,
      employee: employee.id,
      vitaes: values.map((vitae: any) => ({
        id: vitae.id,
        position: vitae.position,
        company: vitae.company.charAt(0).toUpperCase() + vitae.company.slice(1).trim(),
        dateStart: vitae.dateStart ? dateToISO(vitae.dateStart) : null,
        dateEnd: vitae.dateEnd ? dateToISO(vitae.dateEnd) : null,
        project: isWordSyncretis(vitae.company) ? vitae.project : '',
        responsibilities: vitae.responsibilities,
        level: vitae.level,
      })),
    })
  }

  return (
    <>
      <CurriculumVitaeTable
        data={vitaes.sort(
          (a, b) => new Date(b?.dateStart || 0).getTime() - new Date(a?.dateStart || 0).getTime(),
        )}
        loading={mutateLoading}
        onChange={handleSubmit}
        editable={editable}
      />
    </>
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
      render: (_: any, record: any) => (
        <AutoComplete
          style={{ width: '100%' }}
          options={syncretisNames.map(value => ({ value }))}
          defaultValue={record.company ? record.company : undefined}
          onBlur={event =>
            //@ts-ignore
            onChange && onChange(immutableValueChange(record.id, 'company', event.target.value))
          }
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().startsWith(inputValue.toUpperCase())
          }
          disabled={!editable}
        />
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      width: '10%',
      render: (_: any, record: any) => (
        <div
          style={{
            display: 'flex',
            flexDirection: isDatePickersToColumn ? 'column' : 'row',
            // width: editable ? (isDatePickersToColumn ? '110px' : '260px') : '190px',
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
                    width: '110px',
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
                    width: '110px',
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
      render: (_: any, record: any) =>
        isWordSyncretis(record.company) ? (
          editable ? (
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a project"
              optionFilterProp="children"
              disabled={!editable}
              // style={{ width: isDatePickersToColumn ? 80 : 150 }}
              value={
                allProjectsList
                  ? allProjectsList.filter(project => project.code === record.project)[0]?.name
                  : ''
              }
              filterOption={(input: any, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(projectId: any) => {
                onChange &&
                  onChange(
                    immutableValueChange(
                      record.id,
                      'project',
                      allProjectsList.find(project => project.id === projectId)?.code,
                    ),
                  )
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
              // width: isDatePickersToColumn ? 80 : 150,
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
        text?.length > 55 ? (
          showFullResponsibilities.includes(record.id) ? (
            <div
              onClick={() =>
                setIsResponsibilitiesUnderModifying([
                  ...isResponsibilitiesUnderModifying,
                  record.id,
                ])
              }
              style={{ maxWidth: '120px' }}
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
                style={{ cursor: 'pointer', maxWidth: '120px' }}
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
    <div className="cv" data-cy="cvForm" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={5}>Work experience</Title>
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
            Add new
          </Button>
        )}
      </div>
      <Table
        dataSource={value.map((i, index) => ({
          key: i.id || index,
          ...i,
        }))}
        loading={loading}
        components={components}
        pagination={false}
        rowClassName={() => 'tableRowTopAlign'}
        style={{
          width: '100%',
          tableLayout: 'fixed',
        }}
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
    </div>
  )
}

/**
 *
 * Editable cell in the table
 *
 */
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

const EditableCellWrap = styled.div`
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 4px 11px;
  min-height: 30px;
  cursor: pointer;
  &:hover {
    border-color: lightgray;
  }
`
type Item = Vitae

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
      message.error('Some fields are not valid')
      console.error('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex as any}
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

export default EmployeeCVExperience
