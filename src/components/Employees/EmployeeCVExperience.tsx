import { useQuery } from '@apollo/client'
import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
  Typography,
  Card,
  Tag,
  Space,
} from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { debounce } from 'throttle-debounce'
import message from '../../message'
import { useUpdateCvMutation } from '../../queries/cv'
import queryProjects, { QueryType as ProjectsQueryType } from '../../queries/getProjects'
import { CurriculumVitae, Employee, Scalars, Vitae } from '../../types/graphql'
import './styles.css'

const { Title } = Typography
const { Option } = Select

// Visual date format in picker
const dateFormatList = ['DD.MM.YYYY']
// Disable all dates for start - after end date; for end - before start date inclusive
const disabledDate = (currentDate: any, limitDate: any, isStart: boolean) => {
  return isStart
    ? currentDate && currentDate > moment(limitDate).subtract(1, 'days')
    : currentDate && currentDate < moment(limitDate).add(1, 'days')
}
const dateToISO = (date: any) => {
  const dateObj = new Date(date)
  return dateObj.toISOString()
}

// Condition checking the transmitted word - company field - allowed to change for future purposes
const syncretisNames = ['Sidenis', 'Syncretis (ex Sidenis)', 'Syncretis']
const isWordSyncretis = (word: string) =>
  syncretisNames.map(e => e.toLowerCase()).includes(word.toLowerCase())

interface PropsGeneral {
  editable: boolean
  vitaes: Vitae[]
  curriculumVitaeID: Scalars['ID']
  employee: Pick<Employee, 'id' | 'email'>
}

function EmployeeCVExperience({ employee, vitaes, curriculumVitaeID, editable }: PropsGeneral) {
  // Curriculum vitaes mutation
  const [update, { loading: mutateLoading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Work experience has been updated'),
    onError: message.error,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = React.useCallback(debounce(500, update), [update])

  const onChange = (value: any) => {
    debounced({ variables: { input: value } })
  }

  React.useEffect(() => {
    if (mutateLoading) {
      message.loading('Updating work experience')
    }
  }, [mutateLoading])

  // Call mutation
  const handleSubmit = (values: any) => {
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
    <JobListView
      data={vitaes}
      loading={mutateLoading}
      onChange={handleSubmit}
      editable={editable}
    />
  )
}

const JobListView = ({
  data,
  onChange,
  loading,
  editable,
}: {
  data: Vitae[]
  onChange: (items: Partial<CurriculumVitae>[]) => void
  loading: boolean
  editable: boolean
}) => {
  const groupedByCompany = [...data]
    .sort((a, b) => new Date(b?.dateStart || 0).getTime() - new Date(a?.dateStart || 0).getTime())
    .reduce<Record<string, Vitae[]>>((res, p) => {
      const company = p.company || ''
      if (!res[company]) res[company] = []
      res[company].push(p)
      return res
    }, {})

  const handleCreate = (company: string) => {
    const value = data.map(({ __typename, ...i }: any) => i)
    onChange(
      value.concat({
        company,
        dateStart: '',
        dateEnd: '',
        position: '',
        responsibilities: '',
        level: '',
      }),
    )
  }

  const handleUpdate = (vitae: Vitae[]) => {
    const value = data.map(({ __typename, ...i }: any) => i)
    const vitaeToUpdate = vitae.map(p => p.id)
    onChange(
      value.map(p => {
        if (vitaeToUpdate.includes(p.id)) {
          return vitae.find(v => v.id === p.id) || p
        } else {
          return p
        }
      }),
    )
  }

  const handleDelete = (vitaesToRemove: Vitae[]) => {
    const value = data.map(({ __typename, ...i }: any) => i)
    onChange(value.filter(p => !vitaesToRemove.map(v => v.id).includes(p.id)))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={5}>Work experience</Title>
        <Button disabled={loading} onClick={() => handleCreate('')}>
          Add Company
        </Button>
      </div>
      <div>
        {Object.entries(groupedByCompany).map(([company, data]) => (
          <JobView
            key={company}
            data={data}
            company={company}
            editable={editable}
            onCreate={handleCreate}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  )
}

const JobView = ({
  data,
  company,
  editable,
  onUpdate,
  onDelete,
  onCreate,
}: {
  data: Vitae[]
  company: string
  editable: boolean
  onUpdate: (vitae: Vitae[]) => void
  onDelete: (vitae: Vitae[]) => void
  onCreate: (company: string) => void
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {editable ? (
          <>
            <AutoComplete
              style={{ width: '100%' }}
              options={syncretisNames.map(value => ({ value }))}
              defaultValue={company}
              onBlur={event => {
                // @ts-expect-error
                const nextCompanyName = event.target.value || ''
                onUpdate(data.map(p => ({ ...p, company: nextCompanyName })))
              }}
              filterOption={(inputValue, option) =>
                option!.value.toUpperCase().startsWith(inputValue.toUpperCase())
              }
              // disabled={!editable}
            />

            <Space>
              <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(data)}>
                <Button type="link" danger>
                  Delete
                </Button>
              </Popconfirm>
              <Button onClick={() => onCreate(company)}>Add Project</Button>
            </Space>
          </>
        ) : (
          <Title level={5}>{company || 'Unknown company'}</Title>
        )}
      </div>

      <div>
        {data.map(p => (
          <ProjectView
            key={p.id}
            data={p}
            onUpdate={vitae => onUpdate([vitae])}
            onDelete={() => onDelete([p])}
            editable={editable}
          />
        ))}
      </div>
    </div>
  )
}

type ProjectBasicFormValues = {
  project?: string
  position?: string
  level?: string
}

const ProjectBasicForm = ({
  data,
  editable,
  onSubmit,
}: {
  data: Vitae
  editable: boolean
  onSubmit: (values: ProjectBasicFormValues) => void
}) => {
  const [form] = Form.useForm<ProjectBasicFormValues>()
  const { data: data2 } = useQuery<ProjectsQueryType>(queryProjects)
  const allProjectsList = data2?.projects?.slice().sort((a, b) => (a.name > b.name ? 1 : -1)) || []

  if (!editable) {
    if (!data.project && !data.position && !data.level)
      return <span style={{ fontSize: 18 }}>Unknown project</span>
    return (
      <Space>
        {data.project && <Tag style={{ fontSize: 14 }}>{data.project}</Tag>}
        <span style={{ fontSize: 18 }}>{data.position}</span>
        {data.level && <Tag>{data.level}</Tag>}
      </Space>
    )
  }

  return (
    <Form form={form} layout="inline" name={`cv-project-basic-${data.id}`} onFinish={onSubmit}>
      <Form.Item name="project" label="Project" initialValue={data.project}>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a project"
          optionFilterProp="children"
          disabled={!editable}
          filterOption={(input, option) =>
            option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onBlur={form.submit}
        >
          {allProjectsList.map(project => (
            <Option key={project.id} value={project.code} style={{ overflow: 'visible' }}>
              {project.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="position" label="Position" initialValue={data.position}>
        <Input onBlur={form.submit} />
      </Form.Item>
      <Form.Item name="level" label="Level" initialValue={data.level}>
        <Input onBlur={form.submit} />
      </Form.Item>
    </Form>
  )
}

type ProjectDetailedFormValues = {
  dateStart?: string | null
  dateEnd?: string | null
  responsibilities?: string | null
}

const ProjectDetaledForm = ({
  data,
  editable,
  onSubmit,
}: {
  data: Vitae
  editable: boolean
  onSubmit: (values: ProjectDetailedFormValues) => void
}) => {
  const [form] = Form.useForm<ProjectDetailedFormValues>()
  const [isPresent, setIsPresent] = useState(!data?.dateEnd)

  return (
    <Form
      form={form}
      name={`cv-project-detailed-${data.id}`}
      labelCol={{ span: 24, offset: 0 }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="dateStart"
        label=""
        initialValue={data.dateStart ? moment(moment(data.dateStart), dateFormatList) : undefined}
      >
        <DatePicker
          placeholder="Start month"
          disabledDate={current => disabledDate(current, data.dateEnd, true)}
          disabled={!editable}
          onBlur={form.submit}
        />
      </Form.Item>
      <Form.Item
        name="dateEnd"
        label=""
        initialValue={data.dateEnd ? moment(moment(data.dateEnd), dateFormatList) : undefined}
      >
        <DatePicker
          placeholder="End month"
          disabledDate={current => disabledDate(current, data.dateStart, true)}
          disabled={!editable || isPresent}
          onBlur={form.submit}
        />
      </Form.Item>
      <Checkbox
        disabled={!editable}
        checked={isPresent}
        onChange={() => {
          if (isPresent) {
            setIsPresent(false)
          } else {
            setIsPresent(true)
            form.setFieldsValue({ dateEnd: null })
            form.submit()
          }
        }}
      >
        for the present
      </Checkbox>
      <Form.Item
        name="responsibilities"
        label="Responsibilities"
        initialValue={data?.responsibilities}
      >
        <Input.TextArea
          placeholder="Enter something"
          autoSize={{ minRows: 2 }}
          disabled={!editable}
          onBlur={form.submit}
        />
      </Form.Item>
    </Form>
  )
}

const ProjectView = ({
  data,
  editable,
  onUpdate,
  onDelete,
}: {
  data: Vitae
  editable: boolean
  onUpdate: (vitae: Vitae) => void
  onDelete: () => void
}) => {
  return (
    <Card
      title={
        <ProjectBasicForm
          data={data}
          editable={editable}
          onSubmit={values => onUpdate({ ...data, ...values })}
        />
      }
      extra={
        editable && (
          <Popconfirm title="Sure to delete?" onConfirm={onDelete}>
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        )
      }
    >
      <ProjectDetaledForm
        data={data}
        editable={editable}
        onSubmit={values => onUpdate({ ...data, ...values })}
      />
    </Card>
  )
}

export default EmployeeCVExperience
