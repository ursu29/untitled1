import React, { useEffect, useState } from 'react'
import { Button, Result } from 'antd'

function TimemasterPage() {
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      const iframe: any = document.getElementById('tm_iframe')
      console.log(iframe)
      try {
        console.log(iframe.contentWindow)
      } catch (err) {
        console.log(err)
        // setUnauthorized(true)
      }
    }, 3000)
  }, [])

  if (unauthorized) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <Result
          status="403"
          title="403"
          subTitle="Sorry, looks like you're not authorized to Timemaster"
          extra={
            <Button
              onClick={() => {
                window.open('https://timemaster.sidenis.com', '_blank')
              }}
            >
              Authorize
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        id="tm_iframe"
        width="100%"
        referrerPolicy="unsafe-url"
        height="100%"
        frameBorder="0"
        src="https://timemaster-new.sidenis.com"
        title="Timemaster"
        onError={e => {
          console.info('captured:', e)
        }}
      ></iframe>
    </div>
  )
}

export default TimemasterPage
