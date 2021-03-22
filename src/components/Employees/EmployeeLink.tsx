import React from 'react'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Employee } from '../../types'

interface Props {
  employee?: Pick<Employee, 'id' | 'name' | 'email'> | null
}

export default function EmployeeLink({ employee }: Props) {
  if (!employee) return <div>Unknown</div>
  return <Link to={getEmployeeLink(employee.email)}>{employee.name}</Link>
}
