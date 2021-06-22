import { useQuery } from '@apollo/client'
import { Collapse, Table, Spin } from 'antd'
import gql from 'graphql-tag'
import React from 'react'
import { Link } from 'react-router-dom'
import fragments, { EmployeeDetails, ProjectDetails } from '../../fragments'
import { getEmployeeLink } from '../../paths'
import { LOCATION } from '../../types'
import getLocationName from '../../utils/getLocationName'
import Avatar from '../Avatar'
import EmployeeCard from '../Employees/EmployeeCard.new'
import ProjectTag from '../Projects/ProjectTag'
import TableSearch from '../UI/TableSearch'
import './styles.css'

const getEmployees = gql`
  {
    employees {
      ...EmployeeDetails
      agileManager {
        ...EmployeeDetails
      }
    }
  }
  ${fragments.Employee.Details}
`
const getProjects = gql`
  {
    projects {
      ...ProjectDetails
      employees {
        id
      }
    }
  }
  ${fragments.Project}
`

type QueryType = {
  employees: (EmployeeDetails & { agileManager: EmployeeDetails })[]
}

export default function Agile() {
  // Get all employees
  const { data, loading } = useQuery<QueryType>(getEmployees)
  const employees = data?.employees

  // Get all projects
  const { data: projectsData } = useQuery<{
    projects: (ProjectDetails & { employees: { id: string }[] })[]
  }>(getProjects)

  // Parse agile managers from employees
  const agileManagers = employees
    ?.map(e => e.agileManager)
    .filter((e, i, self) => !!e?.id && i === self.findIndex(t => t?.id === e?.id))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(e => ({
      ...e,
      subordinate: employees
        .filter(t => t.agileManager?.id === e.id)
        .sort((a, b) => a.location.localeCompare(b.location)),
    }))

  // Table columns
  const columns = [
    {
      title: '',
      key: 'avatar',
      width: '5%',
      render: (record: QueryType['employees'][0]) => <Avatar employee={record} />,
    },
    {
      title: 'Employee',
      key: 'employee',
      ...TableSearch('name'),
      render: (record: QueryType['employees'][0]) => (
        <Link to={getEmployeeLink(record?.email)}>{record?.name}</Link>
      ),
      sorter: (a: any, b: any) => a?.name?.localeCompare(b?.name),
    },
    {
      title: 'Position',
      key: 'position',
      dataIndex: 'position',
      ...TableSearch('position'),
      sorter: (a: any, b: any) => (a?.position || '').localeCompare(b?.position || ''),
    },
    {
      title: 'Project',
      key: 'project',
      render: (record: QueryType['employees'][0]) => {
        const projects = projectsData?.projects?.filter(project =>
          project.employees.some(e => e?.id === record?.id),
        )
        return projects?.map(e => (
          <ProjectTag small project={e} style={{ fontSize: '11px', padding: '2px 5px' }} />
        ))
      },
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

  const collapseHeader = (manager: EmployeeDetails & { subordinate: EmployeeDetails[] }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <EmployeeCard
        employee={manager}
        noLink
        cardProps={{
          hoverable: false,
          bordered: false,
          size: 'small',
          style: { backgroundColor: 'transparent' },
        }}
      />
      <div
        style={{
          marginLeft: '8px',
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: '12px',
        }}
      >
        Managing {manager.subordinate.length} employees
      </div>
    </div>
  )

  return (
    <div style={{ paddingTop: '16px' }} data-cy="agile">
      {loading && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
      )}
      {agileManagers?.map(manager => (
        <Collapse key={manager.id} bordered={false} ghost={true}>
          <Collapse.Panel
            key={manager.id}
            header={collapseHeader(manager)}
            className="collapse-full-width"
          >
            <Table
              dataSource={manager.subordinate}
              columns={columns}
              tableLayout="fixed"
              pagination={false}
              rowKey="id"
              size="small"
            />
          </Collapse.Panel>
        </Collapse>
      ))}
    </div>
  )
}
