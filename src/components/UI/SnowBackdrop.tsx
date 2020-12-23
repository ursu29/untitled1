import React, { useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { debounce } from 'throttle-debounce'
import { CONTENT_WIDTH } from '../../config'

const VIEW_OFFSET = 20

const Backdrop = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #c7e6ff;
  background-image: url('/christmas-bg.jpg');
  background-size: cover;
  opacity: 0.9;
`

class Snowflake {
  x = 0
  y = 0
  vy = 0
  vx = 0
  r = 0
  o = 0

  reset(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * -canvas.height
    this.vy = 1 + Math.random() * 3
    this.vx = 0.5 - Math.random()
    this.r = 1 + Math.random() * 2
    this.o = 0.5 + Math.random() * 0.5
  }

  move() {
    this.y += this.vy
    this.x += this.vx
  }

  draw(context: CanvasRenderingContext2D) {
    context.globalAlpha = this.o
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
    context.closePath()
    context.fill()
  }

  isOutOfView(canvas: HTMLCanvasElement) {
    return this.y > canvas.height || this.x < -VIEW_OFFSET || this.x > canvas.width + VIEW_OFFSET
  }
}

const createSnow = (count: number) => {
  const snowflakes = []
  for (let i = 0; i < count; i++) {
    const snowflake = new Snowflake()
    snowflakes.push(snowflake)
  }
  return snowflakes
}

const Snow = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  const snowflakes = useMemo(() => createSnow(50), [])

  useEffect(() => {
    const canvas = ref.current

    if (canvas) {
      const updateCanvasSize = () => {
        // set only visible width
        canvas.width = Math.floor((window.innerWidth - CONTENT_WIDTH) / 2)
        canvas.height = window.innerHeight
      }

      updateCanvasSize()
      const handleResize = debounce(100, updateCanvasSize)
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        handleResize.cancel()
      }
    }
  }, [])

  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')

    if (canvas && context) {
      snowflakes.forEach(snowflake => snowflake.reset(canvas))

      const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = '#fff'
        snowflakes.forEach(snowflake => {
          if (snowflake.isOutOfView(canvas)) {
            snowflake.reset(canvas)
          } else {
            snowflake.move()
          }
          snowflake.draw(context)
        })
      }

      const fps = 1000 / 30
      let time = Date.now()
      let requestId: number
      const loop = () => {
        const now = Date.now()
        const check = now - time

        if (check / fps >= 1) {
          time = now
          draw()
        }
        requestId = requestAnimationFrame(loop)
      }
      loop()

      return () => cancelAnimationFrame(requestId)
    }
  }, [snowflakes])

  return <canvas ref={ref} />
}

export default function SnowBackdrop() {
  return (
    <Backdrop>
      <Snow />
      <Snow />
    </Backdrop>
  )
}
