import React, { useCallback, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Employee, Matrix } from '../../types'
import gql from 'graphql-tag'
import getEmployeeMatrices from '../../queries/getEmployeeMatrices'
import Button from '../UI/Button'
import message from '../../message'

const mutation = gql`
  mutation detachMatrixFromEmployee($input: DetachMatrixFromEmployeeInput) {
    detachMatrixFromEmployee(input: $input) {
      id
    }
  }
`

type Props = {
  employee?: Pick<Employee, 'id'>
  matrix: Pick<Matrix, 'id'>
}

export default React.memo(({ employee, matrix }: Props) => {
  const [detach, { loading, data }] = useMutation(mutation, {
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
    detach({ variables: { input: { employee: employee?.id, matrix: matrix.id } } })
  }, [employee, matrix, detach])

  if (!employee) return null
  if (data) return <span>Detached</span>

  return (
    <Button loading={loading} onClick={handleClick} id="delete-matrix">
      Detach matrix
    </Button>
  )
})
