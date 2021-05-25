import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Row, Col, Tag, Input, Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { getHobbyLink } from '../../paths'
import {
  useUpdateEmployeeAboutMutation,
  useGetEmployeeSummaryQuery,
} from '../../queries/employeeSummary'
import { Employee } from '../../types/graphql'
import message from '../../message'
import Skeleton from '../UI/Skeleton'

const HobbyRow = styled(Row)`
  margin-top: 8px;
`

const HobbyTag = styled(Tag)`
  margin-right: 8px;
  margin-bottom: 8px;
`

const HobbyItem = styled(Link)`
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  &:last-child {
    padding-right: 0;
  }
  &:hover {
    color: #1890ff;
  }
`

const HobbyEmpty = styled(Typography.Paragraph)`
  color: gray;
  font-style: italic;
`

const NewHobbyButton = styled(Button)`
  font-size: 12px;
`

type Props = {
  employee?: Pick<Employee, 'id'>
  editable?: boolean
}

export default function EmployeeSummary({ employee, editable }: Props) {
  const id = employee?.id || ''

  const { data, loading } = useGetEmployeeSummaryQuery({
    variables: { id },
    skip: !id,
  })
  const [updateAbout] = useUpdateEmployeeAboutMutation({
    onCompleted: () => message.success('About have been updated'),
    onError: message.error,
  })

  if (!employee) return null

  const hobbies = data?.employee?.hobbies || []
  const about = data?.employee?.about || ''

  const onSummaryUpdate = (text: string) => {
    updateAbout({
      variables: {
        input: {
          id,
          about: text,
        },
      },
    })
  }

  return (
    <Skeleton loading={loading} active>
      <HobbyRow gutter={16}>
        <Col span={24} md={12}>
          <Typography.Title level={4}>About</Typography.Title>
          {editable ? (
            <Input.TextArea
              defaultValue={about}
              onBlur={event => onSummaryUpdate(event.target.value)}
              autoSize={{ minRows: 4 }}
            />
          ) : (
            <Typography.Text>{about}</Typography.Text>
          )}
        </Col>

        <Col span={24} md={12}>
          <Card>
            <Typography.Title level={5}>Hobbies</Typography.Title>
            {hobbies.length > 0 ? (
              hobbies.map(hobby => (
                <HobbyTag key={hobby.id}>
                  <HobbyItem to={getHobbyLink(hobby.id)}>{hobby.name}</HobbyItem>
                </HobbyTag>
              ))
            ) : (
              <HobbyEmpty>Employee has no hobbies</HobbyEmpty>
            )}
            {editable && (
              <NewHobbyButton icon={<PlusOutlined />} size="small">
                Add New Hobby
              </NewHobbyButton>
            )}
          </Card>
        </Col>
      </HobbyRow>
    </Skeleton>
  )
}
