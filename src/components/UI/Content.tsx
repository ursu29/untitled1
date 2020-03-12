import { Layout, Card } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'

function Content({ children }: PropsWithChildren<any>) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return (
    <Layout.Content>
      <div
        style={{
          height: '100%',
          boxSizing: 'border-box',
          maxWidth: isLarge ? '1280px' : 'calc(100vw - 60px)',
        }}
      >
        <Card
          size="default"
          bordered
          style={{ height: '100%', borderTop: 'none', borderBottom: 'none' }}
          bodyStyle={{ padding: 0, height: '100%' }}
        >
          {children}
        </Card>
      </div>
    </Layout.Content>
  )
}

export default React.memo(Content)
