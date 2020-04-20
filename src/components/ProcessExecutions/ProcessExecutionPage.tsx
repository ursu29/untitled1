import { useMutation, useQuery } from '@apollo/react-hooks'
import { Divider } from 'antd'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import message from '../../message'
import getProcessExecution, { QueryType } from '../../queries/getProcessExecution'
import getProcessExecutions from '../../queries/getProcessExecutions'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import Vacancy from '../Vacancies/Vacancy'
import ActiveStepCard from './ExecutionStepCard'
import ActiveProcessBranch from './ProcessExecutionBranch'
import ProcessExecutionRotation from './ProcessExecutionRotation'
import NotAllowed from '../UI/NotAllowed'
import isForbidden from '../../utils/isForbidden'

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
  const { data, loading, error } = useQuery<QueryType>(getProcessExecution, { variables })

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

  if (isForbidden(error)) {
    return (
      <PageContent>
        <NotAllowed />
      </PageContent>
    )
  }

  const processExecution = data?.processExecutions?.[0]

  if (loading) {
    return <Skeleton active loading={loading} padding={20} />
  }

  if (!processExecution) {
    return <PageContent>Process is not found</PageContent>
  }

  const branches = processExecution.process?.steps.filter((i) => !i.parentSteps?.length)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {processExecution.process.type === 'onboarding' && (
        <>
          <PageContent noBottom>
            <ProcessExecutionRotation processExecution={processExecution} />
            <ActiveStepCard
              title="Open Vacancy"
              status={processExecution.vacancy.isPublished ? 'done' : 'active'}
              employees={[]}
            >
              <Vacancy
                id={processExecution.vacancy?.id}
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
                  executionSteps={processExecution.executionSteps}
                  steps={processExecution.process.steps.filter((item) => {
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
                          execution: processExecution.id,
                        },
                      },
                    })
                  }
                  onComment={(step, description) => {
                    commentDebounced({
                      variables: {
                        input: { step, description, execution: processExecution.id },
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
