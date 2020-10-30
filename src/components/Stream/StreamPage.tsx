import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import VideoRows from './VideoRows'
import SearchHeader from './SearchHeader'
import { getStream, StreamQueryType, updateStream } from '../../queries/stream'
import message from '../../message'
import PageContent from '../UI/PageContent'
import Divider from '../UI/Divider'

export default function StreamPage() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('publishedDate')
  const [skillsFilter, setSkillsFilter] = useState([])

  const variables = {
    input: {
      search,
      sortBy,
      limit: pageSize,
      offset: pageSize * (page - 1),
      skillsFilter: skillsFilter.map((e: any) => e.id),
    },
    inputCount: {
      search,
      skillsFilter: skillsFilter.map((e: any) => e.id),
    },
  }

  // Get streams
  const { data, fetchMore, loading, error } = useQuery<StreamQueryType>(getStream, {
    variables,
  })

  useEffect(() => {
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return fetchMoreResult
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search, sortBy, skillsFilter])

  // Update stream
  const [update] = useMutation(updateStream, {
    onCompleted: () => message.success('Stream has been updated'),
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getStream, variables }],
    onError: message.error,
  })

  return (
    <PageContent
      style={{ padding: 0 }}
      notFound={!data?.streams}
      notFoundMessage="Sorry, no videos found"
      loading={loading && !data?.streams}
      error={error}
    >
      <SearchHeader
        onSearch={(search: string) => setSearch(search)}
        onSort={(sort: string) => setSortBy(sort)}
        onSkillsFilter={(skillsFilter: any) => setSkillsFilter(skillsFilter)}
        selectedTechnologies={skillsFilter}
      />
      <Divider />
      <VideoRows videos={data?.streams || []} update={update} />
      <Divider />
      <Pagination
        showSizeChanger
        onChange={(page: number) => setPage(page)}
        onShowSizeChange={(_: number, pageSize: number) => setPageSize(pageSize)}
        total={data?.totalStreamsCount}
      />
    </PageContent>
  )
}
