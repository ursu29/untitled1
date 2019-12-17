import React from 'react'
import query, { QueryType } from '../../queries/getBookmarks'
import { Skill } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import Bookmarks from '../Bookmarks/Bookmarks'

interface Props {
  skill?: Pick<Skill, 'id'>
}

export default function EmployeeBookmarks({ skill }: Props) {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { input: { skill: skill?.id } },
    skip: !skill,
  })

  if (!skill) return <div>Skill is not found</div>

  return <Bookmarks loading={loading} bookmarks={data?.bookmarks} />
}
