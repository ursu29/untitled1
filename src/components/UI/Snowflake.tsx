import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ReactComponent as Icon } from '../../svg/snowflake.svg'

/**
 * From here https://codepen.io/robin-dela/pen/ZBvpzb
 */

const RotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const FillAnimation = keyframes`
  50% {
    filter: hue-rotate(0deg) invert(100%);
  }
  100% {
    filter: hue-rotate(90deg) invert(0%);
  }
`

const FlakeWrapper = styled.div<{ size: number }>`
  position: relative;
  width: 1em;
  height: 1em;
  font-size: ${props => props.size}px;
`

const Flake = styled(Icon)<{ index: number }>`
  height: 0.5em;
  padding-bottom: 0.125em;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  mix-blend-mode: color;
  will-change: filter;
  transform: ${props => `rotate(${props.index * 40}deg)`};
  transform-origin: 50% 100%;
  animation: ${FillAnimation} 6s linear infinite alternate;
  animation-delay: ${props => `${props.index * 0.1}s`};

  path {
    transform-origin: 50% 130%;
    animation: ${RotateAnimation} 3s infinite cubic-bezier(0.77, 0, 0.175, 1);
    will-change: transform;
  }
`

const list = Array.from({ length: 9 }, (v, i) => i)

export const Snowflake = ({ size }: { size: number }) => (
  <FlakeWrapper size={size}>
    {list.map(index => (
      <Flake index={index} key={index}>
        <Icon />
      </Flake>
    ))}
  </FlakeWrapper>
)
