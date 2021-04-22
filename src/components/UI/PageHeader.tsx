import React from 'react'
import { PageHeader, Divider } from 'antd'
import { useHistory } from 'react-router-dom'

interface CustomProps {
  withBack?: boolean
  withoutDivider?: boolean
}

export default function ({
  withBack,
  withoutDivider,
  ...props
}: CustomProps & React.ComponentProps<typeof PageHeader>) {
  const history = useHistory()

  const customProps = {} as React.ComponentProps<typeof PageHeader>

  if (withBack) customProps.onBack = () => history.goBack()

  return (
    <>
      <PageHeader
        {...customProps}
        {...props}
        style={{
          height: '66px',
          fontSize: '20px',
          lineHeight: '28px',
          fontWeight: 600,
          color: 'rgba(0, 0, 0, 0.85)',
          ...props.style,
        }}
      >
        {props.children}
      </PageHeader>
      {!withoutDivider && <Divider style={{ margin: 0 }} />}
    </>
  )
}
