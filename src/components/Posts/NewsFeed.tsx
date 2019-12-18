import { useQuery } from '@apollo/react-hooks'
import FuzzySearch from 'fuzzy-search'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import PATHS from '../../paths'
import getPosts, { QueryType } from '../../queries/getPosts'
import TagSelect from '../Tags/TagSelect'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Post from '../UI/Post'
import Timeline from '../UI/Timeline'
import UpdatePost from './UpdatePost'

interface Props extends RouteComponentProps {
  editable?: boolean
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

function NewsFeed({ editable, location, history }: Props) {
  const queryTags = getQueryTags(location.search)
  const [filter, setFilter] = useState('')
  const [showTagFilter, setShowTagFilter] = useState(Boolean(queryTags.length))
  const [tagFilter, setTagFilter] = useState<{ key: string }[]>(queryTags)
  const { data, loading, error } = useQuery<QueryType>(getPosts)

  useEffect(() => {
    const queryTags = getQueryTags(location.search)
    if (tagFilter.map(i => i.key).toString() !== queryTags.map(i => i.key).toString()) {
      setTagFilter(queryTags)
      setShowTagFilter(true)
    }
  }, [setTagFilter, location, tagFilter])

  if (error) return <div>Error :(</div>

  if (!loading && !data?.posts?.length) return <div>No posts yet</div>

  const posts = data?.posts || []
  const searcher = new FuzzySearch(
    posts.filter(i => {
      if (!tagFilter.length) return true
      const tagFilterIds = tagFilter.map(i => i.key)
      const tagIds = i.tags?.map(i => i.name) || []
      return tagFilterIds.every(i => tagIds.includes(i))
    }),
    ['title', 'body'],
  )
  const filteredPosts: QueryType['posts'] = searcher.search(filter.trim())

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input placeholder="Find post" value={filter} onChange={value => setFilter(value)} />
        <Button
          style={{ marginLeft: 8 }}
          icon="filter"
          onClick={() => setShowTagFilter(!showTagFilter)}
        />
      </div>
      {showTagFilter && (
        <div style={{ marginTop: 8 }}>
          <TagSelect
            value={tagFilter.map(i => ({ ...i, label: i.key }))}
            allowAddNew={false}
            multiple
            onChange={tags => {
              setTagFilter(tags)
              history.push({
                pathname: PATHS.POSTS,
                search: tags ? '?' + tags.map(i => 'tag=' + i.key).join('&') : '',
              })
            }}
          />
        </div>
      )}
      <br />
      <br />
      <Timeline
        loading={loading}
        items={filteredPosts.map(i => ({
          id: i.id,
          render: <Post edit={editable ? <UpdatePost post={i} /> : null} post={i} />,
        }))}
      />
    </>
  )
}

export default withRouter(NewsFeed)
