import React from 'react'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Employee } from '../../types'

interface Props {
  employee?: Pick<Employee, 'id' | 'name' | 'email'> | null
  className?: string
}

export default function EmployeeLink({ employee, className }: Props) {
  if (!employee) return <div>Unknown</div>
  return (
    <Link className={className} to={getEmployeeLink(employee.email)}>
      {employee.name}
    </Link>
  )
}
