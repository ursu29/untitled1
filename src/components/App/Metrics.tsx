import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ym from 'react-yandex-metrika'

export default function () {
  const location = useLocation()

  useEffect(() => {
    // TODO: remove /client after migrating api to subdomain.
    // this is only for result unification (between page hit and location changes)
    ym('hit', location.pathname)
  }, [location])

  return null
}
