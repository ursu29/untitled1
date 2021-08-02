import { gql, useQuery } from '@apollo/client'
import { Button, Popconfirm, Space, Tooltip, Typography } from 'antd'
import React from 'react'
import message from '../../message'
import { GetEmployeeDetailedQuery, useUpdateEmployeeMutation } from '../../queries/employees'
import EmployeeCard from './EmployeeCard'

interface Props {
  employee: GetEmployeeDetailedQuery['employeeByEmail']
}

// const queryOne2oneRequest = gql`
//   query ($email: String!) {
//     employeeByEmail(email: $email) {
//       id
//       one2oneRequest
//     }
//   }
// `

const queryOne2oneRequest = gql`
  {
    profile {
      id
      one2oneRequest
    }
  }
`

export default function EmployeeManager({ employee }: Props) {
  const { data: one2OneRequestData } = useQuery(queryOne2oneRequest, {
    skip: !employee,
  })

  const isOne2oneRequest = one2OneRequestData?.profile?.one2oneRequest

  const [one2oneRequest] = useUpdateEmployeeMutation({
    onCompleted: () => message.success('Requested'),
    refetchQueries: [{ query: queryOne2oneRequest }],
    onError: message.error,
  })

  if (!employee) return null

  return (
    <div>
      <Typography.Title level={4} style={{ marginBottom: 0 }}>
        Agile manager
      </Typography.Title>
      <Space direction="vertical">
        <EmployeeCard email={employee.email} employee={employee.agileManager} />
        {employee.isMe && (
          <>
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
                  one2oneRequest({
                    variables: {
                      input: {
                        id: employee.id,
                        one2oneRequest: true,
                      },
                    },
                  })
                }}
                okText="Yes"
                cancelText="No"
                disabled={isOne2oneRequest}
              >
                <Button data-cy="oneTwoOne" disabled={isOne2oneRequest}>
                  1-2-1 request
                </Button>
              </Popconfirm>
            </Tooltip>
          </>
        )}
      </Space>
    </div>
  )
}
