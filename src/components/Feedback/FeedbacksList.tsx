import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from '@apollo/react-hooks'
import { Timeline, Typography, Space, Input, Spin, Select } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ProjectTag from '../Projects/ProjectTag'
import ProjectSelect from '../Projects/ProjectSelect'
import { getFeedbacks, FeedbackQueryType } from '../../queries/feedback'

dayjs.extend(relativeTime)

const { Paragraph } = Typography
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
  }, [search, about, project])

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
            if (loading) return

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
          {data?.feedbacks.map(feedback => (
            <Timeline.Item key={feedback.id}>
              <Space size="middle" align="start" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                {dayjs().to(dayjs(feedback.createdAt))}
                <div style={{ fontWeight: 'bold' }}>{feedback.about}</div>
                {feedback.project && (
                  <ProjectTag
                    small={true}
                    key={feedback.project.id}
                    project={feedback.project}
                    leading={false}
                  />
                )}
              </Space>
              <Paragraph style={{ marginTop: '13px', maxWidth: '600px', whiteSpace: 'pre-wrap' }}>
                {feedback.text}
              </Paragraph>
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
