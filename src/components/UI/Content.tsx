import { Layout, Card } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH, CONTENT_WIDTH, MENU_WIDTH } from '../../config'

function Content({ children }: PropsWithChildren<any>) {
  const isWide = useMediaQuery({ minWidth: CONTENT_WIDTH })
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return (
    <Layout.Content>
      <div
        style={{
          height: '100%',
          boxSizing: 'border-box',
          maxWidth: isWide ? '1220px' : `calc(100vw - ${isLarge ? `${MENU_WIDTH}px` : '60px'})`,
          overflow: 'auto',
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
