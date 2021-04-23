export const ONE_CELL = 1
export const CELL_X_COUNT = 32
export const CELL_Y_COUNT = 24
export const HEADER_CELL_Y_COUNT = 2
export const SCREEN_CELL_X_COUNT = CELL_X_COUNT
export const SCREEN_CELL_Y_COUNT = CELL_Y_COUNT + HEADER_CELL_Y_COUNT

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}

export enum GameStatus {
  GAME_START = 'GAME_START',
  GAME_PLAY = 'GAME_PLAY',
  GAME_OVER = 'GAME_OVER',
}

export type Coordinate = {
  x: number
  y: number
}

export type Log = {
  type: string
  date: number
}

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const isObjectsColliding = (o1: Coordinate, o2: Coordinate) => {
  return o1.x === o2.x && o1.y === o2.y
}

export const createWorldBoundaries = (x: number, y: number) => {
  const boundaries: Coordinate[] = []

  for (let i = 0; i < x; i++) {
    boundaries.push({ x: i, y: 0 })
    boundaries.push({ x: i, y: y - 1 })
  }
  for (let i = 1; i < y - 1; i++) {
    boundaries.push({ x: 0, y: i })
    boundaries.push({ x: x - 1, y: i })
  }

  return boundaries
}

export const encodeGameValue = (data: { secret: string; score: number; logs: Log[] }) =>
  btoa(JSON.stringify(data))
