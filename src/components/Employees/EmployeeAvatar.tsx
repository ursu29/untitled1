import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Employee } from '../../types'
import { Avatar } from 'antd'
import { AvatarProps } from 'antd/es/avatar'
import VisibilitySensor from 'react-visibility-sensor'
import { Tooltip } from 'antd'

const query = gql`
  query getEmployee($email: String!) {
    employeeByEmail(email: $email) {
      id
      name
      avatar
    }
  }
`

interface Props {
  email: string
  size: AvatarProps['size']
  shape?: AvatarProps['shape']
  showTooltip?: boolean
  loadImmediately?: boolean
}

type QueryType = {
  employeeByEmail: Pick<Employee, 'id' | 'name' | 'avatar'>
}

export default ({
  email,
  size,
  shape = 'circle',
  showTooltip = false,
  loadImmediately = true,
}: Props) => {
  const [show, toggleShow] = useState(loadImmediately)
  const [load, { data, called }] = useLazyQuery<QueryType, { email: string }>(query, {
    variables: { email },
  })

  useEffect(() => {
    if (show && !called) load()
  })

  const employee = data?.employeeByEmail

  const avatar = (
    <Avatar size={size} shape={shape} src={employee?.avatar} alt={employee?.name}></Avatar>
  )

  return (
    <VisibilitySensor onChange={toggleShow}>
      {showTooltip ? (
        <Tooltip key={employee?.id} placement="top" title={employee?.name}>
          {avatar}
        </Tooltip>
      ) : (
        avatar
      )}
    </VisibilitySensor>
  )
}
