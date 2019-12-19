import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeMatrices from '../EmployeeMatrices/EmployeeMatrices'
import Tabs from '../UI/Tabs'
import EmployeeBookmarks from './EmployeeBookmarks'
import EmployeeSkills from './EmployeeSkills'

interface Props extends RouteComponentProps {
  employee: Pick<Employee, 'id'>
  tab?: string
}

const query = gql`
  query getEmployees($input: EmployeesInput) {
    employees(input: $input) {
      id
      access {
        read
        write
      }
    }
  }
`

type QueryType = { employees: Pick<Employee, 'id' | 'access'>[] }

function EmployeeTabs({ match, ...props }: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: { input: { id: props.employee.id } },
  })

  if (error) return <div>Error :(</div>

  const employee = data?.employees?.[0]

  let tabs = [
    {
      title: 'Skills',
      key: 'skills',
      icon: 'crown',
      body: <EmployeeSkills employee={employee} editable={employee?.access.write || false} />,
    },
    {
      title: 'Bookmarks',
      icon: 'book',
      key: 'bookmarks',
      body: <EmployeeBookmarks employee={employee} />,
    },
  ]

  if (employee?.access.write) {
    tabs.push({
      title: 'Matrices',
      key: 'matrices',
      icon: 'number',
      body: <EmployeeMatrices employee={employee} />,
    })
    // tabs.push({
    //   title: 'Personal development',
    //   key: 'personal-development',
    //   icon: 'number',
    //   body: <div>Personal development</div>,
    // })
  }

  return (
    <Skeleton loading={loading} padding={60}>
      <Tabs tabs={tabs} tab={props.tab} />
    </Skeleton>
  )
}

export default withRouter(EmployeeTabs)
