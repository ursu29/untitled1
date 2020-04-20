import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Project } from '../../types'
import getProjectEmployees, { QueryType } from '../../queries/getProjectEmployees'
import EmployeesList from '../Employees/EmployeesList'
import EmployeeAvatar from '../Employees/EmployeeAvatar'
import message from '../../message'

interface Props {
  project: Pick<Project, 'id'>
}

export default function ProjectEmployees({ project }: Props) {
  const { data, loading } = useQuery<QueryType>(getProjectEmployees, {
    variables: { input: { id: project.id } },
    onError: message.error,
  })
  return (
    <EmployeesList
      loading={loading}
      employees={data?.projects?.[0].employees}
      Avatar={EmployeeAvatar}
    />
  )
}
