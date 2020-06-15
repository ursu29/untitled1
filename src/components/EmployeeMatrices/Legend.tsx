import React from 'react'
import { CircleButton, circleButtonsPallette } from '../Matrices/CircleButton'

export default function Legend() {
  return (
    <div style={{ display: 'flex', margin: '15px 0 20px' }}>
      {circleButtonsPallette.map((button, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', marginRight: '19px' }}>
          <CircleButton
            backgroundColor={button.backgroundColor}
            borderColor={button.borderColor}
            style={{ width: '18px', height: '18px', marginRight: '8px' }}
          />
          <span>{button.title}</span>
        </div>
      ))}
    </div>
  )
}
