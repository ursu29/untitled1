import { useQuery } from '@apollo/react-hooks'
import { Checkbox, Table } from 'antd'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import fragments, { EmployeeDetails } from '../../fragments'
import { Employee } from '../../types'
import EmployeeCard from '../Employees/EmployeeCard.new'
import UpdateEmployee from '../Employees/UpdateEmployee'
import TableSearch from '../UI/TableSearch'

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

const getMembersOfQuery = gql`
  query getMembersOf($group: String) {
    getMembersOf(group: $group)
  }
`

type QueryType = {
  employees: (EmployeeDetails & { agileManager: EmployeeDetails })[]
}

const WITHOUT_MANAGER = 'Without manager only'
const NOT_MANAGEMENT = 'Exclude management'
const checkers = [WITHOUT_MANAGER, NOT_MANAGEMENT]

export default function EmployeesTable() {
  const [filters, setFilters] = useState(checkers)
  const [chosenUser, setChosenUser] = useState<QueryType['employees'][0] | null>(null)

  // Get all employees
  const { data, loading } = useQuery<QueryType>(getEmployees)
  const employees = data?.employees.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

  // Get management group
  const { data: accessGroup } = useQuery<{ getMembersOf: string[] }>(getMembersOfQuery, {
    variables: { group: 'MANAGEMENT' },
  })
  const managementGroup = accessGroup?.getMembersOf?.map(e => e.toLowerCase())

  // Card for employees table
  const Card = ({ employee }: { employee: EmployeeDetails }) => (
    <EmployeeCard
      employee={employee}
      noLink
      cardProps={{
        hoverable: false,
        bordered: false,
        style: { backgroundColor: 'transparent' },
      }}
    />
  )

  // Table columns
  let columns = [
    {
      title: 'Employee',
      key: 'employee',
      ...TableSearch('name'),
      render: (employee: EmployeeDetails) => <Card employee={employee} />,
      sorter: (a: EmployeeDetails, b: EmployeeDetails): number =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    },
    {
      title: 'Manager',
      key: 'manager',
      ...TableSearch('name', 'agileManager'),
      render: (employee: Employee & { agileManager: EmployeeDetails }) =>
        employee?.agileManager ? (
          <Card employee={employee.agileManager} />
        ) : (
          <div style={{ color: 'lightgray', fontStyle: 'italic' }}>(not assigned)</div>
        ),
      sorter: (
        a: EmployeeDetails & { agileManager: EmployeeDetails },
        b: EmployeeDetails & { agileManager: EmployeeDetails },
      ): number => {
        if (!a.agileManager?.name && b.agileManager?.name) return -1
        if (a.agileManager?.name && !b.agileManager?.name) return 1
        return a.agileManager?.name < b.agileManager?.name
          ? -1
          : a.agileManager?.name > b.agileManager?.name
          ? 1
          : 0
      },
    },
  ]

  // Filter employees by default - with not assigned manager and without 'MANAGEMENT' access group
  const filteredEmployees = employees?.filter(e => {
    let accept = [true]
    if (filters.includes(WITHOUT_MANAGER)) {
      accept.push(!e.agileManager)
    }
    if (filters.includes(NOT_MANAGEMENT) && !!managementGroup) {
      accept.push(!managementGroup.includes(e.email.toLowerCase()))
    }
    return accept.every(e => e)
  })

  return (
    <>
      <div style={{ maxWidth: 'fit-content', margin: '0 0 20px 20px', padding: '10px' }}>
        <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>
          Employees filters
        </div>
        <Checkbox.Group
          options={checkers}
          defaultValue={checkers}
          onChange={(checkedValues: any) => setFilters(checkedValues)}
          style={{ display: 'flex', flexDirection: 'column' }}
        />
      </div>

      <Table
        loading={loading}
        tableLayout="fixed"
        dataSource={filteredEmployees}
        pagination={false}
        columns={columns}
        rowKey="id"
        size="small"
        onRow={record => ({
          onClick: () => setChosenUser(record),
        })}
        style={{ maxWidth: '99%', cursor: 'pointer' }}
      />

      {chosenUser && (
        <UpdateEmployee
          employee={chosenUser}
          isOpen={!!chosenUser}
          onClose={() => setChosenUser(null)}
        />
      )}
    </>
  )
}
