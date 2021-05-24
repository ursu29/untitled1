import React from 'react'
import { Input } from 'antd'

type Props = {
  onSearch: any
  searchFilter: string
}

export const LibraryFilters = ({ onSearch, searchFilter }: Props) => (
  <Input
    placeholder="Search"
    value={searchFilter}
    onChange={(e: any) => onSearch(e.target.value)}
    style={{ width: '30%', margin: '0 0 16px 24px' }}
  />
)
