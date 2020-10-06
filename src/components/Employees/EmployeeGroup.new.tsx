import React, { useState } from 'react'
import { EmployeeDetails } from '../../fragments'
import { Typography } from 'antd'
import EmployeeCard from './EmployeeCard.new'

type EmployeePick = EmployeeDetails & {
  avatar: string
}

export interface Props {
  title: string
  employees: EmployeePick[]
  onClick: (employee: EmployeePick) => void
}

function EmployeeGroup({ title, employees, onClick }: Props) {
  const [showMore, setShowMore] = useState(false)
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title
          level={4}
          style={{
            fontWeight: 400,
            fontSize: 18,
          }}
        >
          {title}
        </Typography.Title>
        {employees.length > 2 && (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setShowMore(!showMore)
            }}
          >
            <Typography.Text underline type="secondary">
              See {showMore ? 'less' : `${employees.slice(2).length} more`}
            </Typography.Text>
          </div>
        )}
      </div>
      <div>
        {employees.slice(0, showMore ? employees.length : 2).map(i => (
          <EmployeeCard employee={i} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}

export default EmployeeGroup
