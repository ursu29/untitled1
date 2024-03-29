import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Input, Select, Spin, Timeline } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ProjectSelect from '../Projects/ProjectSelect'
import { useGetFeedbackAccessQuery, useGetFeedbacksQuery } from '../../queries/feedback'
import { Feedback_About as FeedbackAbout } from '../../types/graphql'
import { FeedbackMessage } from './FeedbackMessage'
import { aboutList } from './about'

dayjs.extend(relativeTime)

const { Option } = Select

export default function FeedbacksList() {
  const [search, setSearch] = useState<string | null>(null)
  const [about, setAbout] = useState<FeedbackAbout | null>(null)
  const [project, setProject] = useState<string | null>(null)
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
  const { data, fetchMore, loading } = useGetFeedbacksQuery({
    variables,
    notifyOnNetworkStatusChange: true,
  })
  const { data: accessData } = useGetFeedbackAccessQuery()
  const feedbacks = data?.feedbacks
  const canReply = accessData?.feedbacksAccess?.write || false

  useEffect(() => {
    setHasMore(true)
  }, [search, about, project, feedbacks])

  if (!feedbacks) return null

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '570px', marginBottom: '32px' }}>
        <Input.Search
          placeholder="Search"
          onSearch={(value: string) => setSearch(value)}
          style={{ width: '300px', margin: '0 8px 8px 0' }}
        />
        <Select
          placeholder="About"
          allowClear
          style={{ maxWidth: '120px', margin: '0 8px 8px 0' }}
          onChange={(value: FeedbackAbout) => setAbout(value)}
        >
          {aboutList.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
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
                if (!fetchMoreResult?.feedbacks?.length) {
                  setHasMore(false)
                  return prev
                }
                return { feedbacks: prev.feedbacks?.concat(fetchMoreResult?.feedbacks) }
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
