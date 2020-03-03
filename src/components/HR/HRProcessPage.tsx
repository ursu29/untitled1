import { useQuery } from '@apollo/react-hooks'
import { Divider } from 'antd'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getProcessExecution, { QueryType } from '../../queries/getProcessExecution'
import Skeleton from '../UI/Skeleton'
import Vacancy from '../Vacancies/Vacancy'
import ActiveStepCard from './ActiveStepCard'
import PageContent from '../UI/PageContent'
import ActiveProcessBranch from './ActiveProcessBranch'

function HrProcessPage({ match }: RouteComponentProps<{ id: string }>) {
  const { data, loading } = useQuery<QueryType>(getProcessExecution, {
    variables: { input: { id: match.params.id } },
  })
  const executionProcess = data?.processExecutions?.[0]
  return (
    <Skeleton active loading={loading} padding={20}>
      {executionProcess && (
        <div>
          {executionProcess.process.type === 'onboarding' && (
            <>
              <PageContent noBottom>
                <ActiveStepCard>
                  <Vacancy id={executionProcess.vacancy?.id} />
                </ActiveStepCard>
              </PageContent>
              <Divider />
            </>
          )}
          <PageContent noTop>
            <ActiveProcessBranch steps={executionProcess.process.steps} />
          </PageContent>
        </div>
      )}
    </Skeleton>
  )
}

export default withRouter(HrProcessPage)
