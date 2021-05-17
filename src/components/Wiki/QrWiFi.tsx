import React from 'react'
import GuestWiFi from '../../svg/guestWiFi.png'
import { useMediaQuery } from 'react-responsive'

export default function QrWiFi() {
  const isMobileView = useMediaQuery({ maxWidth: 650 })

  return (
    <div
      style={{
        maxWidth: 100,
        position: isMobileView ? 'inherit' : 'absolute',
        top: '120px',
        right: '35px',
      }}
    >
      <div style={{ width: 100, height: 100 }}>
        <img style={{ width: 100, height: 100 }} src={GuestWiFi} alt="qr-code" />
      </div>
      <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Syncretis Guest WiFi QR</span>
    </div>
  )
}
