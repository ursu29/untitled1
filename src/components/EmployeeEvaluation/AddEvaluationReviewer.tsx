import React, { useState, useCallback, useEffect } from 'react'
import { Employee } from '../../types'
import EmployeeSelect from '../Employees/EmployeeSelect'
import Button from '../UI/Button'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getEvaluationReviewers from '../../queries/getEvaluationReviewers'
import message from '../../message'

const mutation = gql`
  mutation createEvaluationReviewer($input: CreateEvaluationReviewerInput) {
    createEvaluationReviewer(input: $input) {
      id
    }
  }
`

interface Props {
  employee: Pick<Employee, 'id'>
}

function AddEvaluationReviewer({ employee }: Props) {
  const [adding, setAdding] = useState(false)
  const setAddingTrue = useCallback(() => setAdding(true), [])
  const setAddingFalse = useCallback(() => setAdding(false), [])

  const [mutate, { loading }] = useMutation(mutation, {
    refetchQueries: [
      {
        query: getEvaluationReviewers,
        variables: { input: { toWhom: employee.id } },
      },
    ],
    onCompleted: () => {
      message.success('Reviewer added')
      setAddingFalse()
    },
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating')
    }
  })

  if (adding)
    return (
      <EmployeeSelect
        onBlur={setAddingFalse}
        defaultOpen
        autoFocus
        onChange={fromWho => {
          mutate({ variables: { input: { fromWho, toWhom: employee.id } } })
        }}
      />
    )
  return <Button onClick={setAddingTrue}>Add reviewer</Button>
}

export default AddEvaluationReviewer
