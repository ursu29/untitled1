import React from 'react'
import { Table, DatePicker, Tooltip, Popconfirm } from 'antd'
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
import { BulbTwoTone } from '@ant-design/icons'
import styled from 'styled-components'

const ActiveBulb = styled.div`
  cursor: pointer;
  transition: 0.1s all;
  &:hover {
    transform: scale(1.3);
  }
`

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
    refetchQueries: [{ query, variables: { email: employee?.email } }],
    onError: e => {
      message.error(e)
    },
  })

  const makeUpdate = (
    employeeId: string,
    body: { lastManagerMeeting?: string; one2oneRequest?: boolean },
  ) =>
    update({
      variables: {
        input: {
          id: employeeId,
          ...body,
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
              {/* TODO: it is not the best solution to use this component there. 
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
            .flatMap(e => e.projects?.map((e: ProjectPick) => e.name)),
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
            record.id && value
              ? makeUpdate(record.id, { lastManagerMeeting: value.toISOString() })
              : null
          }
          disabledDate={value => value > moment().endOf('day')}
          allowClear={false}
        />
      ),
      //@ts-ignore
      sorter: (a: any, b: any) => new Date(a.lastManagerMeeting) - new Date(b.lastManagerMeeting),
    },
    {
      title: '1-2-1',
      key: 'one2oneRequest',
      width: '50px',
      align: 'center',
      render: (_: any, record: Subordinate) =>
        record.one2oneRequest ? (
          <ActiveBulb>
            <Tooltip placement="left" title="Close one-2-one request">
              <Popconfirm
                placement="topLeft"
                title={'Are you sure you want to close request?'}
                onConfirm={() => makeUpdate(record.id, { one2oneRequest: false })}
                okText="Yes"
                cancelText="No"
              >
                <BulbTwoTone
                  twoToneColor="#ffc400"
                  style={{
                    fontSize: '20px',
                  }}
                />
              </Popconfirm>
            </Tooltip>
          </ActiveBulb>
        ) : (
          <Tooltip placement="left" title="No requests here">
            <BulbTwoTone
              twoToneColor="lightgray"
              style={{ fontSize: '20px', color: 'lightgray' }}
            />
          </Tooltip>
        ),
      sorter: (a: any, b: any) => (a.one2oneRequest && !b.one2oneRequest ? 1 : -1),
    },
  ]

  return (
    <>
      {data?.employeeByEmail?.subordinateUsers.length !== subordinateUsers?.length && (
        <div style={{ color: 'red', padding: '20px' }}>
          Error was occurred! Azure user was not found.
        </div>
      )}
      <Table
        rowKey="id"
        //@ts-ignore
        columns={columns}
        dataSource={subordinateUsers}
        pagination={false}
        loading={loading}
        size="small"
      />
    </>
  )
}
