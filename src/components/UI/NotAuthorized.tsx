import React from 'react'
import { GATEWAY } from '../../config'

export default function NotAuthorized() {
  return (
    <div>
      Not NotAuthorized
      <button
        onClick={() => {
          localStorage.removeItem('token')
          window.location.href = GATEWAY + '/sso/redirect'
        }}
      >
        try again
      </button>
    </div>
  )
}
