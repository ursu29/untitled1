import React, { useEffect } from 'react'
import { notification, Button } from 'antd'
import Helmet from '../Helmet'

const openNotification = () => {
  notification.open({
    message: "If timemaster is not available, probably you're not authorized",
    description: (
      <Button
        onClick={() => {
          window.open('https://timemaster.syncretis.com', '__blank')
        }}
      >
        Login
      </Button>
    ),
    duration: 4,
  })
}

function TimemasterPage() {
  useEffect(() => {
    openNotification()
  }, [])
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Helmet title="Timemaster" />
      <iframe
        data-cy="tm_iframe"
        id="tm_iframe"
        width="100%"
        height="100%"
        frameBorder="0"
        src="https://timemaster.syncretis.com"
        title="Timemaster"
      ></iframe>
    </div>
  )
}

export default TimemasterPage
