import React from 'react'
import GuestWiFi from '../../svg/guestWiFi.svg'
import { useMediaQuery } from 'react-responsive'

export default function QrWiFi() {
  const isMobileView = useMediaQuery({ maxWidth: 650 })

  return (
    <div
      style={{
        maxWidth: 100,
        position: isMobileView ? 'inherit' : 'absolute',
        top: '52px',
        right: '35px',
      }}
    >
      <div style={{ width: 100, height: 100 }}>
        <img src={GuestWiFi} alt="qr-code" />
      </div>
      <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Sidenis Guest WiFi QR</span>
    </div>
  )
}
