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
}

function EmployeeGroup({ title, employees }: Props) {
  const [showMore, setShowMore] = useState(false)

  if (!employees.length) {
    return null
  }

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
          <EmployeeCard employee={i} />
        ))}
      </div>
    </div>
  )
}

export default EmployeeGroup
