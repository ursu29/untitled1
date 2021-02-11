import { Tag } from 'antd'
import React from 'react'
import { ProcessExecution } from '../../types'

function ProcessExecutionStatusTag({
  processExecution,
}: {
  processExecution: Pick<ProcessExecution, 'id' | 'status'> & {
    process: any
    vacancy: any
  }
}) {
  if (
    processExecution.status === 'RUNNING' &&
    processExecution.process?.type === 'ONBOARDING' &&
    !processExecution.vacancy?.isPublished
  ) {
    return (
      <Tag style={{ margin: '0 3px 3px 0' }} color="orange">
        Pending
      </Tag>
    )
  }

  if (processExecution.status === 'CANCELLED') {
    return (
      <Tag style={{ margin: '0 3px 3px 0' }} color="volcano">
        Cancelled
      </Tag>
    )
  }

  if (processExecution.status === 'FINISHED') {
    return (
      <Tag style={{ margin: '0 3px 3px 0' }} color="blue">
        Completed
      </Tag>
    )
  }

  if (processExecution.status === 'RUNNING') {
    return (
      <Tag style={{ margin: '0 3px 3px 0' }} color="green">
        Running
      </Tag>
    )
  }

  if (processExecution.status === 'HOLDING') {
    return (
      <Tag style={{ margin: '0 3px 3px 0' }} color="magenta">
        Holding
      </Tag>
    )
  }

  return null
}

export default ProcessExecutionStatusTag
