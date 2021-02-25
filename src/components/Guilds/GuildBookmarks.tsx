import React from 'react'
import query, { QueryType } from '../../queries/getBookmarks'
import { Guild } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import Bookmarks from '../Bookmarks/Bookmarks'
import message from '../../message'

interface Props {
  guild?: Guild
}

export default function GuildBookmarks({ guild }: Props) {
  const skills = guild?.skills?.map(skill => skill.id) || []
  const variables = { input: { skills: skills } }
  const { data, loading } = useQuery<QueryType>(query, {
    variables,
    skip: !skills.length,
    onError: message.error,
  })

  if (!guild) return <div>Guild is not found</div>

  return (
    <>
      <p style={{ fontStyle: 'italic' }}>Bookmarks related to technologies added to the guild</p>
      <Bookmarks
        refetchQueries={[{ query, variables }]}
        loading={loading}
        bookmarks={data?.bookmarks}
        isAddButtonHidden={true}
      />
    </>
  )
}
