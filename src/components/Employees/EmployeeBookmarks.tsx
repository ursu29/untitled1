import { useQuery } from '@apollo/client'
import React from 'react'
import query, { QueryType } from '../../queries/getBookmarks'
import { Employee } from '../../types'
import Bookmarks from '../Bookmarks/Bookmarks'

interface Props {
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeBookmarks({ employee }: Props) {
  const variables = { input: { employee: employee?.id } }
  const { data, loading } = useQuery<QueryType>(query, {
    variables,
    skip: !employee,
  })

  if (!employee) return <div>Employee is not found</div>

  return (
    <Bookmarks
      refetchQueries={[{ query, variables }]}
      loading={loading}
      bookmarks={data?.bookmarks}
    />
  )
}
