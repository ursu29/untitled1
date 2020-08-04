import { Form, Input, Space, Switch } from 'antd'
import queryString from 'query-string'
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import PATHS from '../../paths'
import TagSelect from '../Tags/TagSelect'

function getQueryTags(query: string) {
  const values = queryString.parse(query)
  const queryTags = values.tag
    ? Array.isArray(values.tag)
      ? values.tag.map(key => ({ key }))
      : [{ key: values.tag }]
    : []
  return queryTags
}

interface Props extends PropsWithChildren<any>, RouteComponentProps {
  filter: any
  setFilter: (args: any) => void
}

function PostsFilter({
  location,
  history,
  filter: parentFilter,
  setFilter: setParentFilter,
}: Props) {
  const [filter, setFilter] = useState(parentFilter)

  useEffect(() => {
    const queryTags = getQueryTags(location.search)
    if (filter.tags?.toString() !== queryTags.map(i => i.key).toString()) {
      setFilter({ tags: queryTags.map(i => i.key) })
    }
  }, [setFilter, location, filter])

  const setParentFilterDebounced = useCallback(debounce(200, setParentFilter), [])

  useEffect(() => {
    setParentFilterDebounced(filter)
  }, [filter, setParentFilterDebounced])

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input
        placeholder="Search"
        value={filter.text}
        onChange={e => setFilter({ ...filter, text: e.target.value })}
      />
      <TagSelect
        value={filter.tags?.map((i: string) => ({ key: i, label: i }))}
        allowAddNew={false}
        multiple
        onChange={(tags: any) => {
          setFilter({ ...filter, tags: tags.map((i: any) => i.key) })
          history.push({
            pathname: PATHS.POSTS,
            search: tags ? '?' + tags.map((i: any) => 'tag=' + i.key).join('&') : '',
          })
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item label="Translated only">
          <Switch
            onChange={() => setFilter({ ...filter, isTranslated: !filter.isTranslated })}
            style={{ marginLeft: 8 }}
            checked={filter.isTranslated}
          />
        </Form.Item>
      </div>
    </Space>
  )
}

export default withRouter(PostsFilter)
