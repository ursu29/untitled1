import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Input, Switch, Table, Tabs, Typography } from 'antd'
import dayjs from 'dayjs'
import gql from 'graphql-tag'
import React, { useState, useEffect } from 'react'
import message from '../../message'
import { Access, Employee, OfficeDay } from '../../types'
import PageContent from '../UI/PageContent'

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
  }
`

const getOfficeDays = gql`
  query getOfficeDays($input: OfficeDaysInput) {
    officeDays(input: $input) {
      id
      date
      employeeLimit
      employeeCount
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
type OfficeDayPick = Pick<OfficeDay, 'id' | 'date' | 'employeeLimit' | 'employeeCount'>

const LOCATIONS = [
  { key: 'SAINT_PETERSBURG', title: 'Saint Petersburg' },
  { key: 'TOMSK', title: 'Tomsk' },
  { key: 'ZURICH', title: 'Zürich' },
]

function OfficePlannerPage() {
  const today = new Date()
  const [firstDate, setFirstDate] = useState(today)
  const [currentLocation, setCurrentLocation] = useState('SAINT_PETERSBURG')

  const employeesQuery = useQuery<{ employees: EmployeePick[]; officeAccess: Access }>(query, {
    variables: { input: { locations: [currentLocation] } },
  })

  const daysQuery = useQuery<{ officeDays: OfficeDayPick[] }>(getOfficeDays, {
    variables: {
      input: {
        startDate: dayjs(firstDate).format('YYYY-MM-DD'),
        count: DAYS_IN_A_ROW,
      },
    },
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

  const dates = Array.from({ length: DAYS_IN_A_ROW }).map((i, index) => {
    let nextDay = new Date(firstDate)
    nextDay.setDate(nextDay.getDate() + index)
    return nextDay
  })
  const datesFormatted = dates.map((i) => dayjs(i).format('YYYY-MM-DD'))

  const allEmployees = employeesQuery.data?.employees || []
  const me = allEmployees.find((i) => i.isMe)

  //sort me first
  const employees = (me ? [me] : []).concat(
    allEmployees
      .filter((i) => !i.isMe)
      .filter((i) => i.worksFromOffice.some((day) => datesFormatted.includes(day))),
  )

  useEffect(() => {
    if (me) {
      if (me.location === 'Tomsk') {
        setCurrentLocation('TOMSK')
      }
      if (me.location === 'Zurich') {
        setCurrentLocation('ZURICH')
      }
    }
  }, [me])

  if (employeesQuery.error) return <div>Something happened. Please contact portal manager</div>

  const columns = [
    {
      title: () => <div>Name</div>,
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    ...dates.map((date) => {
      return {
        title: () => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD')
          const officeDay = daysQuery.data?.officeDays.find((i) => i.date === formattedDate)
          const employeeLimit = officeDay?.employeeLimit || 15
          const employeeMaxCount = Math.ceil((allEmployees.length * employeeLimit) / 100)

          const handleChange = (e: any) => {
            if (e.target.value !== employeeLimit.toString()) {
              updateDay({
                variables: {
                  input: {
                    date: formattedDate,
                    employeeLimit: Number(e.target.value),
                    location: 'SAINT_PETERSBURG',
                  },
                },
              })
            }
          }

          return (
            <div key={date.toISOString()}>
              <div>{dayjs(date).format('DD MMM')}</div>
              {!daysQuery.loading && (
                <>
                  {editable && (
                    <div style={{ whiteSpace: 'nowrap' }}>
                      <Input
                        type="number"
                        style={{ width: 70, marginRight: 4 }}
                        defaultValue={employeeLimit}
                        onPressEnter={handleChange}
                        onBlur={handleChange}
                        placeholder="15"
                        min="0"
                        max="100"
                      />
                      %
                    </div>
                  )}
                  <div>
                    {officeDay?.employeeCount || 0} from {employeeMaxCount}
                  </div>
                </>
              )}
            </div>
          )
        },
        render: (employee: EmployeePick) => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD')
          return (
            <Switch
              disabled={!employee.isMe}
              checked={employee.worksFromOffice.includes(formattedDate)}
              onChange={() => {
                apply({
                  variables: {
                    input: { date: formattedDate, location: currentLocation },
                  },
                })
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
        onChange={(location) => {
          setCurrentLocation(location)
        }}
      >
        {LOCATIONS.map((i) => {
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
                <div style={{ marginRight: 8 }}>
                  {employeesQuery.data?.employees.length} employees
                </div>
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
                    setFirstDate(today)
                  }}
                  disabled={actionsDisabled}
                  type="primary"
                  style={{ marginRight: 8 }}
                >
                  Today
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
              />
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </PageContent>
  )
}

export default OfficePlannerPage
