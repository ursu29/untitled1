import React from 'react'
import Select from '../UI/Select'
import { useGetLevelsQuery } from '../../queries/levels'
import { Level } from '../../types/graphql'
import { getMatrixLevelName } from '../../utils/getLevelName'

interface Props {
  loading?: boolean
  level: Level | undefined
  onSelect: (level: Level) => any
  onDeselect: () => any
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
  const { data, loading: queryLoading } = useGetLevelsQuery()
  const filteredLevels = data?.levels?.filter(level => level !== Level.Confident)
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
          value: getMatrixLevelName(level),
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
        value: getMatrixLevelName(level),
      }))}
    />
  )
}
