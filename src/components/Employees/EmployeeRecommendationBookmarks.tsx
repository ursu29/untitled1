import { useQuery } from "@apollo/client";
import React from 'react'
import { Skill } from '../../types'
import message from '../../message'
import query, { QueryType } from '../../queries/getBookmarks'
import Bookmarks from '../Bookmarks/Bookmarks'

type SkillPick = Pick<Skill, 'id'>

interface Props {
  skills?: SkillPick[]
}

export default function EmployeeRecommendationBookmarks({ skills }: Props) {
  const skillIds = skills?.map(skill => skill.id) || []
  const variables = { input: { skills: skillIds } }
  const { data, loading } = useQuery<QueryType>(query, {
    variables,
    skip: !skillIds.length,
    onError: message.error,
  })

  return (
    <Bookmarks
      refetchQueries={[{ query, variables }]}
      loading={loading}
      bookmarks={data?.bookmarks}
    />
  )
}
