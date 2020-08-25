import React, { useState } from 'react'
import Workplace from './Workplace'
import { WorkspaceType, WorkplaceType } from '../../types'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

const WorkspaceWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 700px;
  border: 1px solid #e5e5e5;
  background-color: #fafafa;
  overflow: hidden;
  margin: 20px 0px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`

interface Props {
  isDesignMode: boolean
  workplaces: WorkplaceType[]
  workspace: WorkspaceType
  onClone: any
  onDelete: any
  onDrag: any
  onStop: any
  onBook: any
}

export default function Workspace({
  isDesignMode,
  workplaces,
  workspace,
  onClone,
  onDelete,
  onDrag,
  onStop,
  onBook,
}: Props) {
  const [spaceScale, setSpaceScale] = useState(1)
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })

  return (
    <WorkspaceWrapper>
      <TransformWrapper
        options={{
          minScale: 0.5,
          maxScale: 4,
          limitToBounds: false,
        }}
        pan={{
          //@ts-ignore
          disableOnTarget: ['handle'],
        }}
        doubleClick={{
          disabled: true,
        }}
        wheel={{
          step: isLarge ? 10 : 300,
        }}
        onZoomChange={(e: any) => {
          setSpaceScale(e.scale)
        }}
      >
        <TransformComponent>
          {workplaces.map(e => (
            <Workplace
              key={e.id}
              isDesignMode={isDesignMode}
              scale={spaceScale}
              workplace={e}
              onClone={onClone}
              onDelete={onDelete}
              onDrag={onDrag}
              onStop={onStop}
              onBook={onBook}
            />
          ))}

          <div
            className="workspace-area"
            style={{ padding: '20px', backgroundColor: 'white', width: '100%' }}
          >
            {workspace.drawing ? (
              <img
                alt="drawing"
                src={workspace.drawing}
                style={{
                  filter: 'grayscale(0.8) opacity(0.5)',
                  userSelect: 'none',
                  position: 'relative',
                  zIndex: 0,
                }}
                draggable="false"
              />
            ) : (
              <div>no drawing</div>
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </WorkspaceWrapper>
  )
}
