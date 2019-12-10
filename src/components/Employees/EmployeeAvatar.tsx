import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Employee } from '../../types'
import Avatar from '../UI/Avatar'
import VisibilitySensor from 'react-visibility-sensor'

const query = gql`
  query getEmployees($input: EmployeesInput) {
    employees(input: $input) {
      id
      avatar
    }
  }
`

interface Props {
  id: string
}

export default ({ id }: Props) => {
  const [show, toggleShow] = useState(false)
  const [load, { data, loading, called }] = useLazyQuery<{
    employees: Pick<Employee, 'id' | 'avatar'>[]
  }>(query, {
    variables: { input: { id } },
  })

  useEffect(() => {
    if (show && !called) load()
  })

  return (
    <VisibilitySensor onChange={toggleShow}>
      <Avatar size={60} shape="square" src={data?.employees?.[0]?.avatar}></Avatar>
    </VisibilitySensor>
  )
}
