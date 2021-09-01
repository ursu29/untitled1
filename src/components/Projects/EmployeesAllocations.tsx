import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, InputNumber, Popconfirm } from 'antd'
import { useGetProjectByCodeQuery } from '../../queries/projects'
import { useQuery } from '@apollo/client'
import { EmployeeProject } from '../../types'
import { getEmployeesProjects } from '../../queries/getEmployeeProjects'

type Props = {
  form: any
  projectCode: string
  onChange: (projects: any) => void
  onError?: (errors: any) => void
  errors?: Array<any>
}

export const EmployeesAllocations = ({
  projectCode,
  form,
  errors,
  onChange,
  onError = () => {},
}: Props) => {
  const [employeeProjects, setEmployeeProjects] =
    useState<{ [id: string]: { capacity?: number; isExtraCapacity?: boolean } }>()
  const [initialGroupMembers, setInitialGroupMembers] = useState<string[]>([])

  useEffect(() => {
    onChange(employeeProjects)
  }, [employeeProjects, onChange])

  const { data: dataEmployeesProjects } = useQuery<{
    employeesProjects: EmployeeProject[]
  }>(getEmployeesProjects, {
    variables: { emails: initialGroupMembers },
    fetchPolicy: 'network-only',
  })

  const { data: projectData } = useGetProjectByCodeQuery({
    variables: { code: projectCode },
    fetchPolicy: 'network-only',
  })

  const employeesProjects = dataEmployeesProjects?.employeesProjects
  const project = projectData?.projectByCode

  useEffect(() => {
    const emails = (project?.employeeProjects || [])
      .map(emp => emp?.employee?.email)
      .filter(email => !!email)
    // @ts-ignore
    setInitialGroupMembers(emails)
  }, [project?.employeeProjects])

  if (!project?.employeeProjects?.length) return <>Loading...</>

  return (
    <>
      {project?.employeeProjects
        .slice()
        .sort((a, b) => a.employee?.name.localeCompare(b.employee?.name || '') || 1)
        ?.map(employeeProject => (
          <div
            key={employeeProject.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              marginBottom: '10px',
            }}
          >
            <InputNumber
              defaultValue={employeeProject.capacity || 0}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => (value ? Number(value?.replace('%', '')) : 0)}
              style={{
                width: '80px',
                marginRight: '15px',
                borderColor: errors?.includes(employeeProject.employee?.id || '') ? '#ff4d4f' : '',
              }}
              onChange={async value => {
                const employeeProjectState: any = employeeProjects?.[employeeProject?.id] || {}
                employeeProjectState.capacity = value
                const updatedValues = {
                  ...employeeProjects,
                  [employeeProject?.id]: employeeProjectState,
                }
                setEmployeeProjects(updatedValues)
                form.validateFields()
              }}
              value={employeeProjects?.[employeeProject?.id]?.capacity || 0}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    height: 15,
                    lineHeight: '15px',
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}
                >
                  {employeeProject.employee?.name}
                </div>
                <Popconfirm
                  placement="top"
                  title={`${employeeProject.employee?.name} - project allocation for ${project.name} will be set at 100%, and for the other projects - 0%.`}
                  onConfirm={() => {
                    const otherEmployeeProjectsIDs = employeesProjects
                      ?.filter(
                        e =>
                          e.employee.id === employeeProject.employee?.id &&
                          e.id !== employeeProject.id,
                      )
                      .map(e => e.id)
                    const other =
                      otherEmployeeProjectsIDs?.reduce((obj, id) => {
                        obj[id] = { capacity: 0 }
                        return obj
                      }, {} as { [key: string]: { capacity: number } }) || {}

                    setEmployeeProjects({
                      ...employeeProjects,
                      [employeeProject?.id]: { capacity: 100 },
                      ...other,
                    })
                  }}
                  okText="Yes"
                  cancelText="No"
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
                  >
                    Make project main
                  </Button>
                </Popconfirm>
              </div>
              <Checkbox
                defaultChecked={!!employeeProject.isExtraCapacity}
                onChange={event => {
                  const employeeProjectState: any = employeeProjects?.[employeeProject?.id] || {}
                  employeeProjectState.isExtraCapacity = event.target.checked
                  setEmployeeProjects({
                    ...employeeProjects,
                    [employeeProject?.id]: employeeProjectState,
                  })
                }}
              >
                extra
              </Checkbox>
            </div>
          </div>
        )) || <div style={{ fontStyle: 'italic', color: 'lightgray' }}>group is empty</div>}
      {!!errors?.length && (
        <div role="alert" style={{ color: 'red', marginTop: 20 }}>
          Employees total projects allocation is more than 100% :{' '}
          {errors
            .map(id => employeesProjects?.find(e => e.employee.id === id)?.employee.name)
            .join(', ')}
        </div>
      )}
      <Form.Item
        name="validation"
        hidden
        rules={[
          () => ({
            validator(_, value) {
              const employeeIDsTotalCapacityMapping = employeesProjects?.reduce(
                (obj: { [id: string]: number }, e: EmployeeProject) => {
                  const updatedCapacity = employeeProjects?.[e.id]?.capacity
                  obj[e.employee.id] =
                    (obj?.[e.employee.id] || 0) +
                    (updatedCapacity !== undefined ? updatedCapacity : e.capacity)
                  return obj
                },
                {},
              )

              if (employeeIDsTotalCapacityMapping) {
                const errorEmployeeIDs = Object.keys(employeeIDsTotalCapacityMapping).filter(
                  id => employeeIDsTotalCapacityMapping[id] > 100,
                )
                onError(errorEmployeeIDs)
                if (errorEmployeeIDs.length) return Promise.reject()
              }

              return Promise.resolve()
            },
          }),
        ]}
      />
    </>
  )
}
