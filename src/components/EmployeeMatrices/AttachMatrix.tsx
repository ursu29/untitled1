import { useMutation, gql } from '@apollo/client'
import React, { useEffect } from 'react'
import message from '../../message'
import getEmployeeMatrices from '../../queries/getEmployeeMatrices'
import { Employee } from '../../types'
import MatrixSelect from '../Matrices/MatrixSelect'

const mutation = gql`
  mutation attachMatrixToEmployee($input: AttachMatrixToEmployeeInput) {
    attachMatrixToEmployee(input: $input) {
      id
    }
  }
`

interface Props {
  employee?: Pick<Employee, 'id'>
}

export default function AttachMatrix({ employee }: Props) {
  const [mutate, { loading }] = useMutation(mutation, {
    refetchQueries: [{ query: getEmployeeMatrices, variables: { input: { id: employee?.id } } }],
    awaitRefetchQueries: true,
    onCompleted: () => message.success('Matrix is attached'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Attaching')
    }
  })

  if (!employee) return null

  return (
    <MatrixSelect
      onSelect={matrix => {
        mutate({ variables: { input: { matrix, employee: employee.id } } })
      }}
    />
  )
}
