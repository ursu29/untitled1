import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import message from '../../message'
import getProcesses from '../../queries/getProcesses'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import ProcessForm from './ProcessForm'

const mutation = gql`
  mutation createProcess($input: CreateProcessInput!) {
    createProcess(input: $input) {
      id
    }
  }
`

type MutationType = {
  createProcess: {
    id: string
  }
}

interface Props {
  refetchQueries?: any[]
}

export default function CreateBookmark({ refetchQueries = [] }: Props) {
  const [createProcess, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getProcesses }, ...refetchQueries],
    onError: message.error,
    onCompleted: () => message.success('Process is added'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Creating process')
    }
  })

  return (
    <>
      <Drawer
        toggler={<Button>Create new process</Button>}
        drawerLabel="Create process"
        content={
          <ProcessForm
            loading={loading}
            onSubmit={(process: any, update: any) => {
              createProcess({
                variables: { input: process },
                update,
              })
            }}
          />
        }
      />
    </>
  )
}
