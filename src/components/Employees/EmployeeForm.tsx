import { Button, Form, InputNumber, Checkbox } from 'antd'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import getEmployeeProjects, {
  GetEmployeeProjectsQuery,
  GetEmployeeProjectsVariables,
} from '../../queries/getEmployeeProjects'
import { EmployeeDetails } from '../../fragments'
import { Employee } from '../../types'
import EmployeeSelect from '../Employees/EmployeeSelect'

type EmployeePick = {
  id: Employee['id']
  agileManager: EmployeeDetails | null
}

export interface Props {
  onSubmit: (employee: EmployeePick, reset?: () => void) => void
  loading?: boolean
  item?: EmployeePick
  error?: string
}

export default function EmployeeForm({ onSubmit, item, loading }: Props) {
  const [projectsOccupancy, setProjectsOccupancy] = useState([{}])

  const { data: dataProjects, loading: loadingProjects } = useQuery<
    GetEmployeeProjectsQuery,
    GetEmployeeProjectsVariables
  >(getEmployeeProjects, {
    variables: { id: item?.id || '' },
    fetchPolicy: 'network-only',
  })

  const projects = dataProjects?.employee.projects
  const employeeProjects = dataProjects?.employee.employeeProjects || []
  useEffect(() => {
    if (dataProjects && !loadingProjects) setProjectsOccupancy(employeeProjects)
    //eslint-disable-next-line
  }, [employeeProjects])

  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit({
      id: item?.id,
      ...values,
    })
  }

  const setOccupancyField = (field: string, value: any, projectId: string) => {
    form.setFieldsValue({
      projectsOccupancy: [
        ...projectsOccupancy?.map((e: any) => {
          if (e.project.id === projectId) {
            return {
              ...e,
              [field]: value,
            }
          }
          return e
        }),
      ],
    })
    form.validateFields(['projectsOccupancy'])
    setProjectsOccupancy(form.getFieldValue('projectsOccupancy'))
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        agileManager: item?.agileManager?.id,
        projectsOccupancy: employeeProjects,
      }}
    >
      <Form.Item label="Agile Manager" name="agileManager">
        <EmployeeSelect wide />
      </Form.Item>
      <Form.Item
        label="Projects occupancy"
        name="projectsOccupancy"
        rules={[
          () => ({
            validator(_, value) {
              const total = value.reduce((acc: number, e: any) => acc + e.capacity, 0)
              if (total <= 100) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The total value must be no more than 100%!'))
            },
          }),
        ]}
      >
        {projects?.map(project => (
          <div
            key={project.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              marginBottom: '10px',
            }}
          >
            <InputNumber
              defaultValue={employeeProjects?.find(e => e.project.id === project.id)?.capacity}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value?.replace('%', '') || ''}
              style={{ width: '70px', marginRight: '15px' }}
              onChange={value => {
                setOccupancyField('capacity', value, project.id)
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              {project.name}
              <Checkbox
                defaultChecked={
                  employeeProjects?.find(e => e.project.id === project.id)?.isExtraCapacity
                }
                onChange={event => {
                  setOccupancyField('isExtraCapacity', event.target.checked, project.id)
                }}
              >
                is extra
              </Checkbox>
            </div>
          </div>
        ))}
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" style={{ marginTop: '10px' }} data-cy="save">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
