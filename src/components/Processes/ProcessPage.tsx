import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getProcesses, { QueryType } from '../../queries/getProcesses'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import Branch from './ProcessBranch'

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
    <PageContent style={{ overflow: 'auto', width: '100%', height: '100%', flexGrow: 1 }}>
      <Skeleton active loading={loading}>
        {process && (
          <Branch
            steps={process.steps}
            onCreate={(values: any) => {
              create({ variables: { input: { ...values, process: process.id } } })
            }}
          />
        )}
      </Skeleton>
    </PageContent>
  )
}

export default withRouter(ProcessPage)
