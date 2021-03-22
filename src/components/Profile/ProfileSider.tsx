import React from 'react'
import { useGetProfileQuery } from '../../queries/profile'
import ProfileSmall from '../UI/ProfileSmall'

export default function ProfileSider() {
  const { data, loading, error } = useGetProfileQuery()
  return <ProfileSmall profile={data?.profile} loading={loading || Boolean(error)} />
}
