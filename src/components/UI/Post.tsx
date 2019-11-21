import React from 'react'
import { Post, Employee } from '../../types'
import { Typography } from 'antd'
import Markdown from 'react-markdown'
import EmployeeLink from './EmployeeLink'
import { Link } from 'react-router-dom'

const { Text, Title } = Typography

type PostPick = Pick<
  Post,
  'id' | 'title' | 'body' | 'bodyTranslated' | 'createdAt' | 'updatedAt'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
}

interface Props {
  post: PostPick
}

export default function PostItem({ post }: Props) {
  return (
    <>
      <Text>{post.createdAt}</Text>
      <Title level={3} style={{ marginTop: 8 }}>
        {post.title}
      </Title>
      <Markdown source={post.body} />
      <EmployeeLink employee={post.createdBy} />
    </>
  )
}
