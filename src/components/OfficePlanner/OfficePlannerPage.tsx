import React, { useState } from 'react'
import PageContent from '../UI/PageContent'
import { Table, Button, Switch, Input, Tabs, Typography, Divider } from 'antd'
import dayjs from 'dayjs'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import { Employee, OfficeDay } from '../../types'
import message from '../../message'

const DAYS_IN_A_ROW = 7

const getEmployees = gql`
  query getEmployees($input: EmployeesInput) {
    employees(input: $input) {
      id
      name
      email
      isMe
      worksFromOffice
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

type EmployeePick = Pick<Employee, 'id' | 'name' | 'email' | 'isMe' | 'worksFromOffice'>
type OfficeDayPick = Pick<OfficeDay, 'id' | 'date' | 'employeeLimit' | 'employeeCount'>

function OfficePlannerPage() {
  const today = new Date()
  const [firstDate, setFirstDate] = useState(today)

  const employeesQuery = useQuery<{ employees: EmployeePick[] }>(getEmployees, {
    variables: { input: { locations: ['SAINT_PETERSBURG'] } },
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
    { query: getEmployees, variables: { input: { locations: ['SAINT_PETERSBURG'] } } },
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

  const loading = employeesQuery.loading

  if (employeesQuery.error) return <div>Something is wrong</div>
  if (loading) return <Skeleton loading={loading} withOffset />

  const dates = Array.from({ length: DAYS_IN_A_ROW }).map((i, index) => {
    let nextDay = new Date(firstDate)
    nextDay.setDate(nextDay.getDate() + index)
    return nextDay
  })

  //sort me first
  const employees = employeesQuery.data?.employees
    ? employeesQuery.data?.employees
        .filter((i) => i.isMe)
        .concat(employeesQuery.data.employees.filter((i) => !i.isMe))
    : []

  const columns = [
    {
      title: () => <div>Name</div>,
      dataIndex: 'name',
      key: 'name',
    },
    ...dates.map((date) => {
      return {
        title: () => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD')
          const officeDay = daysQuery.data?.officeDays.find((i) => i.date === formattedDate)
          const employeeLimit = officeDay?.employeeLimit || 15
          const employeeMaxCount = Math.ceil((employees.length * employeeLimit) / 100)

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
              <div>{formattedDate}</div>
              {!daysQuery.loading && (
                <>
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
                    input: { date: formattedDate, location: 'SAINT_PETERSBURG' },
                  },
                })
              }}
            />
          )
        },
      }
    }),
  ]

  const actionsDisabled = applyArgs.loading || daysQuery.loading || updateDayArgs.loading

  return (
    <PageContent>
      <Typography.Title level={1}>Office Planner</Typography.Title>
      <Tabs>
        <Tabs.TabPane key="Saint Petersburg" tab="Saint Petersburg">
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: 8 }}>{employees.length} employees</div>
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
      </Tabs>
    </PageContent>
  )
}

export default OfficePlannerPage
