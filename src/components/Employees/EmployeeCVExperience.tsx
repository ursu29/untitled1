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
  Tag,
  Space,
} from 'antd'
import { EditOutlined, CheckOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useState } from 'react'
import { debounce } from 'throttle-debounce'
import styled from 'styled-components'
import message from '../../message'
import { useUpdateCvMutation } from '../../queries/cv'
import queryProjects, { QueryType as ProjectsQueryType } from '../../queries/getProjects'
import { CurriculumVitae, Employee, Scalars, Vitae } from '../../types/graphql'
import { ProjectDetails } from '../../fragments'
import ProjectTag from '../Projects/ProjectTag'
import RichText from '../UI/RichText'

const { Title, Text, Paragraph } = Typography
const { Option } = Select

// Visual date format in picker
const dateFormatList = ['DD.MM.YYYY']
const DATE_MONTH_FORMAT = 'MMM YYYY'
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
        project: vitae.project,
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
        <Title level={4}>Work experience</Title>
        {editable && (
          <Button disabled={loading} onClick={() => handleCreate('')}>
            Add Company
          </Button>
        )}
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

const CardActions = styled.div``

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  ${CardActions} {
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover {
    ${CardActions} {
      opacity: 1;
    }
  }
`

const StyledCompanyHead = styled(CardHeader)`
  margin: 8px 0 16px;
`

const StyledProjectCard = styled.div`
  border: 1px solid #dedede;
  margin-bottom: 16px;
`
const StyledProjectHead = styled(CardHeader)`
  background: #fafafa;
  border-bottom: 1px solid #dedede;
  padding: 8px;
`
const StyledProjectTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const StyledProjectName = styled.span`
  font-size: 18px;
`
const StyledProjectBody = styled.div`
  border-bottom: 1px solid #dedede;
  padding: 8px 16px 0;
  &:after {
    // hack for fixing bottom offset
    content: '';
    display: block;
    margin-top: 16px;
  }
`
const StyledProjectForm = styled(Form)`
  width: 100%;
  .ant-form-item {
    flex: 1;
  }
`
const StyledProjectResponsibilities = styled(RichText)`
  color: #595959;
`

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
  const [isEditMode, setIsEditMode] = useState(false)
  return (
    <div>
      <StyledCompanyHead>
        <CardTitle>
          {editable && isEditMode ? (
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
              />
              <Button type="link" icon={<CheckOutlined />} onClick={() => setIsEditMode(false)} />
            </>
          ) : (
            <>
              <div style={{ fontSize: 18 }}>{company || 'Unknown company'}</div>
              {editable && !isEditMode && (
                <CardActions>
                  <Button type="link" icon={<EditOutlined />} onClick={() => setIsEditMode(true)} />
                </CardActions>
              )}
            </>
          )}
        </CardTitle>
        {editable && (
          <Space>
            {!isEditMode && (
              <CardActions>
                <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(data)}>
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </CardActions>
            )}
            <Button onClick={() => onCreate(company)}>Add Project</Button>
          </Space>
        )}
      </StyledCompanyHead>

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
  projectList,
  onSubmit,
}: {
  data: Vitae
  projectList: ProjectDetails[]
  onSubmit: (values: ProjectBasicFormValues) => void
}) => {
  const [form] = Form.useForm<ProjectBasicFormValues>()

  return (
    <StyledProjectForm
      form={form}
      layout="inline"
      name={`cv-project-basic-${data.id}`}
      // @ts-expect-error
      onFinish={onSubmit}
    >
      <Form.Item name="project" label="Project" initialValue={data.project}>
        {data.company && isWordSyncretis(data.company) ? (
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Select a project"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onBlur={form.submit}
          >
            {projectList.map(project => (
              <Option key={project.id} value={project.code} style={{ overflow: 'visible' }}>
                {project.name}
              </Option>
            ))}
          </Select>
        ) : (
          <Input onBlur={form.submit} />
        )}
      </Form.Item>
      <Form.Item name="position" label="Position" initialValue={data.position}>
        <Input onBlur={form.submit} />
      </Form.Item>
      <Form.Item name="level" label="Level" initialValue={data.level}>
        <Input onBlur={form.submit} />
      </Form.Item>
    </StyledProjectForm>
  )
}

type ProjectDetailedFormValues = {
  date: [string | null, string | null]
  responsibilities: string | null
}

type ProjectDetailedSubmitValues = {
  dateStart?: string | null
  dateEnd?: string | null
  responsibilities?: string | null
}

const ProjectDetailedForm = ({
  data,
  editable,
  onSubmit,
}: {
  data: Vitae
  editable: boolean
  onSubmit: (values: ProjectDetailedSubmitValues) => void
}) => {
  const [form] = Form.useForm<ProjectDetailedFormValues>()
  const [isPresent, setIsPresent] = useState(!data?.dateEnd)
  const dateStart = data.dateStart
    ? moment(moment(data.dateStart), dateFormatList).locale('en')
    : undefined
  const dateEnd = data.dateEnd
    ? moment(moment(data.dateEnd), dateFormatList).locale('en')
    : undefined

  if (!editable) {
    return (
      <div>
        <div>
          {[
            dateStart?.format(DATE_MONTH_FORMAT),
            dateEnd?.format(DATE_MONTH_FORMAT) || 'for the present',
          ]
            .filter(Boolean)
            .join(' - ')}
        </div>
        <div>
          <Text>Responsibilities:</Text>
          <div>
            {data.responsibilities ? (
              <StyledProjectResponsibilities text={data.responsibilities} />
            ) : (
              <Paragraph type="secondary">No description</Paragraph>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Form
      form={form}
      name={`cv-project-detailed-${data.id}`}
      labelCol={{ span: 24, offset: 0 }}
      onFinish={values => {
        const {
          date: [start, end],
          responsibilities,
        } = values
        onSubmit({
          dateStart: start,
          dateEnd: isPresent ? null : end,
          responsibilities,
        })
      }}
    >
      <Space>
        <Form.Item name="date" label="" initialValue={[dateStart, dateEnd]} noStyle>
          <DatePicker.RangePicker
            format={DATE_MONTH_FORMAT}
            picker="month"
            allowEmpty={[true, true]}
            allowClear
            disabled={editable ? [false, isPresent] : true}
            onBlur={form.submit}
          />
        </Form.Item>
        <Checkbox
          disabled={!editable}
          checked={isPresent}
          onChange={() => {
            setIsPresent(prev => !prev)
            form.submit()
          }}
        >
          for the present
        </Checkbox>
      </Space>
      <Form.Item
        name="responsibilities"
        label="Responsibilities"
        initialValue={data?.responsibilities}
        style={{ marginBottom: 0 }}
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

const ProjectHeader = ({ data, projectList }: { data: Vitae; projectList: ProjectDetails[] }) => {
  if (!data.project && !data.position && !data.level) {
    return <StyledProjectName>Unknown project</StyledProjectName>
  }
  const project = data.project && projectList.find(p => p.code === data.project)
  return (
    <Space>
      {data.project &&
        (project ? (
          <ProjectTag project={project} />
        ) : (
          <Tag style={{ fontSize: 14 }}>{data.project}</Tag>
        ))}
      <StyledProjectName>{data.position}</StyledProjectName>
      {data.level && <Tag>{data.level}</Tag>}
    </Space>
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
  const [isEditMode, setIsEditMode] = useState(false)
  const { data: queryData } = useQuery<ProjectsQueryType>(queryProjects)
  const projectList = queryData?.projects?.slice().sort((a, b) => (a.name > b.name ? 1 : -1)) || []

  return (
    <StyledProjectCard>
      <StyledProjectHead>
        <CardTitle>
          {editable && isEditMode ? (
            <StyledProjectTitle>
              <ProjectBasicForm
                data={data}
                projectList={projectList}
                onSubmit={values => onUpdate({ ...data, ...values })}
              />
              <Button type="link" icon={<CheckOutlined />} onClick={() => setIsEditMode(false)} />
            </StyledProjectTitle>
          ) : (
            <Space>
              <ProjectHeader data={data} projectList={projectList} />
              {editable && !isEditMode && (
                <CardActions>
                  <Button type="link" icon={<EditOutlined />} onClick={() => setIsEditMode(true)} />
                </CardActions>
              )}
            </Space>
          )}
        </CardTitle>
        {editable && !isEditMode && (
          <CardActions>
            <Popconfirm title="Sure to delete?" onConfirm={onDelete}>
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </CardActions>
        )}
      </StyledProjectHead>
      <StyledProjectBody>
        <ProjectDetailedForm
          data={data}
          editable={editable}
          onSubmit={values => onUpdate({ ...data, ...values })}
        />
      </StyledProjectBody>
    </StyledProjectCard>
  )
}

export default EmployeeCVExperience
