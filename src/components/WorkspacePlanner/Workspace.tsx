import React, { useState } from 'react'
import { Button } from 'antd'
import Workplace from './Workplace'
import { WorkspaceType, WorkplaceType, WorkplaceBookingType } from '../../types'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { debounce } from 'throttle-debounce'
import BookingList from './BookingList'
import { LeftOutlined } from '@ant-design/icons'

const WorkspaceWrapper = styled.div<{ isDesignMode: boolean }>`
  position: relative;
  width: 100%;
  max-height: 1000px;
  border: ${props => (props.isDesignMode ? '1px solid  rgb(17 141 255)' : '1px solid #e5e5e5')};
  background-color: #fafafa;
  overflow: hidden;
  margin: 20px 0px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`

const TableWrapper = styled.div`
  display: flex;
  max-height: 101%;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`

const ExpandIconWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: -29px;
  height: fit-content;
  font-size: 17px;
  color: white;
  padding: 5px 5px 5px 7px;
  margin: 10px 0;
  background-color: #1890ff;
  border-radius: 20px 0 0 20px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`

const BookingListWrapper = styled.div<{ isOpen: boolean }>`
  width: ${props => (props.isOpen ? '380px' : 0)};
  transition: 0.5s all;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 700px;
  border: solid #1890ff;
  border-width: ${props => (props.isOpen ? '0 0 1px 1px' : '0')};
  transition: all 0.4s ease 0s;
  cursor: pointer;
`

interface Props {
  isDesignMode: boolean
  isDateChosen: boolean
  isLoading: boolean
  isPastDateChosen: boolean
  isInfoForBooked: boolean
  isBookingListOpen: boolean
  dateRange: { startDate: string; finishDate: string }
  workplaces: WorkplaceType[]
  workspace: WorkspaceType
  bookings: (WorkplaceBookingType & { workplaceId: string })[] | undefined
  bookedByMe: string[] | undefined
  selectedWorkplace: string
  onSelect: any
  onClone: any
  onDelete: any
  onDrag: any
  onStop: any
  onBook: any
  onBookCancel: any
  setIsInfoForBooked: any
  setIsBookingListOpen: any
}

export default function Workspace({
  isDesignMode,
  isDateChosen,
  isLoading,
  isPastDateChosen,
  isInfoForBooked,
  isBookingListOpen,
  dateRange,
  workplaces,
  workspace,
  selectedWorkplace,
  bookings,
  bookedByMe,
  onSelect,
  onClone,
  onDelete,
  onDrag,
  onStop,
  onBook,
  onBookCancel,
  setIsInfoForBooked,
  setIsBookingListOpen,
}: Props) {
  const [spaceScale, setSpaceScale] = useState(1)
  const [coords, setCoords] = useState({ coordX: 0, coordY: 0 })
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })

  const debounceSetCoords = debounce(
    500,
    ({ coordX, coordY }: { coordX: number; coordY: number }) => {
      setCoords({ coordX, coordY })
    },
  )

  return (
    <WorkspaceWrapper isDesignMode={isDesignMode}>
      {isDesignMode && (
        <div style={{ position: 'absolute', zIndex: 999, margin: '10px' }}>
          <Button
            type="default"
            onClick={() => onClone(null, coords)}
            style={{
              backgroundColor: 'rgb(81 171 255 / 94%)',
              color: 'white',
              borderColor: 'rgb(17 141 255)',
            }}
          >
            Add Workplace
          </Button>
        </div>
      )}

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
          debounceSetCoords({ coordX: e.positionX / e.scale, coordY: e.positionY / e.scale })
        }}
        onPanning={(e: any) => {
          debounceSetCoords({ coordX: e.positionX / e.scale, coordY: e.positionY / e.scale })
        }}
      >
        <TransformComponent>
          {workplaces.map(workplace => (
            <Workplace
              key={workplace.id}
              isDesignMode={isDesignMode}
              isDateChosen={isDateChosen}
              isSelected={selectedWorkplace === workplace.id}
              isBookedByMe={
                bookings
                  ?.filter(booking => bookedByMe?.includes(booking.id))
                  .map(booking => booking.workplaceId)
                  .includes(workplace.id) || false
              }
              isOverlapBookings={!!bookedByMe?.length}
              isLoading={isLoading}
              isPastDateChosen={isPastDateChosen}
              isInfoForBooked={isInfoForBooked}
              setIsInfoForBooked={setIsInfoForBooked}
              scale={spaceScale}
              dateRange={dateRange}
              workplace={workplace}
              bookings={bookings?.filter(booking => booking.workplaceId === workplace.id)}
              onSelect={onSelect}
              onClone={onClone}
              onDelete={onDelete}
              onDrag={onDrag}
              onStop={onStop}
              onBook={onBook}
              onBookCancel={onBookCancel}
            />
          ))}

          <div
            className="workspace-area"
            style={{
              padding: '20px',
              backgroundColor: 'white',
              width: '100%',
              border: isDesignMode ? '1px solid orange' : '',
            }}
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

      {!isDesignMode && !!bookings?.length && (
        <TableWrapper>
          <ExpandIconWrapper
            isOpen={isBookingListOpen}
            onClick={() => setIsBookingListOpen(!isBookingListOpen)}
          >
            <div
              style={{
                transform: `rotateY(${isBookingListOpen ? '180deg' : 0})`,
                transition: '1s all',
              }}
            >
              <LeftOutlined />
            </div>
          </ExpandIconWrapper>
          <BookingListWrapper isOpen={isBookingListOpen}>
            <BookingList
              bookings={bookings}
              onBookCancel={onBookCancel}
              onSelect={(id: string) => onSelect(id)}
              setIsInfoForBooked={setIsInfoForBooked}
            />
          </BookingListWrapper>
        </TableWrapper>
      )}
    </WorkspaceWrapper>
  )
}
