import { Tag, Typography } from 'antd'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import PATHS from '../../paths'
import { Employee, Post, Tag as TagType } from '../../types'
import markdownToHtml from '../../utils/markdownToHtml'
import EmployeeLink from '../Employees/EmployeeLink'
import Gallery from '../UI/Gallery'

const Wrapper = styled.div`
  ul,
  ol {
    margin-bottom: 1rem;
  }
  img {
    max-width: 100%;
    padding: 8px 0;
  }
`
const { Text, Title, Paragraph } = Typography

type PostPick = Pick<
  Post,
  'id' | 'title' | 'body' | 'isTranslated' | 'createdAt' | 'updatedAt' | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<TagType, 'id' | 'name' | 'description'>[]
}

interface Props extends RouteComponentProps {
  post: PostPick
  edit?: any
}

function PostItem({ post, edit, history }: Props) {
  return (
    <>
      <Wrapper>
        <Text>
          {post.createdAt} {edit}
        </Text>
        <Title level={2} style={{ marginTop: 8 }}>
          {post.title}
        </Title>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownToHtml(post.body),
          }}
        />
      </Wrapper>

      <p>
        {post.tags && (
          <Paragraph>
            {post.tags?.map((tag) => (
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
