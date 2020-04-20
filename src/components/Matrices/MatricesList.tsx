import React from 'react'
import { Matrix } from '../../types'
import { List, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { getMatrixLink } from '../../paths'

interface Props {
  loading: boolean
  matrices?: Pick<Matrix, 'id' | 'title' | 'description'>[]
}

export default function MatricesList({ loading, matrices }: Props) {
  if (!loading && !matrices) return null
  return (
    <Skeleton active loading={loading}>
      {matrices && (
        <List>
          {matrices.map((matrix) => {
            return (
              <List.Item key={matrix.id}>
                <List.Item.Meta
                  title={<Link to={getMatrixLink(matrix.id)}>{matrix.title}</Link>}
                  description={matrix.description}
                />
              </List.Item>
            )
          })}
        </List>
      )}
    </Skeleton>
  )
}
