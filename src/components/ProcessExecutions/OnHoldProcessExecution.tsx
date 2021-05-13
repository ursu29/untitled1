import { useMutation, gql } from "@apollo/client";
import { PropsWithChildren, useEffect } from 'react'
import message from '../../message'
import getProcessExecutions from '../../queries/getProcessExecutions'
import getVacancies from '../../queries/getVacancies'
import { useEmployee } from '../../utils/withEmployee'
import getActiveProcessExecutions from '../../queries/getEmployeeActiveProcessExecutions'
import getProcessExecution from '../../queries/getProcessExecution'

const mutation = gql`
  mutation toggleHoldProcessExecution($input: AbortProcessExecutionInput!) {
    toggleHoldProcessExecution(input: $input) {
      id
    }
  }
`

function OnHoldProcessExecution({ id, children }: { id: string } & PropsWithChildren<any>) {
  const { employee } = useEmployee()

  const [abort, args] = useMutation(mutation, {
    variables: { input: { id } },
    refetchQueries: [
      {
        query: getActiveProcessExecutions,
        variables: { email: employee.email },
      },
      { query: getProcessExecutions },
      { query: getVacancies },
      {
        query: getProcessExecution,
        variables: { input: { id } },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Process is suspended')
    },
  })

  useEffect(() => {
    if (args.loading) {
      message.loading('Suspension of a process')
    }
  }, [args.loading])

  return children(abort)
}

export default OnHoldProcessExecution
