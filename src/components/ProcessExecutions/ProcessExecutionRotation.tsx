import { useMutation } from '@apollo/react-hooks'
import { Button, Typography, Card } from 'antd'
import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getProcessExecutionLink } from '../../paths'
import { QueryType } from '../../queries/getProcessExecution'
import getProcessExecutions from '../../queries/getProcessExecutions'
import ROTATE_EMPLOYEE, {
  MutationResult as RotateEmployeeMutationResult,
  MutationVariables as RotateEmployeeMutationVariables,
} from '../../queries/rotateEmployee'
import CreateProcessForm from './CreateProcessForm'
import Drawer from '../UI/Drawer.new'
import getVacancies from '../../queries/getVacancies'

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
    onCompleted: (data) => {
      history.push(getProcessExecutionLink(data.rotateEmployee.id))
    },
  })

  const employees = processExecution.vacancy?.rotateEmployees || []
  if (!employees.length) {
    return null
  }

  return (
    <p>
      <Drawer visible={showDrawer} onClose={() => setShowDrawer(false)}>
        <CreateProcessForm
          onSubmit={({ process, locations, project }) => {
            rotateEmployee({
              variables: {
                input: {
                  execution: processExecution.id,
                  employee: employee!,
                  process,
                  locations,
                  project,
                },
              },
            })
          }}
        />
      </Drawer>
      <Typography.Title level={3}>Want to rotate</Typography.Title>
      {employees?.map((i) => {
        return (
          <Card bordered={false} key={i.id}>
            <div>{i.name}</div>
            <Button
              onClick={() => {
                setEmployee(i.id)
                setShowDrawer(true)
              }}
            >
              Apply
            </Button>
          </Card>
        )
      })}
    </p>
  )
}

export default withRouter(ProcessExecutionRotation)
