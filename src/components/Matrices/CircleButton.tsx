import React from 'react'
import styled from 'styled-components'
import { Level } from '../../types/graphql'
import { getMatrixLevelName } from '../../utils/getLevelName'

const StyledButton = styled.div<{ isHovered: boolean | undefined }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: ${props => (props.isHovered ? 'pointer' : null)};
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
    borderColor: '#424140',
    title: getMatrixLevelName(Level.Wanted),
    level: Level.Wanted,
  },
  {
    backgroundColor: 'rgba(242, 201, 76, 0.3)',
    borderColor: '#cf9011',
    title: getMatrixLevelName(Level.Learning),
    level: Level.Learning,
  },
  {
    backgroundColor: 'rgba(21, 225, 127, 0.3)',
    borderColor: '#418d15',
    title: getMatrixLevelName(Level.Experienced),
    level: Level.Experienced,
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
        border: isActive ? `2px solid ${borderColor}` : '',
        backgroundColor: backgroundColor,
        ...style,
      }}
    />
  )
}
