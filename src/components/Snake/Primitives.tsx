import { Graphics, Container, Text } from '@inlet/react-pixi'
import { InteractionEvent } from '@pixi/interaction'
import { TextStyle } from '@pixi/text'
import React, { useState } from 'react'

type RectangleProps = {
  color: number
  x: number
  y: number
  width: number
  height: number
}

export const Rectangle = ({ color, x, y, width, height }: RectangleProps) => (
  <Graphics
    draw={g => {
      g.clear()
      g.beginFill(color)
      g.drawRect(x, y, width, height)
      g.endFill()
    }}
  />
)

type ButtonProps = {
  x: number
  y: number
  width: number
  height: number
  borderSize?: number
  text: string
  disabled?: boolean
  onClick?: (event: InteractionEvent) => void
}

const getColor = ({
  disabled,
  hovered,
  pressed,
}: {
  disabled?: boolean
  hovered?: boolean
  pressed?: boolean
}): [number, number, number] => {
  if (disabled) return [0xaaaaaa, 0xcccccc, 0xffffff]
  if (pressed) return [0x083083, 0x0b42b3, 0xffffff]
  if (hovered) return [0x1c53c4, 0x194194, 0xffffff]
  return [0x0b42b3, 0x083083, 0xffffff]
}

export const Button = ({
  x,
  y,
  width,
  height,
  borderSize = 2,
  text,
  disabled,
  onClick,
}: ButtonProps) => {
  const [hovered, setHover] = useState(false)
  const [pressed, setPress] = useState(false)

  const [buttonColor, borderColor, textColor] = getColor({
    disabled,
    hovered,
    pressed,
  })

  const buttonStyle = new TextStyle({
    fontFamily: 'sans-serif',
    fontSize: height / 2,
    fontWeight: 'bold',
    fill: textColor,
  })

  return (
    <Container x={x - width / 2} y={y - height / 2}>
      <Graphics
        draw={g => {
          g.clear()

          // draw border
          g.beginFill(borderColor)
          g.drawRect(0, 0, width, height)
          g.endFill()

          // draw content
          g.beginFill(buttonColor)
          g.drawRect(borderSize, borderSize, width - borderSize * 2, height - borderSize * 2)
          g.endFill()

          if (!disabled) {
            // make clickable
            g.interactive = true
            // add cursor pointer
            g.buttonMode = true
          }
        }}
        click={!disabled ? onClick : undefined}
        pointerup={() => setPress(false)}
        pointerdown={() => setPress(true)}
        pointerout={() => {
          setHover(false)
          setPress(false)
        }}
        pointerover={() => setHover(true)}
      />
      <Text x={width / 2} y={height / 2} anchor={0.5} text={text} style={buttonStyle} />
    </Container>
  )
}
