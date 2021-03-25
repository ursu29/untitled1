import React, { useState } from 'react'
import { EmployeeDetails } from '../../fragments'
import { Typography, Button, Tooltip, Popconfirm } from 'antd'
import EmployeeCard from './EmployeeCard.new'
import { useQuery } from '@apollo/react-hooks'
import { useUpdateEmployeeMutation } from '../../queries/employees'
import message from '../../message'
import { useEmployee } from '../../utils/withEmployee'
import gql from 'graphql-tag'

const queryOne2oneRequest = gql`
  {
    profile {
      id
      one2oneRequest
    }
  }
`

export interface Props {
  title: string
  employees: EmployeeDetails[]
  one2one?: boolean
  isMe?: boolean
}

function EmployeeGroup({ title, employees, one2one, isMe }: Props) {
  const user = useEmployee()

  const { data: one2OneRequestData } = useQuery(queryOne2oneRequest)
  const isOne2oneRequest = one2OneRequestData?.profile?.one2oneRequest

  const [update] = useUpdateEmployeeMutation({
    onCompleted: () => message.success('Updated'),
    refetchQueries: [{ query: queryOne2oneRequest }],
    onError: e => {
      message.error(e)
    },
  })

  const [showMore, setShowMore] = useState(false)

  if (!employees.length) {
    return null
  }

  return (
    <div data-cy="employeeCard">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography.Title
            level={4}
            style={{
              fontWeight: 400,
              fontSize: 18,
            }}
          >
            {title}
          </Typography.Title>

          {one2one && isMe && (
            <Tooltip
              placement="right"
              title={
                isOne2oneRequest
                  ? 'You have already requested one-2-one'
                  : 'Create one-2-one request for your manager'
              }
            >
              <Popconfirm
                placement="top"
                title={'Are you sure you want to create request?'}
                onConfirm={() => {
                  update({
                    variables: {
                      input: {
                        id: user.employee.id,
                        one2oneRequest: true,
                      },
                    },
                  })
                }}
                okText="Yes"
                cancelText="No"
                disabled={isOne2oneRequest}
              >
                <Button
                  data-cy="oneTwoOne"
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginLeft: '10px' }}
                  disabled={isOne2oneRequest}
                >
                  1-2-1 request
                </Button>
              </Popconfirm>
            </Tooltip>
          )}
        </div>

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
          <EmployeeCard employee={i} key={i?.id} cardProps={{ bordered: false, hoverable: true }} />
        ))}
      </div>
    </div>
  )
}

export default EmployeeGroup
