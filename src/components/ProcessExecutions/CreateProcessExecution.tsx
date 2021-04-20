import { useMutation } from '@apollo/react-hooks'
import { Button } from 'antd'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import message from '../../message'
import getProcessExecutions from '../../queries/getProcessExecutions'
import Drawer from '../UI/Drawer'
import CreateProcessForm from './CreateProcessForm'
import { useEmployee } from '../../utils/withEmployee'
import getActiveProcessExecutions from '../../queries/getEmployeeActiveProcessExecutions'
import { useHistory } from 'react-router-dom'

const mutation = gql`
  mutation createProcessExecution($input: CreateProcessExecutionInput) {
    createProcessExecution(input: $input) {
      id
    }
  }
`

function CreateProcessExecution() {
  const { employee } = useEmployee()
  const history = useHistory()

  const [create, args] = useMutation(mutation, {
    refetchQueries: [
      { query: getProcessExecutions },
      {
        query: getActiveProcessExecutions,
        variables: { email: employee.email },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: res => {
      const id = res.createProcessExecution.id
      message.success('New process is added')
      history.push(`/hr/${id}`)
    },
    onError: message.error,
  })

  useEffect(() => {
    if (args.loading) {
      message.loading('Adding new process')
    }
  }, [args.loading])

  return (
    <Drawer
      toggler={
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '25px',
              color: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Rotation: Agile manager</span> <span>Onboarding: HR</span>
            </div>
            <div>Offboarding: Ekaterina Makova, Irina Zaloznykh</div>
          </div>
          <Button data-cy="start">Start process</Button>
        </div>
      }
      drawerLabel="Start new process"
      content={
        <CreateProcessForm
          loading={args.loading}
          onSubmit={(bookmark: any, update: any) => {
            create({
              variables: { input: bookmark },
              update,
            })
          }}
        />
      }
    />
  )
}

export default CreateProcessExecution
