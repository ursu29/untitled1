import { Tag, Typography } from 'antd'
import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import VisibilitySensor from 'react-visibility-sensor'
import PATHS from '../../paths'
import { Employee, Post, Tag as TagType } from '../../types'
import EmployeeLink from '../Employees/EmployeeLink'
import dayjs from 'dayjs'
import RichText from '../UI/RichText'

const { Text, Title, Paragraph } = Typography

type PostPick = Pick<
  Post,
  'id' | 'title' | 'body' | 'isTranslated' | 'createdAt' | 'locations' | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<TagType, 'id' | 'name' | 'description'>[]
}

interface Props extends RouteComponentProps {
  post: PostPick
  edit?: any
  isLast?: boolean
  isPreview?: boolean
  loadMore?: (post: PostPick) => void
}

function PostItem({ post, edit, history, isPreview, loadMore }: Props) {
  const [visited, setVisited] = useState(false)

  return (
    <VisibilitySensor
      partialVisibility
      onChange={visible => {
        if (visible) {
          if (!visited) {
            if (loadMore) loadMore(post)
          }
          setVisited(true)
        }
      }}
    >
      <div>
        <div>
          {post.createdAt && (
            <Text>
              {dayjs(post.createdAt).format('YYYY MMM DD HH:MM')} {edit}
            </Text>
          )}
          <Title level={3} style={{ marginTop: 8 }}>
            {post.title}
          </Title>

          <RichText text={post.body} />
        </div>

        <div>
          {post.tags && (
            <Paragraph>
              {post.tags?.map(tag => (
                <Tag
                  key={tag.id}
                  color="blue"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (isPreview) return
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
        </div>
        {post.createdBy && <EmployeeLink employee={post.createdBy} />}
      </div>
    </VisibilitySensor>
  )
}

export default withRouter(PostItem)
