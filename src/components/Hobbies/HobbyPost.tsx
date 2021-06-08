import { Typography } from 'antd'
import React from 'react'
import dayjs from 'dayjs'
import { HobbyPostBaseFragment } from '../../queries/hobbyPosts'
import RichText from '../UI/RichText'
import EmployeeLink from '../Employees/EmployeeLink'
import HobbyTag from './HobbyTag'

const { Text, Title, Paragraph } = Typography

type Props = {
  post: HobbyPostBaseFragment
}

const HobbyPost = ({ post }: Props) => (
  <div>
    <div>
      {post.createdAt && <Text>{dayjs(post.createdAt).format('YYYY MMM DD HH:MM')}</Text>}
      <Title level={3} style={{ marginTop: 8 }}>
        {post.title}
      </Title>

      <RichText text={post.body} />
    </div>

    <div>
      {post.hobbies && (
        <Paragraph>
          {post.hobbies.map(hobby => (
            <HobbyTag key={hobby.id} hobby={hobby} />
          ))}
        </Paragraph>
      )}
    </div>
    {post.createdBy && <EmployeeLink employee={post.createdBy} />}
  </div>
)

export default HobbyPost
