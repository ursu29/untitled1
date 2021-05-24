import { useMutation, useQuery, gql } from '@apollo/client'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, List, Popconfirm } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import message from '../../message'
import { getProcessLink } from '../../paths'
import getProcesses, { QueryType } from '../../queries/getProcesses'
import isForbidden from '../../utils/isForbidden'
import { Access } from '../../types'
import NotAllowed from '../UI/NotAllowed'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import CreateProcess from './CreateProcess'
import PageHeader from '../UI/PageHeader'
import Helmet from '../Helmet'

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
  mutation deleteProcess($id: ID!) {
    deleteProcess(id: $id) {
      id
    }
  }
`

function ProcessesPage() {
  const { data, loading: dataLoading, error } = useQuery<QueryType>(getProcesses)
  const [deleteProcess, deleteProcessArgs] = useMutation(mutation, {
    refetchQueries: [{ query: getProcesses }],
    awaitRefetchQueries: true,
    onCompleted: () => message.success('Process is removed'),
    onError: message.error,
  })
  const { data: access, loading: accessLoading } = useQuery<AccessQueryType>(accessQuery)

  useEffect(() => {
    if (deleteProcessArgs.loading) {
      message.loading('Removing process')
    }
  }, [deleteProcessArgs.loading])

  if (isForbidden(error) || (access && !access.processesAccess.write)) {
    return (
      <PageContent>
        <NotAllowed />
      </PageContent>
    )
  }

  const loading = dataLoading || accessLoading

  return (
    <>
      <Helmet title="Processes" />
      <PageHeader title="Processes" extra={[<CreateProcess />]} />
      <PageContent>
        <Skeleton active loading={loading}>
          {!data?.processes?.length && <div>No processes found</div>}
          <List>
            {data?.processes.map(i => {
              return (
                <List.Item key={i.id}>
                  <Link to={getProcessLink(i.id)}>{i.title}</Link>{' '}
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => {
                      deleteProcess({ variables: { id: i.id } })
                    }}
                  >
                    <Button type="link" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </List.Item>
              )
            })}
          </List>
        </Skeleton>
      </PageContent>
    </>
  )
}

export default ProcessesPage
