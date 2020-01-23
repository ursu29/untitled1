import React from 'react'
import query, { QueryType } from '../../queries/getBookmarks'
import { Skill } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import Bookmarks from '../Bookmarks/Bookmarks'

interface Props {
  skill?: Pick<Skill, 'id'>
}

export default function EmployeeBookmarks({ skill }: Props) {
  const variables = { input: { skill: skill?.id } }
  const { data, loading } = useQuery<QueryType>(query, {
    variables,
    skip: !skill,
  })

  if (!skill) return <div>Skill is not found</div>

  return (
    <Bookmarks
      refetchQueries={[{ query, variables }]}
      loading={loading}
      bookmarks={data?.bookmarks}
    />
  )
}
