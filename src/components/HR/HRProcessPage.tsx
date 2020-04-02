import { useQuery, useMutation } from '@apollo/react-hooks'
import { Divider } from 'antd'
import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getProcessExecution, { QueryType } from '../../queries/getProcessExecution'
import getProcessExecutions from '../../queries/getProcessExecutions'
import Skeleton from '../UI/Skeleton'
import Vacancy from '../Vacancies/Vacancy'
import ActiveStepCard from './ActiveStepCard'
import PageContent from '../UI/PageContent'
import ActiveProcessBranch from './ActiveProcessBranch'
import gql from 'graphql-tag'
import message from '../../message'

const mutation = gql`
  mutation completeProcessExecutionStep($input: CompleteProcessExecutionStepInput!) {
    completeProcessExecutionStep(input: $input) {
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

  useEffect(() => {
    if (completeArgs.loading) {
      message.loading('Finishing step')
    }
  }, [completeArgs.loading])

  const executionProcess = data?.processExecutions?.[0]

  if (loading) {
    return <Skeleton active loading={loading} padding={20} />
  }

  if (!executionProcess) {
    return <PageContent>Process is not found</PageContent>
  }

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
          <ActiveProcessBranch
            executionSteps={executionProcess.executionSteps}
            steps={executionProcess.process.steps}
            onComplete={step =>
              complete({
                variables: {
                  input: {
                    step: step.id,
                    execution: executionProcess.id,
                  },
                },
              })
            }
          />
        </PageContent>
      </div>
    </div>
  )
}

export default withRouter(HrProcessPage)
