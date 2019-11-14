import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Employee } from '../../types'
import SiderProfile from '../UI/SiderProfile'

const query = gql`
  {
    profile {
      id
      name
      position
      avatar
    }
  }
`

type ProfilePick = Pick<Employee, 'name' | 'position' | 'avatar'>

export default function ProfileSider() {
  const { data, loading, error } = useQuery<{ profile: ProfilePick }>(query)
  if (error) return <div>Error :(</div>

  return <SiderProfile profile={data?.profile} loading={loading} />
}
