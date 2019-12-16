import React from 'react'
import { Employee } from '../../types'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Typography, Button } from 'antd'

const { Text } = Typography

interface Props {
  employee: Pick<Employee, 'id' | 'name' | 'email'>
}

export default function EmployeeLink({ employee }: Props) {
  return <Link to={getEmployeeLink(employee.email)}>{employee.name}</Link>
}
