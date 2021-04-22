import React from 'react'
import EmployeesTable from './EmployeesTable'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'

export default function Management() {
  return (
    <>
      <PageHeader title="Management" />
      <PageContent style={{ paddingLeft: 0, paddingRight: 0 }}>
        <EmployeesTable />
      </PageContent>
    </>
  )
}
