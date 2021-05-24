import { useQuery } from '@apollo/client'
import React from 'react'
import query, { QueryType } from '../../queries/getBookmarks'
import { Skill } from '../../types'
import Bookmarks from '../Bookmarks/Bookmarks'

interface Props {
  skill?: Pick<Skill, 'id'>
}

export default function SkillBookmarks({ skill }: Props) {
  const variables = { input: { skills: [skill?.id] } }
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
