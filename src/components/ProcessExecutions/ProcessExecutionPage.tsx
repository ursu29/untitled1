import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, Divider, PageHeader, Popconfirm, Select } from 'antd'
import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import { ProcessStepDetails } from '../../fragments'
import message from '../../message'
import getActiveProcessExecutions from '../../queries/getEmployeeActiveProcessExecutions'
import getProcessExecution, { QueryType } from '../../queries/getProcessExecution'
import getProcessExecutions from '../../queries/getProcessExecutions'
import updateProcessExecution from '../../queries/updateProcessExecution'
import { getProcessName } from '../../utils/getProcessName'
import isForbidden from '../../utils/isForbidden'
import { useEmployee } from '../../utils/withEmployee'
import NotAllowed from '../UI/NotAllowed'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import Vacancy from '../Vacancies/Vacancy'
import AbortProcessExecution from './AbortProcessExecution'
import AdditionalInfo from './AdditionalInfo'
import ActiveStepCard from './ExecutionStepCard'
import OnHoldProcessExecution from './OnHoldProcessExecution'
import ProcessExecutionBranch from './ProcessExecutionBranch'
import ProcessExecutionRotation from './ProcessExecutionRotation'
import ProcessExecutionStatusTag from './ProcessExecutionStatusTag'
import UpdateProcessExecution from './UpdateProcessExecution'

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
  const { employee } = useEmployee()
  const variables = { input: { id: match.params.id } }
  const { data, loading, error } = useQuery<QueryType>(getProcessExecution, {
    variables,
    pollInterval: 10000,
  })

  const [complete, completeArgs] = useMutation(mutation, {
    refetchQueries: [
      { query: getProcessExecution, variables },
      {
        query: getActiveProcessExecutions,
        variables: { email: employee.email },
      },
    ],
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

  const [changeSubstatus, { loading: changeSubstatusLoading }] = useMutation(
    updateProcessExecution,
    {
      refetchQueries: [{ query: getProcessExecution, variables }],
      awaitRefetchQueries: true,
      onError: message.error,
      onCompleted: () => message.success('Updated'),
    },
  )

  const commentDebounced = debounce(1000, comment)

  useEffect(() => {
    if (completeArgs.loading) {
      message.loading('Finishing step')
    }
    if (commentArgs.loading) {
      message.loading('Comment updated')
    }
  }, [completeArgs.loading, commentArgs.loading])

  const processExecution = data?.processExecutions?.[0]

  if (isForbidden(error)) {
    return (
      <PageContent>
        <NotAllowed />
      </PageContent>
    )
  }

  if (loading) {
    return <Skeleton active loading={loading} withOffset />
  }

  if (!processExecution) {
    return <PageContent>Process is not found</PageContent>
  }

  if (changeSubstatusLoading) message.loading('Updating')

  const branches = processExecution.process?.steps.filter(i => !i.parentSteps?.length)

  /**
   * Look throw all steps and injecting the new field into each one -
   * - isStrictActive - activity depends on previous independent steps
   */
  const stepsWithStrictActive = processExecution.process?.steps.map(step => {
    // For the very first step and then for others
    if (!step.parentSteps.length) return { ...step, isStrictActive: true }
    return {
      ...step,
      isStrictActive: isParentStepDone(
        processExecution.process?.steps.find(execStep => execStep?.id === step.parentSteps[0]?.id),
        true,
      ),
    }

    function isParentStepDone(
      stepCurrent: ProcessStepDetails | undefined,
      isFirstIteration: boolean = false,
    ): boolean {
      const executionStep = processExecution?.executionSteps.find(
        step => step.step?.id === stepCurrent?.id,
      )

      // If parent step in first iteration is not independent and not complete - current must be non active
      if (isFirstIteration && stepCurrent?.type !== 'INDEPENDENT' && !executionStep?.isDone)
        return false
      // If parent step is not independent and already done - current must be active
      if (stepCurrent?.type !== 'INDEPENDENT' && executionStep?.isDone) return true
      // If parent step is independent and is the very first - current must be active
      if (stepCurrent?.type === 'INDEPENDENT' && !stepCurrent.parentSteps?.length) return true
      // If parent step is not independent and not done - current must be active - current must be non active
      if (stepCurrent?.type !== 'INDEPENDENT' && !executionStep?.isDone) return false // If parent step is not independent and is the very first and not complete -  current must be non active
      if (!stepCurrent?.parentSteps?.length) return false

      // Recursion on parent
      return isParentStepDone(
        processExecution?.process?.steps.find(step => step?.id === stepCurrent.parentSteps[0]?.id),
      )
    }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageContent noBottom>
        <PageHeader
          title={processExecution.process.title}
          subTitle={getProcessName(processExecution.process.type)}
          tags={<ProcessExecutionStatusTag processExecution={processExecution} />}
          style={{ padding: 0 }}
          extra={[
            <span>
              Status:{' '}
              <Select
                bordered={false}
                style={{ minWidth: '100px', fontWeight: 500 }}
                defaultValue={processExecution.substatus}
                onChange={substatus =>
                  changeSubstatus({ variables: { input: { id: processExecution.id, substatus } } })
                }
              >
                <Select.Option value="NEW">New</Select.Option>
                <Select.Option value="ON_REVIEW">On Review</Select.Option>
                <Select.Option value="SOURCING">Sourcing</Select.Option>
                <Select.Option value="OFFER_SENT">Offer Sent</Select.Option>
                <Select.Option value="IN_PROGRESS">In Progress</Select.Option>
              </Select>
            </span>,
            <AbortProcessExecution id={processExecution?.id} key={processExecution?.id}>
              {(abort: any) => {
                if (processExecution.status !== 'RUNNING') return null
                return (
                  <Popconfirm
                    placement="top"
                    title={'Are you sure?'}
                    onConfirm={abort}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span>
                      <Button data-cy="abort">Abort</Button>
                    </span>
                  </Popconfirm>
                )
              }}
            </AbortProcessExecution>,
            <OnHoldProcessExecution
              id={processExecution?.id}
              key={processExecution?.id + '_onHold'}
            >
              {(onHold: any) => {
                if (processExecution.status !== 'RUNNING' && processExecution.status !== 'HOLDING')
                  return null
                return (
                  <Popconfirm
                    placement="top"
                    title={'Are you sure?'}
                    onConfirm={onHold}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span>
                      <Button>
                        {processExecution.status === 'HOLDING' ? 'Resume' : 'On hold'}
                      </Button>
                    </span>
                  </Popconfirm>
                )
              }}
            </OnHoldProcessExecution>,
            <UpdateProcessExecution
              processExecution={processExecution}
              refetchQueries={[{ query: getProcessExecution, variables }]}
            />,
          ]}
        />
      </PageContent>
      {processExecution.process.type === 'ONBOARDING' && (
        <>
          <PageContent noBottom noTop>
            <ProcessExecutionRotation processExecution={processExecution} />
            <ActiveStepCard
              title="Open Vacancy"
              status={processExecution.vacancy.isPublished ? 'done' : 'active'}
              employees={processExecution.vacancy.responsibleEmployees}
            >
              <Vacancy
                id={processExecution.vacancy?.id}
                refetchQueries={[
                  { query: getProcessExecution, variables: { input: { id: match.params.id } } },
                  { query: getProcessExecutions },
                ]}
                editable={
                  processExecution.vacancy.editable && processExecution.status !== 'HOLDING'
                }
              />
            </ActiveStepCard>
          </PageContent>
          <Divider />
        </>
      )}
      <AdditionalInfo
        processId={processExecution.id}
        employee={processExecution.employee}
        employeeRef={processExecution.employeeRef?.id}
        finishDate={processExecution.finishDate}
        employeePhone={processExecution.employeePhone}
        swissReOffboardingDate={processExecution.swissReOffboardingDate}
        refetchQueries={[
          { query: getProcessExecution, variables: { input: { id: match.params.id } } },
        ]}
        isNotOnboarding={['OFFBOARDING', 'ROTATION'].includes(processExecution.process.type)}
        isSwissRe={processExecution.process.customer === 'SWISSRE'}
        projectFrom={processExecution.projectFrom}
        projectTo={processExecution.projectTo}
        type={processExecution.process.type}
      />
      <div style={{ overflow: 'auto', width: '100%', height: '100%' }}>
        <PageContent noTop>
          {branches?.map((i, index) => {
            return (
              <div key={i.id}>
                <ProcessExecutionBranch
                  executionSteps={processExecution.executionSteps}
                  steps={stepsWithStrictActive.filter(item => {
                    if (!item.parentSteps?.length) {
                      return item.id === i.id
                    }
                    return true
                  })}
                  active={
                    processExecution.process.type === 'ONBOARDING'
                      ? processExecution.vacancy.isPublished
                      : true
                  }
                  onComplete={step =>
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
                  isProcessRunning={processExecution.status === 'RUNNING'}
                  isIndependentStepsActive={processExecution.isIndependentStepsActive}
                  isLocked={
                    (processExecution.process.type === 'OFFBOARDING' ||
                      processExecution.process.type === 'ROTATION') &&
                    !processExecution.employeeRef
                  }
                  agileManager={processExecution.employeeRef?.agileManager}
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
