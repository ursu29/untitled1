import { useQuery } from "@apollo/client";
import React from 'react'
import { Project } from '../../types'
import getProjectEmployees, { QueryType } from '../../queries/getProjectEmployees'
import EmployeesList from '../Employees/EmployeesList'
import message from '../../message'

interface Props {
  project: Pick<Project, 'id'>
}

export default function ProjectEmployees({ project }: Props) {
  const { data, loading } = useQuery<QueryType>(getProjectEmployees, {
    variables: { id: project.id },
    onError: message.error,
  })

  return (
    <EmployeesList
      loading={loading}
      employees={data?.project?.employees}
      showCapacity={true}
      projectId={project.id}
    />
  )
}
