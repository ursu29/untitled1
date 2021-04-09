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
import { EvaluationRateDescription } from '../UI/EvaluationRate'
import Skeleton from '../UI/Skeleton'
import AddEvaluationReviewer from './AddEvaluationReviewer'
import DeleteEmployeeReviewer from './DeleteEmployeeReviewer'
import EmployeeEvaluationReviewers from './EmployeeEvaluationReviewers'
import EvaluationTable from './EvaluationTable'
import ExportEvaluations from './ExportEvaluations'
import dayjs from 'dayjs'
import { Typography, DatePicker, Space } from 'antd'
import moment from 'moment'

const evaluationCustomFields = gql`
  query evaluationCustomFields($input: EvaluationCustomFieldsInput) {
    evaluationCustomFields(input: $input) {
      id
      employeeMail
      lastDiscussed
    }
  }
`

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
const customFieldsMutation = gql`
  mutation customFieldsMutation($input: UpdateCustomFieldsInput!) {
    updateCustomFields(input: $input) {
      id
    }
  }
`

interface Props {
  evaluations?: Evaluation[]
  comments?: Exclude<EvaluationComment, 'employee'>[]
  loading: boolean
  employee: Pick<Employee, 'id' | 'name' | 'isMe'> & {
    agileManager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
  editable: boolean
  versionSnapshot?: any
  isArchivedChosen?: boolean
}

function EvaluationAttributes({
  evaluations,
  editable,
  comments,
  employee,
  versionSnapshot,
  isArchivedChosen,
  ...props
}: Props) {
  const { data, loading } = useQuery<QueryType>(getEvaluationAttributes)
  const { data: customFields } = useQuery(evaluationCustomFields, {
    variables: {
      input: {
        employee: employee.id,
      },
    },
  })

  const [evaluate, { loading: evaluateLoading }] = useMutation(evaluateMutation, {
    refetchQueries: [
      {
        query: getEvaluations,
        variables: {
          evaluationsInput: { employee: employee?.id },
          evaluationCommentsInput: { employee: employee?.id },
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
          evaluationCommentsInput: { employee: employee?.id },
        },
      },
    ],
    onCompleted: () => message.success('Evaluation form is updated'),
    onError: message.error,
  })

  const [addCustomField] = useMutation(customFieldsMutation, {
    refetchQueries: [
      {
        query: evaluationCustomFields,
        variables: {
          input: {
            employee: employee.id,
          },
        },
      },
    ],
    onCompleted: () => message.success('Evaluation is updated'),
    onError: message.error,
  })

  const commentDebounce = debounce(800, comment)

  useEffect(() => {
    if (evaluateLoading || commentLoading) {
      message.loading('Updating')
    }
  }, [evaluateLoading, commentLoading])

  let updatedAt: any = null

  evaluations
    ?.filter(e => e)
    .forEach(i => {
      if (!updatedAt || dayjs(i.updatedAt).isAfter(dayjs(updatedAt))) {
        updatedAt = i.updatedAt
      }
    })

  return (
    <Skeleton active loading={props.loading || loading}>
      <EmployeeEvaluationReviewers employee={employee}>
        {(reviewers: any) => {
          return (
            <>
              {(editable || employee?.isMe) && (
                <Controls
                  back={
                    <Space size="middle">
                      <Typography.Text>
                        Last discussed:{' '}
                        <DatePicker
                          size="small"
                          allowClear={false}
                          format={['DD.MM.YYYY']}
                          value={
                            customFields?.evaluationCustomFields?.lastDiscussed
                              ? moment(
                                  moment(
                                    customFields?.evaluationCustomFields?.lastDiscussed,
                                  ).local(),
                                  'DD.MM.YYYY',
                                )
                              : null
                          }
                          onChange={date =>
                            addCustomField({
                              variables: {
                                input: {
                                  employee: employee.id,
                                  lastDiscussed: moment(date).local().format(),
                                },
                              },
                            })
                          }
                        />
                      </Typography.Text>

                      {updatedAt ? (
                        <Typography.Text disabled>
                          Last updated: {dayjs(updatedAt).format('DD MMM YYYY HH:mm')}
                        </Typography.Text>
                      ) : null}
                    </Space>
                  }
                >
                  {editable && <AddEvaluationReviewer employee={employee} />}
                  <Divider type="vertical" style={{ visibility: 'hidden' }} />
                  {(editable || employee?.isMe) && (
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
              {versionSnapshot()}
              <EvaluationRateDescription />
              <EvaluationTable
                evaluationAttributes={data?.evaluationAttributes}
                evaluations={evaluations?.filter(e => e)}
                comments={comments}
                isArchivedChosen={isArchivedChosen}
                editable={editable}
                reviewers={reviewers}
                employee={employee}
                DeleteEmployeeReviewer={DeleteEmployeeReviewer}
                onEvaluate={({ toWhom, evaluation, comment, evaluationAttribute }: any) => {
                  evaluate({
                    variables: {
                      input: {
                        toWhom,
                        evaluation,
                        comment,
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
