import { useMutation } from '@apollo/react-hooks'
import { Button } from 'antd'
import gql from 'graphql-tag'
import React, { useCallback, useState, useEffect } from 'react'
import getProcessExecutions from '../../queries/getProcessExecutions'

import message from '../../message'
import Drawer from '../UI/Drawer'
import CreateProcessForm from './CreateProcessForm'

const mutation = gql`
  mutation createProcessExecution($input: CreateProcessExecutionInput) {
    createProcessExecution(input: $input) {
      id
    }
  }
`

function CreateProcessExecution() {
  const [create, args] = useMutation(mutation, {
    refetchQueries: [{ query: getProcessExecutions }],
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
