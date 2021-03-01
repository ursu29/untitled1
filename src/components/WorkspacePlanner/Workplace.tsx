import React from 'react'
import Draggable from 'react-draggable'
import { Popconfirm, Button, Space, message } from 'antd'
import styled from 'styled-components'
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { WorkplaceType, WorkplaceBookingType } from '../../types'
import { useEmployee } from '../../utils/withEmployee'
import dayjs from 'dayjs'
import './styles.css'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import BookingEmployee from './BookingEmployee'
dayjs.extend(isSameOrBefore)

const Info = styled.div<{ visible: boolean; scale: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: max-content;
  max-height: 250px;
  overflow-y: auto;
  display: ${props => (props.visible ? 'block' : 'none')};
  padding: 10px;
  top: ${props => -20 * props.scale + 'px'};
  left: ${props => 60 / props.scale + 'px'};
  background-color: #fff7e3;
  border-radius: 6px;
  z-index: 999;
  transform: ${props => 'scale(' + 1 / props.scale + ')'};
  cursor: default;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.1s all;
`

const YouArrow = styled.div`
  position: absolute;
  height: 35px;
  left: 22px;
  top: -34px;
  color: #ff39ff;
  font-weight: 700;
`

const ModIcon = styled.div<{ hoverColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 0 2px;
  cursor: pointer;
  visibility: hidden;
  &:hover {
    color: ${props => props.hoverColor};
  }
`

const PlaceWrapper = styled.div<{ isDesignMode: boolean; isSelected: boolean }>`
  display: flex;
  position: absolute;
  z-index: ${props => (props.isSelected ? 999 : 99)};
  &:hover ${ModIcon} {
    visibility: ${props => (props.isDesignMode ? 'visible' : 'hidden')};
  }
`

const InfoDateField = (label: string, date: string) => (
  <div style={{ display: 'flex', marginTop: '-6px' }}>
    <div style={{ width: '40px', textAlign: 'end' }}>{label}:</div>
    <div
      style={{
        marginLeft: '3px',
        padding: '0 5px',
        fontWeight: 500,
      }}
    >
      {dayjs(date).format('DD.MM.YYYY')}
    </div>
  </div>
)

interface Props {
  isDesignMode: boolean
  isDateChosen: boolean
  isSelected: boolean
  isBookedByMe: boolean
  isOverlapBookings: boolean
  isLoading: boolean
  isPastDateChosen: boolean
  isInfoForBooked: boolean
  dateRange: { startDate: string; finishDate: string }
  workplace: WorkplaceType
  bookings: (WorkplaceBookingType & { workplaceId: string })[] | undefined
  scale: number
  onSelect: any
  onClone: any
  onDelete: any
  onDrag: any
  onStop: any
  onBook: any
  onBookCancel: any
  onDesignModeClick: any
  setIsInfoForBooked: any
}

export default function Workplace({
  isDesignMode,
  isDateChosen,
  isSelected,
  isBookedByMe,
  isOverlapBookings,
  isLoading,
  isPastDateChosen,
  isInfoForBooked,
  dateRange,
  workplace,
  bookings,
  scale,
  onSelect,
  onClone,
  onDelete,
  onDrag,
  onStop,
  onBook,
  onBookCancel,
  onDesignModeClick,
  setIsInfoForBooked,
}: Props) {
  const isBooked = !!bookings?.length
  const employee = useEmployee()

  const handleClick = () => {
    if (isDesignMode || isLoading) return

    message.destroy()
    setIsInfoForBooked(false)

    // Click on booked place
    if (isBooked) {
      setIsInfoForBooked(true)
      onSelect(workplace.id)
      return
    }

    onSelect('')

    // Check for book a past date
    if (isDateChosen && isPastDateChosen) {
      message.warning('You cannot book a past date!')
      return
    }

    // Check for no selected date or already booked date - then select date
    !isDateChosen
      ? message.warning('Please select a date!')
      : isOverlapBookings
      ? message.warning('You already have booking for this date!')
      : onSelect(workplace.id)
  }

  const handleDesignModeClick = () => {
    if (!isDesignMode || isLoading || isSelected) return
    onDesignModeClick(workplace.id)
  }

  const DeleteIcon = () => (
    <ModIcon hoverColor="red">
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
        <CloseCircleOutlined />
      </Popconfirm>
    </ModIcon>
  )

  const AddIcon = () => (
    <ModIcon
      hoverColor="#108ee9"
      onClick={() => {
        onClone(workplace.id)
      }}
    >
      <PlusOutlined />
    </ModIcon>
  )

  const InfoFreePlace = () => (
    <Info visible={isSelected} scale={scale}>
      <div style={{ marginBottom: '10px' }}>
        Do you want to book this place
        <br />
        {dateRange.startDate === dateRange.finishDate
          ? `for ${dateRange.startDate}?`
          : `from ${dateRange.startDate} to ${dateRange.finishDate}?`}
      </div>
      <Button
        type="primary"
        onClick={() => {
          onSelect('')
          onBook(workplace.id)
        }}
        style={{ width: '100%' }}
      >
        Book
      </Button>
    </Info>
  )

  const InfoBookedPlace = () => (
    <Info className="info-panel" visible={isSelected} scale={scale}>
      <Space direction="vertical">
        {bookings?.map((booking, i) => (
          <div
            key={booking.id}
            style={{
              paddingTop: i !== 0 ? '8px' : '',
              borderTop: i !== 0 ? '1px solid #ffbd7069' : '',
            }}
          >
            <BookingEmployee employeeId={booking.employeeId} />
            <div style={{ marginLeft: '40px', whiteSpace: 'pre-line' }}>
              {booking.startDate === booking.finishDate ? (
                InfoDateField('for', booking.startDate)
              ) : (
                <div>
                  {InfoDateField('from', booking.startDate)}
                  {InfoDateField('to', booking.finishDate)}
                </div>
              )}
            </div>
            {booking.employeeId === employee.employee.id &&
              dayjs().isSameOrBefore(dayjs(booking.finishDate), 'day') && (
                <div style={{ width: '100%', paddingLeft: '40px', paddingRight: '10px' }}>
                  <Popconfirm
                    placement="bottomLeft"
                    title={() => (
                      <p>
                        Are you sure you want to cancel
                        <br />
                        your reservation?
                      </p>
                    )}
                    onConfirm={() => {
                      onSelect('')
                      onBookCancel({ variables: { input: { id: booking.id } } })
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      danger
                      style={{
                        backgroundColor: 'transparent',
                        marginTop: '5px',
                        width: '100%',
                      }}
                    >
                      Cancel
                    </Button>
                  </Popconfirm>
                </div>
              )}
          </div>
        ))}
      </Space>
    </Info>
  )

  const YouMark = () => (
    <YouArrow>
      YOU
      <div style={{ transform: 'rotate(90deg) scaleX(0.8)', lineHeight: '15px' }}>
        <p>&#x27A4;</p>
      </div>
    </YouArrow>
  )

  const PlaceExactly = () => (
    <div
      className={`handle default-place ${
        isDesignMode && !isSelected
          ? 'design-place'
          : isDesignMode && isSelected
          ? 'design-selected-place'
          : !isDateChosen
          ? ''
          : isBooked && !isSelected
          ? 'booked-place'
          : isBooked && isSelected
          ? 'booked-selected-place'
          : !isBooked && isSelected
          ? 'free-selected-place'
          : !isPastDateChosen && !isOverlapBookings
          ? 'free-place'
          : ''
      }`}
      onClick={handleClick}
    >
      <div className="handle place-number">{workplace.number}</div>
    </div>
  )

  return (
    <Draggable
      disabled={!isDesignMode || isLoading}
      handle=".handle"
      defaultPosition={{ x: workplace.coordX, y: workplace.coordY }}
      grid={[Math.round(10 * scale), Math.round(10 * scale)]}
      scale={scale}
      onDrag={(e, ui) => onDrag(e, ui, workplace.id)}
      onStop={() => onStop(workplace.id)}
      onMouseDown={handleDesignModeClick}
      bounds=".workspace-area"
    >
      <PlaceWrapper isDesignMode={isDesignMode} isSelected={isSelected}>
        <DeleteIcon />
        {isBookedByMe && !isDesignMode && !isLoading && <YouMark />}
        <PlaceExactly />
        <AddIcon />
        {!isDesignMode && (isInfoForBooked ? <InfoBookedPlace /> : <InfoFreePlace />)}
      </PlaceWrapper>
    </Draggable>
  )
}
