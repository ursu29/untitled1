import React from 'react'
import getLevels, { QueryType } from '../../queries/getLevels'
import Select from '../UI/Select'
import { Level } from '../../types'
import { useQuery } from '@apollo/react-hooks'

interface Props {
  loading?: boolean
  level: Pick<Level, 'id' | 'name' | 'index'> | undefined
  onSelect: (level: Pick<Level, 'id' | 'name'>) => any
  onDeselect: () => any
}

export default function MatrixLevelSelect({ level, onSelect, onDeselect, loading }: Props) {
  const { data, loading: queryLoading } = useQuery<QueryType>(getLevels)
  const sortedLevels = data?.levels.sort((a, b) => a.index - b.index)
  return (
    <Select
      size="small"
      style={{ width: 150 }}
      allowClear
      loading={loading || queryLoading}
      value={
        level &&
        data?.levels && {
          key: level.id,
          value: level.name,
        }
      }
      onSelect={item => {
        if (!item) {
          onDeselect()
        } else {
          const level = sortedLevels?.find(level => level.id === item.key)
          if (level) {
            onSelect(level)
          }
        }
      }}
      items={sortedLevels?.map(level => ({
        ...level,
        key: level.id,
        value: level.name,
      }))}
    />
  )
}
