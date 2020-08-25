import React from 'react'
import Draggable from 'react-draggable'
import { Popconfirm } from 'antd'
import styled from 'styled-components'
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { WorkplaceType } from '../../types'

const Place = styled.div<{ isDesignMode: boolean }>`
  width: 30px;
  height: 30px;
  border: ${props => (props.isDesignMode ? ' 2px solid #007d75c7' : ' 2px solid #007d01c7')};
  border-radius: 50%;
  background-color: ${props => (props.isDesignMode ? '#43dfff82' : '#49ff4382')};
  cursor: ${props => (props.isDesignMode ? 'grab' : 'pointer')};
  &:active {
    cursor: ${props => (props.isDesignMode ? 'grabbing' : 'pointer')};
  }
`

const ModIcon = styled.div<{ hoverColor: string; fontSize: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.fontSize};
  padding-left: 4px;
  padding-right: 2px;
  cursor: pointer;
  visibility: hidden;
  &:hover {
    color: ${props => props.hoverColor};
  }
`

const PlaceWrapper = styled.div<{ isDesignMode: boolean }>`
  display: flex;
  position: absolute;
  z-index: 999;
  &:hover ${ModIcon} {
    visibility: ${props => (props.isDesignMode ? 'visible' : 'hidden')};
  }
`

interface Props {
  isDesignMode: boolean
  workplace: WorkplaceType
  scale: number
  onClone: any
  onDelete: any
  onDrag: any
  onStop: any
  onBook: any
}

export default function Workplace({
  isDesignMode,
  workplace,
  scale,
  onClone,
  onDelete,
  onDrag,
  onStop,
  onBook,
}: Props) {
  return (
    <Draggable
      disabled={!isDesignMode}
      handle=".handle"
      defaultPosition={{ x: workplace.coordX, y: workplace.coordY }}
      grid={[Math.round(10 * scale), Math.round(10 * scale)]}
      scale={scale}
      onDrag={(e, ui) => onDrag(e, ui, workplace.id)}
      onStop={() => onStop(workplace.id)}
      bounds=".workspace-area"
    >
      <PlaceWrapper isDesignMode={isDesignMode}>
        <ModIcon hoverColor="red" fontSize="15px">
          <Popconfirm
            placement="top"
            title={() => (
              <p>
                Are you sure you want to delete this workplace
                <br />
                with ALL booking records for it?
              </p>
            )}
            onConfirm={() => onDelete(workplace.id)}
            okText="Yes"
            cancelText="No"
          >
            <CloseOutlined />
          </Popconfirm>
        </ModIcon>

        <Place
          className="handle"
          isDesignMode={isDesignMode}
          onClick={() => onBook(workplace.id)}
        />

        <ModIcon
          hoverColor="#108ee9"
          fontSize="20px"
          onClick={() => {
            onClone(workplace.id)
          }}
        >
          <PlusCircleOutlined />
        </ModIcon>
      </PlaceWrapper>
    </Draggable>
  )
}
