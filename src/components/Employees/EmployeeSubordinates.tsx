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

  const subordinateUsers = data?.profile?.subordinateUsers
    ?.filter(e => !!e)
    .sort((a, b) => (moment(a.lastManagerMeeting).isBefore(moment(b.lastManagerMeeting)) ? -1 : 1))

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
