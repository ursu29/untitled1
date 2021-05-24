import { useMutation, useQuery, gql } from '@apollo/client'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import getProcess, { QueryType } from '../../queries/getProcess'
import { Access } from '../../types'
import PageContent from '../UI/PageContent'
import Branch from './ProcessBranch'
import { Divider } from 'antd'
import NotAllowed from '../UI/NotAllowed'
import isForbidden from '../../utils/isForbidden'
import PageHeader from '../UI/PageHeader'

const accessQuery = gql`
  query processPageAccess {
    processesAccess {
      write
    }
  }
`

type AccessQueryType = {
  processesAccess: Pick<Access, 'write'>
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
  const {
    data,
    loading: dataLoading,
    error,
  } = useQuery<QueryType>(getProcess, {
    variables: { id },
  })
  const { data: access, loading: accessLoading } = useQuery<AccessQueryType>(accessQuery)

  const [create] = useMutation(mutation, {
    refetchQueries: [{ query: getProcess, variables: { id } }],
  })

  if (isForbidden(error) || (access && !access.processesAccess.write)) {
    return (
      <PageContent>
        <NotAllowed />
      </PageContent>
    )
  }

  const loading = dataLoading || accessLoading

  const process = data?.process

  const branches = process?.steps.filter(i => !i.parentSteps?.length)

  return (
    <>
      <PageHeader title={process?.title} />
      <PageContent loading={loading}>
        {process && (
          <div>
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
                    loading={loading}
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
      </PageContent>
    </>
  )
}

export default withRouter(ProcessPage)
