import { EditOutlined } from '@ant-design/icons'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import React from 'react'
import { EmployeeDetails } from '../../fragments'
import message from '../../message'
import updateEmployee from '../../queries/updateEmployee'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import { getEmployeeDetails } from './EmployeePage'
import ProjectForm from './EmployeeForm'

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
  const { data } = useQuery(
    gql`
      query getEmployee($email: String!) {
        employeeByEmail(email: $email) {
          id
          accessEditGlobal
        }
      }
    `,
    { variables: { email: employee.email } },
  )

  const [update, { loading }] = useMutation(updateEmployee, {
    onCompleted: () => message.success('Employee is updated'),
    refetchQueries: [
      {
        query: getEmployeeDetails,
        variables: {
          email: employee.email,
        },
      },
    ],
    awaitRefetchQueries: true,
    onError: e => {
      message.error(e)
    },
  })

  if (!data?.employeeByEmail?.accessEditGlobal) return null

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      toggler={<Button size="small" icon={<EditOutlined />} type="link"></Button>}
      drawerLabel={'Edit employee ' + employee?.name}
      content={
        <ProjectForm
          loading={loading}
          item={employee}
          onSubmit={async (item: any, onDone: any) => {
            update({
              variables: {
                input: {
                  id: item.id,
                  agileManager: item.agileManager,
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
