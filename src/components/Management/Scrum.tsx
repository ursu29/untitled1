import { useQuery } from '@apollo/react-hooks'
import { Table } from 'antd'
import gql from 'graphql-tag'
import React from 'react'
import { Link } from 'react-router-dom'
import fragments, { EmployeeDetails, ProjectDetails } from '../../fragments'
import { getEmployeeLink } from '../../paths'
import { LOCATION } from '../../types'
import getLocationName from '../../utils/getLocationName'
import Avatar from '../Avatar'
import ProjectTag from '../Projects/ProjectTag'
import TableSearch from '../UI/TableSearch'

const getProjects = gql`
  {
    projects {
      ...ProjectDetails
      scrumMasters {
        ...EmployeeDetails
      }
      employees {
        id
      }
    }
  }
  ${fragments.Project}
  ${fragments.Employee.Details}
`

export default function Scrum() {
  // Get all projects
  const { data, loading } = useQuery<{
    projects: (ProjectDetails & { employees: { id: string }[]; scrumMasters: EmployeeDetails[] })[]
  }>(getProjects)
  const projects = data?.projects

  // Parse scrum masters from projects
  const scrumMasters = projects
    ?.flatMap(e => e.scrumMasters)
    .filter((e, i, self) => !!e?.id && i === self.findIndex(t => t?.id === e?.id))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(e => {
      const masterProjects = projects.filter(t => t.scrumMasters.map(e => e.id).includes(e.id))
      return {
        ...e,
        projects: masterProjects,
        projectsNamesString: masterProjects.map(e => e.name).join(' '),
      }
    })

  console.log(projects)
  console.log(scrumMasters)

  type TableRecord = EmployeeDetails & {
    projects: (ProjectDetails & { employees: { id: string }[]; scrumMasters: EmployeeDetails[] })[]
    projectsNamesString: string
  }

  // Table columns
  const columns = [
    {
      title: '',
      key: 'avatar',
      width: '5%',
      render: (record: TableRecord) => <Avatar employee={record} />,
    },
    {
      title: 'Employee',
      key: 'employee',
      ...TableSearch('name'),
      render: (record: TableRecord) => (
        <Link to={getEmployeeLink(record?.email)}>{record?.name}</Link>
      ),
      sorter: (a: any, b: any) => a?.name?.localeCompare(b?.name),
    },
    {
      title: 'Project',
      key: 'project',
      ...TableSearch('projectsNamesString'),
      render: (record: TableRecord) => {
        return record.projects?.map(e => (
          <ProjectTag small project={e} employeesCount={e.employees.length} />
        ))
      },
    },
    {
      title: 'Count',
      key: 'count',
      width: '10%',
      render: (record: TableRecord) => <p>{record.projects.length}</p>,
      sorter: (a: TableRecord, b: TableRecord) => (a.projects.length > b.projects.length ? 1 : -1),
    },
    {
      title: 'Location',
      key: 'location',
      dataIndex: 'location',
      filters: Object.keys(LOCATION).map(e => ({ text: getLocationName(e as LOCATION), value: e })),
      render: (_: any, i: any) => {
        return <span>{getLocationName(i.location)}</span>
      },
      onFilter: (value: any, record: EmployeeDetails) => record.location === value,
    },
  ]

  return (
    <Table
      dataSource={scrumMasters}
      columns={columns}
      loading={loading}
      tableLayout="fixed"
      pagination={false}
      rowKey="id"
      size="small"
    />
  )
}
