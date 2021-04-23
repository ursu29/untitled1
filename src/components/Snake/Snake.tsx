import React from 'react'
import { Coordinate } from './utils'
import { Rectangle } from './Primitives'

type Props = {
  coordinates: Coordinate[]
  cellSize: number
}

export const Snake = ({ coordinates, cellSize }: Props) => (
  <>
    {coordinates.map(({ x, y }, index) => (
      <Rectangle
        key={index}
        x={x * cellSize}
        y={y * cellSize}
        width={cellSize}
        height={cellSize}
        color={index === 0 ? 0x0b42b3 : 0x083083}
      />
    ))}
  </>
)
