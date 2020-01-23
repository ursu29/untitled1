import React, { useState, useEffect, PropsWithChildren } from 'react'
import { Skeleton, Timeline, Input, Button, Switch } from 'antd'
import queryString from 'query-string'
import FuzzySearch from 'fuzzy-search'
import PostItem from './Post'
import { Post, Employee, Tag } from '../../types'
import PATHS from '../../paths'
import { RouteComponentProps, withRouter } from 'react-router-dom'

type PostPick = Pick<
  Post,
  | 'id'
  | 'title'
  | 'body'
  | 'isTranslated'
  | 'titleTranslated'
  | 'bodyTranslated'
  | 'createdAt'
  | 'updatedAt'
  | 'locations'
  | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<Tag, 'id' | 'name' | 'description'>[]
}

interface Props extends PropsWithChildren<any>, RouteComponentProps {
  loading?: boolean
  posts?: PostPick[]
  CreatePost: React.FC<any>
  TagSelect: React.FC<any>
  UpdatePost: React.FC<any>
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

function Posts({
  posts,
  history,
  TagSelect,
  UpdatePost,
  CreatePost,
  location,
  loading,
  ...props
}: Props) {
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

  const searcher = new FuzzySearch(
    (posts || [])
      .filter(i => {
        if (!tagFilter.length) return true
        const tagFilterIds = tagFilter.map(i => i.key)
        const tagIds = i.tags?.map(i => i.name) || []
        return tagFilterIds.every(i => tagIds.includes(i))
      })
      .filter(i => {
        if (!showTranslated) return true
        return i.isTranslated
      }),
    showTranslated ? ['titleTranslated', 'bodyTranslated'] : ['title', 'body'],
  )
  const filteredPosts: PostPick[] = searcher.search(filter.trim())

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
      <Timeline style={{ maxWidth: 650 }}>
        {filteredPosts?.map(post => (
          <Timeline.Item key={post.id}>
            <PostItem
              edit={props.editable ? <UpdatePost post={post} /> : null}
              post={post}
              showTranslated={showTranslated}
            />
          </Timeline.Item>
        ))}
      </Timeline>
    </Skeleton>
  )
}

export default withRouter(Posts)
