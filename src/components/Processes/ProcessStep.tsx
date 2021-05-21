import { useMutation, gql } from "@apollo/client";
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Collapse, Popconfirm, Tag, Tooltip } from 'antd'
import React, { useEffect } from 'react'
import { ProcessStepDetails } from '../../fragments'
import message from '../../message'
import getProcess from '../../queries/getProcess'
import ProcessStepForm from './ProcessStepForm'

const updateProcessStep = gql`
  mutation updateProcessStep($input: UpdateProcessStepInput) {
    updateProcessStep(input: $input) {
      id
    }
  }
`

const deleteProcessStep = gql`
  mutation deleteProcessStep($id: ID!) {
    deleteProcessStep(id: $id) {
      id
    }
  }
`

export default function ProcessStep({ step }: { step: ProcessStepDetails }) {
  const [update, { loading }] = useMutation(updateProcessStep, {
    refetchQueries: [{ query: getProcess, variables: { id: step?.process?.id } }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Step is updated')
    },
    onError: message.error,
  })

  const [remove, { loading: removeLoading }] = useMutation(deleteProcessStep, {
    variables: { id: step.id },
    refetchQueries: [{ query: getProcess, variables: { id: step?.process?.id } }],
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
    <Collapse defaultActiveKey={['0']}>
      <Collapse.Panel
        header={step.title || 'Untitled'}
        key="1"
        extra={
          <div style={{ display: 'flex' }}>
            {step.type === 'NOTIFY' && (
              <div>
                <Tooltip placement="bottom" title="Automatic">
                  <Tag
                    color="blue"
                    style={{
                      maxWidth: '20px',
                      minWidth: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    A
                  </Tag>
                </Tooltip>
              </div>
            )}
            {step.type === 'INDEPENDENT' && (
              <div>
                <Tooltip placement="bottom" title="Independent">
                  <Tag
                    color="magenta"
                    style={{
                      maxWidth: '20px',
                      minWidth: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    I
                  </Tag>
                </Tooltip>
              </div>
            )}
            <div onClick={e => e.stopPropagation()}>
              <Popconfirm
                placement="top"
                title={'Are you sure you want to remove this step?'}
                onConfirm={() => remove()}
                okText="Yes"
                cancelText="No"
              >
                <Button size="middle" type="link" style={{ color: 'gray', height: 0, padding: 0 }}>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </div>
          </div>
        }
      >
        <ProcessStepForm
          step={{
            ...step,
            responsibleUsers: step.responsibleUsers?.map(i => i?.id) || null,
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
      </Collapse.Panel>
    </Collapse>
  )
}
