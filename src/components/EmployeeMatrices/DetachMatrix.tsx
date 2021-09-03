import { gql, useMutation } from '@apollo/client'
import React, { useCallback, useEffect } from 'react'
import message from '../../message'
import getEmployeeMatrices from '../../queries/getEmployeeMatrices'
import { Employee } from '../../types'
import Button from '../UI/Button'

const mutation = gql`
  mutation detachMatrixFromEmployee($input: DetachMatrixFromEmployeeInput) {
    detachMatrixFromEmployee(input: $input) {
      id
    }
  }
`

type Props = {
  employee?: Pick<Employee, 'id'>
  matrix?: string
}

export default React.memo(({ employee, matrix }: Props) => {
  const [detach, { loading }] = useMutation(mutation, {
    refetchQueries: [
      {
        query: getEmployeeMatrices,
        variables: { input: { id: employee?.id } },
      },
    ],
    onError: message.error,
    onCompleted: () => message.success('Detached'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Detaching')
    }
  })

  const handleClick = useCallback(() => {
    detach({ variables: { input: { employee: employee?.id, matrix } } })
  }, [employee, matrix, detach])

  if (!employee) return null

  return (
    <Button
      loading={loading}
      onClick={handleClick}
      id="delete-matrix"
      type="text"
      style={{ color: 'red' }}
    >
      Delete
    </Button>
  )
})
