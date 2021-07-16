import React from 'react'
import usePromise from 'react-fetch-hook/usePromise'
import GraphAPI from '../../utils/GraphAPI'
import Groups from './AAD/Groups'
import Users from './AAD/Users'

const graphAPI = new GraphAPI()

export default function AAD({ view }: { view: 'users' | 'groups' }) {
  const { isLoading: isLoadingUsers, data: dataUsers } = usePromise(() => graphAPI.getUsers())
  const { isLoading: isLoadingGroups, data: dataGroups } = usePromise(() => graphAPI.getGroups())

  const groups = dataGroups?.sort((a, b) =>
    (a?.displayName || '').localeCompare(b?.displayName || ''),
  )

  return view === 'users' ? (
    <Users users={dataUsers} groups={groups} isLoading={isLoadingUsers} />
  ) : (
    <Groups users={dataUsers} groups={groups} isLoading={isLoadingGroups} />
  )
}
