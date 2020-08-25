import React from 'react'
import { Table, Space } from 'antd'
import { Link } from 'react-router-dom'
import { WorkplaceBookingType } from '../../types'
import EmployeeAvatar from '../Employees/EmployeeAvatar'
import { getEmployeeLink } from '../../paths'
import dayjs from 'dayjs'

interface Props {
  bookings: (WorkplaceBookingType & { workplaceId: string })[] | undefined
}

export default function BookingList({ bookings }: Props) {
  const columns = [
    {
      title: '',
      key: 'num',
      render: (_: any, __: any, index: any) => ++index,
    },
    {
      title: 'Employee',
      key: 'employee',
      render: (_: any, record: WorkplaceBookingType & { workplaceId: string }) => {
        return (
          <Link
            to={getEmployeeLink(record.employeeEmail)}
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 'fit-content',
            }}
          >
            <EmployeeAvatar email={record.employeeEmail} size="default" showName={true} />
          </Link>
        )
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text: any) => dayjs(text).format('DD.MM.YYYY'),
    },
    {
      title: 'Finish Date',
      dataIndex: 'finishDate',
      key: 'finishDate',
      render: (text: any) => dayjs(text).format('DD.MM.YYYY'),
    },
  ]

  return <Table columns={columns} dataSource={bookings} />
}
