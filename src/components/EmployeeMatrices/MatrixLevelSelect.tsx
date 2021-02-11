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

export const getName = (index: number) => {
  const names: any = {
    0: 'Unknown',
    1: 'Theoretical knowledge',
    2: 'Practical knowledge',
    3: 'Practical knowledge',
  }
  return names[index] || '?'
}

// const getColor = (index: number): string => {
//   const names: any = {
//     0: '#f9f9f9',
//     1: '#efefb4',
//     2: '#bbeabb',
//   }
//   return names[index] || '#f9f9f9'
// }

export default function MatrixLevelSelect({ level, onSelect, onDeselect, loading }: Props) {
  const { data, loading: queryLoading } = useQuery<QueryType>(getLevels)
  const filteredLevels = data?.levels.filter(level => level !== LEVEL.CONFIDENT)
  return (
    <Select
      size="small"
      style={{ width: 150 }}
      allowClear
      loading={loading || queryLoading}
      value={
        level &&
        data?.levels && {
          key: getName(Object.keys(LEVEL).indexOf(level)),
          value: getName(Object.keys(LEVEL).indexOf(level)),
        }
      }
      onSelect={item => {
        if (!item) {
          onDeselect()
        } else {
          const level = item.key
          if (level) {
            onSelect(level)
          }
        }
      }}
      items={filteredLevels?.map(level => ({
        key: level,
        value: getName(Object.keys(LEVEL).indexOf(level)),
      }))}
    />
  )
}
