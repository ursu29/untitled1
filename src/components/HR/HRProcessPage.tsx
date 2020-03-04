import { useQuery, useMutation } from '@apollo/react-hooks'
import { Divider } from 'antd'
import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getProcessExecution, { QueryType } from '../../queries/getProcessExecution'
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
    onError: message.error,
    onCompleted: () => message.success('Step is done'),
  })

  useEffect(() => {
    if (completeArgs.loading) {
      message.loading('Finishing step')
    }
  }, [completeArgs.loading])

  const executionProcess = data?.processExecutions?.[0]

  return (
    <Skeleton active loading={loading} padding={20}>
      {!executionProcess && <PageContent>Process is not found</PageContent>}
      {executionProcess && (
        <div>
          {executionProcess.process.type === 'onboarding' && (
            <>
              <PageContent noBottom>
                <ActiveStepCard title="Open Vacancy" status="pending" employees={[]}>
                  <Vacancy id={executionProcess.vacancy?.id} />
                </ActiveStepCard>
              </PageContent>
              <Divider />
            </>
          )}
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
      )}
    </Skeleton>
  )
}

export default withRouter(HrProcessPage)
