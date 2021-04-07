import React, { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getWikiRootSections, WikiRootSectionQueryType } from '../../queries/wiki'
import { useHistory } from 'react-router-dom'
import { Spin, AutoComplete } from 'antd'
import { useWikiSearchTextLazyQuery } from '../../queries/wikiSearch'
import Highlighter from 'react-highlight-words'
import { debounce } from 'throttle-debounce'

export default function Search() {
  const history = useHistory()
  const [options, setOptions] = useState<any>([])
  const [searchText, setSearchText] = useState('')
  const [search, { data }] = useWikiSearchTextLazyQuery()
  const suggestions = data?.wikiSearchText

  // Get wiki root sections
  const { data: sections } = useQuery<WikiRootSectionQueryType>(getWikiRootSections)
  const wikiRootSections = sections?.wikiRootSections

  const renderTitle = (title: string, path: string) => (
    <span>
      {wikiRootSections?.find(section => path.startsWith(section.path))?.title}
      {!wikiRootSections?.some(section => section.path === path) && ' ➜ ' + (title || '(untitled)')}
    </span>
  )

  const renderItem = (title: string, searchText: string, path: string) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          whiteSpace: 'normal',
        }}
      >
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={title}
        />
      </div>
    ),
    path,
  })

  const debouncedSearch = useCallback(
    debounce(600, (text: string) => {
      search({ variables: { input: { text } } })
    }),
    [],
  )

  const onSearch = (text: string) => {
    setSearchText(text)
    setOptions([
      {
        label: <Spin style={{ marginLeft: '16px' }} />,
        options: [],
      },
    ])
    debouncedSearch(text)
  }

  useEffect(() => {
    const valuedSuggestions = suggestions?.filter(e => !!e?.textFragment)
    if (!valuedSuggestions) return
    const foundSuggestions = !suggestions
      ? []
      : valuedSuggestions.slice(0, 10).map(e => ({
          label: renderTitle(e?.title || '', e?.path || ''),
          options: [renderItem(e?.textFragment || '', searchText, e?.path || '')],
        }))
    if (valuedSuggestions.length > 10) {
      foundSuggestions.push({
        label: (
          <span style={{ fontStyle: 'italic', fontSize: '14px' }}>
            Too many matches were found. Please specify your search criteria.
          </span>
        ),
        options: [],
      })
    }
    setOptions(foundSuggestions)
    //eslint-disable-next-line
  }, [suggestions])

  const onSelect = (value: any, option: any) => {
    history.push(option.path)
  }

  return (
    <div style={{ marginRight: '200px', alignSelf: 'center' }}>
      <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        style={{ width: 350 }}
        options={options}
        placeholder="Search"
        allowClear
        onSelect={onSelect}
        onSearch={onSearch}
        notFoundContent={!searchText ? '' : 'nothing was found'}
      />
    </div>
  )
}
