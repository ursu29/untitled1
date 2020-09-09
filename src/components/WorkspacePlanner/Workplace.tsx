import React from 'react'
import Draggable from 'react-draggable'
import { Popconfirm, Button, Space, message } from 'antd'
import styled from 'styled-components'
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { WorkplaceType, WorkplaceBookingType } from '../../types'
import EmployeeAvatar from '../Employees/EmployeeAvatar'
import { useEmployee } from '../../utils/withEmployee'
import dayjs from 'dayjs'
import './styles.css'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
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
  setIsInfoForBooked,
}: Props) {
  const isBooked = !!bookings?.length
  const employee = useEmployee()

  return (
    <Draggable
      disabled={!isDesignMode || isLoading}
      handle=".handle"
      defaultPosition={{ x: workplace.coordX, y: workplace.coordY }}
      grid={[Math.round(10 * scale), Math.round(10 * scale)]}
      scale={scale}
      onDrag={(e, ui) => onDrag(e, ui, workplace.id)}
      onStop={() => onStop(workplace.id)}
      bounds=".workspace-area"
    >
      <PlaceWrapper isDesignMode={isDesignMode} isSelected={isSelected}>
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

        {isBookedByMe && !isDesignMode && !isLoading && (
          <YouArrow>
            YOU
            <div style={{ transform: 'rotate(90deg) scaleX(0.8)', lineHeight: '15px' }}>
              <p>&#x27A4;</p>
            </div>
          </YouArrow>
        )}
        <div
          className={`handle default-place ${
            isDesignMode
              ? 'design-place'
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
          onClick={() => {
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
          }}
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

        {!isInfoForBooked && (
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
        )}

        {isInfoForBooked && (
          <Info className="info-panel" visible={isSelected} scale={scale}>
            <Space direction="vertical">
              {bookings?.map((booking, i) => (
                <div
                  style={{
                    paddingTop: i !== 0 ? '8px' : '',
                    borderTop: i !== 0 ? '1px solid #ffbd7069' : '',
                  }}
                >
                  <EmployeeAvatar email={booking.employeeEmail} size="default" showName={true} />
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
                  {booking.employeeEmail.toLowerCase() === employee.employee.email.toLowerCase() &&
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
        )}
      </PlaceWrapper>
    </Draggable>
  )
}
