import { useMutation } from '@apollo/react-hooks'
import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Popconfirm } from 'antd'
import gql from 'graphql-tag'
import React, { useState, useEffect } from 'react'
import getProcesses from '../../queries/getProcesses'
import { ProcessStep as ProcessStepType } from '../../types'
import ProcessStepForm from './ProcessStepForm'
import message from '../../message'

const updateProcessStep = gql`
  mutation updateProcessStep($input: UpdateProcessStepInput) {
    updateProcessStep(input: $input) {
      id
    }
  }
`

const deleteProcessStep = gql`
  mutation deleteProcessStep($input: DeleteProcessStepInput) {
    deleteProcessStep(input: $input) {
      id
    }
  }
`

export default function ProcessStep({ step }: { step: Partial<ProcessStepType> }) {
  const [collapsed, setCollapsed] = useState(true)
  const [update, { loading }] = useMutation(updateProcessStep, {
    refetchQueries: [{ query: getProcesses, variables: { input: { id: step?.process?.id } } }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Step is updated')
      setCollapsed(true)
    },
    onError: message.error,
  })

  const [remove, { loading: removeLoading }] = useMutation(deleteProcessStep, {
    variables: { input: { id: step.id } },
    refetchQueries: [{ query: getProcesses, variables: { input: { id: step?.process?.id } } }],
    awaitRefetchQueries: true,
    onCompleted: () => message.success('Step is removed'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating step')
    }
    if (removeLoading) {
      message.loading('Removing step')
    }
  }, [loading, removeLoading])

  return (
    <Card
      size="small"
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button size="small" type="default" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <CaretDownOutlined /> : <CaretUpOutlined />}
          </Button>
          <div style={{ paddingLeft: 8 }}>{step.title || 'Untitled'}</div>
        </div>
      }
      extra={
        <Popconfirm
          placement="top"
          title={'Are you sure you want to remove this step?'}
          onConfirm={() => remove()}
          okText="Yes"
          cancelText="No"
        >
          <span>
            <Button size="large" type="link" style={{ color: 'black' }}>
              <DeleteOutlined />
            </Button>
          </span>
        </Popconfirm>
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
