import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getProcesses, { QueryType } from '../../queries/getProcesses'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import Branch from './ProcessBranch'
import { Divider, Typography } from 'antd'

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

  const branches = process?.steps.filter(i => !i.parentSteps?.length)

  return (
    <PageContent style={{ overflow: 'auto', width: '100%', height: '100%', flexGrow: 1 }}>
      <Skeleton active loading={loading}>
        {process && (
          <div>
            <Typography.Title>{process.title}</Typography.Title>
            {branches?.map((i, index) => {
              return (
                <div key={i.id}>
                  <Branch
                    steps={process.steps.filter(item => {
                      if (!item.parentSteps?.length) {
                        return item.id === i.id
                      }
                      return true
                    })}
                    onCreate={(values: any) => {
                      create({ variables: { input: { ...values, process: process.id } } })
                    }}
                  />
                  {index < branches.length - 1 && <Divider />}
                </div>
              )
            })}
          </div>
        )}
      </Skeleton>
    </PageContent>
  )
}

export default withRouter(ProcessPage)
