import { Tag, Typography } from 'antd'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
//@ts-ignore
import * as Showdown from 'showdown'
import PATHS from '../../paths'
import { Employee, Post, Tag as TagType } from '../../types'
import Gallery from '../UI/Gallery'
import EmployeeLink from './EmployeeLink'
import styled from 'styled-components'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const Wrapper = styled.div`
  img {
    max-width: 100%;
    padding: 8px 0;
  }
`
const { Text, Title, Paragraph } = Typography

type PostPick = Pick<
  Post,
  | 'id'
  | 'title'
  | 'titleTranslated'
  | 'body'
  | 'bodyTranslated'
  | 'createdAt'
  | 'updatedAt'
  | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<TagType, 'id' | 'name' | 'description'>[]
}

interface Props extends RouteComponentProps {
  post: PostPick
  edit?: any
  showTranslated?: boolean
}

function PostItem({ post, showTranslated, edit, history }: Props) {
  return (
    <>
      <Wrapper>
        <Text>
          {post.createdAt} {edit}
        </Text>
        <Title level={3} style={{ marginTop: 8 }}>
          {showTranslated ? post.titleTranslated : post.title}
        </Title>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(showTranslated ? post.bodyTranslated : post.body),
          }}
        />
      </Wrapper>

      <p>
        {post.tags && (
          <Paragraph>
            {post.tags?.map(tag => (
              <Tag
                key={tag.id}
                color="blue"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push({
                    pathname: PATHS.POSTS,
                    search: '?tag=' + tag.name,
                  })
                }}
              >
                {tag.name}
              </Tag>
            ))}
          </Paragraph>
        )}
      </p>
      <Gallery images={post.images} />
      <EmployeeLink employee={post.createdBy} />
    </>
  )
}

export default withRouter(PostItem)
