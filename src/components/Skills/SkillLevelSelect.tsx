import React from 'react'
import getLevels, { QueryType } from '../../queries/getLevels'
import Select from '../UI/Select'
import { LEVEL } from '../../types'
import { useQuery } from '@apollo/react-hooks'

interface Props {
  loading?: boolean
  level: LEVEL | undefined
  onSelect: (level: LEVEL) => any
  onDeselect: () => any
}

export default function MatrixLevelSelect({ level, onSelect, onDeselect, loading }: Props) {
  const { data, loading: queryLoading } = useQuery<QueryType>(getLevels)
  const sortedLevels = data?.levels
  return (
    <Select
      size="small"
      style={{ width: 150 }}
      allowClear
      loading={loading || queryLoading}
      value={
        level &&
        data?.levels && {
          key: level,
          value: level,
        }
      }
      onSelect={item => {
        if (!item) {
          onDeselect()
        } else {
          const level = sortedLevels?.find(level => level === item.key)
          if (level) {
            onSelect(level)
          }
        }
      }}
      items={sortedLevels?.map(level => ({
        key: level,
        value: level,
      }))}
    />
  )
}
