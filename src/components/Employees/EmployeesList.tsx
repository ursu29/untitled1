import { Input, Table } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import dayjs from 'dayjs'
import { COLLAPSE_WIDTH } from '../../config'
import { getEmployeeLink } from '../../paths'
import { Employee, EmployeeProject, LOCATION } from '../../types'
import Avatar from '../Avatar'
import getLocationName from '../../utils/getLocationName'

type EmployeePick = Pick<
  Employee,
  | 'id'
  | 'name'
  | 'location'
  | 'country'
  | 'position'
  | 'phoneNumber'
  | 'email'
  | 'startDate'
  | 'birthday'
>

interface Props {
  employees?: (EmployeePick & { employeeProjects?: EmployeeProject[] })[]
  loading: boolean
  fixed?: boolean
  showCapacity?: boolean
  projectId?: string
}

export default function EmployeesList({
  employees,
  loading,
  fixed,
  showCapacity,
  projectId,
}: Props) {
  const [filter, setFilter] = useState('')
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  let columns: any = [
    {
      title: '',
      key: 'avatar',
      className: 'avatar-cell',
      width: 70,
      render: (employee: Employee) => <Avatar employee={employee} size={60} />,
    },
    {
      title: 'Name',
      key: 'name',
      render: (employee: EmployeePick) => (
        <>
          {employee.email ? (
            <Link to={getEmployeeLink(employee.email)}>{employee.name}</Link>
          ) : (
            <div>{employee.name}</div>
          )}
          {!isLarge && <div>{employee.position}</div>}
        </>
      ),
      sorter: (a: EmployeePick, b: EmployeePick): number => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      },
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend',
    },

    // {
    //   title: 'Projects',
    //   key: 'projects',
    //   render: (employee: Employee) => <EmployeeProjects email={employee.email} />,
    // },
  ]

  const position = {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    // @ts-ignore fixme Type to 'ColumnFilterItem'. Type 'string[]' is not assignable to type 'string'.
    filters: [
      {
        text: 'Administration',
        value: [
          'ceo',
          'cco',
          'hr',
          'accountant',
          'office',
          'managing',
          'teacher',
          'operation',
          'marketing',
          'director',
        ],
      },
      {
        text: 'Teamleaders',
        value: ['teamlead', 'team lead'],
      },
      {
        text: 'Frontend',
        value: ['frontend', 'front-end', 'web', 'javascript', 'nodejs', 'node js', 'node.js'],
      },
      {
        text: 'Java Developers',
        value: ['java'],
      },
      {
        text: '.NET Developers',
        value: ['.net'],
      },
      {
        text: 'R Developers',
        value: ['r-developer'],
      },
      {
        text: 'Design',
        value: ['ux', 'designer'],
      },
      {
        text: 'Business Analytics',
        value: ['business', 'analyst', 'ba', 'actuary', 'portfolio', 'pricing', 'product owner'],
      },
      {
        text: 'Mathematics',
        value: ['math'],
      },
      {
        text: 'QA',
        value: ['qa', 'test', 'quality'],
      },
      {
        text: 'DevOps & Admins',
        value: ['devops', 'admin', 'security', 'system administrator'],
      },
      {
        text: 'Data Analysts',
        value: ['analytic'],
      },
      {
        text: 'Scrum/Agile',
        value: ['scrum', 'agile'],
      },
      {
        text: 'Support Engineers',
        value: ['support'],
      },
    ],
    onFilter: (value: string[], record: EmployeePick) => {
      return value.some(v => record.position && record.position.toLowerCase().includes(v))
    },
  }

  const level = {
    title: 'Level',
    key: 'level',
    // @ts-ignore Type to 'ColumnFilterItem'. Type 'string[]' is not assignable to type 'string'.
    filters: [
      {
        text: 'Junior',
        value: ['junior'],
      },
      {
        text: 'Middle',
        value: ['middle'],
      },
      {
        text: 'Senior',
        value: ['senior'],
      },
      {
        text: 'Architect',
        value: ['architect'],
      },
    ],
    onFilter: (value: string[], record: EmployeePick) => {
      return value.some(v => record.position && record.position.toLowerCase().includes(v))
    },
    render: (text: any, record: EmployeePick) => {
      if (record.position) {
        const position = record.position.toLowerCase()
        if (position.includes('junior')) return 'Junior'
        if (position.includes('middle')) return 'Middle'
        if (position.includes('senior')) return 'Senior'
        if (position.includes('architect')) return 'Architect'
        return null
      }
    },
  }

  const location = {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    filters: [
      {
        text: 'Saint Petersburg',
        value: 'petersburg',
      },
      {
        text: 'Tomsk',
        value: 'tomsk',
      },
      {
        text: 'Kaliningrad',
        value: 'kaliningrad',
      },
      {
        text: 'Zurich',
        value: 'zurich',
      },
    ],
    render: (location: LOCATION) => {
      return <span>{getLocationName(location)}</span>
    },
    onFilter: (value: any, record: EmployeePick) =>
      record.location && record.location.toLowerCase().includes(value),
  }

  const birthday = {
    title: 'Birthday',
    key: 'birthday',
    dataIndex: 'birthday',
  }

  const startDate = {
    title: 'Contract Start',
    key: 'startDate',
    dataIndex: 'startDate',
    sorter: (a: EmployeePick, b: EmployeePick): number => {
      if (a.startDate === b.startDate) return 0
      if (!a.startDate) return -1
      if (!b.startDate) return 1
      const prev = dayjs(a.startDate)
      const next = dayjs(b.startDate)
      return prev.isAfter(next) ? 1 : -1
    },
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'ascend',
    render: (date: string) => {
      if (!date) return null
      return <span>{dayjs(date).format('YYYY.MM.DD')}</span>
    },
  }

  if (isLarge) {
    columns = columns.concat([position, level, location, birthday, startDate])
  }

  if (showCapacity) {
    columns.push({
      title: 'Allocation',
      key: 'occupancy',
      width: 100,
      render: (employee: Employee & { employeeProjects: EmployeeProject[] }) => {
        const employeeProject = employee.employeeProjects.find(e => e.project.id === projectId)
        return employeeProject?.capacity + '%' + (employeeProject?.isExtraCapacity ? ' !' : '')
      },
    })
  }

  return (
    <Table
      data-cy="employee_table"
      loading={loading}
      tableLayout="fixed"
      dataSource={employees?.filter(employee => {
        if (!filter) return true
        return employee.name.toLowerCase().includes(filter.toLowerCase())
      })}
      pagination={false}
      //@ts-ignore
      columns={columns}
      rowKey="id"
      size="middle"
      scroll={fixed ? { y: 'calc(100vh - 105px)' } : undefined}
      title={() => (
        <Input
          data-cy="search"
          placeholder="Search"
          value={filter}
          onChange={(e: any) => setFilter(e.target.value)}
        />
      )}
    />
  )
}
