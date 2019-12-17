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

const getName = (index: number) => {
  const names: any = {
    0: 'Unknown',
    1: 'Theoretical knowledge',
    2: 'Practical knowledge',
    3: 'Practical knowledge',
  }
  return names[index] || '?'
}

const getColor = (index: number): string => {
  const names: any = {
    0: '#f9f9f9',
    1: '#efefb4',
    2: '#bbeabb',
  }
  return names[index] || '#f9f9f9'
}

export default function MatrixLevelSelect({ level, onSelect, onDeselect, loading }: Props) {
  const { data, loading: queryLoading } = useQuery<QueryType>(getLevels)
  const filteredLevels = data?.levels
    .sort((a, b) => a.index - b.index)
    .filter(level => level.index !== 3)
    .map(level => {
      return {
        ...level,
        name: getName(level.index),
      }
    })
  return (
    <Select
      size="small"
      style={{ width: 150 }}
      allowClear
      loading={loading || queryLoading}
      value={
        level && {
          key: level.id,
          value: getName(level.index),
        }
      }
      onSelect={item => {
        if (!item) {
          onDeselect()
        } else {
          const level = filteredLevels?.find(level => level.id === item.key)
          if (level) {
            onSelect(level)
          }
        }
      }}
      items={filteredLevels?.map(level => ({
        ...level,
        key: level.id,
        value: level.name,
      }))}
    />
  )
}
