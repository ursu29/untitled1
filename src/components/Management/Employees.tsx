import { useQuery, useMutation } from '@apollo/react-hooks'
import { Checkbox, Table, Switch } from 'antd'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import fragments, { EmployeeDetails } from '../../fragments'
import { Employee, LOCATION } from '../../types'
import EmployeeCard from '../Employees/EmployeeCard.new'
import UpdateEmployee from '../Employees/UpdateEmployee'
import TableSearch from '../UI/TableSearch'
import message from '../../message'
import {
  getMembersOfAccessGroup,
  updateAccessGroup,
  GetMembersOfAccessGroupType,
} from '../../queries/accessGroups'
import getLocationName from '../../utils/getLocationName'

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

type QueryType = {
  employees: (EmployeeDetails & { agileManager: EmployeeDetails })[]
}

const WITHOUT_MANAGER = 'Without manager only'
const NOT_MANAGEMENT = 'Exclude exceptions'
const checkers = [WITHOUT_MANAGER, NOT_MANAGEMENT]

export default function Employees() {
  const [filters, setFilters] = useState(checkers)
  const [chosenUser, setChosenUser] = useState<QueryType['employees'][0] | null>(null)
  const [exceptionsModifying, setExceptionsModifying] = useState(false)

  // Get all employees
  const { data, loading } = useQuery<QueryType>(getEmployees)
  const employees = data?.employees.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

  // Get management group
  const { data: accessGroup } = useQuery<GetMembersOfAccessGroupType>(getMembersOfAccessGroup, {
    variables: { group: 'MANAGEMENT' },
  })
  const managementGroup = accessGroup?.getMembersOf?.map(e => e.id)

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

  // Modify management group - "exceptions"
  const [modifyManagementGroup] = useMutation(updateAccessGroup, {
    refetchQueries: [{ query: getMembersOfAccessGroup, variables: { group: 'MANAGEMENT' } }],
    onCompleted: () => message.success('Group has been modified'),
    onError: message.error,
  })

  // Table columns
  let columns = [
    {
      title: 'Employee',
      key: 'employee',
      width: '43%',
      ...TableSearch('name'),
      render: (employee: EmployeeDetails) => <Card employee={employee} />,
      sorter: (a: EmployeeDetails, b: EmployeeDetails): number =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    },
    {
      title: 'Employee Location',
      key: 'location',
      dataIndex: 'location',
      width: '14%',
      filters: Object.keys(LOCATION).map(e => ({ text: getLocationName(e as LOCATION), value: e })),
      render: (_: any, i: any) => {
        return <span>{getLocationName(i.location)}</span>
      },
      onFilter: (value: any, record: EmployeeDetails) => record.location === value,
    },
    {
      title: 'Manager',
      key: 'manager',
      width: '43%',
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
    if (filters.includes(NOT_MANAGEMENT) && !!managementGroup?.length) {
      accept.push(!managementGroup.includes(e.id))
    }
    return accept.every(e => e)
  })

  // Checkbox 'Add to exceptions'
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      modifyManagementGroup({
        variables: {
          input: {
            name: 'MANAGEMENT',
            members: selectedRowKeys,
          },
        },
      })
    },
    selectedRowKeys: filteredEmployees?.filter(e => managementGroup?.includes(e.id)).map(e => e.id),
  }

  return (
    <>
      <div style={{ maxWidth: 'fit-content', margin: '0 0 20px 20px', padding: '10px' }}>
        <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>
          Employees filters
        </div>
        <Checkbox.Group
          options={checkers}
          value={filters}
          disabled={exceptionsModifying}
          onChange={(checkedValues: any) => setFilters(checkedValues)}
          style={{ display: 'flex', flexDirection: 'column' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
          <Switch
            size="small"
            onChange={(checked: boolean) => {
              setFilters(checked ? [] : checkers)
              setExceptionsModifying(checked)
            }}
            style={{ marginRight: '7px' }}
          />
          Edit exceptions
        </div>
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
          onClick: () => (!exceptionsModifying ? setChosenUser(record) : null),
        })}
        rowSelection={
          exceptionsModifying
            ? {
                type: 'checkbox',
                hideSelectAll: true,
                ...rowSelection,
              }
            : undefined
        }
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
