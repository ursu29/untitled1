import React from 'react'
import { Project } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import query, { QueryType } from '../../queries/getProjectManagers'
import Skeleton from '../UI/Skeleton'
import message from '../../message'
import EmployeeGroup from '../Employees/EmployeeGroup.new'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { EmployeeDetails } from '../../fragments'
import { Employee } from '../../types'

interface Props {
  project: Pick<Project, 'id'>
  title?: string
}

type EmployeePick = EmployeeDetails & { avatar: Employee['avatar'] }

function ProjectManagers({ project, title, history }: Props & RouteComponentProps) {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { id: project.id },
    onError: message.error,
  })
  if (!loading && !data) return null
  const scrumMasters = data?.project.scrumMasters ?? []
  let agileManagers: EmployeePick[] = []

  data?.project.employees.forEach(employee => {
    if (employee.agileManager) {
      agileManagers.push(employee.agileManager)
    }
  })

  agileManagers = agileManagers.filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  return (
    <Skeleton active avatar loading={loading}>
      <EmployeeGroup
        title={scrumMasters.length > 1 ? 'Scrum masters' : 'Scrum master'}
        employees={scrumMasters}
        onClick={employee => {
          history.push(getEmployeeLink(employee.email))
        }}
      />
      <EmployeeGroup
        title={agileManagers.length > 1 ? 'Agile managers' : 'Agile manager'}
        employees={agileManagers}
        onClick={employee => {
          history.push(getEmployeeLink(employee.email))
        }}
      />
    </Skeleton>
  )
}

export default withRouter(ProjectManagers)
