import React, { PropsWithChildren } from 'react'
import { Layout } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { CONTENT_WIDTH } from '../../config'
import SnowBackdrop from './SnowBackdrop'

const BACKDROP_VISIBLE_WIDTH = CONTENT_WIDTH + 100

export default function PortalLayout({ children }: PropsWithChildren<any>) {
  const isLarge = useMediaQuery({ minWidth: BACKDROP_VISIBLE_WIDTH })
  return (
    <Layout hasSider style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      {isLarge && <SnowBackdrop />}
      <div style={{ minHeight: '100vh', display: 'flex', width: CONTENT_WIDTH }}>{children}</div>
    </Layout>
  )
}
