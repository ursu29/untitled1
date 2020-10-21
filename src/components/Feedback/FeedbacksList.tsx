import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from '@apollo/react-hooks'
import { Input, Select, Space, Spin, Timeline } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ProjectSelect from '../Projects/ProjectSelect'
import { FeedbackQueryType, getFeedbacks } from '../../queries/feedback'
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

  useEffect(() => {
    setHasMore(true)
  }, [search, about, project, data?.feedbacks])

  if (!data?.feedbacks) return null

  return (
    <>
      <Space style={{ display: 'flex', marginBottom: '40px', maxWidth: '570px' }}>
        <Input.Search
          placeholder="Search"
          onSearch={value => setSearch(value)}
          style={{ width: '300px' }}
        />
        <Select
          placeholder="About"
          allowClear
          style={{ maxWidth: '120px' }}
          onChange={(value: any) => setAbout(value)}
        >
          <Option value="Sidenis">Sidenis</Option>
          <Option value="Team">Team</Option>
          <Option value="Events">Events</Option>
          <Option value="Portal">Portal</Option>
        </Select>
        <div style={{ width: '172px' }}>
          <ProjectSelect
            onChange={(project: any) => setProject(project)}
            wide
            placeholder="Project"
            allowClear
          />
        </div>
      </Space>
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
                  offset: data?.feedbacks.length,
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
          {data?.feedbacks.map((feedback, i) => (
            <Timeline.Item key={feedback.id}>
              <FeedbackMessage feedback={feedback} showComment={i % 2 !== 0} canReply={true} />
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
