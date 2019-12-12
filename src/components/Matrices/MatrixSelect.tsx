import React from 'react'
import Select from '../UI/Select'
import gql from 'graphql-tag'
import getMatrices, { QueryType } from '../../queries/getMatrices'
import { Matrix } from '../../types'
import { useQuery } from '@apollo/react-hooks'

type MatrixPick = Pick<Matrix, 'id' | 'title' | 'description'>

type Props = {
  value?: MatrixPick
  onSelect: (id: Matrix['id']) => any
  onBlur?: any
  autoFocus?: boolean
}

export default function MatrixSelect({ onSelect, ...props }: Props) {
  const { data, loading, error } = useQuery<QueryType>(getMatrices)
  return (
    <Select
      autoFocus={!loading && props.autoFocus}
      loading={loading}
      onBlur={props.onBlur}
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
