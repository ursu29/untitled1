import React from 'react'
import { Switch } from 'antd'

export default function DesignModeSwitch({
  isDesignMode,
  toggleDesignMode,
}: {
  isDesignMode: boolean
  toggleDesignMode: any
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '5px' }}>Design Mode</label>
      <Switch checked={isDesignMode} onChange={() => toggleDesignMode(!isDesignMode)} />
    </div>
  )
}
