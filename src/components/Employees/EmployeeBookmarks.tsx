import React from 'react'
import query, { QueryType } from '../../queries/getBookmarks'
import { Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import Bookmarks from '../Bookmarks/Bookmarks'

interface Props {
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeBookmarks({ employee }: Props) {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { input: { employee: employee?.id } },
    skip: !employee,
  })

  if (!employee) return <div>Employee is not found</div>

  return <Bookmarks loading={loading} bookmarks={data?.bookmarks} />
}
