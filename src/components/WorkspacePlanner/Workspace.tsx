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
import DesignModeSider from './Sider/DesignModeSider'
import Sider from './Sider/Sider'

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
  updateWorkplace: any
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
  updateWorkplace,
}: Props) {
  const [chosenWorkplace, setChosenWorkplace] = useState({})
  const [spaceScale, setSpaceScale] = useState(1)
  const [coords, setCoords] = useState({ coordX: 0, coordY: 0 })
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })

  const debounceSetCoords = debounce(
    500,
    ({ coordX, coordY }: { coordX: number; coordY: number }) => {
      setCoords({ coordX, coordY })
    },
  )

  const onDesignModeClick = (workplaceId: string) => {
    onSelect(workplaceId)
    setChosenWorkplace(workplaces.find(e => e.id === workplaceId) || {})
  }

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
              onDesignModeClick={onDesignModeClick}
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
        <Sider isOpen={isBookingListOpen} onOpen={() => setIsBookingListOpen(!isBookingListOpen)}>
          <BookingList
            bookings={bookings}
            onBookCancel={onBookCancel}
            onSelect={(id: string) => onSelect(id)}
            setIsInfoForBooked={setIsInfoForBooked}
          />
        </Sider>
      )}

      {isDesignMode && (
        <DesignModeSider
          workplace={chosenWorkplace}
          onSave={updateWorkplace}
          isOpen={isBookingListOpen}
          onOpen={() => setIsBookingListOpen(!isBookingListOpen)}
        />
      )}
    </WorkspaceWrapper>
  )
}
