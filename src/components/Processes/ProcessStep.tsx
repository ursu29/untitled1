import { useMutation } from '@apollo/react-hooks'
import { Button, Card, Icon } from 'antd'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import getProcesses from '../../queries/getProcesses'
import { ProcessStep as ProcessStepType } from '../../types'
import ProcessStepForm from './ProcessStepForm'

const mutation = gql`
  mutation updateProcessStep($input: UpdateProcessStepInput) {
    updateProcessStep(input: $input) {
      id
    }
  }
`

export default function ProcessStep({ step }: { step: Partial<ProcessStepType> }) {
  const [collapsed, setCollapsed] = useState(true)
  const [update, { loading }] = useMutation(mutation, {
    refetchQueries: [{ query: getProcesses, variables: { input: { id: step?.process?.id } } }],
  })

  return (
    <Card
      size="small"
      title={step.title || 'Untitled'}
      extra={
        <Button size="small" type="default" onClick={() => setCollapsed(!collapsed)}>
          <Icon type={collapsed ? 'caret-down' : 'caret-up'} />
        </Button>
      }
      bodyStyle={collapsed ? { padding: 0 } : undefined}
    >
      {!collapsed && (
        <ProcessStepForm
          step={{
            ...step,
            responsibleUsers: step.responsibleUsers?.map(i => i.id),
          }}
          loading={loading}
          onUpdate={data =>
            update({
              variables: {
                input: {
                  ...data,
                  id: step.id,
                },
              },
            })
          }
        />
      )}
    </Card>
  )
}
