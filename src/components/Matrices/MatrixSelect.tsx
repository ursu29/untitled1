import { useQuery } from '@apollo/client'
import React from 'react'
import getMatrices, { QueryType } from '../../queries/getMatrices'
import { Matrix } from '../../types'
import Select from '../UI/Select'

type MatrixPick = Pick<Matrix, 'id' | 'title' | 'description'>

type Props = {
  value?: MatrixPick
  onSelect: (id: Matrix['id']) => any
  onBlur?: any
  autoFocus?: boolean
}

export default function MatrixSelect({ onSelect, ...props }: Props) {
  const { data, loading } = useQuery<QueryType>(getMatrices)
  return (
    <Select
      autoFocus={!loading && props.autoFocus}
      loading={loading}
      bordered={false}
      placeholder="Attach matrix"
      style={{ width: '130px' }}
      onSelect={value => {
        onSelect(value.key)
      }}
      items={data?.matrices.map(item => {
        return {
          key: item.id,
          value: item.title,
        }
      })}
    />
  )
}
