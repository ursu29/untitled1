import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { PropsWithChildren, useEffect } from 'react'
import message from '../../message'
import getProcessExecutions from '../../queries/getProcessExecutions'
import getVacancies from '../../queries/getVacancies'
import { useEmployee } from '../../utils/withEmployee'
import getActiveProcessExecutions from '../../queries/getEmployeeActiveProcessExecutions'

const mutation = gql`
  mutation abortProcessExecution($input: AbortProcessExecutionInput!) {
    abortProcessExecution(input: $input) {
      id
    }
  }
`

function AbortProcessExecution({ id, children }: { id: string } & PropsWithChildren<any>) {
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
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Process is aborted')
    },
  })

  useEffect(() => {
    if (args.loading) {
      message.loading('Aborting process')
    }
  }, [args.loading])

  return children(abort)
}

export default AbortProcessExecution
