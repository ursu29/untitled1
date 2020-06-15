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
    variables: { input: project },
    onError: message.error,
  })
  if (!loading && !data) return null
  const leaders = data?.projects[0]?.leaders || []
  return (
    <Section
      title={
        !title
          ? leaders.length > 1
            ? 'Managers'
            : 'Manager'
          : leaders.length > 1
          ? title + 's'
          : title
      }
    >
      <Skeleton active avatar line loading={loading}>
        {leaders?.map(employee => (
          <EmployeeCard key={employee.id} email={employee.email} employee={employee} />
        ))}
        {!leaders.length && <div>Project has no manager</div>}
      </Skeleton>
    </Section>
  )
}
