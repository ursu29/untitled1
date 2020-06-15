import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div<{ isHovered: boolean | undefined }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: ${props => (props.isHovered ? 'pointer' : null)}
  transition: ${props => (props.isHovered ? '0.1s all' : null)};
  &:hover {
    transform: ${props => (props.isHovered ? 'scale(1.3)' : null)};
  }
`

interface Props {
  borderColor: string
  backgroundColor: string
  isActive?: boolean
  style?: object
  onClick?: Function
  isHovered?: boolean
}

export const circleButtonsPallette = [
  {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderColor: '#adadad',
    title: 'No Knowledge',
  },
  {
    backgroundColor: 'rgba(242, 201, 76, 0.3)',
    borderColor: '#F2C94C',
    title: 'Theoretical Knowledge',
  },
  {
    backgroundColor: 'rgba(21, 225, 127, 0.3)',
    borderColor: '#15E17F',
    title: 'Practical Knowledge',
  },
]

export const CircleButton = ({
  borderColor,
  backgroundColor,
  isActive,
  style,
  onClick,
  isHovered,
}: Props) => {
  return (
    <StyledButton
      onClick={() => (onClick ? onClick() : null)}
      isHovered={isHovered}
      style={{
        border: '2px solid' + borderColor,
        backgroundColor: isActive ? borderColor : backgroundColor,
        ...style,
      }}
    ></StyledButton>
  )
}
