import React from 'react'
import { Table, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Employee, Project } from '../../types'
import { query, QueryType, Subordinate } from '../../queries/getSubordinates'
import { useQuery, useMutation } from '@apollo/react-hooks'
import updateEmployee from '../../queries/updateEmployee'
import ProjectTagList from '../Projects/ProjectTagList'
import moment from 'moment'
import message from '../../message'
import BookingEmployee from '../WorkspacePlanner/BookingEmployee'
import TableSearch from '../UI/TableSearch'
import { useEmployee } from '../../utils/withEmployee'

type ProjectPick = Pick<Project, 'id' | 'name' | 'code'>

interface Props {
  employee?: Pick<Employee, 'id' | 'email'>
}

export default function EmployeeSubordinates({ employee }: Props) {
  const user = useEmployee()
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

  const subordinateUsers = data?.employeeByEmail?.subordinateUsers
    ?.filter(e => !!e)
    .sort((a, b) => (moment(a.lastManagerMeeting).isBefore(moment(b.lastManagerMeeting)) ? -1 : 1))

  const dateFormat = (value: any) =>
    value.format('DD.MM.YYYY') +
    ' - ' +
    (moment(value).isSame(moment.now(), 'day') ? 'today' : moment(value).fromNow())

  const columns = [
    {
      title: 'Employee',
      key: 'employee',
      width: '150px',
      ...TableSearch('name'),
      render: (_: any, record: Subordinate) => {
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
              {/* it is not the best solution to use this component there. 
              as it was not the best to use Avatar component with name inside it (previous version)
              suggestion: customize EmployeeCard to fit one line (small version) */}
              <BookingEmployee employeeEmail={record.email} />
            </Link>
          </div>
        )
      },
      sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
    },
    {
      title: 'Position',
      key: 'position',
      width: '200px',
      dataIndex: ['position'],
      ...TableSearch('position'),
      sorter: (a: any, b: any) => a?.position.localeCompare(b?.position),
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
      render: (_: any, record: Subordinate) => (
        <ProjectTagList small projects={record.projects} leadingProjects={record.leadingProjects} />
      ),
      sorter: (a: any, b: any) =>
        a.projects
          .map((e: any) => e.name)
          .sort((a: any, b: any) => a.localCompare(b))
          .join('')
          .localeCompare(
            b.projects
              .map((e: any) => e.name)
              .sort((a: any, b: any) => a.localCompare(b))
              .join(''),
          ),
    },
    {
      title: 'Last meeting',
      key: 'lastMeeting',
      width: '165px',
      render: (_: any, record: Subordinate) => (
        <DatePicker
          format={dateFormat}
          disabled={user.employee?.email?.toLowerCase() !== employee?.email?.toLowerCase()}
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
      //@ts-ignore
      sorter: (a: any, b: any) => new Date(a.lastManagerMeeting) - new Date(b.lastManagerMeeting),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      //@ts-ignore
      dataSource={subordinateUsers}
      pagination={false}
      loading={loading}
      size="small"
    />
  )
}
