import React, { useEffect } from 'react'
import { notification, Button } from 'antd'

const openNotification = () => {
  notification.open({
    message: "If timemaster is not available, probably you're not authorized",
    description: (
      <Button
        onClick={() => {
          window.open('https://timemaster-new.sidenis.com', '__blank')
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
      <iframe
        id="tm_iframe"
        width="100%"
        height="100%"
        frameBorder="0"
        src="https://timemaster-new.sidenis.com"
        title="Timemaster"
      ></iframe>
    </div>
  )
}

export default TimemasterPage
