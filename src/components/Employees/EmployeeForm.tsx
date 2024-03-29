import { useQuery } from '@apollo/client'
import { Button, Checkbox, Form, InputNumber, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetEmployeeDetailedQuery } from '../../queries/employees'
import getEmployeeProjects, {
  GetEmployeeProjectsQuery,
  GetEmployeeProjectsVariables,
} from '../../queries/getEmployeeProjects'
import { EmployeeProject } from '../../types'
import EmployeeSelect from '../Employees/EmployeeSelect'
import { layout } from '../Management/AAD/services'

type EmployeePick = GetEmployeeDetailedQuery['employeeByEmail']
export interface Props {
  onSubmit?: (employee: EmployeePick, reset?: () => void) => void
  fullAccess?: boolean
  loading?: boolean
  item?: EmployeePick
  error?: string
  refForm?: any
  withSaveButton?: boolean
  saveInitialProjectsOccupancy?: any
}

export default function EmployeeForm({
  onSubmit,
  fullAccess,
  item,
  loading,
  refForm,
  withSaveButton,
  saveInitialProjectsOccupancy,
}: Props) {
  const [projectsOccupancy, setProjectsOccupancy] = useState<EmployeeProject[]>([])

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
    if (dataProjects && !loadingProjects) {
      setProjectsOccupancy(employeeProjects)
      if (saveInitialProjectsOccupancy) saveInitialProjectsOccupancy(employeeProjects)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeProjects])

  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit &&
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

  useEffect(() => {
    if (refForm) refForm.current.additionalInitial = employeeProjects
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProjects])

  useEffect(() => {
    form.setFieldsValue({ agileManager: item?.agileManager?.id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Form
      {...layout}
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        agileManager: item?.agileManager?.id,
        projectsOccupancy: employeeProjects,
      }}
      ref={refForm || null}
    >
      <Form.Item label="Agile Manager" name="agileManager">
        <EmployeeSelect
          wide
          selectProps={{
            disabled: !fullAccess,
            allowClear: true,
            onClear: () => form.setFieldsValue({ agileManager: null }),
          }}
        />
      </Form.Item>
      <Form.Item
        label="Allocation:"
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
        {(projects?.length &&
          projects?.map(project => (
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
                data-cy='capacityValue'
                defaultValue={employeeProjects?.find(e => e.project.id === project.id)?.capacity}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => (value ? Number(value?.replace('%', '')) : 0)}
                style={{ width: '80px', marginRight: '15px' }}
                onChange={value => {
                  setOccupancyField('capacity', value, project.id)
                }}
                value={projectsOccupancy.find(e => e.project?.id === project.id)?.capacity || 0}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <div data-cy='capacity' style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      height: 15,
                      lineHeight: '15px',
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                  >
                    {project.name}
                  </div>
                  <Popconfirm
                    placement="top"
                    title={`${project.name} project's allocation will be set at 100%, and for the others - 0%.`}
                    onConfirm={() => {
                      form.setFieldsValue({
                        projectsOccupancy: employeeProjects.map(e =>
                          e.project.id === project.id
                            ? { ...e, capacity: 100 }
                            : { ...e, capacity: 0 },
                        ),
                      })
                      setProjectsOccupancy(
                        employeeProjects.map(e =>
                          e.project.id === project.id
                            ? { ...e, capacity: 100 }
                            : { ...e, capacity: 0 },
                        ),
                      )
                    }}
                    okText="Yes"
                    cancelText="No"
                    disabled={projects.length < 2}
                  >
                    <Button
                      type="link"
                      style={{
                        margin: 0,
                        padding: 0,
                        height: 15,
                        lineHeight: '15px',
                        display: 'flex',
                      }}
                      disabled={projects.length < 2}
                    >
                      Make project main
                    </Button>
                  </Popconfirm>
                </div>
                <Checkbox
                  defaultChecked={
                    employeeProjects?.find(e => e.project.id === project.id)?.isExtraCapacity
                  }
                  onChange={event => {
                    setOccupancyField('isExtraCapacity', event.target.checked, project.id)
                  }}
                >
                  extra
                </Checkbox>
              </div>
            </div>
          ))) || (
          <div style={{ fontStyle: 'italic', color: 'lightgray' }}>
            user does not have any projects
          </div>
        )}
      </Form.Item>
      {withSaveButton && (
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ marginTop: '10px' }}
            data-cy="save"
          >
            Save
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
