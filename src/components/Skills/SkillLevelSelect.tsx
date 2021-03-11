import React from 'react'
import { useGetLevelsQuery } from '../../queries/levels'
import { Level } from '../../types/graphql'
import Select from '../UI/Select'
import { getLevelName } from '../../utils/getLevelName'

interface Props {
  loading?: boolean
  level: Level | undefined
  onSelect: (level: Level) => any
  onDeselect: () => any
}

export default function SkillLevelSelect({ level, onSelect, onDeselect, loading }: Props) {
  const { data, loading: queryLoading } = useGetLevelsQuery()
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
          value: getLevelName(level),
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
      items={sortedLevels?.map(level => ({
        key: level,
        value: getLevelName(level),
      }))}
    />
  )
}
