import { useQuery } from '@apollo/react-hooks'
import { Typography } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { Employee } from '../../types'

interface Props {
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeMatrix({ employee }: Props) {
  const { data } = useQuery<QueryType>(getEmployeeExperiences, {
    variables: { input: { id: employee?.id } },
    skip: !employee,
  })

  if (!employee) return null

  let updatedAt: any = null

  const employeeFound = data?.employees[0]

  employeeFound?.experiences?.forEach(i => {
    if (!updatedAt || dayjs(i.updatedAt).isAfter(dayjs(updatedAt))) {
      updatedAt = i.updatedAt
    }
  })

  if (!updatedAt) return null

  return (
    <Typography.Text disabled>
      Last updated: {dayjs(updatedAt).format('DD MMM YYYY HH:mm')}
    </Typography.Text>
  )
}
