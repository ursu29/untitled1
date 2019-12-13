import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeDetails from '../Employees/EmployeeDetails'
import EmployeeMatrices from '../EmployeeMatrices/EmployeeMatrices'
import Tabs from '../UI/Tabs'

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
      body: <div>Skills</div>,
    },
    {
      title: 'Bookmarks',
      icon: 'book',
      key: 'bookmarks',
      body: <div>Bookmarks</div>,
    },
  ]

  if (employee?.access.write) {
    tabs.push({
      title: 'Matrices',
      key: 'matrices',
      icon: 'number',
      body: <EmployeeMatrices id={employee.id} />,
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
