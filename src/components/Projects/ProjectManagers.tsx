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
}

export default function ProjectManagers({ project }: Props) {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { input: project },
    onError: message.error,
  })
  if (!loading && !data) return null
  const leaders = data?.projects[0]?.leaders || []
  return (
    <Section title={leaders.length > 1 ? 'Managers' : 'Manager'}>
      <Skeleton active avatar line loading={loading}>
        {leaders?.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
        {!leaders.length && <div>Project has no manager</div>}
      </Skeleton>
    </Section>
  )
}
