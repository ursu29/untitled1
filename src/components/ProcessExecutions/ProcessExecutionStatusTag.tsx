import { Tag } from 'antd'
import React from 'react'
import { ProcessExecution } from '../../types'

function ProcessExecutionStatusTag({
  processExecution,
}: {
  processExecution: Pick<ProcessExecution, 'id' | 'status'>
}) {
  if (processExecution.status === 'cancelled') {
    return (
      <Tag style={{ margin: '0 3px 3px 0' }} color="volcano">
        Cancelled
      </Tag>
    )
  }

  if (processExecution.status === 'finished') {
    return (
      <Tag style={{ margin: '0 3px 3px 0' }} color="blue">
        Completed
      </Tag>
    )
  }

  if (processExecution.status === 'running') {
    return (
      <Tag style={{ margin: '0 3px 3px 0' }} color="green">
        Running
      </Tag>
    )
  }

  return null
}

export default ProcessExecutionStatusTag
