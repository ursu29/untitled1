import React from 'react'
import { EmployeeDetails } from '../../fragments'
import EmployeeGroup from './EmployeeGroup.new'

interface Props {
  employee: EmployeeDetails | null
}

function EmployeeManager({ employee }: Props) {
  if (!employee) return null

  return <EmployeeGroup title="Agile manager" employees={[employee]} one2one />
}

export default EmployeeManager
