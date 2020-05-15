import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, List, Popconfirm, Typography } from 'antd'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import message from '../../message'
import { getProcessLink } from '../../paths'
import getProceses, { QueryType } from '../../queries/getProcesses'
import isForbidden from '../../utils/isForbidden'
import NotAllowed from '../UI/NotAllowed'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import CreateProcess from './CreateProcess'

const mutation = gql`
  mutation deleteProcess($input: DeleteProcessInput) {
    deleteProcess(input: $input) {
      id
    }
  }
`

function ProcessesPage() {
  const { data, loading, error } = useQuery<QueryType>(getProceses)
  const [deleteProcess, deleteProcessArgs] = useMutation(mutation, {
    refetchQueries: [{ query: getProceses }],
    awaitRefetchQueries: true,
    onCompleted: () => message.success('Process is removed'),
    onError: message.error,
  })

  useEffect(() => {
    if (deleteProcessArgs.loading) {
      message.loading('Removing process')
    }
  }, [deleteProcessArgs.loading])

  if (isForbidden(error)) {
    return (
      <PageContent>
        <NotAllowed />
      </PageContent>
    )
  }

  return (
    <PageContent>
      <Skeleton active loading={loading}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Title>Processes</Typography.Title>
          <CreateProcess />
        </div>
        {!data?.processes?.length && <div>No processes found</div>}
        <List>
          {data?.processes.map((i) => {
            return (
              <List.Item key={i.id}>
                <Link to={getProcessLink(i.id)}>{i.title}</Link>{' '}
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => {
                    deleteProcess({ variables: { input: { id: i.id } } })
                  }}
                >
                  <Button type="link" icon="delete" />
                </Popconfirm>
              </List.Item>
            )
          })}
        </List>
      </Skeleton>
    </PageContent>
  )
}

export default ProcessesPage
