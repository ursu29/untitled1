import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import query, { QueryType } from '../../queries/getSkills'
import Tree from '../UI/Tree'
import { getSkillLink } from '../../paths'

function SkillsTree({ history }: RouteComponentProps) {
  const { data, loading, error } = useQuery<QueryType>(query)

  if (error) return <div>Error :(</div>

  return (
    <Tree
      loading={loading}
      onDoubleClick={item => {
        history.push(getSkillLink(item.id))
      }}
      items={data?.skills?.map(item => ({
        id: item.id,
        key: item.id,
        title: item.name,
        parent: item.parent?.id,
      }))}
    />
  )
}

export default withRouter(SkillsTree)
