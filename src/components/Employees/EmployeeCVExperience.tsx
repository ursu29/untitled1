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
  Tooltip,
} from 'antd'
import { EditOutlined, CheckOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import styled from 'styled-components'
import message from '../../message'
import { useUpdateCvMutation } from '../../queries/cv'
import queryProjects, { QueryType as ProjectsQueryType } from '../../queries/getProjects'
import { CurriculumVitae, Employee, Scalars, Vitae } from '../../types/graphql'
import { ProjectDetails } from '../../fragments'
import ProjectTag from '../Projects/ProjectTag'
import RichText from '../UI/RichText'
import { DEBOUNCE_DELAY } from '../../constants'

const { Title, Text, Paragraph } = Typography
const { Option } = Select

// Visual date format in picker
const dateFormatList = ['DD.MM.YYYY']
const DATE_MONTH_FORMAT = 'MMM YYYY'
const dateToISO = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toISOString()
}

// Condition checking the transmitted word - company field - allowed to change for future purposes
const syncretisNames = ['Sidenis', 'Syncretis (ex Sidenis)', 'Syncretis']
const isWordSyncretis = (word: string) =>
  syncretisNames.map(e => e.toLowerCase()).includes(word.toLowerCase())

const positionValues = [
  { value: 'Frontend Developer' },
  { value: 'Backend Developer' },
  { value: 'Manual QA' },
  { value: 'Automation QA' },
  { value: 'Software Engineer' },
  { value: 'Data Engineer' },
  { value: 'Data Scientist' },
  { value: 'System Administrator' },
  { value: 'DevOps Engineer' },
  { value: 'Support Engineer' },
  { value: 'Business Analyst' },
  { value: 'System Analyst' },
  { value: 'UX/UI Designer' },

  { value: 'Team Lead' },
  { value: 'Scrum Master' },
  { value: 'Agile Manager' },
  { value: 'Project Manager' },
  { value: 'Marketing Manager' },
  { value: 'HR Manager' },
  { value: 'Office Manager' },

  // ? tech names
  { value: 'Java Developer' },
  { value: '.NET Developer' },
  { value: 'R Developer' },

  // ? rare
  { value: 'Mathematical Software Engineer' },
  { value: 'Math Developer' },
  { value: 'Machine Learning Engineer' },
  { value: 'Mathematical Modeler' },
  { value: 'Data Visualization Engineer' },
  { value: 'CEO' },
  { value: 'CCO' },
  { value: 'CTO' },
  { value: 'Head of the local office' },
  { value: 'Head of IT Infrastructure' },
  { value: 'Head of Security' },
  { value: 'Head of Operation' },
  { value: 'Actuarial Pricing Consultant' },
  { value: 'Staff Record Specialist' },
  { value: 'Online Advertising Specialist' },
  { value: 'Accountant' },
  { value: 'English Teacher' },
  { value: 'Lawyer' },
  // { value: 'Trainee' },
  // { value: 'Intern' },
]
const levelValues = [{ value: 'Junior' }, { value: 'Middle' }, { value: 'Senior' }]

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
        position: vitae.position?.trim(),
        company: vitae.company.charAt(0).toUpperCase() + vitae.company.slice(1).trim(),
        dateStart: vitae.dateStart ? dateToISO(vitae.dateStart) : null,
        dateEnd: vitae.dateEnd ? dateToISO(vitae.dateEnd) : null,
        project: vitae.project?.trim(),
        responsibilities: vitae.responsibilities?.trim(),
        level: vitae.level?.trim(),
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
  const [newCompanyWasCreated, setNewCompanyWasCreated] = useState(false)

  // Has new 'untitled' company or not
  const hasUntitledCompany = !!data.find(e => e.company === '')

  // remember sorting on mount
  const [vitaesSortedByDate] = useState(() =>
    [...data]
      .sort((a, b) => new Date(a?.dateStart || 0).getTime() - new Date(b?.dateStart || 0).getTime())
      .map(v => v.id),
  )
  const groupedByCompany = [...data]
    .sort((a, b) => vitaesSortedByDate.indexOf(b.id) - vitaesSortedByDate.indexOf(a.id))
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
    setNewCompanyWasCreated(true)
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
    <div data-cy="workExperienceBlock">
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '32px' }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Work experience
        </Title>
        {editable && (
          <Tooltip
            title={
              hasUntitledCompany
                ? "You already have the 'new' company. Give it name to add more."
                : ''
            }
          >
            <Button
              disabled={loading || hasUntitledCompany}
              onClick={() => handleCreate('')}
              data-cy="addCompany"
            >
              Add Company
            </Button>
          </Tooltip>
        )}
      </div>
      <div>
        {Object.entries(groupedByCompany)
          .sort((a, b) => (a[0] === '' ? -1 : 1))
          .map(([company, data]) => (
            <JobView
              key={company}
              data={data}
              company={company}
              editable={editable}
              newCompanyWasCreated={newCompanyWasCreated}
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
  align-items: flex-start;
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
  padding: 8px 16px 0;
  &:after {
    // hack for fixing bottom offset
    content: '';
    display: block;
    margin-top: 16px;
  }
`
const StyledInlineForm = styled(Form)`
  width: 100%;
  .ant-form-item {
    flex: 1;
  }
  .ant-form-item-with-help {
    margin-bottom: 0;
  }
`
const StyledProjectResponsibilities = styled(RichText)`
  color: #595959;
`

const JobView = ({
  data,
  company,
  editable,
  isEdited,
  newCompanyWasCreated,
  onUpdate,
  onDelete,
  onCreate,
}: {
  data: Vitae[]
  company: string
  editable: boolean
  isEdited?: boolean
  newCompanyWasCreated?: boolean
  onUpdate: (vitae: Vitae[]) => void
  onDelete: (vitae: Vitae[]) => void
  onCreate: (company: string) => void
}) => {
  const [isEditMode, setIsEditMode] = useState(!!isEdited)

  useEffect(() => {
    if (newCompanyWasCreated && company === '') setIsEditMode(true)
  }, [newCompanyWasCreated, company])

  return (
    <div>
      <StyledCompanyHead>
        <CardTitle>
          {editable && isEditMode ? (
            <CompanyNameForm
              company={company}
              onSubmit={values => {
                onUpdate(data.map(p => ({ ...p, company: values.company })))
                setIsEditMode(false)
              }}
            />
          ) : (
            <>
              <div
                style={{
                  fontSize: 18,
                  fontStyle: company ? '' : 'italic',
                  backgroundColor: company ? '' : 'lightyellow',
                }}
              >
                {company || 'new company'}
              </div>
              {editable && !isEditMode && (
                <CardActions>
                  <Button
                    data-cy=""
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditMode(true)}
                  />
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
                  <Button data-cy="deleteCompany" type="link" danger>
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

type CompanyNameFormValues = {
  company: string
}

const CompanyNameForm = ({
  company,
  onSubmit,
}: {
  company: string
  onSubmit: (values: CompanyNameFormValues) => void
}) => {
  const [form] = Form.useForm<CompanyNameFormValues>()

  return (
    <StyledInlineForm
      form={form}
      layout="inline"
      name={`cv-company-name-${company}`}
      // @ts-expect-error
      onFinish={onSubmit}
    >
      <Form.Item
        name="company"
        label=""
        initialValue={company}
        rules={[
          {
            required: true,
            whitespace: true,
            message: `Company name is required.`,
          },
        ]}
      >
        <AutoComplete
          placeholder="Enter company name"
          style={{ width: '100%' }}
          options={syncretisNames.map(value => ({ value }))}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().startsWith(inputValue.toUpperCase())
          }
          defaultOpen={true}
          autoFocus={true}
          data-cy="inputCompanyName"
        />
      </Form.Item>
      <Button data-cy="saveNewCompany" htmlType="submit" type="link" icon={<CheckOutlined />} />
    </StyledInlineForm>
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
    <StyledInlineForm
      form={form}
      layout="inline"
      name={`cv-project-basic-${data.id}`}
      // @ts-expect-error
      onFinish={onSubmit}
    >
      <Form.Item name="project" label="Project" initialValue={data.project}>
        {data.company && isWordSyncretis(data.company) ? (
          <AutoComplete
            showSearch
            style={{ width: '100%' }}
            placeholder="Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear={true}
          >
            {projectList.map(project => (
              <Option key={project.code} value={project.name} style={{ overflow: 'visible' }}>
                {project.name}
              </Option>
            ))}
          </AutoComplete>
        ) : (
          <Input placeholder="Select" />
        )}
      </Form.Item>
      <Form.Item
        name="position"
        label="Position"
        initialValue={data.position}
        rules={[
          {
            required: true,
            whitespace: true,
            message: `Position is required.`,
          },
        ]}
      >
        <AutoComplete
          placeholder="Select"
          style={{ width: '100%' }}
          options={positionValues}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().startsWith(inputValue.toUpperCase())
          }
        />
      </Form.Item>
      <Form.Item name="level" label="Level" initialValue={data.level}>
        <AutoComplete
          placeholder="Select"
          style={{ width: '100%' }}
          options={levelValues}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().startsWith(inputValue.toUpperCase())
          }
        />
      </Form.Item>
      <Button htmlType="submit" type="link" icon={<CheckOutlined />} />
    </StyledInlineForm>
  )
}

type ProjectDetailedFormValues = {
  date: [string | null, string | null] | null
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

  const handleResponsibilitiesChange = debounce(DEBOUNCE_DELAY.FORM_INPUT, (e: any) => {
    form.setFieldsValue({
      responsibilities: e.target.value,
    })
    form.submit()
  })

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
        let start = null
        let end = null
        ;[start, end] = Array.isArray(values.date) ? values.date : [values.date, null]
        if (isPresent) end = null
        onSubmit({
          //@ts-ignore
          dateStart: start,
          dateEnd: end,
          responsibilities: values.responsibilities,
        })
      }}
    >
      <Space>
        <Form.Item
          name="date"
          label=""
          noStyle
          initialValue={isPresent ? dateStart : [dateStart, dateEnd]}
        >
          {isPresent ? (
            <DatePicker
              format={DATE_MONTH_FORMAT}
              picker="month"
              allowClear
              disabled={editable ? false : true}
              onChange={value => {
                if (!value) form.submit()
              }}
              onBlur={form.submit}
            />
          ) : (
            <DatePicker.RangePicker
              format={DATE_MONTH_FORMAT}
              picker="month"
              allowEmpty={[true, true]}
              allowClear
              disabled={editable ? [false, isPresent] : true}
              onChange={value => {
                if (!value) form.submit()
              }}
              onBlur={form.submit}
            />
          )}
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
        style={{ marginBottom: 0, marginTop: 16 }}
      >
        <Input.TextArea
          placeholder="Enter something"
          autoSize={{ minRows: 2 }}
          disabled={!editable}
          onChange={handleResponsibilitiesChange}
          bordered={false}
          style={{ paddingLeft: 0 }}
        />
      </Form.Item>
    </Form>
  )
}

const ProjectHeader = ({ data, projectList }: { data: Vitae; projectList: ProjectDetails[] }) => {
  if (!data.project && !data.position && !data.level) {
    return <StyledProjectName>untitled</StyledProjectName>
  }
  const project = data.project && projectList.find(p => p.name === data.project)
  return (
    <Space>
      {data.project &&
        (project ? (
          <ProjectTag small project={project} />
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
                onSubmit={values => {
                  onUpdate({ ...data, ...values })
                  setIsEditMode(false)
                }}
              />
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
