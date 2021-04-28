import { useRef, useState, useCallback } from 'react'
import { useTick } from '@inlet/react-pixi'
import {
  ONE_CELL,
  CELL_X_COUNT,
  CELL_Y_COUNT,
  getRandomInt,
  isObjectsColliding,
  Direction,
  Coordinate,
  GameStatus,
  Log,
} from './utils'
import { useSnakeDirection } from './useDirection'

export type GameState = {
  status: GameStatus
  snakeCoordinates: Coordinate[]
  fruitCoordinates: Coordinate[]
  direction: Direction | null
  logs: Log[]
  speed: number
  score: number
}

const shiftSnakeBody = (newHead: Coordinate, body: Coordinate[]) => {
  const bodyWithoutTail = body.slice(0, -1)
  return [newHead].concat(bodyWithoutTail)
}

const getNextSnakeCoordinates = (snakeCoordinates: Coordinate[], nextDirection: Direction) => {
  const { x, y } = snakeCoordinates[0]

  switch (nextDirection) {
    case Direction.LEFT:
      return shiftSnakeBody({ x: x - 1, y }, snakeCoordinates)
    case Direction.RIGHT:
      return shiftSnakeBody({ x: x + 1, y }, snakeCoordinates)
    case Direction.UP:
      return shiftSnakeBody({ x, y: y - 1 }, snakeCoordinates)
    case Direction.DOWN:
      return shiftSnakeBody({ x, y: y + 1 }, snakeCoordinates)
    default:
      return snakeCoordinates
  }
}

const createFruit = (): Coordinate => ({
  x: getRandomInt(ONE_CELL, CELL_X_COUNT - ONE_CELL - 1),
  y: getRandomInt(ONE_CELL, CELL_Y_COUNT - ONE_CELL - 1),
})

const createFood = (existingObjects: Coordinate[], count: number) => {
  const newFood: Coordinate[] = []
  let countLeft = count

  while (countLeft > 0) {
    const allObjects = existingObjects.concat(newFood)
    let fruit = createFruit()

    // prevent creation at occupied coordinates
    if (!allObjects.some(obj => isObjectsColliding(obj, fruit))) {
      newFood.push(fruit)
      countLeft -= 1
    }
  }

  return newFood
}

const checkFruitCollision = (fruitCoordinates: Coordinate[], snakeCoordinates: Coordinate[]) => {
  const head = snakeCoordinates[0]
  return fruitCoordinates.find(fruit => isObjectsColliding(fruit, head))
}

const checkSnakeCollision = (snakeCoordinates: Coordinate[]) => {
  const head = snakeCoordinates[0]
  for (let i = 1; i < snakeCoordinates.length; i++) {
    if (isObjectsColliding(head, snakeCoordinates[i])) {
      return true
    }
  }
  return false
}

const checkWorldCollision = (snakeCoordinates: Coordinate[]) => {
  const head = snakeCoordinates[0]
  return (
    head.x < ONE_CELL ||
    head.x > CELL_X_COUNT - ONE_CELL - 1 ||
    head.y < ONE_CELL ||
    head.y > CELL_Y_COUNT - ONE_CELL - 1
  )
}

const createLog = (type: string) => ({ type, date: Date.now() })

const createInitialGameState = (status: GameStatus, foodCount: number): GameState => {
  const snakeCoordinates = [
    { x: 6, y: CELL_Y_COUNT / 2 },
    { x: 5, y: CELL_Y_COUNT / 2 },
    { x: 4, y: CELL_Y_COUNT / 2 },
  ]
  const fruitCoordinates = createFood(snakeCoordinates, foodCount)

  return {
    status,
    direction: null,
    snakeCoordinates,
    fruitCoordinates,
    score: 0,
    speed: 1,
    logs: [createLog('start')],
  }
}

export const useGame = () => {
  const [gameState, updateGameState] = useState<GameState>(() =>
    createInitialGameState(GameStatus.GAME_START, 0),
  )
  const lastUpdate = useRef(0)
  const nextDirection = useSnakeDirection(
    gameState.direction,
    Direction.RIGHT,
    gameState.status === GameStatus.GAME_PLAY,
  )
  const restartGame = useCallback(
    () => updateGameState(() => createInitialGameState(GameStatus.GAME_PLAY, 2)),
    [],
  )

  useTick((delta = 0) => {
    if (lastUpdate.current < Math.max(4, 16 - gameState.speed)) {
      lastUpdate.current += delta
      return
    }
    lastUpdate.current = 0

    updateGameState(prev => {
      const nextCoordinates = getNextSnakeCoordinates(prev.snakeCoordinates, nextDirection)

      // TODO: if ( checkObstaclesCollision(snake, obstacles) ) {}
      if (checkSnakeCollision(nextCoordinates) || checkWorldCollision(nextCoordinates)) {
        return {
          ...prev,
          direction: null,
          status: GameStatus.GAME_OVER,
          logs: [...prev.logs, createLog('finish')],
        }
      }

      const eatenFruit = checkFruitCollision(prev.fruitCoordinates, nextCoordinates)
      if (eatenFruit) {
        const nextSnakeCoordinates = [eatenFruit].concat(prev.snakeCoordinates)
        const newFood = createFood(prev.snakeCoordinates.concat(prev.fruitCoordinates), 1)
        const nextFruitCoordinates = prev.fruitCoordinates
          .filter(fruit => fruit !== eatenFruit)
          .concat(newFood)
        const nextScore = prev.score + 1
        const nextSpeed = nextScore % 10 === 0 ? prev.speed + 1 : prev.speed
        return {
          ...prev,
          direction: nextDirection,
          snakeCoordinates: nextSnakeCoordinates,
          fruitCoordinates: nextFruitCoordinates,
          score: nextScore,
          speed: nextSpeed,
          logs: [...prev.logs, createLog('eat')],
        }
      }

      return {
        ...prev,
        direction: nextDirection,
        snakeCoordinates: nextCoordinates,
      }
    })
  }, gameState.status === GameStatus.GAME_PLAY)

  return { gameState, restartGame }
}
