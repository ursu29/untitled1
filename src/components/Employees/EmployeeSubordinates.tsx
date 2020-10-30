import React from 'react'
import { Table, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Employee, Project } from '../../types'
import { query, QueryType } from '../../queries/getMySubordinates'
import { useQuery, useMutation } from '@apollo/react-hooks'
import updateEmployee from '../../queries/updateEmployee'
import EmployeeAvatar from '../Employees/EmployeeAvatar'
import ProjectTagList from '../Projects/ProjectTagList'
import moment from 'moment'
import message from '../../message'

type ProjectPick = Pick<Project, 'id' | 'name' | 'code'>

interface Props {
  employee?: Pick<Employee, 'id' | 'email'>
}

export default function EmployeeSubordinates({ employee }: Props) {
  const { loading, data } = useQuery<QueryType>(query, {
    variables: { email: employee?.email },
  })

  const [update] = useMutation(updateEmployee, {
    onCompleted: () => message.success('Updated'),
    onError: e => {
      message.error(e)
    },
  })

  const makeUpdate = (employeeId: string, date: string) =>
    update({
      variables: {
        input: {
          id: employeeId,
          lastManagerMeeting: date,
        },
      },
    })

  const subordinateUsers = data?.profile?.subordinateUsers?.sort((a, b) =>
    moment(a.lastManagerMeeting).isBefore(moment(b.lastManagerMeeting)) ? -1 : 1,
  )

  console.log(subordinateUsers)

  const dateFormat = (value: any) =>
    value.format('DD.MM.YYYY') +
    ' - ' +
    (moment(value).isSame(moment.now(), 'day') ? 'today' : moment(value).fromNow())

  const columns = [
    {
      title: 'Employee',
      key: 'employee',
      width: '150px',
      render: (_: any, record: Partial<Employee>) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link
              to={getEmployeeLink(record?.email || '')}
              style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'fit-content',
              }}
            >
              <EmployeeAvatar email={record?.email || ''} size="default" showName={true} />
            </Link>
          </div>
        )
      },
    },
    {
      title: 'Position',
      key: 'position',
      width: '200px',
      render: (_: any, record: Partial<Employee>) => record.position,
    },
    {
      title: 'Project',
      key: 'project',
      width: '200px',
      filters: [
        //@ts-ignore
        ...new Set(
          subordinateUsers
            ?.filter(e => e.projects?.length)
            .flatMap(e => e.projects?.map(e => e.name)),
        ),
      ]
        .sort((a, b) => (a > b ? 1 : -1))
        .map(e => ({ text: e, value: e })),
      onFilter: (value: any, record: any) =>
        record.projects.map((e: any) => e.name).includes(value),
      render: (
        _: any,
        record: Partial<Employee> & { projects: ProjectPick[]; leadingProjects: ProjectPick[] },
      ) => (
        <ProjectTagList small projects={record.projects} leadingProjects={record.leadingProjects} />
      ),
    },
    {
      title: 'Last meeting',
      key: 'lastMeeting',
      width: '165px',
      render: (_: any, record: Partial<Employee>) => (
        <DatePicker
          format={dateFormat}
          defaultValue={
            record.lastManagerMeeting
              ? moment(moment(record.lastManagerMeeting), ['DD.MM.YYYY'])
              : undefined
          }
          onChange={value =>
            record.id && value ? makeUpdate(record.id, value.toISOString()) : null
          }
          disabledDate={value => value > moment().endOf('day')}
          allowClear={false}
        />
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      //@ts-ignore
      dataSource={subordinateUsers}
      pagination={false}
      loading={loading}
    />
  )
}

/* 


import { useEmployee } from '../../utils/withEmployee'
import EmployeeAvatar from '../Employees/EmployeeAvatar'

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
            {/*             <Link
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
            </Link> }
            <EmployeeAvatar email={record.employeeEmail} size="default" showName={true} />
            {record.employeeEmail.toLowerCase() === employee.employee.email.toLowerCase() &&
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
 */
