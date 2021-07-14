import { EditOutlined } from '@ant-design/icons'
import React from 'react'
import message from '../../message'
import {
  GetEmployeeDetailedDocument,
  GetEmployeeDetailedQuery,
  useUpdateEmployeeMutation,
} from '../../queries/employees'
import getEmployeeProjects from '../../queries/getEmployeeProjects'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import { useEmployee } from '../../utils/withEmployee'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import EmployeeForm from './EmployeeForm'

function UpdateProject({
  employee,
  isOpen,
  onClose,
}: {
  employee: NonNullable<GetEmployeeDetailedQuery['employeeByEmail']>
  isOpen?: boolean
  onClose?: any
}) {
  const user = useEmployee()

  const hasAccess = useStrapiGroupCheck(['SYS_ADMINS', 'SUPER_USER'])
  const isMeAgile = employee?.agileManager?.id === user.employee.id

  const [update, { loading }] = useUpdateEmployeeMutation({
    onCompleted: () => message.success('Employee is updated'),
    refetchQueries: [
      {
        query: GetEmployeeDetailedDocument,
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
    onError: message.error,
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
        />
      }
    />
  )
}

export default UpdateProject
