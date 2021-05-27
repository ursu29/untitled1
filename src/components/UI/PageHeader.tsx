import React from 'react'
import { PageHeader, Divider } from 'antd'
import { useHistory } from 'react-router-dom'
import Helmet from '../Helmet'

interface CustomProps {
  withBack?: boolean
  withoutDivider?: boolean
}

export default function PortalPageHeader({
  withBack,
  withoutDivider,
  ...props
}: CustomProps & React.ComponentProps<typeof PageHeader>) {
  const history = useHistory()

  const customProps = {} as React.ComponentProps<typeof PageHeader>

  if (withBack)
    customProps.onBack = () => {
      history.push(history.location.pathname.split('/').slice(0, -1).join('/'))
    }

  return (
    <>
      <Helmet title={props.title?.toString()} />
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
