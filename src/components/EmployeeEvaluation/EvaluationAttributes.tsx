import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import message from '../../message'
import getEvaluationAttributes, { QueryType } from '../../queries/getEvaluationAttributes'
import getEvaluations from '../../queries/getEvaluations'
import { Employee, Evaluation } from '../../types'
import Controls from '../UI/Controls'
import Divider from '../UI/Divider'
import EvaluationHelper from '../UI/EvaluationHelper'
import EvaluationTable from '../UI/EvaluationTable'
import Skeleton from '../UI/Skeleton'
import AddEvaluationReviewer from './AddEvaluationReviewer'
import DeleteEmployeeReviewer from './DeleteEmployeeReviewer'
import EmployeeEvaluationReviewers from './EmployeeEvaluationReviewers'
import ExportEvaluations from './ExportEvaluations'

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
  employee: Pick<Employee, 'id' | 'name' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
  editable: boolean
}

function EvaluationAttributes({ evaluations, editable, employee, ...props }: Props) {
  const { data, loading } = useQuery<QueryType>(getEvaluationAttributes)

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
      <EmployeeEvaluationReviewers employee={employee}>
        {(reviewers: any) => {
          return (
            <>
              {editable && (
                <Controls>
                  <AddEvaluationReviewer employee={employee} />
                  <Divider type="vertical" style={{ visibility: 'hidden' }} />
                  <ExportEvaluations
                    evaluationAttributes={data?.evaluationAttributes}
                    evaluations={evaluations}
                    employee={employee}
                    reviewers={reviewers}
                  />
                </Controls>
              )}
              <EvaluationHelper />
              <EvaluationTable
                evaluationAttributes={data?.evaluationAttributes}
                evaluations={evaluations}
                editable={editable}
                reviewers={reviewers}
                employee={employee}
                DeleteEmployeeReviewer={DeleteEmployeeReviewer}
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
            </>
          )
        }}
      </EmployeeEvaluationReviewers>
    </Skeleton>
  )
}

export default EvaluationAttributes
