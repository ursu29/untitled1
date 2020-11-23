import React from 'react'
import gql from 'graphql-tag'
import { Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import Avatar from '../Avatar'

interface Props {
  employeeEmail: string
}

const query = gql`
  query getEmployeeName($email: String!) {
    employeeByEmail(email: $email) {
      id
      name
    }
  }
`

type QueryType = {
  employeeByEmail: Pick<Employee, 'id' | 'name'>
}

export default function BookingEmployee({ employeeEmail: email }: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, { variables: { email } })

  if (!data) return null
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error :(</div>

  const employee = data.employeeByEmail

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: 'max-content',
      }}
    >
      <Avatar employee={{ email, name: employee.name }} size="default" />
      <div style={{ padding: '10px' }}>{employee?.name}</div>
    </div>
  )
}
