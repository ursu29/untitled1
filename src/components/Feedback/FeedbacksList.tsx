import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from '@apollo/react-hooks'
import { Input, Select, Spin, Timeline } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ProjectSelect from '../Projects/ProjectSelect'
import {
  feedbackAccess,
  FeedbackAccessQueryType,
  FeedbackQueryType,
  getFeedbacks,
} from '../../queries/feedback'
import { FeedbackMessage } from './FeedbackMessage'

dayjs.extend(relativeTime)

const { Option } = Select

export default function FeedbacksList() {
  const [search, setSearch] = useState('')
  const [about, setAbout] = useState('')
  const [project, setProject] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const limit = 10

  const variables = {
    input: {
      search,
      about,
      project,
      limit,
      offset: 0,
    },
  }

  // Get feedbacks
  const { data, fetchMore, loading } = useQuery<FeedbackQueryType>(getFeedbacks, {
    variables,
    notifyOnNetworkStatusChange: true,
  })
  const { data: accessData } = useQuery<FeedbackAccessQueryType>(feedbackAccess)
  const feedbacks = data?.feedbacks
  const canReply = accessData?.feedbacksAccess.write

  useEffect(() => {
    setHasMore(true)
  }, [search, about, project, feedbacks])

  if (!feedbacks) return null

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '570px', marginBottom: '32px' }}>
        <Input.Search
          placeholder="Search"
          onSearch={value => setSearch(value)}
          style={{ width: '300px', margin: '0 8px 8px 0' }}
        />
        <Select
          placeholder="About"
          allowClear
          style={{ maxWidth: '120px', margin: '0 8px 8px 0' }}
          onChange={(value: any) => setAbout(value)}
        >
          <Option value="syncretis">syncretis</Option>
          <Option value="Team">Team</Option>
          <Option value="Events">Events</Option>
          <Option value="Portal">Portal</Option>
        </Select>
        <div style={{ width: '172px', margin: '0 0px 8px 0' }}>
          <ProjectSelect
            onChange={(project: any) => setProject(project)}
            wide
            placeholder="Project"
            allowClear
          />
        </div>
      </div>
      <Timeline>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={() => {
            if (loading || !hasMore) return

            fetchMore({
              variables: {
                input: {
                  search,
                  about,
                  project,
                  limit,
                  offset: feedbacks.length,
                },
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult?.feedbacks.length) setHasMore(false)
                if (!fetchMoreResult) return prev
                return { feedbacks: prev.feedbacks.concat(fetchMoreResult.feedbacks) }
              },
            })
          }}
          hasMore={hasMore}
          useWindow={true}
        >
          {feedbacks.map(feedback => (
            <Timeline.Item key={feedback.id}>
              <FeedbackMessage feedback={feedback} canReply={canReply} />
            </Timeline.Item>
          ))}
          {loading && <Spin style={{ marginLeft: '-4px' }} />}
          {!hasMore && (
            <div style={{ color: 'gray', fontSize: '16px', marginLeft: '3px', marginTop: '7px' }}>
              The end of the list.
            </div>
          )}
        </InfiniteScroll>
      </Timeline>
    </>
  )
}
