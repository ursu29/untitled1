import { Layout, Card } from 'antd'
import React, { PropsWithChildren } from 'react'

function Content({ children }: PropsWithChildren<any>) {
  return (
    <Layout.Content>
      <div style={{ height: '100%', boxSizing: 'border-box', maxWidth: 1200 }}>
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
