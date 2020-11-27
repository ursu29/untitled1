import React from 'react'
import { EmployeeDetails } from '../../fragments'
import EmployeeGroup from './EmployeeGroup.new'

interface Props {
  employee: EmployeeDetails | null
  isMe: boolean
}

function EmployeeManager({ employee, isMe }: Props) {
  if (!employee) return null

  return <EmployeeGroup title="Agile manager" employees={[employee]} one2one isMe={isMe} />
}

export default EmployeeManager
