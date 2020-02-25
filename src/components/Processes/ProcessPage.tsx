import { useQuery, useMutation } from '@apollo/react-hooks'
import { Button, Icon } from 'antd'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import getProcesses, { QueryType } from '../../queries/getProcesses'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import { ColumnWrapper, RowWrapper } from './ProcessPage.styled'

const Branch = ({
  steps,
  parent,
  isLast,
  onCreate,
}: {
  steps?: QueryType['processes'][0]['steps']
  parent?: string
  isLast?: boolean
  onCreate: (value: any) => void
}) => {
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
            padding: 16,
            width: 200,
            position: 'relative',
            backgroundColor: 'white',
            zIndex: 10,
            border: '1px solid gray',
          }}
        >
          {firstStep.title}
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
                  title: 'next title',
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
              onCreate({
                parentSteps: [firstStep.id],
                title: 'next title',
              })
            }}
          >
            <Icon type="plus" />
          </Button>
        )}
      </ColumnWrapper>
    </>
  )
}

const mutation = gql`
  mutation createProcessStep($input: CreateProcessStepInput) {
    createProcessStep(input: $input) {
      id
    }
  }
`

function ProcessPage({ match }: RouteComponentProps<{ id: string }>) {
  const id = match.params.id
  const { data, loading } = useQuery<QueryType>(getProcesses, {
    variables: {
      input: { id },
    },
  })

  const [create] = useMutation(mutation, {
    refetchQueries: [{ query: getProcesses, variables: { input: { id } } }],
  })

  const process = data?.processes[0]

  return (
    <PageContent style={{ overflow: 'auto', width: '100%', height: '100%' }}>
      <Skeleton active loading={loading}>
        {process && (
          <Branch
            steps={process.steps}
            onCreate={(values: any) => {
              create({
                variables: {
                  input: {
                    ...values,
                    process: process.id,
                  },
                },
              })
            }}
          />
        )}
      </Skeleton>
    </PageContent>
  )
}

export default withRouter(ProcessPage)
