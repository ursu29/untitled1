import React from 'react'
import gql from 'graphql-tag'
import { Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import Avatar from '../Avatar'

interface Props {
  employeeId: string
}

const query = gql`
  query getEmployeeName($id: ID!) {
    employee(id: $id) {
      id
      name
      email
    }
  }
`

type QueryType = {
  employee: Pick<Employee, 'id' | 'name' | 'email'>
}

export default function BookingEmployee({ employeeId: id }: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, { variables: { id } })

  if (!data) return null
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error :(</div>

  const employee = data.employee

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: 'max-content',
      }}
    >
      <Avatar employee={{ email: employee?.email, name: employee?.name }} size="default" />
      <div style={{ padding: '10px' }}>{employee?.name || '(undefined)'}</div>
    </div>
  )
}
