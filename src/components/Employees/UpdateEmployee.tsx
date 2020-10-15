import { EditOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { EmployeeDetails } from '../../fragments'
import message from '../../message'
import updateEmployee from '../../queries/updateEmployee'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import { getEmployeeDetails } from './EmployeeDetails'
import ProjectForm from './EmployeeForm'
import { useToken } from '../../utils/withToken'

type EmployeePick = EmployeeDetails & {
  agileManager: EmployeeDetails
}

function UpdateProject({ employee }: { employee: EmployeePick }) {
  const { scope } = useToken()

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

  if (!scope.includes('application.readwrite.all')) return null

  return (
    <Drawer
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
          }}
        />
      }
    />
  )
}

export default UpdateProject
