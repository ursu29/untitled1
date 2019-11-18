import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Employee } from '../../types'
import ProfileSmall from '../UI/ProfileSmall'

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
  return <ProfileSmall profile={data?.profile} loading={loading || Boolean(error)} />
}
