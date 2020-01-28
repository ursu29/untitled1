import React, { useEffect } from 'react'
import getEvaluationAttributes, { QueryType } from '../../queries/getEvaluationAttributes'
import { Evaluation, Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import EvaluationTable from '../UI/EvaluationTable'
import EvaluationHelper from '../UI/EvaluationHelper'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getEvaluations from '../../queries/getEvaluations'
import message from '../../message'
import Controls from '../UI/Controls'
import ExportEvaluations from './ExportEvaluations'
import AddEvaluationReviewer from './AddEvaluationReviewer'
import DeleteEmployeeReviewer from './DeleteEmployeeReviewer'
import Divider from '../UI/Divider'
import EmployeeEvaluationReviewers from './EmployeeEvaluationReviewers'
import EmployeeEvaluationReviewersAccess from './EmployeeEvaluationReviewersAccess'
import EmployeeEvaluation from './EmployeeEvaluation'

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
}

function EvaluationAttributes({ evaluations, employee, ...props }: Props) {
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
      <EmployeeEvaluationReviewersAccess employee={employee}>
        {(editable: boolean) => {
          return (
            <EmployeeEvaluationReviewers employee={employee}>
              {(reviewers: any) => {
                return (
                  <>
                    <Controls>
                      {editable && <AddEvaluationReviewer employee={employee} />}
                      <Divider type="vertical" style={{ visibility: 'hidden' }} />
                      <ExportEvaluations
                        evaluationAttributes={data?.evaluationAttributes}
                        evaluations={evaluations}
                        employee={employee}
                        reviewers={reviewers}
                      />
                    </Controls>
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
          )
        }}
      </EmployeeEvaluationReviewersAccess>
    </Skeleton>
  )
}

export default EvaluationAttributes
