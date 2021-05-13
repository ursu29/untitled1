import { useMutation, gql } from "@apollo/client";
import React, { useEffect } from 'react'
import { EvaluationReviewer, Employee } from '../../types'
import Button from '../UI/Button'
import getEvaluationReviewers from '../../queries/getEvaluationReviewers'
import message from '../../message'

const mutation = gql`
  mutation deleteEvaluationReviewer($input: DeleteEvaluationReviewerInput) {
    deleteEvaluationReviewer(input: $input) {
      id
    }
  }
`

interface Props {
  reviewer: {
    id: EvaluationReviewer['id']
    fromWho: Pick<Employee, 'id' | 'name'>
    toWhom: Pick<Employee, 'id' | 'name'>
  }
}

function DeleteEmployeeReviewer({ reviewer }: Props) {
  const [mutate, { loading }] = useMutation(mutation, {
    variables: {
      input: {
        fromWho: reviewer.fromWho.id,
        toWhom: reviewer.toWhom.id,
      },
    },
    refetchQueries: [
      {
        query: getEvaluationReviewers,
        variables: {
          input: {
            toWhom: reviewer.toWhom.id,
          },
        },
      },
    ],
    onCompleted: () => message.success('Reviewer removed'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating')
    }
  })

  return (
    <div>
      {reviewer.fromWho?.name || '(undefined)'}
      <div>
        <Button type="link" icon="delete" onClick={mutate} />
      </div>
    </div>
  )
}

export default DeleteEmployeeReviewer
