import { useMutation, useQuery, gql } from '@apollo/client'
import { CheckOutlined, CloseOutlined, DownOutlined, TeamOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  Menu,
  Modal,
  PageHeader,
  Radio,
  Space,
  Switch,
  Table,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import message from '../../message'
import { cancelOfficeBooking } from '../../queries/cancelOfficeBooking'
import { createOfficeBooking } from '../../queries/createOfficeBooking'
import { getOfficeDays, QueryType as OfficeDayQueryType } from '../../queries/getOfficeDays'
import { Access, Employee, LOCATION } from '../../types'
import getLocationName from '../../utils/getLocationName'
import PageContent from '../UI/PageContent'
import EditOfficeLimits from './EditOfficeLimits'
import './OfficePlannerPage.css'

const { RangePicker } = DatePicker

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

type EmployeePick = Pick<Employee, 'id' | 'name' | 'email' | 'location' | 'isMe'>

const LOCATIONS = [
  { key: LOCATION.SaintPetersburg, title: getLocationName(LOCATION.SaintPetersburg) },
  { key: LOCATION.Tomsk, title: getLocationName(LOCATION.Tomsk) },
  { key: LOCATION.Kaliningrad, title: getLocationName(LOCATION.Kaliningrad) },
]

const MODE_CREATE = 'CREATE'
const MODE_CANCEL = 'CANCEL'

function OfficePlannerPage() {
  // @ts-ignore
  const thisMonday = dayjs().weekday(1)
  const [firstDate, setFirstDate] = useState(thisMonday)
  const [currentLocation, setCurrentLocation] = useState(LOCATION.SaintPetersburg)
  const isDesktop = useMediaQuery({ minWidth: 1200 })

  const [currentMode, setCurrentMode] = useState(MODE_CREATE)
  const [currentDateStart, setCurrentDateStart] = useState<Moment | undefined>(undefined)
  const [currentDateEnd, setCurrentDateEnd] = useState<Moment | undefined>(undefined)
  const [currentSkipWeekends, setCurrentSkipWeekends] = useState(true)
  const [isModalVisible, setShowModal] = useState(false)

  const employeesQuery = useQuery<{
    employees: EmployeePick[]
    officeAccess: Access
    profile: Pick<Employee, 'id' | 'location'>
  }>(query, {
    variables: { input: { locations: [currentLocation] } },
    fetchPolicy: 'network-only',
  })

  const daysQuery = useQuery<OfficeDayQueryType>(getOfficeDays, {
    variables: {
      input: {
        dateStart: dayjs(firstDate).format('YYYY-MM-DD'),
        dateEnd: dayjs(firstDate).add(DAYS_IN_A_ROW, 'day').format('YYYY-MM-DD'),
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
          dateStart: dayjs(firstDate).format('YYYY-MM-DD'),
          dateEnd: dayjs(firstDate).add(DAYS_IN_A_ROW, 'day').format('YYYY-MM-DD'),
        },
      },
      fetchPolicy: 'network-only',
    },
  ]

  const [create, createArgs] = useMutation(createOfficeBooking, {
    awaitRefetchQueries: true,
    refetchQueries,
    onError: message.error,
    onCompleted: () => {
      if (isModalVisible) {
        setShowModal(false)
      }
    },
  })

  const [cancel, cancelArgs] = useMutation(cancelOfficeBooking, {
    awaitRefetchQueries: true,
    refetchQueries,
    onError: message.error,
    onCompleted: () => {
      if (isModalVisible) {
        setShowModal(false)
      }
    },
  })

  const editable = employeesQuery.data?.officeAccess.write
  const myLocation = employeesQuery.data?.profile.location

  const dates = Array.from({ length: DAYS_IN_A_ROW }).map((_, index) => {
    let nextDay = new Date(firstDate)
    nextDay.setDate(nextDay.getDate() + index)
    return nextDay
  })

  const datesFormatted = dates.map(i => dayjs(i).format('YYYY-MM-DD'))

  const allEmployees = employeesQuery.data?.employees || []
  const me = allEmployees.find(i => i?.isMe)

  const officeDays = daysQuery.data?.officeDays.filter(i => i.location === currentLocation) ?? []

  //sort me first
  const employees = (me ? [me] : []).concat(
    allEmployees
      .filter(i => !i?.isMe)
      .filter(i =>
        officeDays.some(
          day => datesFormatted.includes(day.date) && day.employees.find(e => e.id === i.id),
        ),
      ),
  )

  useEffect(() => {
    if (myLocation) {
      setCurrentLocation(myLocation)
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
        if (employee?.isMe) return 'You'
        if (isDesktop) {
          return name
        }
        const firstName = name.split(' ')?.[0]
        const lastName = name.split(' ')?.[1]
        return (
          <div>
            {firstName}
            {lastName && (
              <>
                <br />
                {lastName}
              </>
            )}
          </div>
        )
      },
    },
    ...dates.map(date => {
      const isToday = dayjs(date).isSame(dayjs().format('YYYY-MM-DD'), 'day')
      const isTomorrow = dayjs(date).isSame(dayjs().add(1, 'day').format('YYYY-MM-DD'), 'day')
      return {
        title: () => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD')
          const officeDay = daysQuery.data?.officeDays.find(
            i => i.date === formattedDate && i.location === currentLocation,
          )
          const employeeLimit = officeDay?.employeeLimit
          const employeeMaxCount = employeeLimit

          return (
            <div key={date.toISOString()}>
              <div>{dayjs(date).format('ddd, DD MMM')}</div>
              {!daysQuery.loading && (
                <div data-cy="count">
                  <Typography.Text type="secondary">
                    <TeamOutlined /> {officeDay?.employees?.length || 0} of {employeeMaxCount}
                  </Typography.Text>
                </div>
              )}
            </div>
          )
        },
        width: 100,
        className: isToday ? 'office-planner-active' : '',
        align: 'center',
        responsive: isToday || isTomorrow ? undefined : ['sm'],
        render: (employee: EmployeePick) => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD')
          const pastDay = dayjs(date).isBefore(dayjs().format('YYYY-MM-DD'))
          const booking = officeDays.find(
            i => i.employees.map(i => i.id).includes(employee.id) && i.date === formattedDate,
          )
          const isChecked = Boolean(booking)
          if (!employee.isMe) {
            return (
              <div>
                {isChecked ? (
                  <CheckOutlined style={{ color: '#1890FF' }} />
                ) : (
                  <CloseOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                )}
              </div>
            )
          }
          return (
            <Switch
              disabled={!employee?.isMe || pastDay}
              checked={isChecked}
              onChange={() => {
                if (isChecked) {
                  cancel({
                    variables: {
                      input: {
                        dateStart: formattedDate,
                        location: currentLocation,
                      },
                    },
                  })
                } else {
                  create({
                    variables: {
                      input: {
                        dateStart: formattedDate,
                        location: currentLocation,
                        skipWeekends: currentSkipWeekends,
                      },
                    },
                  })
                }
              }}
            />
          )
        },
      }
    }),
  ]

  const actionsDisabled =
    createArgs.loading || cancelArgs.loading || daysQuery.loading || employeesQuery.loading

  const locationsMenu = (
    <Menu
      onClick={({ key }) => {
        setCurrentLocation(key as LOCATION)
      }}
    >
      {LOCATIONS.map(i => {
        return <Menu.Item key={i.key}>{i.title}</Menu.Item>
      })}
    </Menu>
  )

  return (
    <>
      <Modal
        confirmLoading={actionsDisabled}
        cancelButtonProps={{ loading: actionsDisabled }}
        title={currentMode === MODE_CREATE ? 'Booking confirmation' : 'Booking cancel'}
        visible={isModalVisible}
        onOk={() => {
          if (currentMode === MODE_CREATE)
            create({
              variables: {
                input: {
                  dateStart: currentDateStart?.format('YYYY-MM-DD'),
                  dateEnd: currentDateEnd?.format('YYYY-MM-DD'),
                  location: currentLocation,
                  skipWeekends: currentSkipWeekends,
                },
              },
            })

          if (currentMode === MODE_CANCEL)
            cancel({
              variables: {
                input: {
                  dateStart: currentDateStart?.format('YYYY-MM-DD'),
                  dateEnd: currentDateEnd?.format('YYYY-MM-DD'),
                  location: currentLocation,
                },
              },
            })
        }}
        onCancel={() => {
          setShowModal(false)
        }}
      >
        <Space direction="vertical">
          <Radio.Group
            value={currentMode}
            onChange={e => {
              setCurrentMode(e.target.value)
            }}
          >
            <Radio.Button value={MODE_CREATE} data-cy="create">
              Create
            </Radio.Button>
            <Radio.Button value={MODE_CANCEL} data-cy="cancel">
              Cancel
            </Radio.Button>
          </Radio.Group>
          <RangePicker
            value={[moment(currentDateStart), moment(currentDateEnd)]}
            defaultValue={[moment(currentDateStart), moment(currentDateEnd)]}
            // TODO: disabled dates
            disabledDate={date => {
              if (date.isBefore(moment())) {
                return true
              }
              return !!date.isAfter(moment().add(60, 'day'))
            }}
            onChange={(value: any) => {
              if (value) {
                setCurrentDateStart(value[0])
                setCurrentDateEnd(value[1])
              }
            }}
          />
          {currentMode === MODE_CREATE && (
            <Checkbox
              data-cy="skipWeekend"
              onChange={value => {
                setCurrentSkipWeekends(value.target.checked)
              }}
              checked={currentSkipWeekends}
            >
              Skip weekends
            </Checkbox>
          )}
        </Space>
      </Modal>
      <PageContent>
        <PageHeader
          className="site-page-header"
          title="Office Planner"
          extra={
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Space size={16}>
                <Dropdown overlay={locationsMenu} placement="bottomRight">
                  <a
                    className="ant-dropdown-link"
                    href={`/office-planner`}
                    onClick={e => e.preventDefault()}
                  >
                    {getLocationName(currentLocation)}{' '}
                    {Boolean(allEmployees.length) && (
                      <>
                        · <span data-cy="employee_sum">{allEmployees.length} employees</span>
                      </>
                    )}{' '}
                    <DownOutlined />
                  </a>
                </Dropdown>
                {editable && isDesktop && (
                  <EditOfficeLimits
                    refetchQueries={refetchQueries}
                    currentLocation={currentLocation}
                  />
                )}
              </Space>
            </div>
          }
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          {isDesktop && (
            <>
              <Divider style={{ margin: '0 0 16px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Space>
                  <Button
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
                </Space>
                <Space>
                  <Button
                    data-cy="rangeBtn"
                    disabled={actionsDisabled}
                    onClick={() => {
                      setCurrentDateStart(moment())
                      setCurrentDateEnd(moment().add(1, 'day'))
                      setShowModal(true)
                    }}
                  >
                    Book the range
                  </Button>
                </Space>
              </div>
            </>
          )}
        </PageHeader>

        <Table<EmployeePick>
          size="small"
          loading={actionsDisabled}
          bordered
          rowKey="id"
          dataSource={employees}
          columns={columns}
          pagination={false}
          rowClassName={record => (record?.isMe ? 'office-planner-active' : '')}
        />
      </PageContent>
    </>
  )
}

export default OfficePlannerPage
