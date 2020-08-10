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

const mutation = gql`
  mutation createProcessExecution($input: CreateProcessExecutionInput) {
    createProcessExecution(input: $input) {
      id
    }
  }
`

function CreateProcessExecution() {
  const { employee } = useEmployee()

  const [create, args] = useMutation(mutation, {
    refetchQueries: [
      { query: getProcessExecutions },
      {
        query: getActiveProcessExecutions,
        variables: { email: employee.email },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('New process is added')
    },
  })

  useEffect(() => {
    if (args.loading) {
      message.loading('Adding new process')
    }
  }, [args.loading])

  return (
    <Drawer
      toggler={<Button>Start process</Button>}
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
