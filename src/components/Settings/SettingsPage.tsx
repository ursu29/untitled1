import React from 'react'
import light from '../../themes/light'
import dark from '../../themes/dark'
import { Button } from 'antd'

declare global {
  interface Window {
    less: any
  }
}

export default function SettingsPage() {
  return (
    <div>
      <Button
        onClick={() => {
          window.less.modifyVars(light)
        }}
      >
        light
      </Button>
      <Button
        onClick={() => {
          window.less.modifyVars(dark)
        }}
      >
        dark
      </Button>
    </div>
  )
}
