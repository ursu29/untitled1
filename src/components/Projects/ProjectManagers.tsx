import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { EmployeeDetails } from '../../fragments'
import message from '../../message'
import query, { QueryType } from '../../queries/getProjectManagers'
import { Employee, Project } from '../../types'
import EmployeeGroup from '../Employees/EmployeeGroup.new'
import Skeleton from '../UI/Skeleton'

interface Props {
  project: Pick<Project, 'id'>
  title?: string
}

type EmployeePick = EmployeeDetails & { avatar: Employee['avatar'] }

function ProjectManagers({ project }: Props) {
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
      />
      <EmployeeGroup
        title={agileManagers.length > 1 ? 'Agile managers' : 'Agile manager'}
        employees={agileManagers}
      />
    </Skeleton>
  )
}

export default ProjectManagers