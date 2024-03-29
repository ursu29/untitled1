import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH, MENU_WIDTH } from '../../config'

const { Sider } = Layout

interface Props extends PropsWithChildren<any> {}

function PortalSider({ children }: Props) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return (
    <Sider theme="light" collapsed={!isLarge} width={MENU_WIDTH} collapsedWidth="60">
      {children}
    </Sider>
  )
}

export default React.memo(PortalSider)
