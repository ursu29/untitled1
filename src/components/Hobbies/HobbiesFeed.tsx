import React, { useState } from 'react'
import { Row, Col, Skeleton } from 'antd'
import { useGetHobbyPostsQuery, GetHobbyPostsDocument } from '../../queries/hobbyPosts'
import { CreateHobbyPostModal } from './CreateHobbyPostModal'
import HobbiesFilter from './HobbiesFilter'
import { Language } from '../../types/graphql'
import HobbiesFeedPosts from './HobbiesPosts'

const first = 5

type Filters = {
  first: number
  search: string
  hobbies: string[]
  language: Language | null
}

const HobbiesFeed = () => {
  const [filters, setFilters] = useState<Filters>({
    first,
    search: '',
    hobbies: [],
    language: null,
  })
  const { data, fetchMore, error, loading } = useGetHobbyPostsQuery({
    variables: {
      input: filters,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (error) return <div>Error :(</div>

  const hobbyPosts = data?.hobbyPosts || []

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 0 16px' }}>
        <CreateHobbyPostModal
          key="CreateHobbyPost"
          refetchQueries={[{ query: GetHobbyPostsDocument, variables: { input: filters } }]}
        />
      </div>
      <Row gutter={24}>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 17, order: 1 }}>
          <Skeleton active title paragraph={{ rows: 7 }} loading={!data?.hobbyPosts && loading}>
            <HobbiesFeedPosts
              posts={hobbyPosts}
              loadMore={postId => {
                if (fetchMore) {
                  fetchMore({
                    variables: {
                      input: { ...filters, after: postId },
                    },
                  })
                }
              }}
            />
          </Skeleton>
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 7, order: 2 }}>
          <HobbiesFilter
            onSubmit={values => {
              setFilters({
                first,
                search: values.search,
                hobbies: values.hobbies.map(h => h.id),
                language: values.isTranslated ? Language.En : null,
              })
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default HobbiesFeed
