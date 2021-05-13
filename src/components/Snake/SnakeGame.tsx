import React, { useCallback, useEffect } from 'react'
import { Stage, Text, Container } from '@inlet/react-pixi'
import { TextStyle } from '@pixi/text'
import { PureQueryOptions } from "@apollo/client"
import styled from 'styled-components'
import { Spin } from 'antd'
import message from '../../message'
import { useStartGameMutation, useUpdateGameScoreMutation } from '../../queries/games'
import { GameType } from '../../types/graphql'
import {
  CELL_X_COUNT,
  CELL_Y_COUNT,
  HEADER_CELL_Y_COUNT,
  SCREEN_CELL_X_COUNT,
  SCREEN_CELL_Y_COUNT,
  createWorldBoundaries,
  GameStatus,
  encodeGameValue,
  Log,
} from './utils'
import { useGame } from './useGame'
import { Snake } from './Snake'
import { Fruit } from './Fruit'
import { Walls } from './Walls'
import { Button } from './Primitives'
import { useCellSize } from './useCellSize'

const walls = createWorldBoundaries(CELL_X_COUNT, CELL_Y_COUNT)

type GameOverData = {
  score: number
  logs: Log[]
}

type Props = {
  cellSize: number
  highScore: number
  onGameStart: () => Promise<void>
  onGameOver: (data: GameOverData) => void
}

const SnakeGame = ({ cellSize, highScore, onGameStart, onGameOver }: Props) => {
  const {
    gameState: { status, snakeCoordinates, fruitCoordinates, score, logs },
    restartGame,
  } = useGame()

  const handleStartGame = async () => {
    // TODO: don't start if error
    await onGameStart()
    restartGame()
  }

  useEffect(() => {
    if (status === GameStatus.GAME_OVER) {
      onGameOver({ score, logs })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const scoreStyle = new TextStyle({
    fontFamily: 'sans-serif',
    fontSize: cellSize,
    fontWeight: 'bold',
    fill: '#eef1f5',
  })

  const gameOverStyle = new TextStyle({
    fontFamily: 'sans-serif',
    fontSize: cellSize * 4,
    fontWeight: 'bold',
    fill: '#eef1f5',
  })

  return (
    <Container>
      <Container y={0}>
        <Text
          text={`Score: ${score}`}
          x={cellSize / 2}
          y={cellSize}
          anchor={[0, 0.5]}
          style={scoreStyle}
        />
        <Text
          text={`High score: ${highScore}`}
          x={cellSize * CELL_X_COUNT - cellSize / 2}
          y={cellSize}
          anchor={[1, 0.5]}
          style={scoreStyle}
        />
      </Container>
      <Container y={cellSize * HEADER_CELL_Y_COUNT}>
        <Snake coordinates={snakeCoordinates} cellSize={cellSize} />
        <Fruit coordinates={fruitCoordinates} cellSize={cellSize} />
        <Walls coordinates={walls} cellSize={cellSize} />
        {status === GameStatus.GAME_OVER && (
          <Container>
            <Text
              x={(CELL_X_COUNT * cellSize) / 2}
              y={(CELL_Y_COUNT * cellSize) / 2}
              anchor={0.5}
              text="GAME OVER"
              style={gameOverStyle}
            />
            <Button
              x={(CELL_X_COUNT * cellSize) / 2}
              y={(CELL_Y_COUNT * cellSize * 2) / 3}
              width={cellSize * 6}
              height={cellSize * 1.5}
              text="TRY AGAIN"
              onClick={handleStartGame}
            />
          </Container>
        )}
        {status === GameStatus.GAME_START && (
          <Button
            x={(CELL_X_COUNT * cellSize) / 2}
            y={(CELL_Y_COUNT * cellSize) / 2}
            width={cellSize * 4}
            height={cellSize * 1.5}
            text="START"
            onClick={handleStartGame}
          />
        )}
      </Container>
    </Container>
  )
}

const GameWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
`

const StageWrapper = styled.div<{
  width: number
  height: number
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
`

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`

// TODO: add error boundary
export default ({
  highScore,
  refetchQueries,
}: {
  highScore: number
  refetchQueries: PureQueryOptions[]
}) => {
  const { ref, cellSize } = useCellSize()
  const [startGame, { data: startGameData, loading: startLoading }] = useStartGameMutation({
    onError: message.error,
  })
  const [finishGame] = useUpdateGameScoreMutation({
    refetchQueries,
    onError: message.error,
  })
  const secret = startGameData?.startGame.secret || ''
  const stageWidth = cellSize * SCREEN_CELL_X_COUNT
  const stageHeight = cellSize * SCREEN_CELL_Y_COUNT

  const handleGameStart = useCallback(async () => {
    await startGame({
      variables: {
        input: { game: GameType.Snake },
      },
    })
  }, [startGame])

  const handleGameOver = useCallback(
    ({ score, logs }: GameOverData) => {
      finishGame({
        variables: {
          input: {
            game: GameType.Snake,
            value: encodeGameValue({ secret, score, logs }),
          },
        },
      })
    },
    [finishGame, secret],
  )

  return (
    <GameWrapper ref={ref}>
      {cellSize ? (
        <StageWrapper width={stageWidth} height={stageHeight}>
          {startLoading && (
            <SpinnerWrapper>
              <Spin size="large" />
            </SpinnerWrapper>
          )}
          <Stage
            width={stageWidth}
            height={stageHeight}
            // options={{ backgroundAlpha: 0 }}
            style={{ width: stageWidth, height: stageHeight }}
          >
            <SnakeGame
              cellSize={cellSize}
              highScore={highScore}
              onGameStart={handleGameStart}
              onGameOver={handleGameOver}
            />
          </Stage>
        </StageWrapper>
      ) : null}
    </GameWrapper>
  )
}
