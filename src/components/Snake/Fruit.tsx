import React from 'react'
import { Coordinate } from './utils'
import { Rectangle } from './Primitives'

type Props = {
  coordinates: Coordinate[]
  cellSize: number
}

export const Fruit = ({ coordinates, cellSize }: Props) => (
  <>
    {coordinates.map(({ x, y }, index) => (
      <Rectangle
        key={index}
        x={x * cellSize}
        y={y * cellSize}
        width={cellSize}
        height={cellSize}
        color={0xaa0000}
      />
    ))}
  </>
)
