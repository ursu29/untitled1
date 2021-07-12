import React from 'react'
// import { useEmployee } from '../../utils/withEmployee'
// import usePromise from 'react-fetch-hook/usePromise'
import Users from './AAD/Users'
// import GraphAPI from '../../utils/GraphAPI'

// const graphAPI = new GraphAPI()

export default function AAD() {
  // const [hasAccess, setHasAccess] = useState(false)
  // const user = useEmployee()

  /*   useEffect(() => {
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
  } */

  return <Users />
}
