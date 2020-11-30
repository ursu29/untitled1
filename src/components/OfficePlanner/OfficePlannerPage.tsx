import { useMutation, useQuery } from '@apollo/react-hooks'
import { TeamOutlined } from '@ant-design/icons'
import { Button, Input, Switch, Table, Tabs, Typography } from 'antd'
import dayjs from 'dayjs'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import { Access, Employee, Location, OfficeDay } from '../../types'
import PageContent from '../UI/PageContent'
import './OfficePlannerPage.css'

const weekday = require('dayjs/plugin/weekday')
dayjs.extend(weekday)

const DAYS_IN_A_ROW = 7

const query = gql`
  query getEmployees($input: EmployeesInput) {
    employees(input: $input) {
      id
      name
      email
      location
      isMe
      worksFromOffice
    }
    officeAccess {
      read
      write
    }
    profile {
      id
      location
    }
  }
`

const getOfficeDays = gql`
  query getOfficeDays($input: OfficeDaysInput) {
    officeDays(input: $input) {
      id
      date
      employeeLimit
      employeeCount
      location {
        id
        code
      }
    }
  }
`

const applyMutation = gql`
  mutation apply($input: ApplyToWorkFromOfficeInput!) {
    applyToWorkFromOffice(input: $input)
  }
`

const updateOfficeDayMutation = gql`
  mutation update($input: UpdateOfficeDayInput!) {
    updateOfficeDay(input: $input) {
      id
    }
  }
`

type EmployeePick = Pick<
  Employee,
  'id' | 'name' | 'email' | 'location' | 'isMe' | 'worksFromOffice'
>
type OfficeDayPick = Pick<OfficeDay, 'id' | 'date' | 'employeeLimit' | 'employeeCount'> & {
  location: Pick<Location, 'id' | 'code'>
}

const LOCATIONS = [
  { key: 'SAINT_PETERSBURG', title: 'Saint Petersburg' },
  { key: 'TOMSK', title: 'Tomsk' },
  { key: 'KALININGRAD', title: 'Kaliningrad' },
  { key: 'ZURICH', title: 'Zürich' },
]

const LimitInput = ({
  editable,
  value = '15',
  onChange,
}: {
  editable?: boolean
  value: string | number
  onChange: (value: number) => void
}) => {
  const [limit, setLimit] = useState(String(value))
  if (!editable) return null

  const handleChange = () => {
    onChange(Number(limit))
  }

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <Input
        type="number"
        style={{ width: 70, marginRight: 4 }}
        value={limit}
        onPressEnter={handleChange}
        onBlur={handleChange}
        onChange={e => {
          setLimit(e.target.value)
        }}
        placeholder="Limit"
        min="0"
        max="100"
      />
      %
    </div>
  )
}

function OfficePlannerPage() {
  //@ts-ignore
  const thisMonday = dayjs().weekday(1)
  const [firstDate, setFirstDate] = useState(thisMonday)
  const [currentLocation, setCurrentLocation] = useState('SAINT_PETERSBURG')

  const employeesQuery = useQuery<{
    employees: EmployeePick[]
    officeAccess: Access
    profile: Pick<Employee, 'id' | 'location'>
  }>(query, {
    variables: { input: { locations: [currentLocation] } },
    fetchPolicy: 'network-only',
  })

  const daysQuery = useQuery<{ officeDays: OfficeDayPick[] }>(getOfficeDays, {
    variables: {
      input: {
        startDate: dayjs(firstDate).format('YYYY-MM-DD'),
        count: DAYS_IN_A_ROW,
      },
    },
    fetchPolicy: 'network-only',
  })

  const refetchQueries = [
    { query: query, variables: { input: { locations: [currentLocation] } } },
    {
      query: getOfficeDays,
      variables: {
        input: {
          startDate: dayjs(firstDate).format('YYYY-MM-DD'),
          count: DAYS_IN_A_ROW,
        },
      },
      fetchPolicy: 'network-only',
    },
  ]

  const [apply, applyArgs] = useMutation(applyMutation, {
    awaitRefetchQueries: true,
    refetchQueries,
    onError: message.error,
  })

  const [updateDay, updateDayArgs] = useMutation(updateOfficeDayMutation, {
    awaitRefetchQueries: true,
    refetchQueries,
    onError: message.error,
  })

  const editable = employeesQuery.data?.officeAccess.write
  const myLocation = employeesQuery.data?.profile.location

  const dates = Array.from({ length: DAYS_IN_A_ROW }).map((i, index) => {
    let nextDay = new Date(firstDate)
    nextDay.setDate(nextDay.getDate() + index)
    return nextDay
  })
  const datesFormatted = dates.map(i => dayjs(i).format('YYYY-MM-DD'))

  const allEmployees = employeesQuery.data?.employees || []
  const me = allEmployees.find(i => i.isMe)

  //sort me first
  const employees = (me ? [me] : []).concat(
    allEmployees
      .filter(i => !i.isMe)
      .filter(i => i.worksFromOffice.some(day => datesFormatted.includes(day))),
  )

  useEffect(() => {
    if (myLocation) {
      if (myLocation === 'Tomsk') {
        setCurrentLocation('TOMSK')
      }
      if (myLocation === 'Zurich') {
        setCurrentLocation('ZURICH')
      }
      if (myLocation === 'Kaliningrad') {
        setCurrentLocation('KALININGRAD')
      }
    }
  }, [myLocation])

  if (employeesQuery.error) {
    return <PageContent>Something happened. Please contact portal manager</PageContent>
  }

  const columns: any = [
    {
      title: () => <div>Name</div>,
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string, employee: EmployeePick) => {
        if (employee.isMe) return 'You'
        return name
      },
    },
    ...dates.map(date => {
      const isToday = dayjs(date).isSame(dayjs().format('YYYY-MM-DD'), 'day')
      return {
        title: () => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD')
          const officeDay = daysQuery.data?.officeDays.find(
            i => i.date === formattedDate && i.location.code.toUpperCase() === currentLocation,
          )
          const employeeLimit = officeDay?.employeeLimit || 15
          const employeeMaxCount = Math.ceil((allEmployees.length * employeeLimit) / 100)

          const handleChange = (value: number) => {
            if (value !== employeeLimit) {
              updateDay({
                variables: {
                  input: {
                    date: formattedDate,
                    employeeLimit: value,
                    location: currentLocation,
                  },
                },
              })
            }
          }

          return (
            <div key={date.toISOString()}>
              <div>{dayjs(date).format('ddd, DD MMM')}</div>
              {!daysQuery.loading && (
                <>
                  <LimitInput editable={editable} value={employeeLimit} onChange={handleChange} />
                  <Typography.Text type="secondary">
                    <TeamOutlined /> {officeDay?.employeeCount || 0} of {employeeMaxCount}
                  </Typography.Text>
                </>
              )}
            </div>
          )
        },
        width: 100,
        className: isToday ? 'office-planner-active' : '',
        render: (employee: EmployeePick) => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD')
          const pastDay = dayjs(date).isBefore(dayjs().format('YYYY-MM-DD'))
          return (
            <Switch
              disabled={!employee.isMe || pastDay}
              checked={employee.worksFromOffice.includes(formattedDate)}
              onChange={() => {
                apply({ variables: { input: { date: formattedDate, location: currentLocation } } })
              }}
            />
          )
        },
      }
    }),
  ]

  const actionsDisabled =
    applyArgs.loading || daysQuery.loading || updateDayArgs.loading || employeesQuery.loading

  return (
    <PageContent>
      <Typography.Title level={1}>Office Planner</Typography.Title>
      <Tabs
        animated={false}
        type="card"
        activeKey={currentLocation}
        onChange={location => {
          setCurrentLocation(location)
        }}
      >
        {LOCATIONS.map(i => {
          return (
            <Tabs.TabPane key={i.key} tab={i.title}>
              <div
                style={{
                  marginBottom: 16,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                {Boolean(allEmployees.length) && (
                  <div style={{ marginRight: 8 }} data-cy="employee_sum">
                    {allEmployees.length} employees
                  </div>
                )}
                <Button
                  style={{ marginRight: 8 }}
                  disabled={actionsDisabled}
                  onClick={() => {
                    let nextDay = new Date(firstDate)
                    nextDay.setDate(nextDay.getDate() - DAYS_IN_A_ROW)
                    setFirstDate(nextDay)
                  }}
                >
                  Previous week
                </Button>
                <Button
                  onClick={() => {
                    setFirstDate(thisMonday)
                  }}
                  disabled={actionsDisabled}
                  type="primary"
                  style={{ marginRight: 8 }}
                >
                  This week
                </Button>
                <Button
                  disabled={actionsDisabled}
                  onClick={() => {
                    let nextDay = new Date(firstDate)
                    nextDay.setDate(nextDay.getDate() + DAYS_IN_A_ROW)
                    setFirstDate(nextDay)
                  }}
                >
                  Next week
                </Button>
              </div>
              <Table<EmployeePick>
                size="small"
                loading={actionsDisabled}
                bordered
                rowKey="id"
                dataSource={employees}
                columns={columns}
                pagination={false}
                rowClassName={record => (record.isMe ? 'office-planner-active' : '')}
              />
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </PageContent>
  )
}

export default OfficePlannerPage
