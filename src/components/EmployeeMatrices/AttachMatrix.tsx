import React, { useState, useEffect } from 'react'
import { Employee } from '../../types'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import MatrixSelect from '../Matrices/MatrixSelect'
import Button from '../UI/Button'
import message from '../../message'
import getEmployeeMatrices, { QueryType } from '../../queries/getEmployeeMatrices'

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
      <Button loading={loading} onClick={() => toggle(true)}>
        Add Matrix
      </Button>
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
