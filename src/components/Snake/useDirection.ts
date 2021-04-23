import { useTick } from '@inlet/react-pixi'
import { useState, useRef, useEffect } from 'react'
import { Direction } from './utils'

const useInputDirection = () => {
  const input = useRef<Direction | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft': {
          input.current = Direction.LEFT
          return
        }
        case 'KeyD':
        case 'ArrowRight': {
          input.current = Direction.RIGHT
          return
        }
        case 'KeyW':
        case 'ArrowUp': {
          input.current = Direction.UP
          return
        }
        case 'KeyS':
        case 'ArrowDown': {
          input.current = Direction.DOWN
          return
        }
        default:
          return
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft': {
          if (input.current === Direction.LEFT) {
            input.current = null
          }
          return
        }
        case 'KeyD':
        case 'ArrowRight': {
          if (input.current === Direction.RIGHT) {
            input.current = null
          }
          return
        }
        case 'KeyW':
        case 'ArrowUp': {
          if (input.current === Direction.UP) {
            input.current = null
          }
          return
        }
        case 'KeyS':
        case 'ArrowDown': {
          if (input.current === Direction.DOWN) {
            input.current = null
          }
          return
        }
        default:
          return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return input
}

export const useSnakeDirection = (
  prevDirection: Direction | null,
  defaultDirection: Direction,
  enabled: boolean,
) => {
  const inputDirection = useInputDirection()
  const [direction, setDirection] = useState(prevDirection || defaultDirection)

  useTick(() => {
    if (!prevDirection) {
      setDirection(defaultDirection)
    } else if (!inputDirection.current) {
      return
    } else if (prevDirection === Direction.LEFT || prevDirection === Direction.RIGHT) {
      if (inputDirection.current === Direction.UP) {
        setDirection(Direction.UP)
      } else if (inputDirection.current === Direction.DOWN) {
        setDirection(Direction.DOWN)
      }
    } else if (prevDirection === Direction.UP || prevDirection === Direction.DOWN) {
      if (inputDirection.current === Direction.LEFT) {
        setDirection(Direction.LEFT)
      } else if (inputDirection.current === Direction.RIGHT) {
        setDirection(Direction.RIGHT)
      }
    }
  }, enabled)

  return direction
}
