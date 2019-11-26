import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import query, { QueryType } from '../../queries/getSkills'
import Tree from '../UI/Tree'

export default function SkillsTree() {
  const { data, loading, error } = useQuery<QueryType>(query)

  if (error) return <div>Error :(</div>
  // if (loading) return <div>Loading...</div>

  return (
    <Tree
      loading={loading}
      items={data?.skills?.map(item => ({
        id: item.id,
        key: item.id,
        title: item.name,
        parent: item.parent?.id,
      }))}
    />
  )
}
