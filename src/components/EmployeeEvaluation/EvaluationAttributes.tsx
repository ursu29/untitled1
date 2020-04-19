import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import message from '../../message'
import getEvaluationAttributes, { QueryType } from '../../queries/getEvaluationAttributes'
import getEvaluations from '../../queries/getEvaluations'
import { Employee, Evaluation, EvaluationComment } from '../../types'
import Controls from '../UI/Controls'
import Divider from '../UI/Divider'
import EvaluationHelper from '../UI/EvaluationHelper'
import Skeleton from '../UI/Skeleton'
import AddEvaluationReviewer from './AddEvaluationReviewer'
import DeleteEmployeeReviewer from './DeleteEmployeeReviewer'
import EmployeeEvaluationReviewers from './EmployeeEvaluationReviewers'
import EvaluationTable from './EvaluationTable'
import ExportEvaluations from './ExportEvaluations'

const evaluateMutation = gql`
  mutation evaluate($input: EvaluateInput!) {
    evaluate(input: $input) {
      id
    }
  }
`
const commentMutation = gql`
  mutation commentEvaluation($input: CommentEvaluationInput!) {
    commentEvaluation(input: $input) {
      id
    }
  }
`

interface Props {
  evaluations?: Evaluation[]
  comments?: Exclude<EvaluationComment, 'employee'>[]
  loading: boolean
  employee: Pick<Employee, 'id' | 'name' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
  editable: boolean
}

function EvaluationAttributes({ evaluations, editable, comments, employee, ...props }: Props) {
  const { data, loading } = useQuery<QueryType>(getEvaluationAttributes)

  const [evaluate, { loading: evaluateLoading }] = useMutation(evaluateMutation, {
    refetchQueries: [
      {
        query: getEvaluations,
        variables: {
          evaluationsInput: { employee: employee?.id },
          evaluationCommmentsInput: { employee: employee?.id },
        },
      },
    ],
    onCompleted: () => message.success('Evaluation form is updated'),
    onError: message.error,
  })

  const [comment, { loading: commentLoading }] = useMutation(commentMutation, {
    refetchQueries: [
      {
        query: getEvaluations,
        variables: {
          evaluationsInput: { employee: employee?.id },
          evaluationCommmentsInput: { employee: employee?.id },
        },
      },
    ],
    onCompleted: () => message.success('Evaluation form is updated'),
    onError: message.error,
  })

  const commentDebounce = debounce(800, comment)

  useEffect(() => {
    if (evaluateLoading || commentLoading) {
      message.loading('Updating')
    }
  }, [evaluateLoading, commentLoading])

  return (
    <Skeleton active loading={props.loading || loading}>
      <EmployeeEvaluationReviewers employee={employee}>
        {(reviewers: any) => {
          return (
            <>
              {(editable || employee.isMe) && (
                <Controls>
                  {editable && <AddEvaluationReviewer employee={employee} />}
                  <Divider type="vertical" style={{ visibility: 'hidden' }} />
                  {(editable || employee.isMe) && (
                    <ExportEvaluations
                      evaluationAttributes={data?.evaluationAttributes}
                      evaluations={evaluations}
                      employee={employee}
                      reviewers={reviewers}
                      comments={comments}
                    />
                  )}
                </Controls>
              )}
              <EvaluationHelper />
              <EvaluationTable
                evaluationAttributes={data?.evaluationAttributes}
                evaluations={evaluations}
                comments={comments}
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
                onComment={({ body, evaluationAttribute }: any) => {
                  commentDebounce({
                    variables: {
                      input: {
                        employee: employee.id,
                        body,
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
