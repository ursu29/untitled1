import { useMutation } from '@apollo/react-hooks'
import { Button } from 'antd'
import gql from 'graphql-tag'
import React, { useCallback, useState, useEffect } from 'react'
import getProcessExecutions from '../../queries/getProcessExecutions'
import ProcessSelect from '../Processes/ProcessSelect'
import message from '../../message'

const mutation = gql`
  mutation createProcessExecution($input: CreateProcessExecutionInput) {
    createProcessExecution(input: $input) {
      id
    }
  }
`

function CreateProcessExecution() {
  const [show, setShow] = useState(false)
  const showSelect = useCallback(() => setShow(true), [])
  const hideSelect = useCallback(() => setShow(false), [])

  const [create, args] = useMutation(mutation, {
    refetchQueries: [{ query: getProcessExecutions }],
    onCompleted: () => {
      hideSelect()
      message.success('New process is added')
    },
  })

  useEffect(() => {
    if (args.loading) {
      message.loading('Adding new process')
    }
  }, [args.loading])

  if (show) {
    return (
      <ProcessSelect
        style={{ width: 240 }}
        defaultOpen={true}
        onBlur={hideSelect}
        onSelect={process => create({ variables: { input: { process } } })}
      />
    )
  }

  return <Button onClick={showSelect}>Add process</Button>
}

export default CreateProcessExecution
