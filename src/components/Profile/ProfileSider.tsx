import React from 'react'
import { useGetProfileQuery } from '../../queries/profile'
import { useGetNotificationsQuery } from '../../queries/notifications'
import ProfileSmall from '../UI/ProfileSmall'

export default function ProfileSider() {
  const { data, loading, error } = useGetProfileQuery()
  const { data: dataNotifications } = useGetNotificationsQuery()
  return (
    <ProfileSmall
      profile={data?.profile}
      notifications={dataNotifications?.notifications}
      loading={loading || Boolean(error)}
    />
  )
}
