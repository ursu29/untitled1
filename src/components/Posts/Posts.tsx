import React, { useState, useEffect, PropsWithChildren } from 'react'
import { Skeleton, Timeline, Input, Button, Switch } from 'antd'
import queryString from 'query-string'
import PostItem from './Post'
import { Post, Employee, Tag } from '../../types'
import PATHS from '../../paths'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { NEWS_FEED_WIDTH } from '../../config'
import TagSelect from '../Tags/TagSelect'
import CreatePost from './CreatePost'
import UpdatePost from './UpdatePost'

type PostPick = Pick<
  Post,
  'id' | 'title' | 'body' | 'isTranslated' | 'createdAt' | 'updatedAt' | 'locations' | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<Tag, 'id' | 'name' | 'description'>[]
}

interface Props extends PropsWithChildren<any>, RouteComponentProps {
  loading?: boolean
  posts?: PostPick[]
  editable: boolean
}

function getQueryTags(query: string) {
  const values = queryString.parse(query)
  const queryTags = values.tag
    ? Array.isArray(values.tag)
      ? values.tag.map(key => ({ key }))
      : [{ key: values.tag }]
    : []
  return queryTags
}

function Posts({ posts, history, location, loading, ...props }: Props) {
  const queryTags = getQueryTags(location.search)
  const [filter, setFilter] = useState('')
  const [showTranslated, setTranslated] = useState(false)
  const [showTagFilter, setShowTagFilter] = useState(Boolean(queryTags.length))
  const [tagFilter, setTagFilter] = useState<{ key: string }[]>(queryTags)

  useEffect(() => {
    const queryTags = getQueryTags(location.search)
    if (tagFilter.map(i => i.key).toString() !== queryTags.map(i => i.key).toString()) {
      setTagFilter(queryTags)
      setShowTagFilter(true)
    }
  }, [setTagFilter, location, tagFilter])

  const filteredPosts = (posts || [])
    .filter(i => {
      if (!tagFilter.length) return true
      const tagFilterIds = tagFilter.map(i => i.key)
      const tagIds = i.tags?.map(i => i.name) || []
      return tagFilterIds.every(i => tagIds.includes(i))
    })
    .filter(i => {
      if (!showTranslated) return true
      return i.isTranslated
    })
    .filter(post => {
      return (
        post.title?.toLowerCase().includes(filter.trim().toLowerCase()) ||
        post.body?.toLowerCase().includes(filter.trim().toLowerCase())
      )
    })

  return (
    <Skeleton loading={loading} active>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input placeholder="Find post" value={filter} onChange={e => setFilter(e.target.value)} />
        <Button
          style={{ marginLeft: 8 }}
          icon="filter"
          onClick={() => setShowTagFilter(!showTagFilter)}
        />
        <Switch
          checkedChildren="En"
          unCheckedChildren="All"
          onChange={() => setTranslated(!showTranslated)}
          style={{ marginLeft: 8 }}
          checked={showTranslated}
        >
          Translate
        </Switch>
        {props.editable && (
          <div style={{ marginLeft: 8 }}>
            <CreatePost />
          </div>
        )}
      </div>
      {showTagFilter && (
        <div style={{ marginTop: 8 }}>
          <TagSelect
            value={tagFilter.map(i => ({ ...i, label: i.key }))}
            allowAddNew={false}
            multiple
            onChange={(tags: any) => {
              setTagFilter(tags)
              history.push({
                pathname: PATHS.POSTS,
                search: tags ? '?' + tags.map((i: any) => 'tag=' + i.key).join('&') : '',
              })
            }}
          />
        </div>
      )}
      <br />
      <br />
      {!posts?.length && <div>No posts yet</div>}
      <Timeline style={{ maxWidth: NEWS_FEED_WIDTH }}>
        {filteredPosts?.map(post => (
          <Timeline.Item key={post.id}>
            <PostItem edit={props.editable ? <UpdatePost post={post} /> : null} post={post} />
          </Timeline.Item>
        ))}
      </Timeline>
    </Skeleton>
  )
}

export default withRouter(Posts)