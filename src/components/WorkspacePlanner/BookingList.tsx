import { Table, Button, Popconfirm } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
/* import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths' */
import { WorkplaceBookingType } from '../../types'
import { useEmployee } from '../../utils/withEmployee'
import BookingEmployee from './BookingEmployee'

interface Props {
  bookings: (WorkplaceBookingType & { workplaceId: string })[] | undefined
  onBookCancel: any
  onSelect: any
  setIsInfoForBooked: any
}

export default function BookingList({
  bookings,
  onBookCancel,
  onSelect,
  setIsInfoForBooked,
}: Props) {
  const employee = useEmployee()

  const columns = [
    {
      title: '',
      key: 'num',
      width: '1%',
      render: (_: any, __: any, index: any) => ++index,
    },
    {
      title: 'Employee',
      key: 'employee',
      width: '50px',
      render: (_: any, record: WorkplaceBookingType & { workplaceId: string }) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <BookingEmployee employeeId={record.employeeId} />
            {record.employeeId === employee.employee.id &&
              dayjs().isSameOrBefore(dayjs(record.finishDate), 'day') && (
                <div
                  style={{ width: '120px', paddingLeft: '40px' }}
                  onClick={e => e.stopPropagation()}
                >
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
                      onBookCancel({ variables: { input: { id: record.id } } })
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
        )
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '110px',
      align: 'center',
      render: (text: any, record: WorkplaceBookingType & { workplaceId: string }) =>
        record.startDate === record.finishDate
          ? dayjs(record.startDate).format('DD.MM.YYYY')
          : dayjs(record.startDate).format('DD.MM.YYYY') +
            '-' +
            dayjs(record.finishDate).format('DD.MM.YYYY'),
    },
  ]

  return (
    <Table
      //@ts-ignore
      columns={columns}
      dataSource={bookings}
      pagination={false}
      rowKey="id"
      onRow={record => {
        return {
          onClick: () => {
            setIsInfoForBooked(true)
            onSelect(record.workplaceId)
          },
        }
      }}
    />
  )
}
