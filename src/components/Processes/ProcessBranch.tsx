import { Button, Icon } from 'antd'
import React from 'react'
import { QueryType } from '../../queries/getProcesses'
import { ColumnWrapper, RowWrapper } from './ProcessPage.styles'
import ProcessStep from './ProcessStep'

export default function Branch({
  steps,
  parent,
  isLast,
  onCreate,
}: {
  steps?: QueryType['processes'][0]['steps']
  parent?: string
  isLast?: boolean
  onCreate: (value: any) => void
}) {
  if (!steps?.length) return null
  const firstStep = parent
    ? steps.find(i => i.id === parent)
    : steps.find(i => !i.parentSteps.length)

  if (!firstStep) return null

  const nextSteps = steps.filter(i => i.parentSteps?.find(i => i.id === firstStep.id))

  const hasNextSteps = Boolean(nextSteps.length)

  return (
    <>
      <ColumnWrapper>
        <div
          style={{
            width: 360,
            position: 'relative',
            backgroundColor: 'white',
            zIndex: 10,
          }}
        >
          <ProcessStep step={firstStep} />
          {isLast && (
            <Button
              size="small"
              type="dashed"
              style={{
                position: 'absolute',
                left: 'calc(100% + 8px)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              onClick={() => {
                onCreate({
                  parentSteps: [firstStep.parentSteps[0].id],
                })
              }}
            >
              <Icon type="plus" />
            </Button>
          )}
        </div>
        {hasNextSteps && (
          <>
            <RowWrapper>
              {nextSteps.map((i, index) => {
                const isLast = nextSteps.length - 1 === index
                return (
                  <Branch
                    isLast={isLast}
                    key={i.id}
                    steps={steps}
                    parent={i.id}
                    onCreate={onCreate}
                  />
                )
              })}
            </RowWrapper>
          </>
        )}
        {!hasNextSteps && (
          <Button
            size="small"
            type="dashed"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: '50%',
              transform: 'translateX(50%)',
            }}
            onClick={() => {
              onCreate({ parentSteps: [firstStep.id] })
            }}
          >
            <Icon type="plus" />
          </Button>
        )}
      </ColumnWrapper>
    </>
  )
}
