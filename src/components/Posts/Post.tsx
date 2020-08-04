import { Tag, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import VisibilitySensor from 'react-visibility-sensor'
import styled from 'styled-components'
import PATHS from '../../paths'
import { Employee, Post, Tag as TagType } from '../../types'
import markdownToHtml from '../../utils/markdownToHtml'
import EmployeeLink from '../Employees/EmployeeLink'
import dayjs from 'dayjs'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

// @ts-ignore
window.jQuery = window.$ = $

const OwlCarousel = require('react-owl-carousel')

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
  'id' | 'title' | 'body' | 'isTranslated' | 'createdAt' | 'locations' | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<TagType, 'id' | 'name' | 'description'>[]
}

interface Props extends RouteComponentProps {
  post: PostPick
  edit?: any
  isLast?: boolean
  loadMore?: (post: PostPick) => void
}

function PostItem({ post, edit, history, loadMore }: Props) {
  const [visited, setVisited] = useState(false)

  useEffect(() => {
    const galleries = document
      .getElementById(`post-${post.id}`)
      ?.getElementsByClassName('injected-image-gallery')
    if (galleries) {
      Array.from(galleries).forEach(gallery => {
        const imgLinksList = gallery.innerHTML.split(',').map(link => link.trim())
        console.log(imgLinksList)
        ReactDOM.render(
          <OwlCarousel className="owl-theme" items={1} loop margin={10}>
            {imgLinksList.map(i => (
              <img src={i} alt={i} />
            ))}
          </OwlCarousel>,
          gallery,
        )
      })
    }

    // eslint-disable-next-line
  }, [JSON.stringify(post), post.id])

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
      <div id={`post-${post.id}`}>
        <Wrapper>
          {post.createdAt && (
            <Text>
              {dayjs(post.createdAt).format('YYYY MMM DD HH:MM')} {edit}
            </Text>
          )}
          <Title level={3} style={{ marginTop: 8 }}>
            {post.title}
          </Title>
          <div
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(post.body),
            }}
          />
        </Wrapper>

        <div>
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
        </div>
        {post.createdBy && <EmployeeLink employee={post.createdBy} />}
      </div>
    </VisibilitySensor>
  )
}

export default withRouter(PostItem)
