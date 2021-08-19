import { useMutation } from '@apollo/client'
import { Button, Typography } from 'antd'
import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getProcessExecutionLink } from '../../paths'
import { QueryType } from '../../queries/getProcessExecution'
import getProcessExecutions from '../../queries/getProcessExecutions'
import getVacancies from '../../queries/getVacancies'
import ROTATE_EMPLOYEE, {
  MutationResult as RotateEmployeeMutationResult,
  MutationVariables as RotateEmployeeMutationVariables,
} from '../../queries/rotateEmployee'
import message from '../../message'
import EmployeeCard from '../Employees/EmployeeCard'
import Drawer from '../UI/Drawer.new'
import CreateProcessForm from './CreateProcessForm'

interface Props {
  processExecution: QueryType['processExecutions'][0]
}

function ProcessExecutionRotation({ history, processExecution }: Props & RouteComponentProps) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [employee, setEmployee] = useState<string | null>(null)
  const [rotateEmployee] = useMutation<
    RotateEmployeeMutationResult,
    RotateEmployeeMutationVariables
  >(ROTATE_EMPLOYEE, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getProcessExecutions }, { query: getVacancies }],
    onCompleted: data => {
      history.push(getProcessExecutionLink(data.rotateEmployee.id))
    },
    onError: message.error,
  })

  const employees = processExecution.vacancy?.rotateEmployees || []
  if (!employees.length) {
    return null
  }

  return (
    <div style={{ paddingBottom: 16 }}>
      <Drawer visible={showDrawer} onClose={() => setShowDrawer(false)}>
        <CreateProcessForm
          onSubmit={({ process, locations, project, prio }) => {
            rotateEmployee({
              variables: {
                input: {
                  execution: processExecution.id,
                  employee: employee!,
                  process,
                  locations,
                  project,
                  prio,
                },
              },
            })
          }}
        />
      </Drawer>
      <Typography.Title level={3}>Want to rotate</Typography.Title>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {employees?.map(i => {
          return (
            <div key={i.id} style={{ marginRight: 16 }}>
              <EmployeeCard email={i.email} cardProps={{ style: { marginBottom: 16 } }} />
              {processExecution.status === 'RUNNING' && (
                <Button
                  onClick={() => {
                    setEmployee(i.id)
                    setShowDrawer(true)
                  }}
                >
                  Apply
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default withRouter(ProcessExecutionRotation)
