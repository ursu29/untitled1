import { useQuery } from '@apollo/react-hooks'
import { List } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { getProcessLink } from '../../paths'
import getProceses, { QueryType } from '../../queries/getProcesses'
import Controls from '../UI/Controls'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import CreateProcess from './CreateProcess'

function ProcessesPage() {
  const { data, loading } = useQuery<QueryType>(getProceses)
  return (
    <PageContent>
      <Skeleton active loading={loading}>
        {!data?.processes?.length && <div>No processes found</div>}
        <Controls>
          <CreateProcess />
        </Controls>
        <List>
          {data?.processes.map(i => {
            return (
              <List.Item key={i.id}>
                <Link to={getProcessLink(i.id)}>{i.title}</Link>
              </List.Item>
            )
          })}
        </List>
      </Skeleton>
    </PageContent>
  )
}

export default ProcessesPage
