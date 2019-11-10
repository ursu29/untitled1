import React, { useEffect, useState, PropsWithChildren } from 'react'
import { GATEWAY } from '../../config'
import NotAuthorized from '../UI/NotAuthorized'

export default ({ children }: PropsWithChildren<any>) => {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    let url = new URL(window.location.href)
    let queryParams = new URLSearchParams(url.search.slice(1))

    if (queryParams.has('token')) {
      localStorage.setItem('token', queryParams.get('token') || '')
      window.location.href = window.location.pathname
      setAuthorized(true)
      return
    }

    const token = localStorage.getItem('token')

    if (token) {
      setAuthorized(true)
      return
    }
    window.location.href = GATEWAY + '/sso/redirect'
  }, [])

  if (!authorized) {
    return <NotAuthorized />
  }

  return children
}
