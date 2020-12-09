import React, { useState } from 'react'
import { Table, DatePicker, Tooltip, Popconfirm, Modal, Typography } from 'antd'
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
import { OnboardingTicket } from '../../types'
import Ticket from '../Onboarding/Ticket'

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

  const [upcomingTrainingsModal, setUpcomingTrainingsModal] = useState<{
    isOpen: boolean
    trainings: OnboardingTicket[]
  }>({
    isOpen: false,
    trainings: [],
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
      width: '150px',
      dataIndex: ['position'],
      ...TableSearch('position'),
      sorter: (a: any, b: any) => a?.position.localeCompare(b?.position),
    },
    {
      title: 'Project',
      key: 'project',
      width: '160px',
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
      title: 'Upcoming trainings',
      key: 'trainings',
      width: '100px',
      render: (_: any, record: Subordinate) => {
        const ticketsCount: {
          mandatory: number
          optional: number
        } = record.requestedOnboardingTickets.reduce(
          (count, ticket) => {
            ticket.isOptional ? (count.optional += 1) : (count.mandatory += 1)
            return count
          },
          { mandatory: 0, optional: 0 },
        )

        const showCount = (title: string, count: number) => (
          <Tooltip
            placement={title === 'man' ? 'topLeft' : 'bottomLeft'}
            title={
              title === 'man'
                ? `Mandatory trainings count: ${count}`
                : `Optional trainings count: ${count}`
            }
          >
            <div style={{ display: 'flex' }}>
              <div style={{ color: 'lightgray', width: '40px', textAlign: 'start' }}>{title}</div>
              <div>{count ? count : '-'}</div>
            </div>
          </Tooltip>
        )

        return (
          <div
            style={{ userSelect: 'none', cursor: 'pointer', width: 'min-content' }}
            onClick={() =>
              setUpcomingTrainingsModal({
                isOpen: true,
                trainings: record.requestedOnboardingTickets,
              })
            }
          >
            {showCount('man', ticketsCount.mandatory)}
            {showCount('opt', ticketsCount.optional)}
          </div>
        )
      },
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
      width: '90px',
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

  const mandatoryTrainings = upcomingTrainingsModal.trainings.filter(e => !e.isOptional)
  const optionalTrainings = upcomingTrainingsModal.trainings.filter(e => e.isOptional)

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

      <Modal
        centered
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        width={545}
        title={<div>Employee upcoming trainings</div>}
        visible={upcomingTrainingsModal.isOpen}
        onOk={() => setUpcomingTrainingsModal({ ...upcomingTrainingsModal, isOpen: false })}
        onCancel={() => setUpcomingTrainingsModal({ ...upcomingTrainingsModal, isOpen: false })}
        destroyOnClose={true}
        footer={null}
      >
        {!!mandatoryTrainings.length && (
          <div>
            <Typography.Title
              level={3}
              style={{
                backgroundColor: '#f0808045',
                padding: '2px 20px',
                borderRadius: '5px',
                width: '480px',
              }}
            >
              Mandatory
            </Typography.Title>
            {mandatoryTrainings.map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} isCompleted={false} isAccessWrite={false} />
            ))}
          </div>
        )}
        {!!optionalTrainings.length && (
          <div>
            <Typography.Title
              level={3}
              style={{
                backgroundColor: '#90ee9047',
                padding: '2px 20px',
                borderRadius: '5px',
                width: '480px',
              }}
            >
              Optional
            </Typography.Title>
            {optionalTrainings.map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} isCompleted={false} isAccessWrite={false} />
            ))}
          </div>
        )}
      </Modal>
    </>
  )
}
