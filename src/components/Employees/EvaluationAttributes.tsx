import React, { useEffect } from 'react'
import getEvaluationAttributes, { QueryType } from '../../queries/getEvaluationAttributes'
import { Evaluation, Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import EvaluationTable from '../UI/EvaluationTable'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getEvaluations from '../../queries/getEvaluations'
import message from '../../message'

const mutation = gql`
  mutation evaluate($input: EvaluateInput!) {
    evaluate(input: $input) {
      id
    }
  }
`
interface Props {
  evaluations?: Evaluation[]
  loading: boolean
  employee: Pick<Employee, 'id' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
}

function EvaluationAttributes({ evaluations, employee, ...props }: Props) {
  const { data, loading, error } = useQuery<QueryType>(getEvaluationAttributes)

  const [evaluate, { loading: evaluateLoading }] = useMutation(mutation, {
    refetchQueries: [{ query: getEvaluations, variables: { input: { employee: employee.id } } }],
    onCompleted: () => message.success('Evaluation form is updated'),
  })

  useEffect(() => {
    if (evaluateLoading) {
      message.loading('Updating')
    }
  })

  return (
    <Skeleton active loading={props.loading || loading}>
      <EvaluationTable
        evaluationAttributes={data?.evaluationAttributes}
        evaluations={evaluations}
        employee={employee}
        onEvaluate={({ toWhom, evaluation, evaluationAttribute }: any) => {
          evaluate({
            variables: {
              input: {
                toWhom,
                evaluation,
                evaluationAttribute,
              },
            },
          })
        }}
      />
    </Skeleton>
  )
}

export default EvaluationAttributes
