import React from 'react'
import { QueryType } from '../../queries/getProcesses'
import { ColumnWrapper, RowWrapper } from '../Processes/ProcessPage.styles'
import ActiveStepCard from './ActiveStepCard'

export default function Branch({
  steps,
  parent,
}: {
  steps?: QueryType['processes'][0]['steps']
  parent?: string
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
          <ActiveStepCard>{firstStep.title}</ActiveStepCard>
        </div>
        {hasNextSteps && (
          <>
            <RowWrapper>
              {nextSteps.map(i => (
                <Branch key={i.id} steps={steps} parent={i.id} />
              ))}
            </RowWrapper>
          </>
        )}
      </ColumnWrapper>
    </>
  )
}
