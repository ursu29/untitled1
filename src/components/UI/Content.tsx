import { Layout, Card } from 'antd'
import React, { PropsWithChildren } from 'react'

function Content({ children }: PropsWithChildren<any>) {
  return (
    <Layout.Content>
      <Card
        size="default"
        style={{ height: '100%', borderRight: 'none', borderTop: 'none', borderBottom: 'none' }}
        bodyStyle={{
          height: '100%',
          padding: '60px 70px',
          boxSizing: 'border-box',
          maxWidth: 1200,
        }}
      >
        {children}
      </Card>
    </Layout.Content>
  )
}

export default React.memo(Content)
