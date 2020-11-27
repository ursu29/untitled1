import React from 'react'
import EmployeesTable from './EmployeesTable'
import PageContent from '../UI/PageContent'
import { Typography } from 'antd'

export default function Management() {
  return (
    <PageContent style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Typography.Title style={{ paddingLeft: '60px', marginBottom: '20px' }}>
        Management
      </Typography.Title>
      <EmployeesTable />
    </PageContent>
  )
}
