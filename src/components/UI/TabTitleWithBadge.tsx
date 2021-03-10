import React, { PropsWithChildren } from 'react'
import { Badge } from 'antd'
import { BadgeProps } from 'antd/es/badge'
import styled from 'styled-components'

const BadgeForNav = styled(Badge)`
  .ant-tabs-dropdown & .ant-badge-count {
    display: none;
  }
`
const BadgeForDropdown = styled(Badge)`
  .ant-badge-count {
    display: none;
  }
  .ant-tabs-dropdown & .ant-badge-count {
    display: inline-block;
  }
`

export const TabTitleWithBadge = ({ children, offset, ...rest }: PropsWithChildren<BadgeProps>) => {
  return (
    <BadgeForNav offset={offset} {...rest}>
      {children} <BadgeForDropdown {...rest} />
    </BadgeForNav>
  )
}
