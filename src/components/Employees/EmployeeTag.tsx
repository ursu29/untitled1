import { Tag } from 'antd'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Employee } from '../../types'

interface Props {
  employee?: Pick<Employee, 'id' | 'name' | 'email'> | null
}

function EmployeeLink({ employee, history }: Props & RouteComponentProps) {
  if (!employee) return <div>Unknown</div>
  // return <Link to={getEmployeeLink(employee.email)}>{employee.name}</Link>
  return (
    <Tag
      style={{ cursor: 'pointer', marginBottom: 4 }}
      onClick={e => {
        e.preventDefault()
        history.push(getEmployeeLink(employee.email))
      }}
    >
      {employee.name}
    </Tag>
  )
}

export default withRouter(EmployeeLink)
