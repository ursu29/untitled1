import { useMutation, gql } from '@apollo/client'
import { Button } from 'antd'
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
      toggler={<Button data-cy="start">Start process</Button>}
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
