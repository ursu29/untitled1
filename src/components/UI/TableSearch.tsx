import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'

export default function TableSearch(columnName: any, nestedName?: string) {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys: any, confirm: any, columnName: any) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(columnName)
  }

  const handleReset = (clearFilters: any) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (columnName: any, nestedName?: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          data-cy="search"
          ref={searchInput}
          placeholder={`Search ${columnName}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, columnName)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          data-cy="btnSearch"
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, columnName)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
          data-cy="reset"
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) => {
      const obj = nestedName ? record[nestedName] : record
      if (obj && columnName in obj && obj[columnName]) {
        return obj[columnName].toString().toLowerCase().includes(value.toLowerCase())
      }
    },
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => {
          //@ts-ignore
          searchInput.current.select()
        })
      }
    },
    render: (text: any) =>
      searchedColumn === columnName ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  return getColumnSearchProps(columnName, nestedName)
}
