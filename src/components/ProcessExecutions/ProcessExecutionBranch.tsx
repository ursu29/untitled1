import React from 'react'
import { QueryType } from '../../queries/getProcesses'
import { QueryType as ExecutionQueryType } from '../../queries/getProcessExecution'
import { ColumnWrapper, RowWrapper, ProcessStepWrapper } from '../Processes/ProcessPage.styles'
import ActiveStepCard from './ExecutionStepCard'
import Controls from '../UI/Controls'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Input, Tag, Tooltip } from 'antd'

type Step = QueryType['processes'][0]['steps'][0] & { isStrictActive: boolean }

interface Props {
  steps?: Step[]
  executionSteps?: ExecutionQueryType['processExecutions'][0]['executionSteps']
  startItem?: Step
  active: boolean
  parent?: Step
  onComplete: (step: Step) => void
  onComment?: (id: string, comment: string) => void
}

export default function Branch({
  steps,
  startItem,
  executionSteps,
  parent,
  active,
  onComplete,
  onComment,
}: Props) {
  if (!steps?.length) return null

  const step = startItem
    ? steps.find(i => i.id === startItem.id)
    : steps.find(i => !i.parentSteps.length)
  if (!step) return null

  const nextSteps = steps.filter(i => i.parentSteps?.find(i => i.id === step.id))
  const hasNextSteps = Boolean(nextSteps.length)

  const executionStep = executionSteps?.find(i => i.step?.id === step.id)
  const executionStepParent = parent && executionSteps?.find(i => i.step?.id === parent.id)

  let status: 'pending' | 'active' | 'done' = 'pending'

  if (executionStep?.isDone) {
    status = 'done'
  } else {
    if (!parent) {
      status = 'active'
    } else {
      if (executionStepParent?.isDone || step.isStrictActive || step.type === 'independent') {
        status = 'active'
      } else {
        status = 'pending'
      }
    }
  }

  if ((!active || (!step.isStrictActive && step.type !== 'independent')) && status !== 'done') {
    status = 'pending'
  }

  return (
    <>
      <ColumnWrapper editable={false}>
        <div
          style={{
            width: 340,
            position: 'relative',
            backgroundColor: 'white',
            zIndex: 10,
          }}
        >
          <ProcessStepWrapper hasNextSteps={hasNextSteps}>
            <ActiveStepCard
              title={step.title}
              description={step.description}
              status={status}
              employees={step.responsibleUsers}
            >
              {step.type === 'notify' && (
                <div>
                  <Tooltip placement="bottom" title="The step will be completed in the background">
                    <Tag color="blue">Automatic</Tag>
                  </Tooltip>
                </div>
              )}
              {step.type === 'independent' && (
                <div>
                  <Tooltip placement="bottom" title="Can be completed at any time">
                    <Tag color="magenta">Independent</Tag>
                  </Tooltip>
                </div>
              )}
              {step.hasComment && (
                <Form.Item>
                  <Input.TextArea
                    defaultValue={executionStep?.description}
                    placeholder="Comment"
                    autoSize
                    // disabled={!active}
                    onChange={e => {
                      onComment?.(step.id, e.target.value)
                    }}
                  />
                </Form.Item>
              )}
              {status === 'active' && (step.type === 'approve' || step.type === 'independent') && (
                <Controls>
                  <Button
                    type="primary"
                    disabled={!step.responsibleUsers?.find(i => i.isMe)}
                    onClick={() => onComplete(step)}
                    size="small"
                  >
                    Complete
                  </Button>
                </Controls>
              )}
            </ActiveStepCard>
          </ProcessStepWrapper>
        </div>
        {hasNextSteps && (
          <>
            <RowWrapper hasSeveralSteps={nextSteps.length > 1}>
              {nextSteps.map(i => (
                <Branch
                  active={active}
                  key={i.id}
                  steps={steps}
                  startItem={i}
                  parent={step}
                  executionSteps={executionSteps}
                  onComplete={onComplete}
                  onComment={onComment}
                />
              ))}
            </RowWrapper>
          </>
        )}
      </ColumnWrapper>
    </>
  )
}
