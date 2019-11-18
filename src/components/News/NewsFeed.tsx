import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const query = gql`
  {
    posts {
      id
      title
      postbodies {
        id
        languageCode
        body
      }
      createdAt
      updatedAt
    }
  }
`

export default function NewsFeed() {
  const { data, loading, error } = useQuery(query)

  if (error) return <div>Error :(</div>
  if (loading) return <div>Loading...</div>

  console.log(data)

  return <div>News feed</div>
}
