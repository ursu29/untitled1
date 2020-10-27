import React from 'react'
import { Input, Select } from 'antd'
import { useMediaQuery } from 'react-responsive'
import SkillTreeSelect from '../Skills/SkillTreeSelect'

export default function SearchHeader({
  onSearch,
  onSort,
  onSkillsFilter,
  selectedTechnologies,
}: {
  onSearch: any
  onSort: any
  onSkillsFilter: any
  selectedTechnologies: any
}) {
  const isSingleColumn = useMediaQuery({ maxWidth: 520 })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isSingleColumn ? 'column' : 'row',
        marginBottom: '30px',
      }}
    >
      <div
        style={{
          minWidth: 120,
          width: isSingleColumn ? '100%' : '40%',
          maxWidth: isSingleColumn ? '180px' : '',
          marginRight: isSingleColumn ? 0 : '30px',
          marginBottom: isSingleColumn ? '5px' : '',
        }}
      >
        <div style={{ marginBottom: '5px', whiteSpace: 'nowrap' }}>Search for videos</div>
        <Input.Search
          placeholder="Enter title or author"
          onSearch={value => onSearch(value)}
          onChange={e => {
            if (!e.target.value) onSearch(e.target.value)
          }}
        />
      </div>

      <div
        style={{
          marginRight: isSingleColumn ? 0 : '30px',
          marginBottom: isSingleColumn ? '5px' : '',
          maxWidth: isSingleColumn ? '180px' : '40%',
        }}
      >
        <div style={{ marginBottom: '5px' }}>Sort by</div>
        <Select
          defaultValue="publishedDate"
          style={{ width: isSingleColumn ? '100%' : 120 }}
          onChange={(sort: any) => onSort(sort)}
        >
          <Select.Option value="views">Views</Select.Option>
          <Select.Option value="likes">Likes</Select.Option>
          <Select.Option value="comments">Comments</Select.Option>
          <Select.Option value="publishedDate">Publish date</Select.Option>
        </Select>
      </div>

      <div style={{ maxWidth: isSingleColumn ? '180px' : '40%', minWidth: 120 }}>
        <div style={{ marginBottom: '5px', whiteSpace: 'nowrap' }}>With skills</div>
        <div style={{ minWidth: 120 }} data-cy="select-skill">
          <SkillTreeSelect
            value={selectedTechnologies}
            onChange={value => onSkillsFilter(value)}
            searchPlaceholder="Select skills"
          />
        </div>
      </div>
    </div>
  )
}
