import React, { useState, useEffect } from 'react'
import { azureClient } from '../App/Oauth'
import { Group } from '@microsoft/microsoft-graph-types'
import { useEmployee } from '../../utils/withEmployee'
import Users from './AAD/Users'

export default function AAD() {
  const [hasAccess, setHasAccess] = useState(false)
  const user = useEmployee()

  useEffect(() => {
    ;(async () => {
      const memberOf = await azureClient.api(`/users/${user.employee.azureID}/memberOf`).get()
      setHasAccess(
        (memberOf.value as [Group])
          .map(e => e.displayName?.toLowerCase())
          .includes('security group user editors'),
      )
    })()
  }, [user.employee.azureID])

  if (!hasAccess) {
    return <div>Error</div>
  }

  return <Users />
}
