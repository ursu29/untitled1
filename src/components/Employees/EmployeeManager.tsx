import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import query, { QueryType } from '../../queries/getEmployeeManager'
import { Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeGroup from './EmployeeGroup.new'

interface Props {
  employee?: {
    id: Employee['id']
    email: Employee['email']
  }
}

function EmployeeManager(props: Props & RouteComponentProps) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: { email: props.employee?.email },
    skip: !props.employee,
  })

  if (!props.employee) return null

  if (error) return <div>Error :(</div>

  const employee = data?.employeeByEmail

  return (
    <Skeleton active avatar line loading={loading}>
      {employee?.agileManager && (
        <EmployeeGroup
          title="Agile manager"
          employees={[employee.agileManager]}
          onClick={employee => {
            props.history.push(getEmployeeLink(employee.email))
          }}
        />
      )}
    </Skeleton>
  )
}

export default withRouter(EmployeeManager)
