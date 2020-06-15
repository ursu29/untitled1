import React from 'react'
import { MatrixGroup } from '../../styled'

export default function GroupTitle({ title }: { title: string }) {
  return (
    <MatrixGroup
      style={{
        overflowWrap: 'anywhere',
        minWidth: '130px',
        maxWidth: '130px',
        margin: '0 20px 0 0',
        display: 'flex',
        alignItems: 'start',
        fontSize: '16px',
        paddingTop: '5px',
      }}
    >
      {title}
    </MatrixGroup>
  )
}
