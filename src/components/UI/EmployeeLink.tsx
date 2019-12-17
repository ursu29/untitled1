import React from 'react'
import { Employee } from '../../types'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Typography, Button } from 'antd'

const { Text } = Typography

interface Props {
  employee: Pick<Employee, 'id' | 'name' | 'email'> | null
}

export default function EmployeeLink({ employee }: Props) {
  if (!employee) return <div>Unknown</div>
  return <Link to={getEmployeeLink(employee.email)}>{employee.name}</Link>
}
