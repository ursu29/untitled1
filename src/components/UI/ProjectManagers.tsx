import React from 'react'
import { Project } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import query, { QueryType } from '../../queries/getProjectManagers'
import Skeleton from '../UI/Skeleton'
import EmployeeCard from '../Employees/EmployeeCard'
import Section from '../UI/Section'
import message from '../../message'

interface Props {
  project: Pick<Project, 'id'>
  title?: string
}

export default function ProjectManagers({ project, title }: Props) {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { id: project.id },
    onError: message.error,
  })
  if (!loading && !data) return null
  const scrumMasters = data?.project.scrumMasters ?? []
  const agileManagers =
    data?.project.employees
      .map(i => i.agileManager)
      .filter(i => i)
      .filter((value, index, self) => {
        return self.indexOf(value) === index
      }) || []

  return (
    <Skeleton active avatar line loading={loading}>
      <Section
        title={
          !title
            ? scrumMasters.length > 1
              ? 'Scrum masters'
              : 'Scrum master'
            : scrumMasters.length > 1
            ? title + 's'
            : title
        }
      >
        {scrumMasters.map(employee => (
          <EmployeeCard key={employee.id} email={employee.email} employee={employee} />
        ))}
        {!scrumMasters.length && <div>Project has no scrum masters</div>}
      </Section>
      <Section
        title={
          !title
            ? agileManagers.length > 1
              ? 'Agile managers'
              : 'Agile manager'
            : agileManagers.length > 1
            ? title + 's'
            : title
        }
      >
        {agileManagers.map(employee => {
          if (!employee) return null
          return <EmployeeCard key={employee.id} email={employee.email} employee={employee} />
        })}
        {!agileManagers.length && <div>Project has no agile managers</div>}
      </Section>
    </Skeleton>
  )
}
