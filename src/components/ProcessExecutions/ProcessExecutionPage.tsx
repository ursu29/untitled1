import { useQuery, useMutation } from '@apollo/react-hooks'
import { Divider } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getProcessExecution, { QueryType } from '../../queries/getProcessExecution'
import getProcessExecutions from '../../queries/getProcessExecutions'
import Skeleton from '../UI/Skeleton'
import Vacancy from '../Vacancies/Vacancy'
import ActiveStepCard from './ExecutionStepCard'
import PageContent from '../UI/PageContent'
import ActiveProcessBranch from './ProcessExecutionBranch'
import gql from 'graphql-tag'
import message from '../../message'
import { debounce } from 'throttle-debounce'

const mutation = gql`
  mutation completeProcessExecutionStep($input: CompleteProcessExecutionStepInput!) {
    completeProcessExecutionStep(input: $input) {
      id
    }
  }
`

const commentMutation = gql`
  mutation commentProcessExecutionStep($input: CommentProcessExecutionStepInput!) {
    commentProcessExecutionStep(input: $input) {
      id
    }
  }
`

function HrProcessPage({ match }: RouteComponentProps<{ id: string }>) {
  const variables = { input: { id: match.params.id } }
  const { data, loading } = useQuery<QueryType>(getProcessExecution, { variables })

  const [complete, completeArgs] = useMutation(mutation, {
    refetchQueries: [{ query: getProcessExecution, variables }],
    awaitRefetchQueries: true,
    onError: message.error,
    onCompleted: () => message.success('Step is done'),
  })

  const [comment, commentArgs] = useMutation(commentMutation, {
    refetchQueries: [{ query: getProcessExecution, variables }],
    awaitRefetchQueries: true,
    onError: message.error,
    onCompleted: () => message.success('Step is done'),
  })

  const commentDebounced = debounce(1000, comment)

  useEffect(() => {
    if (completeArgs.loading) {
      message.loading('Finishing step')
    }
    if (commentArgs.loading) {
      message.loading('Comment updated')
    }
  }, [completeArgs.loading, commentArgs.loading])

  const executionProcess = data?.processExecutions?.[0]

  if (loading) {
    return <Skeleton active loading={loading} padding={20} />
  }

  if (!executionProcess) {
    return <PageContent>Process is not found</PageContent>
  }

  const branches = executionProcess.process?.steps.filter((i) => !i.parentSteps?.length)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {executionProcess.process.type === 'onboarding' && (
        <>
          <PageContent noBottom>
            <ActiveStepCard
              title="Open Vacancy"
              status={executionProcess.vacancy.isPublished ? 'done' : 'active'}
              employees={[]}
            >
              <Vacancy
                id={executionProcess.vacancy?.id}
                refetchQueries={[
                  { query: getProcessExecution, variables: { input: { id: match.params.id } } },
                  { query: getProcessExecutions },
                ]}
                editable
              />
            </ActiveStepCard>
          </PageContent>
          <Divider />
        </>
      )}
      <div style={{ overflow: 'auto', width: '100%', height: '100%' }}>
        <PageContent noTop>
          {branches?.map((i, index) => {
            return (
              <div key={i.id}>
                <ActiveProcessBranch
                  executionSteps={executionProcess.executionSteps}
                  steps={executionProcess.process.steps.filter((item) => {
                    if (!item.parentSteps?.length) {
                      return item.id === i.id
                    }
                    return true
                  })}
                  onComplete={(step) =>
                    complete({
                      variables: {
                        input: {
                          step: step.id,
                          execution: executionProcess.id,
                        },
                      },
                    })
                  }
                  onComment={(step, description) => {
                    commentDebounced({
                      variables: {
                        input: { step, description, execution: executionProcess.id },
                      },
                    })
                  }}
                />
                {index < branches.length - 1 && <Divider />}
              </div>
            )
          })}
        </PageContent>
      </div>
    </div>
  )
}

export default withRouter(HrProcessPage)
