import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import getEmployeeMatrices from '../../queries/getEmployeeMatrices'
import { Employee } from '../../types'
import MatrixSelect from '../Matrices/MatrixSelect'
import Button from '../UI/Button'

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
    onCompleted: () => message.success('Matrix is attached'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Attaching')
    }
  })

  const [show, toggle] = useState(false)
  if (!employee) return null
  if (!show)
    return (
      <div data-cy="matrix-btn">
        <Button loading={loading} onClick={() => toggle(true)}>
          Attach Matrix
        </Button>
      </div>
    )
  return (
    <MatrixSelect
      autoFocus
      onBlur={() => toggle(false)}
      onSelect={matrix => {
        toggle(false)
        mutate({ variables: { input: { matrix, employee: employee.id } } })
      }}
    />
  )
}
