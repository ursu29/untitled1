import { EditOutlined } from '@ant-design/icons'
import React from 'react'
import { EmployeeDetails } from '../../fragments'
import message from '../../message'
import { useUpdateEmployeeMutation } from '../../queries/employees'
import getEmployeeProjects from '../../queries/getEmployeeProjects'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import { getEmployeeDetails } from './EmployeePage'
import EmployeeForm from './EmployeeForm'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import { useEmployee } from '../../utils/withEmployee'

type EmployeePick = EmployeeDetails & {
  agileManager: EmployeeDetails | null
}

function UpdateProject({
  employee,
  isOpen,
  onClose,
}: {
  employee: EmployeePick
  isOpen?: boolean
  onClose?: any
}) {
  const user = useEmployee()

  const hasAccess = useStrapiGroupCheck(['SYS_ADMINS', 'SUPER_USER'])
  const isMeAgile = employee.agileManager?.id === user.employee.id

  const [update, { loading }] = useUpdateEmployeeMutation({
    onCompleted: () => message.success('Employee is updated'),
    refetchQueries: [
      {
        query: getEmployeeDetails,
        variables: {
          email: employee.email,
        },
      },
      {
        query: getEmployeeProjects,
        variables: {
          id: employee.id,
        },
      },
    ],
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  if (!hasAccess && !isMeAgile) return null

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      toggler={<Button size="small" icon={<EditOutlined />} type="link"></Button>}
      drawerLabel={'Edit employee ' + employee?.name}
      content={
        <EmployeeForm
          loading={loading}
          item={employee}
          fullAccess={hasAccess}
          onSubmit={async (item: any, onDone: any) => {
            update({
              variables: {
                input: {
                  id: item.id,
                  agileManager: item.agileManager,
                  employeeProjects: item.projectsOccupancy?.map((e: any) => ({
                    id: e.id,
                    capacity: e.capacity,
                    isExtraCapacity: e.isExtraCapacity,
                  })),
                },
              },
              update: onDone,
            })

            if (onClose) onClose()
          }}
          withSaveButton
        />
      }
    />
  )
}

export default UpdateProject
