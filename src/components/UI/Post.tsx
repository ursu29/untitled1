import { Typography } from 'antd'
import React from 'react'
import * as Showdown from 'showdown'
import { Employee, Post, File } from '../../types'
import EmployeeLink from './EmployeeLink'
import styled from 'styled-components'

const Image = styled.img`
  max-width: 300px;
  max-height: 150px;
  margin-right: ${props => props.theme.padding + 'px'};
`

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const { Text, Title } = Typography

type PostPick = Pick<
  Post,
  'id' | 'title' | 'body' | 'bodyTranslated' | 'createdAt' | 'updatedAt' | 'images'
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
      <div
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(post.body),
        }}
      />
      <EmployeeLink employee={post.createdBy} />
      <div>
        {post.images.map((image: File) => (
          <Image key={image.id} src={image.url} />
        ))}
      </div>
    </>
  )
}
