import styled from 'styled-components'
import { ReactComponent as Icon } from '../../svg/christmas-hat.svg'
import React, { PropsWithChildren } from 'react'

const Wrapper = styled.div`
  position: relative;
`

const HatIcon = styled(Icon)`
  position: absolute;
  width: 100%;
  top: -33%;
  right: -33%;
  transform: rotateY(180deg);
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.5));
`

type Props = PropsWithChildren<{
  withHat?: boolean
}>

export const AvatarHat = ({ children, withHat }: Props) => {
  if (!withHat) return <>{children}</>
  return (
    <Wrapper>
      {children}
      <HatIcon />
    </Wrapper>
  )
}
